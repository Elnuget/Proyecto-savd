const allowedExtensions = ["pdf", "docx", "txt", "jpg", "jpeg", "png"];
const documents = [];

const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");
const dashboard = document.querySelector("#dashboard");
const uploadForm = document.querySelector("#upload-form");
const fileInput = document.querySelector("#document-file");
const tableBody = document.querySelector("#document-table");
const resultDetail = document.querySelector("#result-detail");
const downloadButton = document.querySelector("#download-report");

let selectedDocument = null;

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(loginForm);
  const user = form.get("user");
  const password = form.get("password");

  if (user === "analista" && password === "savd2026") {
    loginMessage.textContent = "Sesion iniciada. Panel habilitado.";
    loginMessage.style.color = "#0b8f62";
    dashboard.classList.remove("hidden");
    return;
  }

  loginMessage.textContent = "Credenciales incorrectas.";
  loginMessage.style.color = "#b86200";
});

uploadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const file = fileInput.files[0];

  if (!file) return;

  const extension = file.name.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    alert("Formato no permitido para verificacion documental.");
    return;
  }

  const hasObservation = file.name.toLowerCase().includes("error") || file.size === 0;
  const documentRecord = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: file.name,
    extension: extension.toUpperCase(),
    size: formatBytes(file.size),
    state: "Validado",
    result: hasObservation ? "Con observaciones" : "Aprobado",
    observations: hasObservation
      ? "Se detecto nombre sospechoso o archivo vacio. Requiere revision manual."
      : "Documento cumple reglas basicas de formato, tamano y disponibilidad.",
    extracted: {
      tipo: extension.toUpperCase(),
      nombre: file.name,
      tamano: formatBytes(file.size),
    },
  };

  documents.unshift(documentRecord);
  selectedDocument = documentRecord;
  uploadForm.reset();
  renderDocuments();
  renderMetrics();
  renderDetail(documentRecord);
});

downloadButton.addEventListener("click", () => {
  if (!selectedDocument) return;

  const report = [
    "Reporte SAVD",
    `Documento: ${selectedDocument.name}`,
    `Estado: ${selectedDocument.state}`,
    `Resultado: ${selectedDocument.result}`,
    `Observaciones: ${selectedDocument.observations}`,
  ].join("\n");

  const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `reporte-${selectedDocument.name}.txt`;
  link.click();
  URL.revokeObjectURL(url);
});

function renderDocuments() {
  tableBody.innerHTML = documents
    .map(
      (documentRecord) => `
        <tr data-id="${documentRecord.id}">
          <td>${documentRecord.name}<br><small>${documentRecord.extension} - ${documentRecord.size}</small></td>
          <td>${documentRecord.state}</td>
          <td class="${documentRecord.result === "Aprobado" ? "status-ok" : "status-warn"}">${documentRecord.result}</td>
        </tr>
      `,
    )
    .join("");

  tableBody.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", () => {
      const documentRecord = documents.find((item) => item.id === row.dataset.id);
      selectedDocument = documentRecord;
      renderDetail(documentRecord);
    });
  });
}

function renderMetrics() {
  document.querySelector("#metric-total").textContent = documents.length;
  document.querySelector("#metric-valid").textContent = documents.filter((item) => item.result === "Aprobado").length;
  document.querySelector("#metric-errors").textContent = documents.filter((item) => item.result !== "Aprobado").length;
}

function renderDetail(documentRecord) {
  resultDetail.innerHTML = `
    <dl>
      <dt>Documento</dt><dd>${documentRecord.name}</dd>
      <dt>Tipo</dt><dd>${documentRecord.extracted.tipo}</dd>
      <dt>Tamano</dt><dd>${documentRecord.extracted.tamano}</dd>
      <dt>Estado</dt><dd>${documentRecord.state}</dd>
      <dt>Resultado</dt><dd>${documentRecord.result}</dd>
      <dt>Reglas</dt><dd>Formato permitido, archivo disponible, tamano registrado.</dd>
      <dt>Observaciones</dt><dd>${documentRecord.observations}</dd>
    </dl>
  `;
  downloadButton.disabled = false;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
}

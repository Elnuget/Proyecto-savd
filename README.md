# Proyecto SAVD

Repositorio: https://github.com/Elnuget/Proyecto-savd

## Descripcion

SAVD es una carcasa de software para un Sistema de Automatizacion y Verificacion Documental. El proyecto nace del documento de planificacion Scrum incluido en el repositorio y representa la estructura base que deberia tener el producto final.

El sistema esta orientado a permitir que usuarios autorizados carguen documentos, consulten su estado, ejecuten validaciones automaticas, revisen observaciones y generen reportes basicos para seguimiento documental.

## Objetivo del proyecto

Construir un producto incremental bajo metodologia Scrum, dividido en tres sprints:

1. Gestion y almacenamiento de documentos.
2. Automatizacion del proceso de verificacion.
3. Reportes, resultados e indicadores generales.

## Carcasa implementada

La version actual incluye una interfaz web estatica que demuestra el flujo principal del sistema:

- Inicio de sesion con credenciales de demostracion.
- Carga de documentos con validacion de formato.
- Listado de documentos registrados.
- Simulacion de extraccion de datos relevantes.
- Simulacion de reglas de validacion.
- Estados y resultados de cada documento.
- Indicadores generales del proceso.
- Descarga de reporte de validacion en formato TXT.

## Credenciales de demostracion

- Usuario: `analista`
- Contrasena: `savd2026`

## Como ejecutar

No requiere instalacion de dependencias.

Abra `index.html` en un navegador moderno o sirva la carpeta con cualquier servidor estatico.

Ejemplo con Python, si esta disponible:

```bash
python -m http.server 8000
```

Luego visite `http://localhost:8000`.

## Estructura

```text
.
├── PROYECTO FINAL PARTE 1 grupo 7.pdf
├── README.md
├── app.js
├── docs/
│   └── resultados.tex
├── index.html
└── styles.css
```

## Alcance esperado del software final

La carcasa actual sirve como base visual y funcional. Para una version productiva deberia agregarse:

- Backend con autenticacion real y gestion de usuarios.
- Base de datos para documentos, estados, reglas y reportes.
- Almacenamiento seguro de archivos.
- Motor real de extraccion documental OCR/texto.
- Reglas configurables de validacion.
- Auditoria de cambios y trazabilidad de procesos.
- Exportacion formal de reportes en PDF o Excel.
- Pruebas automatizadas y despliegue continuo.

# Planilla Backend

Este backend permite a la aplicación estática de GitHub Pages enviar imágenes al API de Gemini sin exponer la clave en el cliente.

## Instalación

```bash
cd backend
npm install
```

## Variables de entorno

Crea un archivo `.env` o configura la variable en tu host:

- `GEMINI_API_KEY`: clave de API de Google Gemini
- `GEMINI_MODEL`: opcional, por defecto `gemini-1.5`

## Ejecución local

```bash
GEMINI_API_KEY=tu_clave npm start
```

## Deploy

Puedes desplegar este backend en cualquier servicio de Node.js compatible:

- Vercel
- Render
- Railway
- Fly.io
- Heroku
- Replit

En GitHub Pages puedes mantener el frontend (`papiweb-calculadora.html`) y apuntar `GEMINI_BACKEND_URL` a la URL del backend desplegado.

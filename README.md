# Papiweb Planilla

Calculadora inteligente con análisis de imagen mediante Google Gemini.

## Despliegue en Vercel

### Requisitos previos
- Una cuenta en [Vercel](https://vercel.com)
- El repositorio en GitHub (papiwebs/planilla)
- Una clave de API de Google Gemini

### Pasos de despliegue

1. **Conecta tu repositorio**
   - Ve a [Vercel](https://vercel.com)
   - Haz clic en "Add New..." → "Project"
   - Selecciona tu repositorio `papiwebs/planilla`

2. **Configura variables de entorno**
   - En Vercel, ve a "Settings" → "Environment Variables"
   - Añade:
     ```
     GEMINI_API_KEY = tu_clave_de_api
     GEMINI_MODEL = gemini-1.5 (opcional)
     ```

3. **Deploy**
   - Haz clic en "Deploy"
   - Vercel automáticamente detecta:
     - `papiweb-calculadora.html` como página estática
     - `/api/gemini.js` como función serverless

Tu sitio estará disponible en `https://planilla.vercel.app` (o tu dominio personalizado).

## Estructura del proyecto

```
.
├── papiweb-calculadora.html   # Frontend estático
├── api/
│   └── gemini.js              # Función serverless
├── vercel.json                # Config de Vercel
├── package.json               # Dependencias
└── README.md
```

## Uso local

```bash
npm install
npm run dev
```

Luego abre `http://localhost:3000` en tu navegador.

## Despliegue alternativo

Si prefieres no usar Vercel:
- El frontend puede hospedarse en cualquier servicio estático (GitHub Pages, Netlify, etc.)
- El backend (`/api/gemini.js`) puede adaptarse a otros hosts serverless o ejecutarse como servidor Node.js tradicional en la carpeta `backend/`.

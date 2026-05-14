# Despliegue en Vercel - Guía Rápida

## 1. Preparar el repositorio (YA HECHO ✅)
- ✅ `vercel.json` configurado
- ✅ `/api/gemini.js` con función serverless
- ✅ `package.json` con dependencias
- ✅ `.env.example` con variables
- ✅ `.vercelignore` configurado

## 2. Ir a Vercel
https://vercel.com

## 3. Conectar tu repositorio
1. Haz clic en "Add New..." → "Project"
2. Selecciona `papiwebs/planilla`
3. Vercel detectará automáticamente que es un proyecto con funciones serverless

## 4. Configurar variables de entorno
En "Settings" → "Environment Variables", añade:
```
GEMINI_API_KEY = AIzaSyALbrNZvDG8bTWxMKaH8HduIEyHScJED04
GEMINI_MODEL = gemini-1.5 (opcional)
```

## 5. Deploy
- Haz clic en "Deploy"
- Espera a que finalice (≈1-2 minutos)
- Tu sitio estará en `https://planilla.vercel.app`

## ¿Qué hace Vercel automáticamente?

- Detecta `/api/gemini.js` como función serverless
- Crea un endpoint en `/api/gemini`
- Sirve `papiweb-calculadora.html` en la raíz
- Aplica las variables de entorno

## Acceso al sitio
- Frontend: `https://planilla.vercel.app/papiweb-calculadora.html`
- API: `https://planilla.vercel.app/api/gemini`

¡Listo! Tu aplicación estará en funcionamiento.

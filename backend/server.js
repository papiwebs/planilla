import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5';

if (!GEMINI_API_KEY) {
  console.warn('WARNING: GEMINI_API_KEY is not set. The backend will return errors until it is configured.');
}

app.use(cors({ origin: true }));
app.use(express.json({ limit: '12mb' }));

app.get('/', (req, res) => {
  res.send('Planilla backend is running.');
});

app.post('/api/gemini', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on backend.' });
  }

  const { image } = req.body;
  if (!image || typeof image !== 'string') {
    return res.status(400).json({ error: 'Missing image data in request body.' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta2/models/${GEMINI_MODEL}/outputs?key=${encodeURIComponent(GEMINI_API_KEY)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: {
            messages: [{
              author: 'user',
              content: `Analizá esta imagen de una planilla contable o tabla de precios.\nDetectá TODOS los números:\n1. Dentro de círculos dibujados a mano (en rojo, azul, lapicera, etc.)\n2. Dentro de óvalos o recuadros destacados\n3. Números grandes que parezcan totales o subtotales\n\nRespondé SOLO con JSON válido, sin markdown, sin backticks, sin texto adicional:\n{\"circled\":[{\"value\":262500,\"label\":\"LAPRIDA\"}],\"other_totals\":[{\"value\":195585,\"label\":\"AVE CESAR\"}]}\n\nSi no encontrás nada: {\"circled\":[],\"other_totals\":[]}`
            }],
            image: [{ mime_type: 'image/jpeg', data: image }]
          }
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: 'Gemini API error', details: text });
    }

    const data = await response.json();
    let txt = '';
    const output = data?.outputs?.[0] || data?.candidates?.[0] || {};

    if (output?.content) {
      const content = Array.isArray(output.content) ? output.content : [output.content];
      txt = (content.find(c => c.type === 'output_text') || {}).text || '';
    }
    if (!txt && output?.contents) {
      const contents = Array.isArray(output.contents) ? output.contents : [output.contents];
      txt = (contents.find(c => c.type === 'output_text') || {}).text || '';
    }
    if (!txt && output?.output) txt = output.output;
    if (!txt && output?.text) txt = output.text;
    if (!txt && output?.candidates?.[0]?.content) {
      const candidateContent = output.candidates[0].content;
      const items = Array.isArray(candidateContent) ? candidateContent : [candidateContent];
      txt = (items.find(c => c.type === 'output_text') || {}).text || '';
      if (!txt && typeof candidateContent === 'string') txt = candidateContent;
    }

    let parsed = { circled: [], other_totals: [] };
    if (txt) {
      try {
        parsed = JSON.parse(txt.replace(/```json|```/g, '').trim());
      } catch (parseErr) {
        console.warn('No JSON parse from Gemini output:', txt);
      }
    }

    res.json({ parsed, raw: txt, gemini: data });
  } catch (error) {
    console.error('Gemini request error:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Planilla backend escuchando en http://localhost:${port}`);
});

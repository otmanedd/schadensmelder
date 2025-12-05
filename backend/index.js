const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Endpoint für Schadensmeldungen
app.post('/report', async (req, res) => {
    const { beschreibung } = req.body;

    try {
        // KI Klassifizierung via lokalem Ollama Mistral
        const response = await axios.post(
            'http://localhost:11434/v1/completions', // korrekter lokaler Endpunkt
            {
                model: 'mistral', // Modellname
                prompt: `Klassifiziere diesen Schaden: "${beschreibung}". Kategorien: Heizung, Wasser, Strom, Sonstiges.`,
                max_tokens: 20
            }
        );

        console.log('Ollama Response:', response.data);

        // Klassifizierung auslesen
        const klasse = response.data.choices[0]?.text.trim() || 'Unbekannt';

        res.json({ klasse });
    } catch (err) {
        console.error('Fehler bei KI Klassifizierung:', err.message);
        res.status(500).json({ error: 'KI Klassifizierung fehlgeschlagen' });
    }
});

app.listen(PORT, () => console.log(`Backend läuft auf http://localhost:${PORT}`));

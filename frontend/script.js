const form = document.getElementById('damageForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const beschreibung = document.getElementById('beschreibung').value;

    try {
        const response = await fetch('http://localhost:3000/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ beschreibung })
        });

        const data = await response.json();
        result.textContent = `KI-Klassifizierung: ${data.klasse}`;
    } catch (err) {
        console.error('Fehler beim Abrufen:', err);
        result.textContent = 'Fehler bei der Klassifizierung';
    }
});

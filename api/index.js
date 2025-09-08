const express = require('express');
const cors = require('cors');
const app = express();

// Middleware do parsowania danych JSON z zapytań
app.use(express.json());
app.use(cors());

// Użyj tej zmiennej do przechowywania wygenerowanych licencji
let generatedLicenses = [];

// Endpoint do generowania nowej licencji
app.post('/api/generuj-licencje', (req, res) => {
    const newLicenseCode = "LICENCJA-" + Math.floor(100000 + Math.random() * 900000);
    generatedLicenses.push(newLicenseCode);
    console.log('Nowa licencja wygenerowana:', newLicenseCode);
    res.json({ kod: newLicenseCode });
});

app.get('/api/lista-licencji', (req, res) => {
    res.json(generatedLicenses);
});

app.post('/api/weryfikuj-licencje', (req, res) => {
    const { kod } = req.body;
    const isValid = generatedLicenses.includes(kod);
    if (isValid) {
        console.log('Weryfikacja licencji:', kod, '-> PRAWIDŁOWA');
        res.json({ isValid: true, code: kod });
    } else {
        console.log('Weryfikacja licencji:', kod, '-> NIEPRAWIDŁOWA');
        res.json({ isValid: false });
    }
});

app.post('/api/wyczysc-licencje', (req, res) => {
    generatedLicenses = [];
    console.log('Wszystkie licencje usunięte.');
    res.json({ message: 'Dane zostały wyczyszczone' });
});

// To jest najważniejsza linia, która eksportuje aplikację
module.exports = app;

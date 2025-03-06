const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// Läs in meddelanden från data.json
function getMessages() {
    try {
        return JSON.parse(fs.readFileSync('data.json'));
    } catch (err) {
        return [];
    }
}

// Spara meddelanden till data.json
function saveMessages(messages) {
    fs.writeFileSync('data.json', JSON.stringify(messages));
}

// API för att hämta meddelanden
app.get('/messages', (req, res) => {
    const messages = getMessages();
    res.json(messages);
});

// API för att skicka meddelanden
app.post('/messages', (req, res) => {
    const { role, message } = req.body;
    const messages = getMessages();
    messages.push({ role, message });
    saveMessages(messages);
    res.status(200).send('Message saved');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

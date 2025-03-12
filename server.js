const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;
const DATA_FILE = 'data.json';

function getMessages() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE));
    } catch {
        return {};
    }
}

function saveMessages(messages) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
}

app.get('/messages/:code', (req, res) => {
    const messages = getMessages();
    res.json(messages[req.params.code] || []);
});

app.post('/messages/:code', (req, res) => {
    const messages = getMessages();
    const code = req.params.code;
    messages[code] = messages[code] || [];
    messages[code].push(req.body);
    saveMessages(messages);
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

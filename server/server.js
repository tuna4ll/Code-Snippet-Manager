const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

const snippetsFilePath = path.join(__dirname, 'snippets.json');

app.get('/api/snippets', (req, res) => {
  fs.readFile(snippetsFilePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading snippets data');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/snippets', (req, res) => {
  const newSnippet = req.body;

  fs.readFile(snippetsFilePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading snippets data');
      return;
    }

    const snippets = JSON.parse(data);
    snippets.snippets.push(newSnippet);

    fs.writeFile(snippetsFilePath, JSON.stringify(snippets, null, 2), 'utf-8', (err) => {
      if (err) {
        res.status(500).send('Error saving snippet');
        return;
      }
      res.status(200).send('Snippet saved successfully');
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

const express = require('express'); // require exress js
const path = require('path'); // get path
const noteData = require('./db/db.json'); // access to database 

const fs = require('fs'); // use file system to read from files

const PORT = 3001; // my port

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => { // create route to landing page
    res.sendFile(path.join(__dirname, './publice/index.html'));
});
  
app.get('/notes', (req, res) => // create route to notes page
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(noteData)); // route to the json file



app.listen(PORT, () => {
console.log(`Example app listening at http://localhost:${PORT}`);
});
  
const express = require('express'); // require exress js
const path = require('path'); // get path

const PORT = 3001; // my port

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './publice/index.html'));
});
  
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);





app.listen(PORT, () => {
console.log(`Example app listening at http://localhost:${PORT}`);
});
  
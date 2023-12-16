const express = require('express'); // require exress js
const path = require('path'); // get path
const noteData = require('./db/db.json'); // access to database 
const uuid = require('uuid'); // used to create universally unique identifiers 

const fs = require('fs'); // use file system to read from files

const PORT = 3001; // my port

const app = express();

app.use(express.static('public'));
app.use(express.json()) // for parsing 
app.use(express.urlencoded({ extended: true })) 

app.get('/', (req, res) => { // create route to landing page
    res.sendFile(path.join(__dirname, './publice/index.html'));
});
  
app.get('/notes', (req, res) => // create route to notes page
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => { // used for api get request
    fs.readFile('./db/db.json', 'utf8', function (err, data) { // read from file
        var notes = JSON.parse(data); // parse the data
        res.json(JSON.parse(data)); // send it as the response
    });
}); // route to the json file

app.post('/api/notes', (req, res) => { // post method for when user saves notes

    const { title, text } = req.body; // destructure request

    const newNote = { // save as new object (or note)
        title,
        text,
        id: uuid.v4(),
    };
    
    fs.readFile('./db/db.json', 'utf8', function (err, data) { // read from file

       var notes = JSON.parse(data); // parse the file
       notes.push(newNote); // push the new not to the notes
       // Next line of code I wrote to the file
       fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), (err) => err ? console.error(err) : console.log('Data has been written to db file.')); 
    })
    
    return res.json(noteData); // return the response
});

app.delete('/api/notes/:id', (req, res) => { // request to delete data

    const id = req.params.id; // get parameter

    fs.readFile('./db/db.json', 'utf8', function (err, data) { // read file
        var notes = JSON.parse(data); // parse the data and get array of objects

        for(let i = 0; i < notes.length; i++){ // loop through arary
            if(notes[i].id == id){ // if ids match
                notes.splice(i, 1); // then delete that data
            }
        }
        // write to file again
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), (err) => err ? console.error(err) : console.log('Data has been written to db file.')); 
    });

    return res.json(noteData); // return the response
});

app.listen(PORT, () => {
console.log(`Example app listening at http://localhost:${PORT}`);
});
  
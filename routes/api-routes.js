const router = require('express').Router();
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const db = require('../db/db.json');


// Function to read notes from the database file
const getNotes = async () => {
    try {
      const rawData = await fs.promises.readFile('./db/db.json', 'utf8');
      return JSON.parse(rawData);
    } catch (err) {
      console.error('Error reading notes:', err);
      return []; // Return empty array if error reading or file doesn't exist
    }
  };



// API Routes
router.get('/notes', async (requestObj, responseObj) => {
  const notes = await getNotes();

  responseObj.json(notes);
});

router.get('/note/:noteId', async (requestObj, responseObj) => {
  const id = requestObj.params.noteId;
  const notes = await getNotes();

  const note = notes.find(noteObj => noteObj.id == id);

  responseObj.json(note || {});
});

// Function to save notes to the database file
const saveNotes = async (notes) => {
  try {
    await fs.promises.writeFile('./db/db.json', JSON.stringify(notes, null, 2), 'utf8');
    console.log('Notes saved successfully.');
  } catch (err) {
    console.error('Error saving notes:', err);
  }
};

// Receiving form data to create a note and sends the user back to the homepage
router.post('/notes', async (requestObj, responseObj) => {
    const id = uuid.v4();

    const notes = await getNotes();
    const newNote = {
        id: id,
        title: requestObj.body.title,
        text: requestObj.body.text
     };

  notes.push(newNote);

  await saveNotes(notes);

  responseObj.json(newNote)
});

router.delete('/notes/:noteId', async (requestObj, responseObj) => {
    const id = requestObj.params.noteId;
    const notes = await getNotes();
  
    const note = notes.filter(noteObj => noteObj.id !== id);
  
    await saveNotes(note)
    
    responseObj.json(note || {});
  });






module.exports = router;
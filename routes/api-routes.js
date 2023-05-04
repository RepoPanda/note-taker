const router = require('express').Router();
const { readAndAppend, readFromFile, readAndRemove } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the feedback
router.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
router.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error. Title and text required');
  }
});

router.delete('/notes/:id' , (req, res) => {
  const id = req.params.id;
  readAndRemove(id, './db/db.json');
  res.json('Your Note has been deleted');

})
module.exports = router;
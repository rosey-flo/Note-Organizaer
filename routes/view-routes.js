const router = require('express').Router();
const path = require('path');



// View Routes
router.get('/notes', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  
  
   module.exports = router;
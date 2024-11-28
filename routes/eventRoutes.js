const express = require('express');
const { createEvent, getEvents, updateEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createEvent); 
router.get('/', authMiddleware, getEvents);    
router.put('/', authMiddleware, updateEvent);  
module.exports = router;

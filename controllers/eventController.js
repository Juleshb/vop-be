const db = require('../db');

exports.createEvent = async (req, res) => {
    const { event_name, event_date, location, description } = req.body;
    const userId = req.user.userId; 
    try {
      const [result] = await db.query(
        'INSERT INTO events (event_name, event_date, location, description, organized_by) VALUES (?, ?, ?, ?, ?)',
        [event_name, event_date, location, description, userId]
      );
      res.status(201).json({
        message: 'Event created successfully',
        eventId: result.insertId,
      });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Error creating event', error });
    }
  };

  exports.getEvents = async (req, res) => {
    try {
      const [events] = await db.query(`
        SELECT events.event_id, events.event_name, events.event_date, 
               events.location, events.description, user.username AS organized_by
        FROM events
        LEFT JOIN user ON events.organized_by = user.user_id
      `);
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Error fetching events', error });
    }
  };

  exports.updateEvent = async (req, res) => {
    const { event_id, event_name, event_date, location, description } = req.body;
  
    try {
      const [result] = await db.query(
        'UPDATE events SET event_name = ?, event_date = ?, location = ?, description = ? WHERE event_id = ?',
        [event_name, event_date, location, description, event_id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.json({ message: 'Event updated successfully' });
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ message: 'Error updating event', error });
    }
  };

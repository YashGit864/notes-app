import db from '../config/db.js'

export const getNotes = async (req, res) => {
  const {sortOrder, limit, offset} = req.query;
  try{
    const notes = await db.query(`SELECT * FROM notes ORDER BY ${sortOrder} LIMIT ${limit} OFFSET ${offset}`);
    const count = await db.query(`SELECT COUNT(*) FROM notes`);
    console.log(`SELECT * FROM notes ORDER BY ${sortOrder} LIMIT ${limit} OFFSET ${offset}`)
    res.status(200).json({success:true, data: notes.rows, count: count.rows[0].count});
  } catch (error) {
    // console.log("Error in getNotes function", error);
    res.status(500).json({success: false, message: "Internal server error"});
  }
}

export const createNote = async (req, res) => {
  const {title, content} = req.body;
  if(!title || !content){
    return res.status(400).json({error: 'All fields are required'});
  }
  try{
    const newNote= await db.query(`INSERT INTO notes (title, content) VALUES($1, $2) RETURNING *`, [title, content]);
    res.status(200).json({success:true, data: newNote.rows[0]});
  } catch (e) {
    console.log("Error in creating note");
    res.status(500).json({success: false, message: "Internal server error"});
  }
}

export const getNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await db.query(`SELECT * FROM notes WHERE id = $1`,[id]);
    res.status(200).json({success:true, data: note.rows[0]});
  } catch (e) {
    console.log("Error in getNote");
    res.status(500).json({success: false, message: "Internal server error"});
  }
}

export const updateNote = async (req, res) => {
  const id = req.params.id;
  const {title, content, likes} = req.body;
  try{
    const updatedNote = await db.query(
      `UPDATE notes SET title = $1, content = $2, likes = $3 WHERE id = $4 RETURNING *`, [title, content, likes, id]);
    if(!updatedNote.rows[0])
      return res.status(400).json({error: 'note not found'});
    res.status(200).json({success:true, data: updatedNote.rows[0]});
  } catch (e) {
    console.log("Error in updating note");
    res.status(500).json({success: false, message: "Internal server error"});
  }
}

export const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedNote = await db.query(`DELETE FROM notes WHERE id = $1 RETURNING *`,[id]);
    if(!deletedNote.rows[0])
      return res.status(400).json({error: 'note not found'});
    res.status(200).json({success:true, data: deletedNote.rows[0]});
  } catch (e) {
    console.log("Error in deleting note");
    res.status(500).json({success: false, message: "Internal server error"});
  }
}
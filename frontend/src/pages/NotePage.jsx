import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import {DeleteForeverRounded} from "@mui/icons-material";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import axios from "axios";
import toast from "react-hot-toast";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

export default function NotePage() {
  const {id} = useParams();
  const [note, setNote] = useState({title: "", content: "", likes: 0});
  const [isEditing, setIsEditing] = useState(false);

  async function getNote() {
    const response = await axios.get(`http://localhost:3000/api/notes/${id}`);
    if (response.data?.data) {
      setNote(response.data.data);
    } else {
      console.log("Invalid id");
      setNote({ title: "", content: "" , likes: 0});
    }
  }

  async function updateNote() {
    await axios.put(`http://localhost:3000/api/notes/${id}`, note);
    toast.success("Note updated");
    await getNote()
  }

  async function deleteNote() {
    await axios.delete(`http://localhost:3000/api/notes/${id}`);
    toast.success("Note deleted");
    setNote({ title: "", content: "" , likes: 0});
  }

  async function handleLikes() {
    const updatedNote = { ...note, likes: note.likes + 1 };
    await axios.put(`http://localhost:3000/api/notes/${id}`, updatedNote);
    setNote(updatedNote);
  }

  useEffect(() => {
    getNote();
  }, [id]);

  return (
    <div className='note'>
      {(note.title !== '' || note.content!=='') ? (
        <div>
          {isEditing ? (
            <div>
              <input
                name="title"
                className="note-title"
                value={note.title}
                onChange={(e) =>
                  setNote({ ...note, title: e.target.value })}
              />
              <textarea
                name="content"
                className="note-content"
                value={note.content}
                onChange={(e) =>
                  setNote({ ...note, content: e.target.value })}
              />
            </div>
          ) : (
            <div>
              <h1 className='note-title'>{note.title}</h1>
              <p className='full-note-content'>{note.content}</p>
            </div>
          )}

          <div className='note-actions'>
            <button onClick={deleteNote}><DeleteForeverRounded/></button>
            <button  onClick={async () => {
              if (isEditing) {
                await updateNote();
              }
              setIsEditing(!isEditing);
              }}>
              {isEditing ? <DoneRoundedIcon/> : <ModeEditRoundedIcon/>}
            </button>
            <div className='end-container'>
              <div>{note.likes}</div>
              <button onClick={handleLikes}><ThumbUpAltOutlinedIcon/></button>
          </div>
          </div>
        </div>
      ) : (
        <div>No note found</div>
      )}
    </div>
  );
}
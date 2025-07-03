import { useState } from 'react';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import {DeleteForeverRounded} from "@mui/icons-material";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';import axios from "axios";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNote, setUpdatedNote] = useState(
    {title: props.note.title, content: props.note.content, likes: props.note.likes});
  const likes = props.note.likes;

  async function updateNote() {
    await axios.put(`http://localhost:3000/api/notes/${props.note.id}`, updatedNote);
    toast.success("Note updated");
    console.log(updatedNote)
    props.fetchNotes();
  }

  async function deleteNote(){
    await axios.delete(`http://localhost:3000/api/notes/${props.note.id}`);
    toast.success("Note deleted");
    props.fetchNotes();
  }

  return (
    <div className='note'>
      {isEditing ? (
        <div>
          <input
            className="note-title"
            value={updatedNote.title}
            onChange={(e) =>
              setUpdatedNote({ ...updatedNote, title: e.target.value })}
          />
          <textarea
            className="note-content"
            value={updatedNote.content}
            onChange={(e) =>{
              setUpdatedNote({ ...updatedNote, content: e.target.value })
            }}/>
        </div>
      ) : (
        <Link to={`/note/${props.note.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div>
            <div className='note-title container'>
              <div>{props.note.title}</div>
              <div className='end-container'>
                <div>{likes}</div>
                <ThumbUpAltOutlinedIcon/>
              </div>
            </div>
            <p className='note-content'>{props.note.content}</p>
          </div>
        </Link>
      )}

      <div className='note-actions'>
        <button onClick={deleteNote}><DeleteForeverRounded/></button>

        <button
          onClick={async () => {
            if (isEditing) {
              await updateNote();
            }
            setIsEditing(!isEditing);
          }}>
          {(isEditing) ? <DoneRoundedIcon/> : <ModeEditRoundedIcon/>}
        </button>
      </div>
    </div>
  );
}

export default Note;
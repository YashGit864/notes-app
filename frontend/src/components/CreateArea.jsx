import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newNote, setNewNote] = useState({title: "", content: ""});

  function expand(){
    setIsExpanded(true);
  }

  async function addNewNote(){
    await axios.post("http://localhost:3000/api/notes", newNote);
    setNewNote({ title: "", content: "" });
    setIsExpanded(false);
    toast.success("Note added successfully");
    props.fetchNotes(props.sortOrder);
  }

  return (
    <div>
        <form className="create-note">
        {isExpanded &&
          <input
              name="title"
              placeholder="Title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })}
          />}
        <textarea
          name="content"
          onClick={expand}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={newNote.content}
          onChange={(e) =>
            setNewNote({ ...newNote, content: e.target.value })}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={addNewNote}>
            <AddIcon/>
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

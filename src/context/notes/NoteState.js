// Here we are creating the states for the Note and also using these states in the context
import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial)

  // Get all notes
  const getNotes = async() => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json()
    setNotes(json)
  }


  // adding note
  const addNote = async(title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    //cleint side 
  setNotes(notes.concat(note))
  }


  // Deleting Note
  const deleteNote = async(id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = response.json();
    console.log(json)

    // deleting client side
    const newNotes = notes.filter((note) => {
      // filter creates a new array by removing elements that don't belong.....The filter() method creates a new array....The filter() method does not change the original array
      return note._id !== id;
    });
    setNotes(newNotes);

  }

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  }
    return (
      <NoteContext.Provider
        value={{ notes, setNotes, editNote, addNote, deleteNote, getNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    );
};
export default NoteState;

// Here we are creating the states for the Note and also using these states in the context
import NoteContext from "../context/notes/noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",   
      headers: {
        // 'Content-Type': 'application/json',
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWU4ZDkwZTc5YmZhOGQxMTk1OTlkIn0sImlhdCI6MTY2NDgwNTA4MX0.S2-Rdc1PYS5nT6JdmMiO89667FYaXB1p8PBRZGTSsdw"
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0M2I1NTQ0NmU1OTM0YzhmMDU3M2JiIn0sImlhdCI6MTY2NTM4MjE3MX0.4p5FOfvI4KTzBhaagg7Ol4d27QwMen9TkSP5qd26P5U",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);

    // Add a Note
    const addNote = async (title, description, tag) => {
      // API call
      // cant call an api directly from the browser..need to npm install cors
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWU4ZDkwZTc5YmZhOGQxMTk1OTlkIn0sImlhdCI6MTY2NDgwNTA4MX0.S2-Rdc1PYS5nT6JdmMiO89667FYaXB1p8PBRZGTSsdw"
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWU4ZDkwZTc5YmZhOGQxMTk1OTlkIn0sImlhdCI6MTY2NDgwNTA4MX0.S2-Rdc1PYS5nT6JdmMiO89667FYaXB1p8PBRZGTSsdw",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      // adding in the cleint side
      console.log("Adding a new Note");
      const note = {
        _id: "633ae9c50e79bfa8d11959a2",
        user: "633ae8d90e79bfa8d119599d",
        title: "My Title1111",
        description: "Please wake up early1111",
        tag: "personal11111",
        date: "2022-10-03T13:55:17.082Z",
        __v: 0,
      };
      //setNotes(notes.push(note))   // the state named notes is updated with the note object
      setNotes(notes.concat(note)); // concat() returns an array whereas push() updates an array
    };
    // Delete a Note
    const deleteNote = async (id) => {
      // API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWU4ZDkwZTc5YmZhOGQxMTk1OTlkIn0sImlhdCI6MTY2NDgwNTE2MX0.4Hki6vEH7cuiXY-OdJdRBBh3uT-HqSnZPPFw1NbOCJo"
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWU4ZDkwZTc5YmZhOGQxMTk1OTlkIn0sImlhdCI6MTY2NDgwNTA4MX0.S2-Rdc1PYS5nT6JdmMiO89667FYaXB1p8PBRZGTSsdw",
        },
      });
    //   const json = response.json();

      console.log("Deleting the note with id " + id);
      const newNotes = notes.filter((note) => {
        // filter creates a new array by removing elements that don't belong.....The filter() method creates a new array....The filter() method does not change the original array
        return note._id !== id;
      });
      setNotes(newNotes);
    };
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
      // API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWU4ZDkwZTc5YmZhOGQxMTk1OTlkIn0sImlhdCI6MTY2NDgwNTE2MX0.4Hki6vEH7cuiXY-OdJdRBBh3uT-HqSnZPPFw1NbOCJo"
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYWU4ZDkwZTc5YmZhOGQxMTk1OTlkIn0sImlhdCI6MTY2NDgwNTA4MX0.S2-Rdc1PYS5nT6JdmMiO89667FYaXB1p8PBRZGTSsdw",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = response.json();

      // Logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
    };

    return (
      <NoteContext.Provider
        value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    );
  };
};
export default NoteState;

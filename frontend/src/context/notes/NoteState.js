import NoteContext from "./NoteContext";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "author-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmIxNTBhZGMxNDY2YTJkNjUwMWU2In0sImlhdCI6MTcyMDY5MzE2MH0.Ys3vqvg73rGgL5IDc09apmzmC0pGgDXhLb172q76i1I"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "author-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmIxNTBhZGMxNDY2YTJkNjUwMWU2In0sImlhdCI6MTcyMDY5MzE2MH0.Ys3vqvg73rGgL5IDc09apmzmC0pGgDXhLb172q76i1I"
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();
    console.log(json)

    const newid = uuidv4();
    console.log("Adding a new note")
    const note = {
      "_id": newid,
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "author-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmIxNTBhZGMxNDY2YTJkNjUwMWU2In0sImlhdCI6MTcyMDY5MzE2MH0.Ys3vqvg73rGgL5IDc09apmzmC0pGgDXhLb172q76i1I"
      },
    });
    const json = await response.json()
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "author-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmIxNTBhZGMxNDY2YTJkNjUwMWU2In0sImlhdCI6MTcyMDY5MzE2MH0.Ys3vqvg73rGgL5IDc09apmzmC0pGgDXhLb172q76i1I"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }
  //   // Logic to edit in client
  //   for (let index = 0; index < notes.length; index++) {
  //     const element = notes[index];
  //     if (element._id === id) {
  //       element.title = title;
  //       element.description = description;
  //       element.tag = tag;
  //     }

  //   }
  // }
 
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;
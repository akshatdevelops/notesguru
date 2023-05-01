/* import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host="http://localhost:5000"
    const notesinitial = []
    const [notes, setNotes] = useState(notesinitial)
    //Get Notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    //Add Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}),
        }); 
        const note=await response.json()
        setNotes(notes.concat(note))
    }
    //search your notes
    const searchNotes = (word) => {
        const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(word.toLowerCase()));
        setNotes(filteredNotes);
      };


    //Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
           
        });
        const json= response.json();
        console.log(json)

        console.log(id)
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}),
        });
        const json= await response.json();
        console.log(json)


        let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
            
        }
        setNotes(newNotes)
} */
import noteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);
  const [originalNotes, setOriginalNotes] = useState(notesinitial);

  //Get Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
    setOriginalNotes(json);
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    setOriginalNotes(notes.concat(note));
  };

  //Search your notes
  const searchNotes = (word) => {
    const filteredNotes = originalNotes.filter((note) =>
      note.title.toLowerCase().includes(word.toLowerCase()) || note.description.toLowerCase().includes(word.toLowerCase()) || note.tag.toLowerCase().includes(word.toLowerCase())
    );
    setNotes(filteredNotes);
  };

  //Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);

    console.log(id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
    setOriginalNotes(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
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
    setOriginalNotes(newNotes);
  };

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes,searchNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState
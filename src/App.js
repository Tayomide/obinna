// Comment code to understand better
import { SideBar } from "./components/SideBar";
import { SoftPad } from "./components/SoftPad";
import "./App.css"
import { NewNote } from "./components/NewNote";
import { useState, useEffect } from "react";
import { NoteContext } from "./hooks/noteContext"
function App() {
  // Design scrollbars
  const [addNew, setAddNew] = useState(false)
  const [notes, setNotes] = useState()
  const [search, setSearch] = useState(localStorage.search ? JSON.parse(localStorage.search) : "")
  
  useEffect(() => {
    if(notes)localStorage["notepads"] = JSON.stringify(notes)
  }, [notes])

  useEffect(() => {
    localStorage.search = JSON.stringify(search)
  }, [search])

  useEffect(() => {
    let start, end = 0
    const note = JSON.parse(localStorage["notepads"] || "[]")
    while(end < note.length){
      if(note[end] !== 0){
        note.splice(start, end-start-1)
        start = end
      }
      end++
    }
    if(note[end-1] === 0)note.splice(start)
    setNotes(note)
  }, [])

  return (
    <NoteContext.Provider value={{ notes, setNotes, search, setSearch }}>
      <div className="app">
        <SideBar setAddNew={ setAddNew } />
        <SoftPad />
        {addNew && <NewNote setAddNew={ setAddNew } />}
      </div>
    </NoteContext.Provider>
  );
}

export default App;

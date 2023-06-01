import { NoteContext } from "../hooks/noteContext"
import "./NewNote.css"
import { useState, useEffect, useRef, useContext } from "react"

export const NewNote = ({ setAddNew }) => {
  const [text, setText] = useState("")
  const textarea = useRef()
  const { setNotes } = useContext(NoteContext)
  const createNote = () => {
    const notepads = JSON.parse(localStorage["notepads"] || "[]")
    const maxLayer = parseInt(JSON.parse(localStorage["maxLayer"] || "0"))
    const newNote = {
      id: notepads.length,
      text,
      height: 300,
      width: 300,
      layer: maxLayer + 1,
      collapse: false,
      priority: "default",
      hide: false,
      position: {
        x: 0,
        y: 0
      }
    }
    notepads.push(newNote)
    setNotes(tempNotes => {
      if(!tempNotes)return tempNotes
      tempNotes.push(newNote)
      return tempNotes
    })
    localStorage["notepads"] = JSON.stringify(notepads)
    localStorage["maxLayer"] = JSON.stringify(maxLayer+1)
    setText("")
  }
  useEffect(() => {
    textarea.current.focus()
  }, [])
  
  const handleClick = (e) => {
    e.stopPropagation()
    if(e.target.tagName === "TEXTAREA")return
    setAddNew(false)
  }
  return (
    <section className="new-note" onClick={handleClick}>
      <div>
       <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={textarea}
       />
       <button onClick={createNote}>Create</button>
      </div>
    </section>
  )
}

import "./StickyOp.css"
import { useContext, useEffect, useState } from "react"
import { ExpandLess } from "@mui/icons-material"
import { ExpandMore } from "@mui/icons-material"
import { Menu } from "@mui/icons-material"
import { DragIndicator } from "@mui/icons-material"
import { DropDown } from "./DropDown"
import { NoteContext } from "../hooks/noteContext"

export const StickyOp = ({ setPrior, id}) => {
  const [mouse, setMouse] = useState()
  const [collapseMenu, setCollapseMenu] = useState(true)
  const { notes, setNotes } = useContext(NoteContext)
  
  const handleMouseDown = (e) => {
    setMouse({
    x: e.nativeEvent.clientX,
    y: e.nativeEvent.clientY,
    initial: {...notes[id].position}
  })}

  const setCollapse = () => {
    setNotes(prevNote => {
      const newNote = [...prevNote]
      newNote[id].collapse = !newNote[id].collapse
      return newNote
    })
  }

  useEffect(() => {
    if(notes[id].collapse)setCollapseMenu(true)
  },[notes, id])
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if(mouse){
        setNotes(prevNote => {
          const newNote = [...prevNote]
          newNote[id].position = {
            x: Math.min(
              Math.max(mouse.initial.x + (e.clientX - mouse.x), 0),
              document.querySelector(".soft-pad").clientWidth - newNote[id].width
            ),
            y: Math.min(
              Math.max(mouse.initial.y + (e.clientY - mouse.y), 0),
              window.innerHeight - newNote[id].height
            )
          }
          return newNote
        })
      }
    }

    const handleMouseUp = (e) => setMouse(null)

    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  },[mouse, id, setNotes])

  return (
    <div className="sticky-op">
      <DropDown
        collapseMenu={collapseMenu}
        setPrior={setPrior}
        id={id}
      />
      <button onClick={setCollapse}>{
        notes[id].collapse ? <ExpandLess /> : <ExpandMore />
        }</button>
      <div className="move" onMouseDown={handleMouseDown}>
        <DragIndicator />
      </div>
      <button name="menu" onClick={() =>{ !notes[id].collapse && setCollapseMenu(!collapseMenu)}}><Menu /></button>
    </div>
  )
}

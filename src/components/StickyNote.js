import "./StickyNote.css"
import { useEffect, useState, useRef, useContext} from "react"
import { StickyOp } from "./StickyOp"
import priority from "../Priority"
import { NoteContext } from "../hooks/noteContext"

export const StickyNote = ({ params, id }) => {
  // Change max layer to an algorithm of O(n) time (worth it)

  const [mouse, setMouse] = useState()
  const sticky = useRef()
  const { notes, setNotes } = useContext(NoteContext)

  const setText = (e) => {
    setNotes(prevNote => {
      const newNote = [...prevNote]
      newNote[id].text = e.target.value
      return newNote
    })
  }

  const resizeMouseDown = (e) => {
    let direction = ""
    if(e.target.classList.contains("n")){
      direction = "n"
    }
    if(e.target.classList.contains("s")){
      direction = "s"
    }
    if(e.target.classList.contains("e")){
      direction = "e"
    }
    if(e.target.classList.contains("w")){
      direction = "w"
    }
    setMouse({
      direction,
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
      initial: {
        size: {
          height:notes[id].height,
          width:notes[id].width
        },
        position: {...notes[id].position}
      }
    })
  }

  const handleMouseDown = (e) => {
    const maxLayer = parseInt(JSON.parse(localStorage["maxLayer"]))
    if(notes[id].layer !== maxLayer){
      setNotes(prevNote => {
        const newNote = [...prevNote]
        newNote[id].layer = maxLayer+1
        return newNote
      })
      localStorage.maxLayer = maxLayer+1
    }
  }

  useEffect(() => {
    const resizeMouseMove = (e) => {
      e.stopPropagation()
      if(mouse){
        if(mouse.direction === "n"){
          setNotes(prevNote => {
            const newNote = [...prevNote]
            newNote[id].height = mouse.initial.size.height - (e.clientY - mouse.y)
            newNote[id].width = mouse.initial.size.width
            newNote[id].position = {
              x: mouse.initial.position.x,
              y: mouse.initial.position.y + (e.clientY - mouse.y)
            }
            return newNote
          })
          return
        }
        if(mouse.direction === "s"){
          setNotes(prevNote => {
            const newNote = [...prevNote]
            newNote[id].height = mouse.initial.size.height + (e.clientY - mouse.y)
            newNote[id].width = mouse.initial.size.width
            return newNote
          })
          return
        }
        if(mouse.direction === "e"){
          setNotes(prevNote => {
            const newNote = [...prevNote]
            newNote[id].height = mouse.initial.size.height
            newNote[id].width = mouse.initial.size.width + (e.clientX - mouse.x)
            return newNote
          })
          return
        }
        if(mouse.direction === "w"){
          setNotes(prevNote => {
            const newNote = [...prevNote]
            newNote[id].height = mouse.initial.size.height
            newNote[id].width = mouse.initial.size.width - (e.clientX - mouse.x)
            newNote[id].position = {
              x: mouse.initial.position.x + (e.clientX - mouse.x),
              y: mouse.initial.position.y
            }
            return newNote
          })
          return
        }
      }
    }

    const resizeMouseUp = (e) => setMouse(null)

    document.addEventListener("mouseup", resizeMouseUp)
    document.addEventListener("mousemove", resizeMouseMove)
    return () => {
      document.removeEventListener("mouseup", resizeMouseUp)
      document.removeEventListener("mousemove", resizeMouseMove)
    }
  }, [mouse, setNotes, id])

  return (<div className={"sticky-note" + (notes[id].hide ? " hide" : "")} style={{
      width: (notes[id].width)+"px",
      backgroundColor: "#222",
      "--op": priority[notes[id].priority],
      "--x":`${notes[id].position.x}px`,
      "--y":`${notes[id].position.y}px`,
      "--z":notes[id].layer,
      "--height":`${notes[id].height}px`,
      "--width":`${notes[id].width}px`
    }}
    onMouseDown={handleMouseDown}
    >
      <div className="v w"
        onMouseDown={resizeMouseDown}
      ></div>
      <div className="v e"
        onMouseDown={resizeMouseDown}
      ></div>
      <div className="h n"
        onMouseDown={resizeMouseDown}
      ></div>
      <div className="h s"
        onMouseDown={resizeMouseDown}
      ></div>
      <textarea
        value={notes[id].text}
        onChange={setText}
        style={{
          height: notes[id].collapse ? 0 : `calc(${notes[id].height}px - 2em)` ,
          width: `calc(${notes[id].width}px - 0.8em)`,
        }}
        className={notes[id].collapse ? "bevel" : ""}
        ref={sticky}
      />
      <StickyOp
        id={id}
      />
    </div>
  )
}

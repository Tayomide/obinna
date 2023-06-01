import { NoteContext } from "../hooks/noteContext"
import "./SoftPad.css"
import { StickyNote } from "./StickyNote"
import { useContext } from "react"

export const SoftPad = () => {
  const {notes} = useContext(NoteContext)
  // const [notepads, setNotepads] = useState()
  // useEffect(() => {
  //   let start = 0
  //   let end = 0
  //   setNotepads(() => {
  //     console.log(localStorage["notepads"] || "[]")
  //     const note = JSON.parse(localStorage["notepads"] || "[]")
  //     while(end < note.length){
  //       if(note[end] !== 0){
  //         note.splice(start, end-start-1)
  //         start = end
  //       }
  //       end++
  //     }
  //     if(note[end-1] === 0)note.splice(start)
  //     return note
  //   })
  // }, [])

  
  // useEffect(() => {
    // if(notepads)localStorage["notepads"] = JSON.stringify(notepads)
    // const tempNotes = []
    // for(const note of notepads){
    //   if(note)tempNotes.push({
    //     text: note.text,
    //     priority: note.priority
    //   })
    // }
    // setNotes(tempNotes)
  // }, [notepads])
  return (
    <div className="soft-pad">
      {
        notes?.map((param, key) => (param !== 0) && <StickyNote params={param} id={key} key={key}/>)
      }
    </div>
  )
}

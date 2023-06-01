import "./DropDown.css"
import { Delete } from "@mui/icons-material"
import { VisibilityOff } from '@mui/icons-material';
import priority from "../Priority"
import { NoteContext } from "../hooks/noteContext"
import { useContext } from "react"

export const DropDown = ({ collapseMenu, id}) => {
  const { setNotes } = useContext(NoteContext)
  const setPrior = (theme) => {
    setNotes(prevNote => {
      const newNote = [...prevNote]
      newNote[id].priority = theme
      return newNote
    })
  }

  const hideNote = () => {
    setNotes(prevNote => {
      const newNote = [...prevNote]
      newNote[id].hide = true
      return newNote
    })
  }

  const deleteNote = () => {
    setNotes(prevNote => {
      const newNote = [...prevNote]
      newNote[id] = 0
      return newNote
    })
  }

  return (
    <ul className={'drop-down' + (collapseMenu ? " collapse" : "")}>
      <li className="theme">
        {
          Object.keys(priority).map((theme, key) =>
          <p
            key={key}
            style={{
              "--bg": priority[theme]
            }}
            onClick={() => setPrior(theme)}
          ></p>
          )
        }
      </li>
      <li>
        <button onClick={hideNote}><VisibilityOff /> Hide Note</button>
        <button onClick={deleteNote}><Delete /> Delete Note</button>
      </li>
    </ul>
  )
}

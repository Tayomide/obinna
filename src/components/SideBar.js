import "./SideBar.css"
import { SearchBar } from "./SearchBar"
import { NoteContext } from "../hooks/noteContext"
import { useContext } from "react"
import { SCatalog } from "./SCatalog"

export const SideBar = ({ setAddNew }) => {
  const { notes, search } = useContext(NoteContext)
  
  return (
    <div className='side-bar'>
      <h2>Soft Pad <button onClick={() => setAddNew(true)}>+</button></h2>
      <SearchBar />
      <div className="catalog-container">
        {
          (notes?.filter(item => {
            return item.text?.toLowerCase().includes(search?.toLowerCase() || "");
          }) || []).map((note, key) => note ? <SCatalog
            id={note.id}
            prior={note.priority}
            text={note.text}
            key={key}
          /> : null)
        }
      </div>
    </div>
  )
}

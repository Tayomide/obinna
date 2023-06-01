import { useContext } from "react"
import "./SearchBar.css"
import { Search } from "@mui/icons-material"
import { NoteContext } from "../hooks/noteContext"

export const SearchBar = () => {
  const { search, setSearch } = useContext(NoteContext)
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
      <button><Search /></button>
    </div>
  )
}

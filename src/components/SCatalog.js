import "./SCatalog.css"
import priority from "../Priority"
import { useContext, useEffect, useRef } from "react"
import { NoteContext } from "../hooks/noteContext"

export const SCatalog = ({ prior, text, id }) => {
  const article = useRef()
  const { search, setNotes } = useContext(NoteContext)

  const handleClick = () => {
    setNotes(prevNote => {
      const currNote = [...prevNote]
      currNote[id].hide = false
      return currNote
    })
  }

  useEffect(() => {
    const regex = new RegExp(search.toLowerCase(), "gi")
    const highlightedText = text.replace(regex, '<mark>$&</mark>')
    article.current.innerHTML = highlightedText
  }, [text, search])

  return (
    // Change to list
    <div className="catalog-note" style={{
      "--prior": priority[prior]
    }} onClick={handleClick}>
      <article ref={article}></article>
    </div>
  )
}

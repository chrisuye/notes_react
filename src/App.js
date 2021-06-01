import { useEffect, useState } from 'react';
import './App.css';
import Main from './Main';
import Sidebar from './Sidebar';
import uuid from 'react-uuid'

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || [])
  const [activeNote, setActiveNote] = useState(false)

  useEffect(()=>{
    localStorage.setItem("notes", JSON.stringify(notes))
  },[notes])

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: 'untitled note',
      body: '',
      date: Date.now()
    }

    setNotes([newNote, ...notes])
  }

  const onUpdateNote = (updatedNote) => {
    const updatedNoteArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote
      }
      return note
    })

    setNotes(updatedNoteArray)
  }

  const onDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  }

  return (
    <div className="App">
      <Sidebar 
      notes = {notes} 
      onAddNote={onAddNote} 
      onDeleteNote={onDeleteNote}
      activeNote = {activeNote}
      setActiveNote = {setActiveNote}/>
      <Main 
      activeNote = {getActiveNote()}
      onUpdateNote = {onUpdateNote}/>
    </div>
  );
}

export default App;

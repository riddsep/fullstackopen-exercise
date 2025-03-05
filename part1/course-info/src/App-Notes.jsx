import { useEffect, useState } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const noteToShow = showAll ? notes : notes.filter((n) => n.important);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };
    setNotes((prev) => [...prev, noteObject]);
    setNewNote("");
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll((p) => !p)}>
        {showAll ? "important" : "all"}
      </button>
      <ul>
        {noteToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => setNotes(initialNotes))
      .catch((err) => console.error(err));
  }, []);

  const noteToShow = showAll ? notes : notes.filter((n) => n.important);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService
      .create(noteObject)
      .then(function (returnedNote) {
        console.log(returnedNote);
        setNotes((prev) => [...prev, returnedNote]);
        setNewNote("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const updatedNote = { ...note, important: !note.important };

    noteService
      .update(id, updatedNote)
      .then((returnedNote) =>
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id === id ? returnedNote : n))
        )
      );
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll((p) => !p)}>
        {showAll ? "important" : "all"}
      </button>
      <ul>
        {noteToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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

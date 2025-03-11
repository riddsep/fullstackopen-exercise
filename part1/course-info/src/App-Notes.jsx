import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  console.log(user);
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });

      localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => setNotes(initialNotes))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
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
      )
      .catch((err) => console.error(err));
  };

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h1>Notes</h1>
      {!user && (
        <button onClick={() => setLoginVisible((prev) => !prev)}>log in</button>
      )}
      {!user && loginVisible && (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={(e) => setUsername(e.target.value)}
          handlePasswordChange={(e) => setPassword(e.target.value)}
          username={username}
          password={password}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {noteForm()}
        </div>
      )}
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
    </div>
  );
};

export default App;

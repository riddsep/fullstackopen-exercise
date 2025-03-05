import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleAddPerson = (e) => {
    e.preventDefault();
    const isReady = persons.some(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    if (isReady) return alert(`${newName} is already added to phonebook`);

    setPersons((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: newName, number: newNumber },
    ]);
    setNewName("");
  };

  const filterPersons = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  useEffect(() => {
    async function GET() {
      const response = await axios.get("http://localhost:3001/persons");
      setPersons(response.data);
    }
    GET();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm
        handleAddPerson={handleAddPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {filterPersons.map((people) => (
        <p key={people.name}>
          {people.name} {people.number}
        </p>
      ))}
    </div>
  );
};
export default App;

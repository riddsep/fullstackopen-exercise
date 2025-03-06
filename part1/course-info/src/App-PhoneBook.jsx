import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/phoneBooks";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleAddPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      const confirmChange = confirm(
        `${newName} is already added to phonebook, replace old number with a new one?`
      );

      if (!confirmChange) return;

      const updatedPerson = { ...existingPerson, number: newNumber };

      personService.update(existingPerson.id, updatedPerson).then((res) => {
        setPersons((prevPerson) =>
          prevPerson.map((person) => (person.id === res.id ? res : person))
        );
        setNewName("");
        setNewNumber("");
      });
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then((person) => {
          setPersons((prev) => [...prev, person]);
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeletePerson = async (id) => {
    const personToDelete = persons.find((p) => p.id === id);

    const confirmToDelete = confirm(`Delete ${personToDelete.name}`);

    if (!confirmToDelete) return;

    try {
      await personService.remove(id);
      setPersons((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filterPersons = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  useEffect(() => {
    async function GET() {
      try {
        const person = await personService.getAll();
        setPersons(person);
      } catch (err) {
        console.log(err);
      }
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
        <div
          key={people.id}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <p>
            {people.name} {people.number}
          </p>
          <button onClick={() => handleDeletePerson(people.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};
export default App;

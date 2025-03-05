import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const generateRandomNumber = () => Math.floor(Math.random() * anecdotes.length);

const App = () => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState({});
  const handleClick = () => {
    const selectedNumber = generateRandomNumber();
    setSelected(selectedNumber);
  };
  const handleVotes = () => {
    const newVote = {
      ...vote,
      [selected]: vote[selected] ? vote[selected] + 1 : 1,
    };
    setVote(newVote);
  };
  console.log(vote);

  const mostVote = Object.keys(vote).reduce(
    (a, b) => (vote[a] > vote[b] ? a : b),
    0
  );
  console.log(mostVote);

  return (
    <div>
      <h2>Anecdote of the day</h2>

      <p>{anecdotes[selected]}</p>
      <button onClick={handleVotes}>votes</button>
      <button onClick={handleClick}>next anecdote</button>
      <p>has {vote[selected] || 0} votes</p>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVote]}</p>
      <p>has {vote[mostVote] || 0} votes</p>
    </div>
  );
};

export default App;

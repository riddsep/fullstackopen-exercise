import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const isNoFeedBack = good > 0 || neutral > 0 || bad > 0;

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood((prev) => prev + 1)}>good</Button>
      <Button onClick={() => setNeutral((prev) => prev + 1)}>neutral</Button>
      <Button onClick={() => setBad((prev) => prev + 1)}>bad</Button>
      <h1>statistics</h1>
      {isNoFeedBack ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No Feedback</p>
      )}
    </div>
  );
};

const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const allStats = good + neutral + bad;
  return (
    <table>
      <tbody>
        <StatisticLine value={good}>good</StatisticLine>
        <StatisticLine value={neutral}>neutral</StatisticLine>
        <StatisticLine value={bad}>bad</StatisticLine>
        <StatisticLine value={allStats}>all</StatisticLine>
        <StatisticLine value={(good - bad) / allStats}>average</StatisticLine>
        <StatisticLine value={(good / allStats) * 100}>Positive</StatisticLine>
      </tbody>
    </table>
  );
};

const StatisticLine = ({ children, value }) => {
  return (
    <tr>
      <td>{children}</td>
      <td>{value}</td>
    </tr>
  );
};
export default App;

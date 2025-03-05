import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ course }) => {
  const total = course.parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <main>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </main>
  );
};

export default Course;

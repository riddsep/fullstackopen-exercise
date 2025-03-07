const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("dev"));

morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :response-time :body"));

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("API PHONE BOOK");
});

app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

app.get("/info", (request, response) => {
  const html = `
    <p>Phonebook has info for ${phonebook.length}</p>
    <p>${new Date()}</p>
  `;
  response.send(html);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = phonebook.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter((p) => p.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const existingName = phonebook.some(
    (p) => p.name.toLowerCase() === body.name.toLowerCase()
  );

  if (!body.name || !body.number) {
    return response.status(404).json({ error: "name or number missing" });
  }
  if (existingName) {
    return response.status(404).json({ error: "name must be unique" });
  }
  const person = {
    id: crypto.randomUUID(),
    name: body.name,
    number: body.number,
  };

  phonebook.push(person);
  response.json(person);
});

const PORT = 3000;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

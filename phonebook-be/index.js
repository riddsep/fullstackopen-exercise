require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Phonebook = require("./models/phonebook");

const app = express();

// 🟢 1. Middleware dasar
app.use(express.json());
app.use(cors());

// 🟢 2. Morgan logging (custom format untuk menampilkan request body)
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time ms - :body"));

// 🟢 3. Routes
app.get("/", (req, res) => {
  res.send("API PHONE BOOK");
});

app.get("/api/phonebook", (req, res) => {
  Phonebook.find({}).then((phonebook) => res.json(phonebook));
});

app.get("/info", async (req, res) => {
  const count = await Phonebook.countDocuments({});
  const html = `
    <p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>
  `;
  res.send(html);
});

app.get("/api/phonebook/:id", (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end();
    })
    .catch((error) => next(error));
});

app.post("/api/phonebook", async (req, res, next) => {
  try {
    const { name, number } = req.body;
    if (!name || !number) {
      return res.status(400).json({ error: "name or number missing" });
    }

    const existingName = await Phonebook.findOne({ name });
    if (existingName) {
      return res.status(400).json({ error: "name must be unique" });
    }

    const person = new Phonebook({ name, number });
    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/phonebook/:id", (req, res, next) => {
  Phonebook.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.put("/api/phonebook/:id", (request, response, next) => {
  const id = request.params.id;
  const { name, number } = request.body;

  const person = {
    name,
    number,
  };

  Phonebook.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// 🟢 4. Error handling middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

// 🟢 5. Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

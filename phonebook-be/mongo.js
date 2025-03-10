const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://ridoseptiawan00:${password}@cluster0.n84ml.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({ name: String, number: String });

const Person = mongoose.model("Person", personSchema);

const person = new Person({ name: process.argv[3], number: process.argv[4] });

if (process.argv[3] && process.argv[4]) {
  person.save().then(() => {
    console.log("person saved!");
    mongoose.connection.close();
  });
  return;
}

Person.find({}, { name: 1, number: 1, _id: 0 }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

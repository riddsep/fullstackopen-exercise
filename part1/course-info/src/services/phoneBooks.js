import axios from "axios";

const BASE_URL = "http://localhost:3001/api/phonebook";

const getAll = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const create = async (newPerson) => {
  try {
    const response = await axios.post(BASE_URL, newPerson);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const update = async (id, updatedPerson) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedPerson);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default { getAll, create, remove, update };

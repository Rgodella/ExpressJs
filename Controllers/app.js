const express = require('express');
const bodyParser = require('body-parser');
const knex = require('../knex'); // Path to Knex instance

const app = express();
app.use(bodyParser.json());

// GET all todos
app.get('/todos', async (req, res) => {
  try {
    console.log("Hello World!");
    const todos = await knex('Class').select('*');
    console.log("todos",todos);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new todo
app.post('/todos', async (req, res) => {
  const { strength, section } = req.body;
  try {
    console.log("Inside the API")
    const newTodo = await knex('Class').insert({ strength, section });
    res.json({ message: 'Todo created successfully', todo_id: newTodo[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a todo
app.put('/todos/:id', async (req, res) => {
  const { strength, section } = req.body;
  const id = req.params.id;
  try {
    console.log("id",id);
    await knex('Class').where({ id }).update({ strength, section });
    res.json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a todo
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await knex('Class').where({ id }).del();
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

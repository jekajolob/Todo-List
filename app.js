// Import necessary modules
const express = require('express') // Express framework for creating a server
const app = express() // Initialize the Express app
const bodyParser = require('body-parser') // Middleware to parse incoming request bodies

// Initialize an in-memory array to store todos
let todos = []

// Middleware to parse JSON request bodies
app.use(bodyParser.json())

// Serve static files from the "public" directory
app.use(express.static('public'))

// GET endpoint to retrieve all todos
app.get('/todos', (req, res) => {
  res.json(todos) // Respond with the array of todos in JSON format
})

// POST endpoint to add a new todo
app.post('/todos', (req, res) => {
  const todo = req.body // Extract the todo object from the request body
  todos.push(todo) // Add the new todo to the array
  res.status(201).json(todo) // Respond with the newly added todo and a 201 status code
})

// PUT endpoint to update an existing todo by ID
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id) // Extract the ID from the request parameters
  const updatedTodo = req.body // Extract the updated todo data from the request body

  // Update the todo in the array
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, ...updatedTodo } : todo
  )

  res.json(updatedTodo) // Respond with the updated todo
})

// DELETE endpoint to delete a todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id) // Extract the ID from the request parameters
  todos = todos.filter((todo) => todo.id !== id) // Remove the todo with the matching ID from the array

  res.status(204).send() // Respond with a 204 status code indicating successful deletion
})

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000') // Log a message to the console
})

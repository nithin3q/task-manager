// controllers/taskController.js
const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user.userId; // Extract userId from request
    const newTask = new Task({ title, description, dueDate, userId });
    await newTask.save();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, dueDate } = req.body;
    await Task.findByIdAndUpdate(taskId, { title, description, dueDate });
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

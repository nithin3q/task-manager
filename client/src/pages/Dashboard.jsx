import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import TaskCard from './TaskCard';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://task-manager-mu-lime.vercel.app/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      if (selectedTask) {
        await axios.put(`https://task-manager-mu-lime.vercel.app/tasks/${selectedTask._id}`, newTask, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Task updated successfully");
        setSelectedTask(null);
      } else {
        await axios.post("https://task-manager-mu-lime.vercel.app/tasks", newTask, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Task created successfully");
      }
      setNewTask({ title: "", description: "", dueDate: "" });
      fetchTasks();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setNewTask({ title: task.title, description: task.description, dueDate: new Date(task.dueDate).toISOString().substr(0, 10) });
    setIsModalOpen(true);
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-manager-mu-lime.vercel.app/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null); // Reset selected task when closing the modal
  }

  useEffect(() => {
    fetchTasks();
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token]);

  return (
    <div className='dashboard-main'>
      <h2>Tasks</h2>
      <div className="task-container d-flex flex-row flex-wrap justify-content-center">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
      <button className="logout-button" onClick={() => setIsModalOpen(true)}>Create Task</button>
      <Link to="/logout" className="logout-button">Logout</Link>

      {/* React Bootstrap Modal */}
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTask ? "Edit Task" : "Create Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCreateTask}>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="date"
              placeholder="Due Date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <button type="submit" className="logout-button">{selectedTask ? "Edit Task" : "Create Task"}</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashboard;

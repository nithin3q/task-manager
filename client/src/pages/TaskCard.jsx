    import React from 'react';
    import { FaEdit, FaTrash } from 'react-icons/fa';

    const TaskCard = ({ task, handleEditTask, handleDeleteTask }) => {
    return (
        <div className="task-card d-flex flex-column">
        <div>
            <strong>Title:</strong> {task.title}
        </div>
        <div>
            <strong>Description:</strong> {task.description}
        </div>
        <div>
            <strong>Due Date:</strong> {new Date(task.dueDate).toISOString().substr(0, 10)}
        </div>
        <div className="task-card-buttons d-flex justify-content-between ">
            <button className="btn btn-primary" onClick={() => handleEditTask(task)}>
            <FaEdit/> Edit
            </button>
            <button className="btn btn-danger" onClick={() => handleDeleteTask(task._id)}>
            <FaTrash/> Delete
            </button>
        </div>
        </div>
    );
    }

    export default TaskCard;

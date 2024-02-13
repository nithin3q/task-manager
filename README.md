# Task Manager App

## Overview
This is a Task Manager application built with React for the frontend. It allows users to manage their tasks efficiently by providing features such as task creation, editing, and deletion.

# Features
- User Registration: Allows new users to create an account.
- User Login: Enables users to log in with their credentials.
- JWT Authentication: Secures user sessions using JSON Web Tokens.
- Responsive Design: Ensures a great user experience across various devices.
- Task Creation: Users can create new tasks by providing a title, description, and due date.
- Task Reminders: Implemented reminders for tasks with due dates to alert users before the deadline.
- Task Listing: Display a list of all tasks with details such as title, description, due date, and status.
- Task Editing: Allow users to edit existing tasks, including modifying the title, description, and due date.
- Task Deletion: Provide functionality to delete tasks that are no longer needed.


# Technologies Used
Frontend:
- React.js: For building the user interface.
- Toastify: To display notifications and alerts.
- React Router DOM: For managing navigation in the application.
Backend:
- Node.js: As the runtime environment.
- Express: Web application framework for Node.js.
- MongoDB: Database to store user credentials and session data.

# Installation
1. Clone the repository:

```
git clone https://github.com/nithin3q/task-manager.git
```

2. Install dependencies:
Navigate to the project directory:
```
cd folder-name
```

3. Install backend dependencies:
```
cd server
npm install
```

4. Install frontend dependencies:

```
cd client
npm install
```

5. Configure MongoDB and JWT:
Visit MongoDB website, create account, database and take connection string.
After that generate 256 bits random key and add it to .env file.
Create the .env file in the root directory with the following contents:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

6. Run the application:
Start the backend server:
```
node app.js
```

7. In a new terminal, start the frontend:
```
cd client
npm run dev
```
## Project Structure
- **src**: Contains the source code for the React frontend.
  - **components**: Contains React components such as TaskCard, Dashboard, and Modal.
  - **styles**: Contains CSS files for styling the components.
- **public**: Contains public assets such as index.html.


# Usage
After starting the application, visit http://localhost:5173 in your browser. Users can now register for a new account or log in using existing credentials.

## Additional Information
- For any issues or feature requests, please open an issue in the GitHub repository.



# Taskify - Task Management Application

Taskify is a modern, responsive task management application designed to help users organize their tasks efficiently. With a clean and minimalistic user interface, Taskify allows users to add, edit, delete, and reorder tasks across three categories: **To-Do**, **In Progress**, and **Done**. The app supports real-time synchronization with a MongoDB database, ensuring that all changes are saved instantly and persist across sessions. Taskify also includes user authentication via Google Sign-In using Firebase Authentication.

---

## Live Links

- **Live Site**: [https://taskify11.web.app](https://taskify11.web.app)
- **Client Repository**: [https://github.com/mrakashsaha/taskify](https://github.com/mrakashsaha/taskify)
- **Server Repository**: [https://github.com/mrakashsaha/taskifyServer](https://github.com/mrakashsaha/taskifyServer)

---

## Key Features

1. **User Authentication**:
   - Google Sign-In using Firebase Authentication.
   - User details (User ID, email, and display name) are stored in the database upon first login.

2. **Task Management**:
   - Add, edit, delete, and reorder tasks.
   - Drag-and-drop tasks between categories (To-Do, In Progress, Done).
   - Reorder tasks within a category.
   - Each task includes:
     - Title (required, max 50 characters).
     - Description (optional, max 200 characters).
     - Timestamp (auto-generated upon creation).
     - Category (To-Do, In Progress, Done).

3. **Database Sync**:
   - Tasks are stored in a MongoDB database.
   - Changes are instantly saved and persist across sessions.

4. **Responsive Design**:
   - Fully responsive UI for both desktop and mobile devices.
   - Mobile-friendly drag-and-drop experience.

5. **Clean and Minimalistic UI**:
   - Modern design with a maximum of four colors for a clean look.
   - Optional dark mode toggle (bonus feature).

---

## Technologies Used

### Frontend:
- **React** (with Vite.js) for building the user interface.
- **hello-pangea/dnd** for drag-and-drop functionality.
- **Firebase Authentication** for user authentication.
- **Tailwind CSS** for styling and responsiveness.

### Backend:
- **Express.js** for building the REST API.
- **MongoDB** for database storage.

### Deployment:
- **Firebase Hosting** for the frontend.
- **Vercel** for the backend API.

---

## Dependencies

### Frontend:
- `react`
- `react-dom`
- `react-beautiful-dnd`
- `firebase`
- `axios`
- `tailwindcss`
- `react-icons`

### Backend:
- `express`
- `mongoose`
- `cors`
- `dotenv`


## Installation

### Frontend
1. **Clone the client repository:**
   ```bash
   git clone https://github.com/mrakashsaha/taskify.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd taskify
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env` file in the root directory and add your Firebase configuration:**
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```

### Backend
1. **Clone the server repository:**
   ```bash
   git clone https://github.com/mrakashsaha/taskifyServer.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd taskifyServer
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env` file in the root directory and add your MongoDB connection string:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
5. **Start the server:**
   ```bash
   npm start
   ```

## Contributors
For any questions or feedback, feel free to reach out:
**Akash Kumar Saha** - [GitHub](https://github.com/mrakashsaha)

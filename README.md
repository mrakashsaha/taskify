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

# Contact
Thanks You. For any questions or feedback, feel free to reach out:

Email: mr.akashsaha@gmail.com
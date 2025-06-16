# 🧾 Expense Aware — Frontend (React + ShadCN)

A modern React-based UI for managing expenses, budgets, and categories — styled with **ShadCN UI** and **Tailwind CSS**, with state management via **Redux Toolkit**.

---

## ⚙️ Tech Stack

- **React** (Vite)
- **Redux Toolkit** (for state management)
- **React Router DOM**
- **Tailwind CSS**
- **ShadCN UI**
- **Lucide Icons**
- **Recharts** (for charts)
- **Axios** (for API calls)
- **JWT-based auth**

---

## 📁 Folder Structure

expense-aware-frontend/
├── src/
│ ├── app/ # Redux store setup
│ ├── features/ # Redux slices (auth, categories, etc.)
│ ├── pages/ # Auth, Dashboard, Categories, Expenses, etc.
│ ├── components/ # Shared UI components (Navbar, Sidebar, Modals)
│ ├── services/ # API functions (axios calls)
│ ├── utils/ # Helper functions
│ └── main.jsx # App entry point
├── public/
├── tailwind.config.js
├── shadcn.config.ts
├── index.html
└── vite.config.js




2. Install dependencies
bash
Copy
Edit
npm install
3. Configure API Base URL
In src/services/axios.js or your .env file (if using Vite environment variables):

env
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000/api
Update your Axios instance to use import.meta.env.VITE_API_BASE_URL

4. Run the app locally
bash
Copy
Edit
npm run dev
The app should now be running on:
🔗 http://localhost:5173

✅ Features Implemented
 JWT Auth (Login / Signup)

 Dashboard layout with Navbar + Sidebar

 Category CRUD (Redux + API integrated)

 Expense & Budget pages with dynamic UI

 Pie + Bar Charts using Recharts

 Modals & dialogs with ShadCN UI

 Toasts and input validations

 Mobile-friendly layout using Tailwind

🧩 To Do / Improvements
 Form validations using zod or react-hook-form

 Role-based access (admin vs normal user)

 Add filtering, sorting, and search

 Add dark mode toggle

 Optimize code splitting

 Test coverage with React Testing Library

 Responsive improvements for tablets/mobiles

🧑‍💻 Author
Abhijith


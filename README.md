# Dashboard Task

A dashboard application built with **React**, **TypeScript**, **Tanstack Query**, and **Redux Toolkit**.

---

## 🔧 Tech Stack

- React  
- TypeScript  
- Tanstack Query  
- Redux Toolkit  
- React Router v6  
- React Bootstrap  
- React Hook Form  
- Zod  
- Axios  
- Vite  
- Lottie Animation  

---

## 🚀 Features

### Authentication
- User registration and login with JWT (refresh token inside cookies)   
- Axios interceptor to handle silent auth  

### Task Management
- CRUD operations for todos  
- Auto refresh every **15M**  
- Prefetch next page in pagination using Tanstack Query  
- Instance data prefetch (get info of a task from cache the first time it’s opened)  
- Optimistic update after adding or editing a task  
- Filter tasks by status (**All / Pending / In progress / Completed**)  
- Search tasks by title  
- Pagination support  

### UI/UX
- Reusable components and clean code  
- Toast notifications for user feedback  
- Loading states with **Lottie animations**  
- Form validation with **React Hook Form and zod**  
- Clean and modern interface  

---

## 📁 Folder Structure
```
src/
├── assets/ # Static assets and Lottie files
├── components/
│ ├── common/ # Reusable components
│ ├── dashboard/ # Dashboard specific components
│ ├── feedback/ # Lottie handler and feedback UI
│ ├── forms/ # Form components
│ └── modals/ # Modal components
├── hooks/ # Custom React hooks
├── layouts/ # Layout components
├── pages/ # Page components
├── services/ # API service layer (Axios clients, interceptors, etc.)
├── store/ # Redux store configuration
├── styles/ # Global styles
├── utils/ # Utility functions (Axios error handler, helpers, etc.)
└── validations/ # Form validation schemas

```
## 🛠 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/muhmouddd21/FullStack_FrontEnd
   cd Dashboard_Quest

   npm install

   Start development server:
   npm run dev


   Authentication

Base URL: http://localhost:3000/v1/api

POST /auth/register → User registration

POST /auth/login → User login

POST /auth/logout → User logout

POST /auth/refresh → refreshes every 15min

Tasks

Base URL: http://localhost:3000/v1/api

GET /tasks → Get tasks list for a specific user

GET /tasks/:id → Get single todo for the current user only

POST /todos → Create new todo

PUT /todos/:id → Update todo

DELETE /todos/:id → Delete todo
import { useState } from 'react'
// import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from "./pages/SignUpPage";
import AddProblem from "./pages/AddProblem";
import ProblemPage from "./pages/ProblemPage";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore.js';
import AdminRoute from './layout/AdminRoute.jsx';

function App() {
  const authUser = true;

  // const {authUser, checkAuth, isCheckingAuth } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-start ">
      <Toaster />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        </Route>

        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />

        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />

        <Route path='/problem/:id' element={authUser ? <ProblemPage /> : <Navigate to={"/login"} />} />


        <Route element={<AdminRoute />}>
          <Route path='/add-problem' element={authUser ? <AddProblem /> : <Navigate to={"/"} />} />

        </Route>

      </Routes>
    </div>
  )
}

export default App

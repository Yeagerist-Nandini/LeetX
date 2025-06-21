import { useState } from 'react'
// import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from "./pages/SignUpPage";
import AddProblem from "./pages/AddProblem";
import ProblemPage from "./pages/ProblemPage";

function App() {
  const authUser = true;

  return (
    <div className="flex flex-col items-center justify-start ">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        </Route>

        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />

        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />

        <Route path='/problem/:id' element={authUser ? <ProblemPage /> : <Navigate to={"/login"} />} />

        <Route path='/add-problem' element={authUser ? <AddProblem /> : <Navigate to={"/login"} />} />

      </Routes>
    </div>
  )
}

export default App

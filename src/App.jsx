import { useAuthenticationStatus } from '@nhost/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'

function App() {
  const { isAuthenticated } = useAuthenticationStatus()

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />}
      />
      <Route
        path="/signin"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
      />
    </Routes>
  )
}

export default App

import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AppLayoutComponent from './components/appLayoutComponent'
import NewGamePage from './pages/newGamePage/newGamePage'
import LoginPage from './pages/loginPage/loginPage'
import { useAuth } from './hooks/useAuth'
import { Box, CircularProgress } from '@mui/material'

function App() {
    return (
        <Router>
            <AuthRoutes />
        </Router>
    )
}

function AuthRoutes() {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Routes>
            {user ? (
                <Route path="/" element={<AppLayoutComponent />}>
                    <Route index element={<NewGamePage />} />
                    <Route path="*" element={<div>This page does not exist</div>} />
                </Route>
            ) : (
                <Route path="/" element={<LoginPage />} />
            )}
        </Routes>
    )
}

export default App

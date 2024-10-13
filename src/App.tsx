import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'

import AppLayoutComponent from './components/appLayoutComponent'
import NewGamePage from './pages/newGamePage/newGamePage'
import LoginPage from './pages/loginPage/loginPage'
import { useAuthStore } from './hooks/useAuthStore'
import ErrorMessage from './components/errorMessage'
import PageLoader from './components/pageLoader'

function App() {
    return (
        <Router>
            <AuthRoutes />
        </Router>
    )
}

function AuthRoutes() {
    const { initializeAuth, user, loading, error } = useAuthStore()

    useEffect(() => {
        initializeAuth()
    }, [initializeAuth])

    if (error) {
        return <ErrorMessage message="There was a problem trying to authenticate you." />
    }

    if (loading) {
        return <PageLoader />
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

import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AppLayout from './components/appLayout'
import NewGamePage from './pages/newGamePage/newGamePage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<div>Home page</div>} />
                    <Route path="games" element={<NewGamePage />} />
                    <Route path="*" element={<div>This page does not exist</div>} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App

import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AppLayoutComponent from './components/appLayoutComponent'
import NewGamePage from './pages/newGamePage/newGamePage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppLayoutComponent />}>
                    <Route index element={<NewGamePage />} />
                    <Route path="*" element={<div>This page does not exist</div>} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App

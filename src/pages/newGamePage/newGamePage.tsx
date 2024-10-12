import React from 'react'
import NewGameComponent from './components/newGameComponent'
import { ActionCardSettingsProvider } from '../../contexts/ActionCardSettingsContext'

function NewGamePage() {
    return (
        <ActionCardSettingsProvider>
            <NewGameComponent />
        </ActionCardSettingsProvider>
    )
}

export default NewGamePage

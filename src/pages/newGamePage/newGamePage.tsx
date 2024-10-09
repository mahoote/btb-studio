import React from 'react'
import NewGameComponent from './components/newGameComponent'
import { ActionCardSettingsProvider } from '../../contexts/ActionCardSettingsContext'
import GameOptionsDataProvider from '../../contexts/GameOptionsDataContext'

function NewGamePage() {
    return (
        <GameOptionsDataProvider>
            <ActionCardSettingsProvider>
                <NewGameComponent />
            </ActionCardSettingsProvider>
        </GameOptionsDataProvider>
    )
}

export default NewGamePage

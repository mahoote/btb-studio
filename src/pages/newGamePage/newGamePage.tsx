import React from 'react'
import NewGameProvider from '../../contexts/NewGameContext'
import NewGameComponent from './components/newGameComponent'
import { ActionCardSettingsProvider } from '../../contexts/ActionCardStateContext'
import GameOptionsDataProvider from '../../contexts/GameOptionsDataContext'

function NewGamePage() {
    return (
        <NewGameProvider>
            <GameOptionsDataProvider>
                <ActionCardSettingsProvider>
                    <NewGameComponent />
                </ActionCardSettingsProvider>
            </GameOptionsDataProvider>
        </NewGameProvider>
    )
}

export default NewGamePage

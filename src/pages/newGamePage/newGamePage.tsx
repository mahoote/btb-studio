import React from 'react'
import { GameCategoryProvider } from '../../contexts/GameCategoryContext'
import { GameTypesProvider } from '../../contexts/GameTypeContext'
import { AccessoryProvider } from '../../contexts/AccessoryContext'
import NewGameProvider from '../../contexts/NewGameContext'
import NewGameComponent from './components/newGameComponent'
import { PlayerGroupTypeProvider } from '../../contexts/PlayerGroupTypeContext'
import { GameAudienceProvider } from '../../contexts/GameAudienceContext'
import { ActionCardSettingsProvider } from '../../contexts/ActionCardStateContext'

function NewGamePage() {
    return (
        <NewGameProvider>
            <GameCategoryProvider>
                <GameTypesProvider>
                    <PlayerGroupTypeProvider>
                        <AccessoryProvider>
                            <GameAudienceProvider>
                                <ActionCardSettingsProvider>
                                    <NewGameComponent />
                                </ActionCardSettingsProvider>
                            </GameAudienceProvider>
                        </AccessoryProvider>
                    </PlayerGroupTypeProvider>
                </GameTypesProvider>
            </GameCategoryProvider>
        </NewGameProvider>
    )
}

export default NewGamePage

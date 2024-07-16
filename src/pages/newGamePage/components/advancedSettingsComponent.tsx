import ActionCardSettingsComponent from './actionCardSettingsComponent'
import useNewGame from '../../../hooks/useNewGame'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { GameTypeEnum } from '../../../enums/gameTypeEnum'
import { ActionCardStateProvider } from '../../../contexts/ActionCardStateContext'

function AdvancedSettingsComponent() {
    const { selectedGameTypes, activeFormRef } = useNewGame()

    return (
        <Box component="form" ref={activeFormRef}>
            <Typography variant="h6" textAlign="center" mb={2}>
                More settings coming soon!
            </Typography>
            {selectedGameTypes.includes(GameTypeEnum.ActionCard) && (
                <ActionCardStateProvider>
                    <ActionCardSettingsComponent />
                </ActionCardStateProvider>
            )}
        </Box>
    )
}

export default AdvancedSettingsComponent

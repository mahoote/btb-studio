import ActionCardSettingsComponent from './actionCardSettingsComponent'
import useNewGame from '../../../hooks/useNewGame'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { GameTypeEnum } from '../../../enums/gameTypeEnum'

function AdvancedSettingsComponent() {
    const { selectedGameTypes } = useNewGame()

    return (
        <Box>
            <Typography variant="h6" textAlign="center" mb={2}>
                More settings coming soon!
            </Typography>
            {selectedGameTypes.includes(GameTypeEnum.ActionCard) && (
                <ActionCardSettingsComponent />
            )}
        </Box>
    )
}

export default AdvancedSettingsComponent

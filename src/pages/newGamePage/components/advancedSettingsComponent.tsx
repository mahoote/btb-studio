import ActionCardSettingsComponent from './actionCardSettingsComponent'
import useNewGame from '../../../hooks/useNewGame'
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { GameTypeEnum } from '../../../enums/gameTypeEnum'
import {
    initialActionCardInputs,
    initialActionCardSettingsData,
} from '../../../constants/actionCardSettingsData'
import WritingSettingsComponent from './writingSettingsComponent'
import { initialWritingSettingsData } from '../../../constants/writingSettingsData'

function AdvancedSettingsComponent() {
    const {
        selectedGameTypes,
        activeFormRef,
        actionCardInputs,
        setActionCardInputs,
        actionCardSettingsData,
        setActionCardSettingsData,
        writingSettingsData,
        setWritingSettingsData,
    } = useNewGame()

    const includesActionCard = selectedGameTypes.includes(GameTypeEnum.ActionCard)
    const includesWriting = selectedGameTypes.includes(GameTypeEnum.Writing)

    useEffect(() => {
        if (includesActionCard) {
            if (!actionCardInputs || !actionCardSettingsData) {
                setActionCardSettingsData(initialActionCardSettingsData)
                setActionCardInputs(initialActionCardInputs)
            }
        } else {
            setActionCardSettingsData(undefined)
            setActionCardInputs(undefined)
        }

        if (includesWriting) {
            if (!writingSettingsData) {
                setWritingSettingsData(initialWritingSettingsData)
            }
        } else {
            setWritingSettingsData(undefined)
        }
    }, [])

    return (
        <Box component="form" ref={activeFormRef}>
            {!includesActionCard && !includesWriting && (
                <Typography variant="h6" textAlign="center">
                    No advanced settings available
                </Typography>
            )}
            {includesActionCard && <ActionCardSettingsComponent />}
            {includesWriting && <WritingSettingsComponent />}
        </Box>
    )
}

export default AdvancedSettingsComponent

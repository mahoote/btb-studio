import ActionCardSettingsComponent from './actionCardSettingsComponent'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { GameTypeEnum } from '../../../enums/gameTypeEnum'
import {
    initialActionCardInputs,
    initialActionCardSettingsData,
} from '../../../constants/ACTION_CARD_SETTINGS_DATA'
import WritingSettingsComponent from './writingSettingsComponent'
import { initialWritingSettingsData } from '../../../constants/WRITING_SETTINGS_DATA'
import AdvancedDefaultSettingsComponent from './advancedDefaultSettingsComponent'
import { useNewGameStore } from '../../../hooks/useNewGameStore'

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
    } = useNewGameStore()

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
            <AdvancedDefaultSettingsComponent />
            {includesActionCard && <ActionCardSettingsComponent />}
            {includesWriting && <WritingSettingsComponent />}
        </Box>
    )
}

export default AdvancedSettingsComponent

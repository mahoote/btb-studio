import { Box, Grid, TextField, Tooltip } from '@mui/material'
import React from 'react'
import { handleTextChange } from '../../../utils/inputUtils'
import ErrorMessage from '../../../components/errorMessage'
import { useNewGameStore } from '../../../hooks/useNewGameStore'

function AdvancedDefaultSettingsComponent() {
    const { advancedSettingsData, setAdvancedSettingsData } = useNewGameStore()

    if (!advancedSettingsData) {
        return <ErrorMessage message="Could not load the Advanced Default settings" />
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Tooltip title="If the game requires a more custom description on how to end the game.">
                            <TextField
                                label="Custom 'How to End the Game' Sentence"
                                variant="outlined"
                                name="customEndGameSentence"
                                fullWidth
                                value={advancedSettingsData.customEndGameSentence}
                                onChange={event =>
                                    handleTextChange(
                                        event,
                                        advancedSettingsData,
                                        setAdvancedSettingsData
                                    )
                                }
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AdvancedDefaultSettingsComponent

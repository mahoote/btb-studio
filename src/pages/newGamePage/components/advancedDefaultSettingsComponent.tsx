import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Tooltip,
} from '@mui/material'
import React from 'react'
import { handleInputChange, handleTextChange } from '../../../utils/inputUtils'
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
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <FormControl>
                            <FormLabel id="advanced-settings-game-end-type-label">
                                Game End Type
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="advanced-settings-game-end-type-label"
                                name="gameEndType"
                                value={advancedSettingsData.gameEndType}
                                onChange={event =>
                                    handleInputChange(
                                        event,
                                        advancedSettingsData,
                                        setAdvancedSettingsData
                                    )
                                }
                            >
                                <Tooltip title="The game ends when a player choose to.">
                                    <FormControlLabel
                                        value="finish"
                                        control={<Radio />}
                                        label="Finish"
                                    />
                                </Tooltip>
                                <Tooltip title="Same as FINISH, but the player that chooses to end the game, get's a disadvantage">
                                    <FormControlLabel
                                        value="forfeit"
                                        control={<Radio />}
                                        label="Forfeit"
                                    />
                                </Tooltip>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AdvancedDefaultSettingsComponent

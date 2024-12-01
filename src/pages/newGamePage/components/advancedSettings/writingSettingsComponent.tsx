import { Box, Divider, Grid, TextField, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { handleNumberChange } from '../../../../utils/inputUtils'
import ErrorMessageComponent from '../../../../components/errorMessageComponent'
import { useNewGameStore } from '../../../../hooks/useNewGameStore'

function WritingSettingsComponent() {
    const { writingSettingsData, setWritingSettingsData } = useNewGameStore()

    if (!writingSettingsData) {
        return (
            <>
                <Box my={3}>
                    <Divider />
                </Box>
                <ErrorMessageComponent message="Could not load the Writing settings" />
            </>
        )
    }

    return (
        <>
            <Box my={3}>
                <Divider />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">Writing Settings</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Tooltip title={'The amount of times each player can write per game.'}>
                            <TextField
                                label="Max Writes per Player"
                                variant="filled"
                                name="writesAmount"
                                type="number"
                                inputProps={{ min: 0 }}
                                fullWidth
                                value={writingSettingsData.writesAmount}
                                onChange={event =>
                                    handleNumberChange(
                                        event,
                                        writingSettingsData,
                                        setWritingSettingsData
                                    )
                                }
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Tooltip
                            title={
                                'Specify the maximum time, in seconds, that each player has for each writing attempt.'
                            }
                        >
                            <TextField
                                label="Write Time (Seconds)"
                                variant="filled"
                                name="writeSeconds"
                                type="number"
                                fullWidth
                                value={writingSettingsData.writeSeconds}
                                onChange={event =>
                                    handleNumberChange(
                                        event,
                                        writingSettingsData,
                                        setWritingSettingsData
                                    )
                                }
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default WritingSettingsComponent

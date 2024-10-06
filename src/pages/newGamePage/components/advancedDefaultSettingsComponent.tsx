import { Box, Grid, TextField, Tooltip } from '@mui/material'
import React from 'react'

function AdvancedDefaultSettingsComponent() {
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Tooltip title="If the game requires a more custom description on how to end the game.">
                            <TextField
                                label="Custom 'How to End the Game' Sentence"
                                variant="outlined"
                                name="custom-end-game-sentence"
                                fullWidth
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AdvancedDefaultSettingsComponent

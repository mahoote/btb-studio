import React from 'react'
import { Box, Grid, TextField } from '@mui/material'
import { useNewGameStore } from '../../../hooks/useNewGameStore'

const TranslationsFormComponent = () => {
    const { newGame, activeFormRef } = useNewGameStore()

    const languages = ['Norwegian', 'French', 'Spanish']

    return (
        <Box>
            <Box component="p" color="darkgray" textAlign="center">
                This subpage allows you to provide translations for the text fields you have
                filled out in the previous steps of the form.
                <br />
                Ensuring accurate translations helps make the game accessible and enjoyable for
                users in different languages.
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} ref={activeFormRef}>
                <p>
                    <b>NAME:</b> {newGame.name}
                </p>
                {languages.map(language => (
                    <Grid container component="form">
                        <Grid item xs={12} sm={2}>
                            <p>{language}</p>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                label="Name"
                                variant="filled"
                                name="name"
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </Box>
    )
}

export default TranslationsFormComponent

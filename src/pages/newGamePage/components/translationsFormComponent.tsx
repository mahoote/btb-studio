import React from 'react'
import { Box, TextField } from '@mui/material'
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
            <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                ref={activeFormRef}
                component="form"
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div>
                        <b>NAME:</b> {newGame.name}
                    </div>
                    {languages.map(language => (
                        <TextField
                            label={language}
                            variant="filled"
                            name={`${language}-name`}
                            required
                            fullWidth
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default TranslationsFormComponent

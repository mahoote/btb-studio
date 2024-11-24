import React from 'react'
import { Box, Divider, TextField } from '@mui/material'
import { useNewGameStore } from '../../../hooks/useNewGameStore'
import { actionCardSuggestions } from '../../../constants/WORD_SUGGESTION_DATA'
import TextFieldSuggestionsComponent from '../../../components/textFieldSuggestionsComponent'

const TranslationsFormComponent = () => {
    const { newGame, activeFormRef } = useNewGameStore()

    const languages = ['Norwegian', 'German']

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
                        <h3>Name</h3>
                        <div>{newGame.name}</div>
                    </div>
                    {languages.map(language => (
                        <TextField
                            label={language}
                            variant="filled"
                            name={`${language}Name`}
                            required
                            fullWidth
                        />
                    ))}
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div>
                        <h3>Intro Description</h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: newGame.introDescription?.replace(/\n/g, '<br>') ?? '',
                            }}
                        />
                    </div>
                    {languages.map(language => (
                        <TextFieldSuggestionsComponent
                            wordSuggestions={actionCardSuggestions}
                            label={language}
                            name={`${language}IntroDescription`}
                            variant="filled"
                            multiline
                            required
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default TranslationsFormComponent

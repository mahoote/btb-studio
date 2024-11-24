import React from 'react'
import { Box, Divider, TextField } from '@mui/material'
import { useNewGameStore } from '../../../hooks/useNewGameStore'
import { actionCardSuggestions } from '../../../constants/WORD_SUGGESTION_DATA'
import TextFieldSuggestionsComponent from '../../../components/textFieldSuggestionsComponent'
import MultilineComponent from '../../../components/multilineComponent'
import TranslateDescriptionsComponent from './translateDescriptionsComponent'

const TranslationsFormComponent = () => {
    const { newGame, advancedSettingsData, activeFormRef } = useNewGameStore()

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
                component="form"
                ref={activeFormRef}
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

                {newGame.introDescription && (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <div>
                                <h3>Intro Description</h3>
                                <MultilineComponent text={newGame.introDescription} />
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
                        <Divider />
                    </>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <h3>Description</h3>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {languages.map(language => (
                            <>
                                <Box fontSize={18} color="darkgray">
                                    {language} *
                                </Box>
                                <TranslateDescriptionsComponent
                                    descriptions={newGame.descriptions}
                                />
                            </>
                        ))}
                    </Box>
                </Box>
                <Divider />

                {advancedSettingsData.customEndGameSentence && (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <div>
                                <h3>Custom 'How to End the Game' Sentence</h3>
                                <MultilineComponent
                                    text={advancedSettingsData.customEndGameSentence}
                                />
                            </div>
                            {languages.map(language => (
                                <TextField
                                    label={language}
                                    variant="filled"
                                    name={`${language}CustomEndGameSentence`}
                                    fullWidth
                                    multiline
                                    required
                                />
                            ))}
                        </Box>
                        <Divider />
                    </>
                )}
            </Box>
        </Box>
    )
}

export default TranslationsFormComponent

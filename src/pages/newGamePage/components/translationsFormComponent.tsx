import React from 'react'
import { Box, Divider, Grid, TextField, Typography } from '@mui/material'
import { useNewGameStore } from '../../../hooks/useNewGameStore'
import { actionCardSuggestions } from '../../../constants/WORD_SUGGESTION_DATA'
import TextFieldSuggestionsComponent from '../../../components/textFieldSuggestionsComponent'
import MultilineComponent from '../../../components/multilineComponent'
import TranslateDescriptionsComponent from './translateDescriptionsComponent'

const TranslationsFormComponent = () => {
    const {
        newGame,
        advancedSettingsData,
        actionCardSettingsData,
        actionCardInputs,
        activeFormRef,
    } = useNewGameStore()

    const languages = ['Norwegian', 'German', 'Spanish']

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
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
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
                    </Grid>

                    {newGame.introDescription && (
                        <Grid item xs={12} md={6}>
                            {/* The divider beneath the name input. */}
                            <Box sx={{ display: { md: 'none' } }}>
                                <Divider />
                            </Box>

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
                        </Grid>
                    )}
                </Grid>

                <Divider />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <h3>Description</h3>
                    <Grid container spacing={2}>
                        {languages.map(language => (
                            <Grid item xs={12} md={6}>
                                <Typography fontSize={18} color="darkgray" mb={2}>
                                    {language} *
                                </Typography>
                                <TranslateDescriptionsComponent
                                    values={newGame.descriptions}
                                    minRows={4}
                                    minHeight="13rem"
                                />
                            </Grid>
                        ))}
                    </Grid>
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

                {actionCardSettingsData && (
                    <Typography variant="h6">Action Card Settings</Typography>
                )}

                {actionCardSettingsData?.prompt && (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <div>
                                <h3>Prompt</h3>
                                <MultilineComponent text={actionCardSettingsData.prompt} />
                            </div>
                            {languages.map(language => (
                                <TextFieldSuggestionsComponent
                                    wordSuggestions={actionCardSuggestions}
                                    label={language}
                                    variant="filled"
                                    name={`${language}Prompt`}
                                    fullWidth
                                    required
                                />
                            ))}
                        </Box>
                        <Divider />
                    </>
                )}

                {actionCardInputs && (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <h3>Action Cards</h3>
                            <Grid container spacing={2}>
                                {languages.map(language => (
                                    <Grid item xs={12} sm={6}>
                                        <Typography fontSize={18} color="darkgray" mb={2}>
                                            {language} *
                                        </Typography>
                                        <TranslateDescriptionsComponent
                                            values={actionCardInputs}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider />
                    </>
                )}
            </Box>
        </Box>
    )
}

export default TranslationsFormComponent

import React from 'react'
import { Box, Divider, Grid, TextField, Typography } from '@mui/material'
import { useNewGameStore } from '../../../hooks/useNewGameStore'
import { actionCardSuggestions } from '../../../constants/WORD_SUGGESTION_DATA'
import TextFieldSuggestionsComponent from '../../../components/textFieldSuggestionsComponent'
import MultilineComponent from '../../../components/multilineComponent'
import TranslateStringArrayComponent from './translateDescriptionsComponent'

const TranslationsFormComponent = () => {
    const {
        newGame,
        advancedSettingsData,
        actionCardSettingsData,
        actionCardInputs,
        activeFormRef,
        newGameTranslations,
        setNewGameTranslations,
    } = useNewGameStore()

    const languages = ['Norwegian']

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
                                    value={newGameTranslations[language]?.name}
                                    onChange={event =>
                                        setNewGameTranslations({
                                            ...newGameTranslations,
                                            [language]: {
                                                ...newGameTranslations[language],
                                                name: event.target.value,
                                            },
                                        })
                                    }
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
                                        fullWidth
                                        value={newGameTranslations[language]?.introDescription}
                                        onChange={event =>
                                            setNewGameTranslations({
                                                ...newGameTranslations,
                                                [language]: {
                                                    ...newGameTranslations[language],
                                                    introDescription: event.target.value,
                                                },
                                            })
                                        }
                                    />
                                ))}
                            </Box>
                        </Grid>
                    )}
                </Grid>

                <Divider />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <h3>Description</h3>
                    {languages.map(language => (
                        <>
                            <Typography fontSize={18} color="darkgray">
                                {language} *
                            </Typography>
                            <TranslateStringArrayComponent
                                values={newGame.descriptions}
                                minRows={4}
                                minHeight="13rem"
                                gridXs={12}
                                gridMd={6}
                                inputValues={newGameTranslations[language]?.descriptions}
                                setInputValues={values =>
                                    setNewGameTranslations({
                                        ...newGameTranslations,
                                        [language]: {
                                            ...newGameTranslations[language],
                                            descriptions: values,
                                        },
                                    })
                                }
                            />
                        </>
                    ))}
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
                                    value={
                                        newGameTranslations[language]?.customEndGameSentence
                                    }
                                    onChange={event =>
                                        setNewGameTranslations({
                                            ...newGameTranslations,
                                            [language]: {
                                                ...newGameTranslations[language],
                                                customEndGameSentence: event.target.value,
                                            },
                                        })
                                    }
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
                                    value={newGameTranslations[language]?.prompt}
                                    onChange={event =>
                                        setNewGameTranslations({
                                            ...newGameTranslations,
                                            [language]: {
                                                ...newGameTranslations[language],
                                                prompt: event.target.value,
                                            },
                                        })
                                    }
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
                            {languages.map(language => (
                                <>
                                    <Typography fontSize={18} color="darkgray" mb={2}>
                                        {language} *
                                    </Typography>
                                    <TranslateStringArrayComponent
                                        values={actionCardInputs}
                                        gridXs={12}
                                        gridSm={6}
                                        inputValues={
                                            newGameTranslations[language]?.actionCardInputs
                                        }
                                        setInputValues={values =>
                                            setNewGameTranslations({
                                                ...newGameTranslations,
                                                [language]: {
                                                    ...newGameTranslations[language],
                                                    actionCardInputs: values,
                                                },
                                            })
                                        }
                                    />
                                </>
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

import React, { useEffect } from 'react'
import {
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import { handleNumberChange, handleSelectChange } from '../../../../utils/inputUtils'
import MultiInputComponent from '../../../../components/multiInput/multiInputComponent'
import { isCardInputMultiline } from '../../../../utils/actionCardSettingsUtils'
import TextFieldSuggestionsComponent from '../../../../components/textFieldSuggestionsComponent'
import { actionCardSuggestions } from '../../../../constants/WORD_SUGGESTION_DATA'
import { actionCardContentTypes } from '../../../../constants/ACTION_CARD_SETTINGS_DATA'
import ErrorMessageComponent from '../../../../components/errorMessageComponent'
import PageLoaderComponent from '../../../../components/pageLoaderComponent'
import { useNewGameStore } from '../../../../hooks/useNewGameStore'
import { useActionCardStore } from '../../../../hooks/useActionCardStore'

/**
 * All the different settings to add to a game with "Action Card" game type.
 * @constructor
 */
function ActionCardSettingsComponent() {
    const {
        actionCardSettingsData,
        setActionCardSettingsData,
        actionCardInputs,
        setActionCardInputs,
    } = useNewGameStore()

    const { actionCardStates, loading, error, fetchApi } = useActionCardStore()

    useEffect(() => {
        fetchApi()
    }, [fetchApi])

    if (!actionCardInputs || !actionCardSettingsData) {
        return (
            <>
                <Box my={3}>
                    <Divider />
                </Box>
                <ErrorMessageComponent message="Could not load the Action Card settings" />
            </>
        )
    }

    if (error) {
        return (
            <ErrorMessageComponent message="There was a problem loading Action Card data from the database" />
        )
    }

    if (loading) return <PageLoaderComponent />

    return (
        <>
            <Box my={3}>
                <Divider />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">Action Card Settings</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="state">State</InputLabel>
                            <Select
                                variant="filled"
                                labelId="state-id"
                                label="State"
                                name="stateId"
                                value={actionCardSettingsData.stateId}
                                onChange={event =>
                                    handleSelectChange(
                                        event,
                                        actionCardSettingsData,
                                        setActionCardSettingsData
                                    )
                                }
                            >
                                {actionCardStates?.map(state => (
                                    <MenuItem key={state.id} value={state.id}>
                                        {state.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="state">Content Type</InputLabel>
                            <Select
                                variant="filled"
                                labelId="content-id"
                                label="Content Type"
                                name="contentId"
                                value={actionCardSettingsData.contentId}
                                onChange={event =>
                                    handleSelectChange(
                                        event,
                                        actionCardSettingsData,
                                        setActionCardSettingsData
                                    )
                                }
                            >
                                {actionCardContentTypes.map(type => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Tooltip
                            title={
                                'How many cards there is in a game. Will end the game after the last card.'
                            }
                        >
                            <TextField
                                label="Card Limit"
                                variant="outlined"
                                name="cardLimit"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={actionCardSettingsData.cardLimit}
                                onChange={event =>
                                    handleNumberChange(
                                        event,
                                        actionCardSettingsData,
                                        setActionCardSettingsData
                                    )
                                }
                                fullWidth
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Tooltip title={'How long each card is displayed.'}>
                            <TextField
                                label="Card Time (Seconds)"
                                variant="outlined"
                                name="cardSeconds"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={actionCardSettingsData.cardSeconds}
                                onChange={event =>
                                    handleNumberChange(
                                        event,
                                        actionCardSettingsData,
                                        setActionCardSettingsData
                                    )
                                }
                                fullWidth
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" justifyContent="space-evenly" flexWrap="wrap">
                            <Tooltip
                                title={
                                    'If the "Card Seconds" is set, the Auto-next decides if there is a manual step between each card or if they should show the next card automatically.'
                                }
                            >
                                <FormControlLabel
                                    disabled={(actionCardSettingsData?.cardSeconds ?? 0) <= 0}
                                    control={
                                        <Switch
                                            defaultChecked={actionCardSettingsData.isAutoNext}
                                            onChange={event => {
                                                setActionCardSettingsData({
                                                    ...actionCardSettingsData,
                                                    isAutoNext: event.target.checked,
                                                })
                                            }}
                                        />
                                    }
                                    label="Auto-next"
                                    labelPlacement="top"
                                />
                            </Tooltip>
                            <Tooltip
                                title={
                                    'If one player gets the cards, all other players will be given a buzzer for the game.'
                                }
                            >
                                <FormControlLabel
                                    disabled={actionCardSettingsData.stateId !== 5}
                                    control={
                                        <Switch
                                            defaultChecked={actionCardSettingsData.hasBuzzer}
                                            onChange={event => {
                                                setActionCardSettingsData({
                                                    ...actionCardSettingsData,
                                                    hasBuzzer: event.target.checked,
                                                })
                                            }}
                                        />
                                    }
                                    label="Buzzer"
                                    labelPlacement="top"
                                />
                            </Tooltip>
                            <Tooltip
                                title={
                                    'If the players will be creative and make their own cards.'
                                }
                            >
                                <FormControlLabel
                                    control={
                                        <Switch
                                            defaultChecked={
                                                actionCardSettingsData.isPlayerCreative
                                            }
                                            onChange={event => {
                                                setActionCardSettingsData({
                                                    ...actionCardSettingsData,
                                                    isPlayerCreative: event.target.checked,
                                                })
                                            }}
                                        />
                                    }
                                    label="Player Creative"
                                    labelPlacement="top"
                                />
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Tooltip
                            title={
                                'The common prompt at the beginning of the card. Can be used to give a hint, a question or a statement.'
                            }
                        >
                            <TextFieldSuggestionsComponent
                                wordSuggestions={actionCardSuggestions}
                                label="Action Card Prompt"
                                variant="outlined"
                                name="prompt"
                                fullWidth
                                value={actionCardSettingsData.prompt}
                                setValue={newValue =>
                                    setActionCardSettingsData({
                                        ...actionCardSettingsData,
                                        prompt: newValue,
                                    })
                                }
                            />
                        </Tooltip>
                    </Grid>
                    {actionCardSettingsData.isPlayerCreative && (
                        <Grid item xs={12} sm={6}>
                            <Tooltip
                                title={
                                    'This prompt will show between games if the players have checked "Player Creativity". They will write sentences or words based on this prompt.'
                                }
                            >
                                <TextFieldSuggestionsComponent
                                    wordSuggestions={actionCardSuggestions}
                                    label="Player Creative Prompt"
                                    variant="filled"
                                    name="playerCreativePrompt"
                                    multiline
                                    fullWidth
                                    required
                                    value={actionCardSettingsData.playerCreativePrompt}
                                    setValue={newValue =>
                                        setActionCardSettingsData({
                                            ...actionCardSettingsData,
                                            playerCreativePrompt: newValue,
                                        })
                                    }
                                />
                            </Tooltip>
                        </Grid>
                    )}
                </Grid>
                <Typography>Cards</Typography>
                <MultiInputComponent
                    wordSuggestions={actionCardSuggestions}
                    isMultiline={isCardInputMultiline(actionCardSettingsData.contentId, [2])}
                    inputs={actionCardInputs}
                    setInputs={setActionCardInputs}
                    variant="filled"
                />
            </Box>
        </>
    )
}

export default ActionCardSettingsComponent

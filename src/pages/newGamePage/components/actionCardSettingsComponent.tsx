import React from 'react'
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
import { handleNumberChange, handleSelectChange } from '../../../utils/inputUtils'
import MultiInputComponent from '../../../components/multiInput/multiInputComponent'
import useNewGame from '../../../hooks/useNewGame'
import { isCardInputMultiline } from '../../../utils/actionCardSettingsUtils'
import TextFieldSuggestionsComponent from '../../../components/textFieldSuggestionsComponent'
import { actionCardSuggestions } from '../../../constants/WORD_SUGGESTION_DATA'
import { useActionCardSettings } from '../../../hooks/useActionCardSettings'
import { actionCardContentTypes } from '../../../constants/ACTION_CARD_SETTINGS_DATA'
import ErrorMessage from '../../../components/errorMessage'
import PageLoader from '../../../components/pageLoader'

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
    } = useNewGame()

    const {
        data: actionCardStates,
        loading: acsLoading,
        error: acsError,
    } = useActionCardSettings()

    if (!actionCardInputs || !actionCardSettingsData) {
        return (
            <>
                <Box my={3}>
                    <Divider />
                </Box>
                <ErrorMessage message="Could not load the Action Card settings" />
            </>
        )
    }

    if (acsError) {
        return (
            <ErrorMessage message="There was a problem loading Action Card data from the database" />
        )
    }

    if (acsLoading) return <PageLoader />

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
                                            onChange={event => {
                                                setActionCardSettingsData({
                                                    ...actionCardSettingsData,
                                                    autoNext: event.target.checked,
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
                                    'If the players will be creative and make their own cards.'
                                }
                            >
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={event => {
                                                setActionCardSettingsData({
                                                    ...actionCardSettingsData,
                                                    playerCreative: event.target.checked,
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
                                label="Prompt"
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

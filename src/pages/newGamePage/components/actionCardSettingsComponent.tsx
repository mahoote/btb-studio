import React from 'react'
import {
    Box,
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
import MultiInputComponent from '../../../components/multiInputComponent'
import useNewGame from '../../../hooks/useNewGame'
import { isCardInputMultiline } from '../../../utils/actionCardSettingsUtils'
import { ActionCardSuggestionEnum } from '../../../enums/wordSuggestionEnum'

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

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Action Card Settings</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="state">State</InputLabel>
                        <Select
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
                            <MenuItem value={0}>All get the same cards</MenuItem>
                            <MenuItem value={1}>All get different cards</MenuItem>
                            <MenuItem value={2}>Some get different cards</MenuItem>
                            <MenuItem value={3}>Random player get card (Repeating)</MenuItem>
                            <MenuItem value={4}>One gets cards</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="state">Content Type</InputLabel>
                        <Select
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
                            <MenuItem value={0}>Random Words</MenuItem>
                            <MenuItem value={1}>Random Objects</MenuItem>
                            <MenuItem value={2}>Sentences</MenuItem>
                            <MenuItem value={3}>Player Questions</MenuItem>
                            <MenuItem value={4}>Tasks</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
                    <Tooltip title={'How long each card is displayed.'}>
                        <TextField
                            label="Card Seconds"
                            variant="outlined"
                            name="cardSeconds"
                            type="number"
                            inputProps={{ min: 5 }}
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
                <Grid item xs={12} sm={4}>
                    <Box display="flex" justifyContent="space-evenly" flexWrap="wrap">
                        <Tooltip
                            title={
                                'If the "Card Seconds" is set, the Auto-next decides if there is a manual step between each card or if they should show the next card automatically.'
                            }
                        >
                            <FormControlLabel
                                disabled={(actionCardSettingsData?.cardSeconds ?? 0) <= 0}
                                control={<Switch />}
                                label="Auto-next"
                                labelPlacement="top"
                            />
                        </Tooltip>
                        <Tooltip
                            title={'If the players will be creative and make their own cards.'}
                        >
                            <FormControlLabel
                                control={<Switch />}
                                label="Player Creative"
                                labelPlacement="top"
                            />
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
            <Typography>Cards</Typography>
            <MultiInputComponent
                wordSuggestions={[
                    {
                        values: Object.values(ActionCardSuggestionEnum),
                        key: '$',
                    },
                ]}
                isMultiline={isCardInputMultiline(actionCardSettingsData.contentId, [2, 3, 4])}
                inputs={actionCardInputs}
                setInputs={setActionCardInputs}
            />
        </Box>
    )
}

export default ActionCardSettingsComponent

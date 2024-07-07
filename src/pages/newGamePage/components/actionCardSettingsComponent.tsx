import React, { useState } from 'react'
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
} from '@mui/material'
import { handleNumberChange, handleSelectChange } from '../../../utils/inputUtils'
import { ActionCardSettingsData } from '../../../types/formData'

function ActionCardSettingsComponent() {
    const [formData, setFormData] = useState<ActionCardSettingsData>({
        stateId: 0,
        contentId: 0,
    })

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="state">State</InputLabel>
                        <Select
                            labelId="state"
                            label="State"
                            name="state"
                            value={formData.stateId}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
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
                            labelId="content-type"
                            label="Content Type"
                            name="contentType"
                            value={formData.contentId}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                        >
                            <MenuItem value={0}>Random Words</MenuItem>
                            <MenuItem value={1}>Random Objects</MenuItem>
                            <MenuItem value={2}>Sentences</MenuItem>
                            <MenuItem value={3}>Player Questions</MenuItem>
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
                            value={formData.cardLimit}
                            onChange={event =>
                                handleNumberChange(event, formData, setFormData)
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
                            value={formData.cardSeconds}
                            onChange={event =>
                                handleNumberChange(event, formData, setFormData)
                            }
                            fullWidth
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Tooltip
                        title={
                            'If the "Card Seconds" is set, the Auto-next decides if there is a manual step between each card or if they should show the next card automatically.'
                        }
                    >
                        <FormControlLabel
                            disabled={(formData?.cardSeconds ?? 0) <= 0}
                            control={<Switch />}
                            label="Auto-next"
                            labelPlacement="top"
                        />
                    </Tooltip>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ActionCardSettingsComponent

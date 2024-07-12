import React from 'react'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { GameCategory } from '../../../types/gameCategory'
import {
    handleNumberChange,
    handleSelectChange,
    handleTextChange,
} from '../../../utils/inputUtils'
import { NewGameFormData } from '../../../types/formData'
import ChipsAutocompleteComponent from '../../../components/chipsAutocompleteComponent'
import { useGameCategories } from '../../../hooks/useGameCategories'
import { useGameTypes } from '../../../hooks/useGameTypes'
import { useAccessories } from '../../../hooks/useAccessories'
import useNewGame from '../../../hooks/useNewGame'
import { getGameTypeCombinations } from '../../../utils/gameTypeUtils'
import TextFieldSuggestionsComponent from '../../../components/textFieldSuggestionsComponent'
import { actionCardSuggestions } from '../../../utils/suggestionUtils'

type NewGameFormProps = {
    formData: NewGameFormData
    setFormData: React.Dispatch<React.SetStateAction<NewGameFormData>>
}

function NewGameFormComponent({ formData, setFormData }: NewGameFormProps) {
    const {
        selectedAccessories,
        setSelectedAccessories,
        selectedGameTypes,
        setSelectedGameTypes,
    } = useNewGame()

    const { data: categories } = useGameCategories()
    const { data: gameTypes } = useGameTypes()
    const { data: accessories } = useAccessories()

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={event => handleTextChange(event, formData, setFormData)}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            label="Category"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                            required
                        >
                            {categories?.map((category: GameCategory) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <TextFieldSuggestionsComponent
                wordSuggestions={actionCardSuggestions}
                label="Intro Description"
                variant="outlined"
                name="introDescription"
                value={formData.introDescription}
                setValue={newValue =>
                    setFormData({
                        ...formData,
                        introDescription: newValue,
                    })
                }
                multiline
            />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Minimum Players"
                        variant="outlined"
                        name="minPlayers"
                        type="number"
                        inputProps={{ min: 2 }}
                        value={formData.minPlayers}
                        onChange={event => handleNumberChange(event, formData, setFormData)}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Maximum Players"
                        variant="outlined"
                        name="maxPlayers"
                        type="number"
                        inputProps={{ min: 0 }}
                        value={formData.maxPlayers}
                        onChange={event => handleNumberChange(event, formData, setFormData)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Minutes"
                        variant="outlined"
                        name="minutes"
                        type="number"
                        inputProps={{ min: 0 }}
                        value={formData.minutes}
                        onChange={event => handleNumberChange(event, formData, setFormData)}
                        fullWidth
                        required
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="activity-label">Activity Level</InputLabel>
                        <Select
                            labelId="activity-label"
                            label="Activity Level"
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                        >
                            <MenuItem value={0}>Low</MenuItem>
                            <MenuItem value={1}>Medium</MenuItem>
                            <MenuItem value={2}>High</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="drunk-label">Drunk Level</InputLabel>
                        <Select
                            labelId="drunk-label"
                            label="Drunk Level"
                            name="drunkLevel"
                            value={formData.drunkLevel}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                        >
                            <MenuItem value={0}>Tipsy</MenuItem>
                            <MenuItem value={1}>Drunk</MenuItem>
                            <MenuItem value={2}>Wasted</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="player-group-type-label">Player Group Type</InputLabel>
                        <Select
                            labelId="player-group-type-label"
                            label="Player Group Type"
                            name="playerGroupTypeId"
                            value={formData.playerGroupTypeId}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                        >
                            <MenuItem value={0}>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Even</MenuItem>
                            <MenuItem value={2}>Odd</MenuItem>
                            <MenuItem value={3}>Pairs</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="game-audience-label">Game Audience</InputLabel>
                        <Select
                            labelId="game-audience-label"
                            label="Game Audience"
                            name="gameAudienceId"
                            value={formData.gameAudienceId}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                        >
                            <MenuItem value={0}>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Friends</MenuItem>
                            <MenuItem value={2}>Strangers</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <ChipsAutocompleteComponent
                predefinedValues={gameTypes?.map(gameType => gameType.name) ?? []}
                selectedValues={selectedGameTypes}
                setSelectedValues={setSelectedGameTypes}
                label="Game Types"
                required={true}
                optionCombinations={getGameTypeCombinations()}
            />
            <ChipsAutocompleteComponent
                predefinedValues={accessories?.map(accessory => accessory.name) ?? []}
                selectedValues={selectedAccessories}
                setSelectedValues={setSelectedAccessories}
                label="Accessories"
            />
        </Box>
    )
}

export default NewGameFormComponent

import React, { FormEvent, useEffect, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { getGameCategories } from '../../../services/gameCategoryService'
import { GameCategory } from '../../../types/gameCategory'
import {
    handleNumberChange,
    handleSelectChange,
    handleTextChange,
} from '../../../utils/inputUtils'
import { NewGameFormData } from '../../../types/formData'
import { GameType } from '../../../types/gameType'
import { getGameTypes } from '../../../services/gameTypeService'

function NewGameForm() {
    const [formData, setFormData] = useState<NewGameFormData>({
        name: '',
        category: 1,
        introDescription: '',
        minPlayers: 2,
        maxPlayers: 0,
        activity: 0,
        minutes: 0,
        gameType: 1,
        playerGroupType: 0,
        gameAudience: 0,
        drunk: 0,
    })

    const [categories, setCategories] = useState<GameCategory[]>([])
    const [gameTypes, setGameTypes] = useState<GameType[]>([])

    useEffect(() => {
        const initSelects = async () => {
            setCategories(await getGameCategories())
            setGameTypes(await getGameTypes())
        }

        initSelects().catch(error => {
            console.error('Error fetching game categories:', error)
        })
    }, [])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Handle form submission logic here
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={event => handleTextChange(event, formData, setFormData)}
                required
            />
            <TextField
                label="Intro Description"
                variant="outlined"
                name="introDescription"
                value={formData.introDescription}
                onChange={event => handleTextChange(event, formData, setFormData)}
                multiline
                required
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
                            name="activity"
                            value={formData.activity}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                            required
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
                            name="drunk"
                            value={formData.drunk}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                            required
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
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                            required
                        >
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="game-type-label">Game Type</InputLabel>
                        <Select
                            labelId="game-type-label"
                            label="Game Type"
                            name="gameType"
                            value={formData.gameType}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                            required
                        >
                            {gameTypes.map(gameType => (
                                <MenuItem key={gameType.id} value={gameType.id}>
                                    {gameType.name}
                                </MenuItem>
                            ))}
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
                            name="playerGroupType"
                            value={formData.playerGroupType}
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
                            name="gameAudience"
                            value={formData.gameAudience}
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

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    )
}

export default NewGameForm

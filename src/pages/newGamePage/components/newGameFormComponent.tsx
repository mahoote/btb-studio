import React, { FormEvent, useState } from 'react'
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
} from '@mui/material'
import { GameCategory } from '../../../types/gameCategory'
import {
    handleNumberChange,
    handleSelectChange,
    handleTextChange,
} from '../../../utils/inputUtils'
import { NewGameFormData } from '../../../types/formData'
import { GameType } from '../../../types/gameType'
import { createGame, createGameHasAccessory } from '../../../services/gameService'
import { GameDto } from '../../../types/game'
import { LoadingButton } from '@mui/lab'
import ChipsAutocompleteComponent from '../../../components/chipsAutocompleteComponent'
import { useGameCategories } from '../../../hooks/useGameCategories'
import { useGameTypes } from '../../../hooks/useGameTypes'
import { useAccessories } from '../../../hooks/useAccessories'

type NewGameFormProps = {
    formData: NewGameFormData
    setFormData: React.Dispatch<React.SetStateAction<NewGameFormData>>
}

function NewGameFormComponent({ formData, setFormData }: NewGameFormProps) {
    const { data: categories } = useGameCategories()
    const { data: gameTypes } = useGameTypes()
    const { data: accessories } = useAccessories()

    const [createdGame, setCreatedGame] = useState<GameDto | undefined>({} as GameDto)
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false)
    const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setCreatedGame(undefined)

        const updatedDescriptions = formData.descriptions.filter(
            description => description !== ''
        )

        if (updatedDescriptions.length === 0) {
            alert('Please add at least one description')
            return
        }

        formData.descriptions = updatedDescriptions

        const newGame = await createGame({
            name: formData.name,
            intro_description: formData.introDescription,
            descriptions: formData.descriptions,
            min_players: formData.minPlayers,
            max_players: formData.maxPlayers,
            activity_level: formData.activityLevel,
            drunk_level: formData.drunkLevel,
            minutes: formData.minutes,
            game_type_id: formData.gameTypeId,
            player_group_type_id: formData.playerGroupTypeId,
            game_audience_id: formData.gameAudienceId,
            game_category_id: formData.categoryId,
        })
            .then((response: GameDto | null) => {
                setOpenSnackbar(true)
                if (!response) {
                    console.error('Could not fetch game from database.')
                    return
                }
                setCreatedGame(response)
                return response
            })
            .catch(error => {
                console.error('Error creating game:', error)
                alert('Error creating game')
                setCreatedGame({} as GameDto)
            })

        if (newGame) {
            let hasError = false

            for (const accessory of selectedAccessories) {
                const accessoryId =
                    accessories?.find(accessoryItem => accessoryItem.name === accessory)?.id ??
                    0

                await createGameHasAccessory(newGame.id, accessoryId).catch(error => {
                    console.error('Error adding accessory to game:', error)
                    hasError = true
                })
            }
            if (hasError) alert('Error adding accessory to game')
        }
    }

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleSubmit(event).catch(error => {
            console.error('Error submitting form:', error)
        })
    }

    return (
        <Box
            component="form"
            onSubmit={handleFormSubmit}
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
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="game-type-label">Game Type</InputLabel>
                        <Select
                            labelId="game-type-label"
                            label="Game Type"
                            name="gameTypeId"
                            value={formData.gameTypeId}
                            onChange={event =>
                                handleSelectChange(event, formData, setFormData)
                            }
                            required
                        >
                            {gameTypes?.map((gameType: GameType) => (
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
                predefinedValues={accessories?.map(accessory => accessory.name) ?? []}
                selectedValues={selectedAccessories}
                setSelectedValues={setSelectedAccessories}
                label="Accessories"
            />

            <LoadingButton
                loading={!createdGame}
                type="submit"
                variant="contained"
                color="primary"
            >
                Submit
            </LoadingButton>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                message={`${createdGame?.name} is created!`}
            />
        </Box>
    )
}

export default NewGameFormComponent

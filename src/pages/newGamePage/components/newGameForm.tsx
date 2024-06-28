import React, { ChangeEvent, FormEvent, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'

function NewGameForm() {
    const [formData, setFormData] = useState({
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

    const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        const numericValue = value === '' ? '' : Number(value)
        setFormData({
            ...formData,
            [name]: numericValue,
        })
    }

    const handleSelectChange = (event: SelectChangeEvent<number> | SelectChangeEvent) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

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
                onChange={handleTextChange}
                required
            />
            <TextField
                label="Intro Description"
                variant="outlined"
                name="introDescription"
                value={formData.introDescription}
                onChange={handleTextChange}
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
                        onChange={handleNumberChange}
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
                        onChange={handleNumberChange}
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
                        onChange={handleNumberChange}
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
                            onChange={handleSelectChange}
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
                            onChange={handleSelectChange}
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
                            onChange={handleSelectChange}
                            required
                        >
                            <MenuItem value={1}>Quick Thinking</MenuItem>
                            <MenuItem value={2}>Category 2</MenuItem>
                            <MenuItem value={3}>Category 3</MenuItem>
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
                            onChange={handleSelectChange}
                            required
                        >
                            <MenuItem value={1}>Finish</MenuItem>
                            <MenuItem value={2}>Forfeit</MenuItem>
                            <MenuItem value={3}>Timed</MenuItem>
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
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="">
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
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="">
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

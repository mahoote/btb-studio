import React, { ChangeEvent, FormEvent, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'

function NewGameForm() {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        introDescription: '',
        minPlayers: 2,
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

    const handleSelectChange = (event: SelectChangeEvent) => {
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
                required
            />
            <TextField
                label="Minimum Players"
                variant="outlined"
                name="minPlayers"
                type="number"
                inputProps={{ min: 2 }}
                value={formData.minPlayers}
                onChange={handleNumberChange}
                required
            />
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
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="category1">Category 1</MenuItem>
                    <MenuItem value="category2">Category 2</MenuItem>
                    <MenuItem value="category3">Category 3</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    )
}

export default NewGameForm

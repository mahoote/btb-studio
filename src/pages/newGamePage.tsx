import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Box, Button, FormControl, TextField } from '@mui/material'

interface FormValues {
    name: string
    email: string
}

function NewGamePage() {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        email: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Handle form submission logic here
    }

    return (
        <div>
            <h2>New Game</h2>
            <p>Info about this page</p>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <FormControl>
                    <TextField
                        label="Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        label="Email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        variant="outlined"
                        type="email"
                        required
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        </div>
    )
}

export default NewGamePage

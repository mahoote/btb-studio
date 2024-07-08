import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Add } from '@mui/icons-material'

/**
 * This is a component for creating multiple input elements.
 * Is comes with the grid layout.
 * @constructor
 */
function MultiInputComponent() {
    const [inputs, setInputs] = useState<string[]>([''])

    const handleInputChange = (index: number, newValue: string) => {
        setInputs(prevInputs => prevInputs.map((input, i) => (i === index ? newValue : input)))
    }

    const addInputField = () => {
        setInputs([...inputs, ''])
    }

    return (
        <Grid container spacing={2}>
            {inputs.map((input, index) => (
                <Grid item xs={12} sm={4}>
                    <TextField
                        label={`Input ${index + 1}`}
                        variant="outlined"
                        name={`input-${index + 1}`}
                        value={input}
                        onChange={e => handleInputChange(index, e.target.value)}
                        required
                        fullWidth
                    />
                </Grid>
            ))}
            <Grid item display="flex" alignItems="center">
                <Button variant="outlined" endIcon={<Add />} onClick={addInputField}>
                    New
                </Button>
            </Grid>
        </Grid>
    )
}

export default MultiInputComponent

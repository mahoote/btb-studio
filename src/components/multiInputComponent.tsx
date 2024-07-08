import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { MultiInput } from '../types/multiInput'
import { Add } from '@mui/icons-material'

/**
 * This multi input component can be used to create multiple action cards.
 * Is comes with the grid layout.
 * @constructor
 */
function MultiInputComponent() {
    const [inputs, setInputs] = useState<MultiInput[]>([
        {
            value: '',
        },
    ])

    const handleInputChange = (index: number, newValue: string) => {
        setInputs(prevInputs =>
            prevInputs.map((input, i) => (i === index ? { ...input, value: newValue } : input))
        )
    }

    return (
        <Grid container spacing={2}>
            {inputs.map((input, index) => (
                <Grid item xs={12} sm={4}>
                    <TextField
                        label={`Card ${index + 1}`}
                        variant="outlined"
                        name={`card-${index + 1}`}
                        value={input.value}
                        onChange={e => handleInputChange(index, e.target.value)}
                        required
                        fullWidth
                    />
                </Grid>
            ))}
            <Grid item display="flex" alignItems="center">
                <Button variant="outlined" endIcon={<Add />}>
                    New
                </Button>
            </Grid>
        </Grid>
    )
}

export default MultiInputComponent

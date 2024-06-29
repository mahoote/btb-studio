import React, { useState } from 'react'
import { Autocomplete, TextField, Chip } from '@mui/material'

const predefinedValues = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

function ChipsAutocompleteComponent() {
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    return (
        <Autocomplete
            multiple
            options={predefinedValues}
            value={selectedValues}
            onChange={(event, newValue) => {
                setSelectedValues(newValue)
            }}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
            }
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Select Options"
                    placeholder="Choose..."
                />
            )}
            disableCloseOnSelect
        />
    )
}

export default ChipsAutocompleteComponent

import React from 'react'
import { Autocomplete, TextField, Chip } from '@mui/material'

type ChipsAutocompleteProps = {
    predefinedValues: string[]
    selectedValues: string[]
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
    label: string
    required?: boolean
}

function ChipsAutocompleteComponent({
    predefinedValues,
    selectedValues,
    setSelectedValues,
    label,
    required,
}: ChipsAutocompleteProps) {
    const isRequired = selectedValues.length === 0 && required

    return (
        <Autocomplete
            multiple
            options={predefinedValues}
            value={selectedValues}
            onChange={(_, newValue) => {
                setSelectedValues(newValue)
            }}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index })
                    return <Chip key={key} variant="outlined" label={option} {...tagProps} />
                })
            }
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    label={label}
                    placeholder="Choose..."
                    required={isRequired}
                />
            )}
            disableCloseOnSelect
        />
    )
}

export default ChipsAutocompleteComponent

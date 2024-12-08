import React from 'react'
import { Autocomplete, TextField, Chip } from '@mui/material'
import { isOptionDisabled } from '../utils/chipsAutocompleteUtils'

type ChipsAutocompleteProps = {
    predefinedValues: string[]
    selectedValues: string[]
    setSelectedValues: (values: string[]) => void
    label: string
    required?: boolean
    optionCombinations?: string[][]
    variant?: 'outlined' | 'filled'
    freeSolo?: boolean
}

function ChipsAutocompleteComponent({
    predefinedValues,
    selectedValues,
    setSelectedValues,
    label,
    required,
    optionCombinations,
    freeSolo,
    variant = 'outlined',
}: ChipsAutocompleteProps) {
    const isRequired = selectedValues.length === 0 && required
    const inputPlaceholder = freeSolo ? 'Choose or add...' : 'Choose...'

    return (
        <Autocomplete
            multiple
            freeSolo={freeSolo}
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
                    variant={variant}
                    label={label}
                    placeholder={inputPlaceholder}
                    required={isRequired}
                />
            )}
            disableCloseOnSelect
            getOptionDisabled={option =>
                isOptionDisabled(option, selectedValues, optionCombinations)
            }
        />
    )
}

export default ChipsAutocompleteComponent

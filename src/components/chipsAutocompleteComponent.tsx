import React from 'react'
import { Autocomplete, TextField, Chip } from '@mui/material'

type ChipsAutocompleteProps = {
    predefinedValues: string[]
    selectedValues: string[]
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
    label: string
    required?: boolean
    optionCombinations?: string[][]
}

function ChipsAutocompleteComponent({
    predefinedValues,
    selectedValues,
    setSelectedValues,
    label,
    required,
    optionCombinations,
}: ChipsAutocompleteProps) {
    const isRequired = selectedValues.length === 0 && required

    /**
     * Will not disable if there is no selected values or the option is selected.
     * @param option
     */
    const isOptionDisabled = (option: string) => {
        if (!optionCombinations) return false
        if (selectedValues.length <= 0) return false
        if (selectedValues.includes(option)) return false

        const combinationsWithSelectedValues: string[][] = optionCombinations.filter(
            combination => selectedValues.every(value => combination.includes(value))
        )

        const flattenedCombinations: string[] = combinationsWithSelectedValues.flat()
        const optionInCombination = flattenedCombinations.includes(option)

        return !optionInCombination
    }

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
            getOptionDisabled={isOptionDisabled}
        />
    )
}

export default ChipsAutocompleteComponent

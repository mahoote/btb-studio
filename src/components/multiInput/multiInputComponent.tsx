import { Button, Grid } from '@mui/material'
import React from 'react'
import { Add, Clear, List } from '@mui/icons-material'
import TextFieldSuggestionsComponent from '../textFieldSuggestionsComponent'
import { TextFieldSuggestion } from '../../types/textFieldSuggestion'
import MultiInputBulkComponent from './multiInputBulkComponent'

type MultiInputProps = {
    inputs: string[]
    setInputs: React.Dispatch<React.SetStateAction<string[]>>
    isMultiline?: boolean
    wordSuggestions: TextFieldSuggestion[]
}

/**
 * This is a component for creating multiple input elements.
 * Is comes with the grid layout.
 * @constructor
 */
function MultiInputComponent({
    isMultiline,
    inputs,
    setInputs,
    wordSuggestions,
}: MultiInputProps) {
    const [openBulk, setOpenBulk] = React.useState<boolean>(false)
    const handleOpenBulk = () => setOpenBulk(true)
    const handleCloseBulk = () => setOpenBulk(false)

    if (inputs.length <= 0) {
        setInputs([''])
    }

    const handleInputChange = (index: number, newValue: string) => {
        setInputs(prevInputs => prevInputs.map((input, i) => (i === index ? newValue : input)))
    }

    const addInputField = () => {
        setInputs([...inputs, ''])
    }

    const addBulkInputs = (bulkInputs: string[]) => {
        if (inputs.length === 1 && inputs[0] === '') {
            setInputs(bulkInputs)
            return
        }

        const filteredBulkInputs = bulkInputs.filter(bulkInput => !inputs.includes(bulkInput))

        setInputs([...inputs, ...filteredBulkInputs])
    }

    const removeEmptyInputs = () => {
        setInputs(inputs.filter(input => input !== ''))
    }

    return (
        <>
            <MultiInputBulkComponent
                open={openBulk}
                handleClose={handleCloseBulk}
                handleAdd={addBulkInputs}
            />
            <Grid container spacing={2}>
                {inputs.map((input, index) => (
                    <Grid key={index} item xs={12} sm={4}>
                        <TextFieldSuggestionsComponent
                            wordSuggestions={wordSuggestions}
                            label={`Input ${index + 1}`}
                            name={`input-${index + 1}`}
                            variant="outlined"
                            value={input}
                            setValue={(newValue: string) => handleInputChange(index, newValue)}
                            multiline={isMultiline}
                            required
                        />
                    </Grid>
                ))}
                <Grid
                    item
                    sm={12}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    flexWrap="wrap"
                    sx={{ justifyContent: { xs: 'center', sm: 'normal' } }}
                >
                    <Button
                        variant="outlined"
                        endIcon={<Add />}
                        onClick={addInputField}
                        sx={{ width: '10rem' }}
                    >
                        New
                    </Button>
                    <Button
                        variant="outlined"
                        endIcon={<List />}
                        onClick={handleOpenBulk}
                        sx={{ width: '10rem' }}
                    >
                        Bulk
                    </Button>
                    <Button
                        variant="outlined"
                        endIcon={<Clear />}
                        onClick={removeEmptyInputs}
                        color="warning"
                    >
                        Remove empty
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default MultiInputComponent

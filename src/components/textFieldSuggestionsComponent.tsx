import React, { useState, useRef } from 'react'
import { TextField, Popper, Paper, List, ListItemButton, ListItemText } from '@mui/material'

type TextFieldSuggestionsProps = {
    label: string
    multiline?: boolean
    name?: string
    required?: boolean
    setValue: (newValue: string) => void
    value: string
    variant: 'outlined' | 'filled' | 'standard'
    wordSuggestions: string[]
}

function TextFieldSuggestionsComponent({
    label,
    variant,
    wordSuggestions,
    value,
    setValue,
    required,
    name,
    multiline,
}: TextFieldSuggestionsProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const textFieldRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setValue(value)

        const cursorPosition = event.target.selectionStart
        const lastWord = value.slice(0, cursorPosition!).split(' ').pop()

        if (lastWord && lastWord.startsWith('$')) {
            const filteredSuggestions = wordSuggestions.filter(word =>
                word.includes(lastWord.toUpperCase())
            )
            setSuggestions(filteredSuggestions)
            setAnchorEl(event.currentTarget)
        } else {
            setSuggestions([])
            setAnchorEl(null)
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        const cursorPosition = textFieldRef.current?.selectionStart
        const words = value.slice(0, cursorPosition!).split(' ')
        words.pop()
        const newValue = words.join(' ') + ' ' + suggestion + value.slice(cursorPosition!)
        setValue(newValue)
        setSuggestions([])
        setAnchorEl(null)
    }

    return (
        <div>
            <TextField
                label={label}
                variant={variant}
                multiline={multiline}
                required={required}
                fullWidth
                value={value}
                onChange={handleInputChange}
                inputRef={textFieldRef}
                name={name}
            />
            <Popper open={suggestions.length > 0} anchorEl={anchorEl} placement="bottom-end">
                <Paper>
                    <List>
                        {suggestions.map((suggestion, index) => (
                            <ListItemButton
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <ListItemText primary={suggestion} />
                            </ListItemButton>
                        ))}
                    </List>
                </Paper>
            </Popper>
        </div>
    )
}

export default TextFieldSuggestionsComponent

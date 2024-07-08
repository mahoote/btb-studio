import React, { useState, useRef } from 'react'
import { TextField, Popper, Paper, List, ListItemButton, ListItemText } from '@mui/material'

const wordSuggestions = ['$ALL$', '$PLAYER$', '$GAME$', '$SCORE$']

function TextFieldSuggestionsComponent() {
    const [inputValue, setInputValue] = useState('')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const textFieldRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value)

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
        const words = inputValue.slice(0, cursorPosition!).split(' ')
        words.pop()
        const newValue = words.join(' ') + ' ' + suggestion + inputValue.slice(cursorPosition!)
        setInputValue(newValue)
        setSuggestions([])
        setAnchorEl(null)
    }

    return (
        <div>
            <TextField
                label="Type $"
                variant="outlined"
                multiline
                fullWidth
                value={inputValue}
                onChange={handleInputChange}
                inputRef={textFieldRef}
            />
            <Popper open={suggestions.length > 0} anchorEl={anchorEl} placement="bottom-start">
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

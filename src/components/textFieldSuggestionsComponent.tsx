import React, { useState, useRef, useEffect } from 'react'
import { TextField, Popper, Paper, List, ListItemButton, ListItemText } from '@mui/material'
import { TextFieldSuggestion } from '../types/textFieldSuggestion'

type TextFieldSuggestionsProps = {
    label: string
    multiline?: boolean
    name?: string
    required?: boolean
    setValue: (newValue: string) => void
    value: string
    variant: 'outlined' | 'filled' | 'standard'
    wordSuggestions: TextFieldSuggestion[]
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

        for (const suggestion of wordSuggestions) {
            if (lastWord && lastWord.startsWith(suggestion.key)) {
                const filteredSuggestions = suggestion.values.filter(word =>
                    word.includes(lastWord.toUpperCase())
                )
                setSuggestions(filteredSuggestions)
                setAnchorEl(event.currentTarget)
                break
            } else {
                setSuggestions([])
                setAnchorEl(null)
            }
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

    const handleClickAway = (event: MouseEvent) => {
        if (anchorEl && !anchorEl.contains(event.target as Node)) {
            setSuggestions([])
            setAnchorEl(null)
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setSuggestions([])
            setAnchorEl(null)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickAway)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handleClickAway)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [anchorEl])

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
            <Popper
                open={suggestions.length > 0}
                anchorEl={anchorEl}
                placement="bottom-start"
                style={{ zIndex: 100 }}
            >
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

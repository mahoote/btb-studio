import React, { useState, useRef, useEffect, forwardRef } from 'react'
import {
    TextField,
    Popper,
    Paper,
    List,
    ListItemButton,
    ListItemText,
    TextFieldProps,
} from '@mui/material'
import { TextFieldSuggestion } from '../types/textFieldSuggestion'

type TextFieldSuggestionsProps = TextFieldProps & {
    setValue?: (newValue: string) => void
    value?: string
    wordSuggestions: TextFieldSuggestion[]
}

/**
 * A custom component using the MUI Text Field and Popper components
 * to display suggestions based on the user's input.
 * @param wordSuggestions
 * @param value
 * @param setValue
 * @constructor
 */
const TextFieldSuggestionsComponent = forwardRef<HTMLInputElement, TextFieldSuggestionsProps>(
    ({ wordSuggestions, value, setValue, ...props }, ref) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
        const [suggestions, setSuggestions] = useState<string[]>([])
        const textFieldRef = useRef<HTMLInputElement>(null)
        const popperRef = useRef<HTMLDivElement>(null)
        const ignoreClick = useRef(false)

        /**
         * Checks if a key word has been typed, and in that case, display the suggestions.
         * @param event
         */
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!setValue) return

            const value = event.target.value
            setValue(value)

            const cursorPosition = event.target.selectionStart

            /* Split the input based on spaces and new lines.
             *  Get the last word typed by the user.
             */
            const lastWord = value
                .slice(0, cursorPosition!)
                .split(/[\s\r\n]+/)
                .pop()

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

        /**
         * When clicking on one of the suggestions, add it to the input value.
         * @param suggestion
         */
        const handleSuggestionClick = (suggestion: string) => {
            if (!setValue) return

            const cursorPosition = textFieldRef.current?.selectionStart
            const words = value?.slice(0, cursorPosition!).split(' ')
            words?.pop()
            const newValue =
                words?.join(' ') + ' ' + suggestion + value?.slice(cursorPosition!)
            setValue(newValue)
            setSuggestions([])
            setAnchorEl(null)
        }

        /**
         * Logic for hiding the suggestions on click away.
         * @param event
         */
        const handleClickAway = (event: MouseEvent) => {
            if (
                !ignoreClick.current &&
                anchorEl &&
                !anchorEl.contains(event.target as Node) &&
                popperRef.current &&
                !popperRef.current.contains(event.target as Node)
            ) {
                setSuggestions([])
                setAnchorEl(null)
            }
            ignoreClick.current = false
        }

        /**
         * Logic for hiding the suggestions on click escape.
         * @param event
         */
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
            <>
                <TextField
                    value={value}
                    onChange={handleInputChange}
                    inputRef={textFieldRef}
                    {...props}
                    ref={ref}
                />
                <Popper
                    open={suggestions.length > 0}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    style={{ zIndex: 100 }}
                    ref={popperRef}
                    onMouseDown={() => {
                        ignoreClick.current = true
                    }}
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
            </>
        )
    }
)

export default TextFieldSuggestionsComponent

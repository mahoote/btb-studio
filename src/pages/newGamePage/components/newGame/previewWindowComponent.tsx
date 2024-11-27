import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { Add, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import TextFieldSuggestionsComponent from '../../../../components/textFieldSuggestionsComponent'
import { actionCardSuggestions } from '../../../../constants/WORD_SUGGESTION_DATA'
import { useNewGameStore } from '../../../../hooks/useNewGameStore'

type PreviewWindowProps = {
    name: string
}

function PreviewWindowComponent({ name }: PreviewWindowProps) {
    const { descriptions, setDescriptions } = useNewGameStore()
    const [descriptionIndex, setDescriptionIndex] = useState<number>(0)

    const handleDescriptionChange = (newValue: string) => {
        const newDescriptions = [...descriptions]
        newDescriptions[descriptionIndex] = newValue
        setDescriptions(newDescriptions)
    }

    const handleNext = () => {
        if (descriptionIndex !== descriptions.length - 1) {
            setDescriptionIndex(descriptionIndex + 1)
            return
        }

        const newDescriptions = [...descriptions]
        newDescriptions.push('')
        setDescriptions(newDescriptions)
        setDescriptionIndex(descriptionIndex + 1)
    }

    const handleBack = () => {
        if (descriptionIndex === 0) return
        setDescriptionIndex(descriptionIndex - 1)
    }

    useEffect(() => {
        if (descriptions.length === 0) {
            setDescriptions([''])
            setDescriptionIndex(0)
        }
    }, [setDescriptions, descriptions.length])

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
            bgcolor="grey.900"
            borderRadius={2}
            flexDirection="column"
        >
            <Box
                className="container"
                borderRadius={5}
                height="32rem"
                width="17rem"
                color="text.primary"
                padding={2}
                display="flex"
                flexDirection="column"
                position="relative"
            >
                <Box flexGrow={1}>
                    <Typography variant="h6" component="div" textAlign="center" marginTop={3}>
                        {name === '' ? 'Game Name' : name}
                    </Typography>
                    <TextFieldSuggestionsComponent
                        wordSuggestions={actionCardSuggestions}
                        sx={{
                            marginTop: 3,
                            '& .MuiOutlinedInput-root': {
                                padding: '0.5rem',
                            },
                        }}
                        placeholder="Description"
                        variant="standard"
                        name="description"
                        value={descriptions[descriptionIndex]}
                        setValue={handleDescriptionChange}
                        multiline
                        required
                        fullWidth
                        rows={15}
                        InputProps={{
                            style: { fontSize: '0.85em' },
                        }}
                    />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <ArrowLeftComponent
                        onClick={handleBack}
                        disabled={descriptionIndex <= 0}
                    />
                    <Typography textAlign="center" variant={'body2'}>
                        Page {descriptionIndex + 1}
                    </Typography>
                    <ArrowRightComponent
                        onClick={handleNext}
                        index={descriptionIndex}
                        lastDescriptionIndex={descriptions.length - 1}
                    />
                </Box>
            </Box>
        </Box>
    )
}

function ArrowLeftComponent({
    onClick,
    disabled,
}: {
    onClick: () => void
    disabled: boolean
}) {
    return (
        <Box
            sx={{
                marginX: 3,
            }}
        >
            <IconButton aria-label="Back" onClick={onClick} disabled={disabled}>
                <ArrowBackIos />
            </IconButton>
        </Box>
    )
}

function ArrowRightComponent({
    index,
    lastDescriptionIndex,
    onClick,
}: {
    index: number
    lastDescriptionIndex: number
    onClick: () => void
}) {
    return (
        <Box
            sx={{
                marginX: 3,
            }}
        >
            <IconButton aria-label="Next" onClick={onClick}>
                {index === lastDescriptionIndex ? <Add /> : <ArrowForwardIos />}
            </IconButton>
        </Box>
    )
}

export default PreviewWindowComponent

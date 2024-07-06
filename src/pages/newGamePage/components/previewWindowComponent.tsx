import React, { useState } from 'react'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import { Add, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

type PreviewWindowProps = {
    name: string
    descriptions: string[]
    setDescriptions: React.Dispatch<React.SetStateAction<string[]>>
}

function PreviewWindowComponent({ name, descriptions, setDescriptions }: PreviewWindowProps) {
    const [descriptionIndex, setDescriptionIndex] = useState<number>(0)

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        setDescriptions(prevState => {
            const newState = [...prevState]
            newState[descriptionIndex] = value
            return newState
        })
    }

    const handleNext = () => {
        if (descriptionIndex !== descriptions.length - 1) {
            setDescriptionIndex(descriptionIndex + 1)
            return
        }

        setDescriptions(prevState => {
            const newState = [...prevState]
            newState.push('')
            setDescriptionIndex(newState.length - 1)
            return newState
        })
    }

    const handleBack = () => {
        if (descriptionIndex === 0) return
        setDescriptionIndex(descriptionIndex - 1)
    }

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
                    <TextField
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
                        onChange={handleDescriptionChange}
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

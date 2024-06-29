import React, { useState } from 'react'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

function PhoneFrameComponent() {
    const [descriptionIndex, setDescriptionIndex] = useState<number>(0)
    const [descriptions, setDescriptions] = useState<string[]>([])

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
        >
            <Box
                className="container"
                sx={{
                    borderRadius: 5,
                    height: '32rem',
                    width: '17rem',
                    bgcolor: 'grey.800',
                    color: 'text.primary',
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }}
            >
                {descriptionIndex > 0 && <ArrowLeftComponent onClick={handleBack} />}
                <ArrowRightComponent onClick={handleNext} />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ textAlign: 'center', marginTop: 3 }}
                    >
                        Title
                    </Typography>
                    <TextField
                        sx={{
                            marginTop: 3,
                            '& .MuiOutlinedInput-root': {
                                padding: '0.5rem',
                            },
                        }}
                        variant="outlined"
                        name="description"
                        value={descriptions[descriptionIndex]}
                        onChange={handleDescriptionChange}
                        multiline
                        required
                        fullWidth
                        minRows={4}
                        maxRows={13}
                        InputProps={{
                            style: { fontSize: '0.8em' },
                        }}
                    />
                </Box>
                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                    <Button variant="contained" disabled fullWidth>
                        Continue
                    </Button>
                </Box>
                <Typography sx={{ textAlign: 'center' }} variant={'body2'}>
                    Page {descriptionIndex + 1}
                </Typography>
            </Box>
        </Box>
    )
}

function ArrowLeftComponent({ onClick }: { onClick: () => void }) {
    return (
        <Box
            sx={{
                position: 'absolute',
                left: -50,
                top: '50%',
                transform: 'translateY(-50%)',
            }}
        >
            <IconButton aria-label="Back" onClick={onClick}>
                <ArrowBackIos />
            </IconButton>
        </Box>
    )
}

function ArrowRightComponent({ onClick }: { onClick: () => void }) {
    return (
        <Box
            sx={{
                position: 'absolute',
                right: -50,
                top: '50%',
                transform: 'translateY(-50%)',
            }}
        >
            <IconButton aria-label="Next" onClick={onClick}>
                <ArrowForwardIos />
            </IconButton>
        </Box>
    )
}

export default PhoneFrameComponent

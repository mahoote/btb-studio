import React from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { Delete, Image } from '@mui/icons-material'

const MAX_FILE_SIZE = 1024 * 1024 // 1 MB in bytes
const ALLOWED_FILE_TYPES = ['image/jpeg']

type ImageUploaderProps = {
    imageBase64?: string
    setImageBase64: (image?: string) => void
}

function ImageUploaderComponent({ imageBase64, setImageBase64 }: ImageUploaderProps) {
    const [error, setError] = useState<string | null>(null)
    const [hovering, setHovering] = useState<boolean>(false)
    /**
     * If the file is valid, set the image state and reset the error state.
     * @param e
     */
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null

        if (file) {
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                setError('Only JPEG images are allowed.')
                setImageBase64(undefined)
                return
            }

            if (file.size > MAX_FILE_SIZE) {
                setError(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024} MB.`)
                setImageBase64(undefined)
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                setImageBase64(reader.result as string) // Store the Base64 string
                setError(null)
            }
            reader.readAsDataURL(file) // Convert image to Base64
        }
    }

    const handleDeleteImage = () => {
        setImageBase64(undefined)
        setHovering(false)
    }

    return (
        <Box>
            {imageBase64 ? (
                <Box
                    sx={{
                        cursor: 'pointer',
                    }}
                    maxWidth={200}
                    maxHeight={100}
                    position="relative"
                    borderRadius={2}
                    border="1px solid #ccc"
                    overflow="hidden"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    onClick={handleDeleteImage}
                >
                    <Box
                        component="img"
                        src={imageBase64}
                        alt="Selected image preview"
                        sx={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                    <Box
                        className="delete-icon"
                        position="absolute"
                        width="100%"
                        height="100%"
                        top={0}
                        left={0}
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        sx={{
                            display: hovering ? 'flex' : 'none',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                            },
                        }}
                    >
                        <IconButton
                            sx={{
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                },
                            }}
                        >
                            <Delete
                                sx={{
                                    fontSize: 32,
                                }}
                            />
                        </IconButton>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Button component="label" variant="outlined" startIcon={<Image />}>
                        Upload Custom Rules Image
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {error && (
                        <Typography mt={1} color="lightblue">
                            {error}
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    )
}

export default ImageUploaderComponent
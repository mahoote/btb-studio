import { Box, Typography } from '@mui/material'
import React from 'react'

const DEFAULT_ERROR_MESSAGE = 'An error occurred. Please try again later.'

function ErrorMessage({ message = DEFAULT_ERROR_MESSAGE }: { message?: string }) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <Typography>{message}</Typography>
        </Box>
    )
}

export default ErrorMessage

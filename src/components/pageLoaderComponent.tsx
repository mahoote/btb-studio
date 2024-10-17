import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function PageLoaderComponent() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
        </Box>
    )
}

export default PageLoaderComponent

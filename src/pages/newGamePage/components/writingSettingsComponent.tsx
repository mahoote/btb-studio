import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

function WritingSettingsComponent() {
    return (
        <>
            <Box my={3}>
                <Divider />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">Writing Settings</Typography>
            </Box>{' '}
        </>
    )
}

export default WritingSettingsComponent

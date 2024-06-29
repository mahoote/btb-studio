import React from 'react'
import { Box, Button, Typography } from '@mui/material'

function PhoneFrame() {
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
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ textAlign: 'center', marginTop: 3 }}
                    >
                        Title
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ marginTop: 3 }}>
                        This is the description of the box. It provides more details about the
                        content.
                    </Typography>
                </Box>
                <Button variant="contained" disabled>
                    Continue
                </Button>
            </Box>
        </Box>
    )
}

export default PhoneFrame

import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { handleTextChange } from '../../utils/inputUtils'
import { Login } from '../../types/login'
import { LoadingButton } from '@mui/lab'

function LoginPage() {
    const [formData, setFormData] = useState<Login>({
        email: '',
        password: '',
    })

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
                sx={{
                    maxWidth: '30rem',
                    padding: 3,
                    borderRadius: 2,
                    bgcolor: 'grey.900',
                }}
            >
                <Typography aria-label="Sign in" variant="h5" sx={{ mb: 2 }}>
                    Sign in
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={formData.email}
                    onChange={event => handleTextChange(event, formData, setFormData)}
                    required
                    fullWidth
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={formData.password}
                    onChange={event => handleTextChange(event, formData, setFormData)}
                    required
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <LoadingButton variant="contained" fullWidth sx={{ mt: 2 }}>
                    Sign in
                </LoadingButton>
            </Box>
        </Box>
    )
}

export default LoginPage

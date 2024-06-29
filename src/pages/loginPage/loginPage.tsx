import { Box, TextField, Typography } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import { handleTextChange } from '../../utils/inputUtils'
import { Login } from '../../types/login'
import { LoadingButton } from '@mui/lab'
import { supabase } from '../../supabaseClient'
import { AuthError } from '@supabase/supabase-js'

function LoginPage() {
    const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false)
    const [error, setError] = useState<AuthError | null>(null)

    const [formData, setFormData] = useState<Login>({
        email: '',
        password: '',
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoadingSignIn(true)

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        })

        if (error) {
            setLoadingSignIn(false)
            setError(error)
        }
    }

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleLogin(event).catch(error => {
            console.error('Error submitting form:', error)
        })
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
            flexDirection="column"
        >
            <Typography
                variant="h5"
                mx={3}
                mb={4}
                sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem' }}
            >
                Blame the Booze Studio
            </Typography>
            <Box
                component="form"
                sx={{
                    minWidth: { sm: '30rem' },
                }}
                padding={3}
                borderRadius={2}
                bgcolor="grey.900"
                display="flex"
                flexDirection="column"
                gap={2}
                onSubmit={handleFormSubmit}
            >
                <Typography aria-label="Sign in" variant="h5" mb={1}>
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
                    type="password"
                />

                {error && <Typography color="lightblue">{error.message}</Typography>}

                <LoadingButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    loading={loadingSignIn}
                >
                    Sign in
                </LoadingButton>
            </Box>
        </Box>
    )
}

export default LoginPage

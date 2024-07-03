import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import { Page } from '../types/page'
import { Logout } from '@mui/icons-material'
import { supabase } from '../supabaseClient'
import { AuthError } from '@supabase/supabase-js'

interface HeaderBarProps {
    pages: Page[]
}

function HeaderBarComponent({ pages }: HeaderBarProps) {
    const handleSignOut = () => {
        const signOut = async () => {
            await supabase.auth.signOut()
        }

        signOut().catch((error: AuthError | null) => {
            console.error('Error signing out:', error?.message)
        })
    }

    return (
        <AppBar position={'static'}>
            <Toolbar>
                <Box
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BTB-STUDIO
                    </Typography>
                    <Box
                        sx={{
                            ml: 2,
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                component={Link}
                                to={page.path}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Box>
                <IconButton onClick={handleSignOut} edge="end">
                    <Logout />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBarComponent

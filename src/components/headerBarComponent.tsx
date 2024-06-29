import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import { Page } from '../types/page'

interface HeaderBarProps {
    pages: Page[]
}

function HeaderBarComponent({ pages }: HeaderBarProps) {
    return (
        <AppBar position={'static'}>
            <Toolbar>
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
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBarComponent

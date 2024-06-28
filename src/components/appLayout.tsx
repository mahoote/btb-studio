import { BottomNavigation, BottomNavigationAction, Container } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Add, Home } from '@mui/icons-material'

import { Page } from '../types/page'

import HeaderBar from './headerBar'

const pages: Page[] = [{ name: 'Games', path: '/games', icon: <Add /> }]

function AppLayout() {
    const [value, setValue] = React.useState(0)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1 }}>
                <HeaderBar pages={pages} />
                <Container sx={{ my: 2 }}>
                    <Outlet />
                </Container>
            </div>
            <BottomNavigation
                sx={{ display: { md: 'none' } }}
                showLabels
                value={value}
                onChange={(_, newValue: number) => {
                    setValue(newValue)
                }}
            >
                <BottomNavigationAction
                    label={'Home'}
                    component={Link}
                    to={'/'}
                    icon={<Home />}
                />

                {pages.map((page, index) => (
                    <BottomNavigationAction
                        key={index}
                        label={page.name}
                        component={Link}
                        to={page.path}
                        icon={page.icon}
                    />
                ))}
            </BottomNavigation>
        </div>
    )
}

export default AppLayout

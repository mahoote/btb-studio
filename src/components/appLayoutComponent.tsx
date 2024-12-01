import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { Page } from '../types/page'

import HeaderBarComponent from './headerBarComponent'
import AppAlertComponent from './appAlertComponent'

const pages: Page[] = []

function AppLayoutComponent() {
    return (
        <div>
            <AppAlertComponent />
            <HeaderBarComponent pages={pages} />
            <Container sx={{ my: 2 }}>
                <Outlet />
            </Container>
        </div>
    )
}

export default AppLayoutComponent

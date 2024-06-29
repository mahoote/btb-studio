import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { Page } from '../types/page'

import HeaderBarComponent from './headerBarComponent'

const pages: Page[] = []

function AppLayoutComponent() {
    return (
        <div>
            <HeaderBarComponent pages={pages} />
            <Container sx={{ my: 2 }}>
                <Outlet />
            </Container>
        </div>
    )
}

export default AppLayoutComponent

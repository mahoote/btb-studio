import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { Page } from '../types/page'

import HeaderBar from './headerBar'

const pages: Page[] = []

function AppLayout() {
    return (
        <div>
            <HeaderBar pages={pages} />
            <Container sx={{ my: 2 }}>
                <Outlet />
            </Container>
        </div>
    )
}

export default AppLayout

import React from 'react'
import { Alert } from '@mui/lab'
import { Snackbar } from '@mui/material'
import { useAlertStore } from '../hooks/useAlertStore'
import MultilineComponent from './multilineComponent'

export type AppAlert = {
    open: boolean
    message: string
    severity: 'success' | 'error'
    vertical?: 'top' | 'bottom'
    horizontal?: 'left' | 'center' | 'right'
    autoHideDuration?: number
}

/**
 * A simple alert component that can be used to show messages to the user.
 * @constructor
 */
const AppAlertComponent = () => {
    const { alert, setAlert } = useAlertStore()

    const handleCloseAlert = () => setAlert({ ...alert, open: false })

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={alert.autoHideDuration ?? 3000}
            onClose={handleCloseAlert}
            anchorOrigin={{
                vertical: alert.vertical ?? 'top',
                horizontal: alert.horizontal ?? 'right',
            }}
        >
            <Alert onClose={handleCloseAlert} severity={alert.severity} variant="filled">
                <MultilineComponent text={alert.message} />
            </Alert>
        </Snackbar>
    )
}

export default AppAlertComponent

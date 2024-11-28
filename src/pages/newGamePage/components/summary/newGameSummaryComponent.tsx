import React from 'react'
import { Box, Table, TableContainer } from '@mui/material'
import NewGameSummaryTableComponent from './newGameSummaryTableComponent'
import AdvancedSettingsSummaryTableComponent from './advancedSettingsSummaryTableComponent'

const NewGameSummaryComponent = () => {
    return (
        <Box>
            <TableContainer>
                <Table>
                    <NewGameSummaryTableComponent />
                    <AdvancedSettingsSummaryTableComponent />
                </Table>
            </TableContainer>
        </Box>
    )
}

export default NewGameSummaryComponent

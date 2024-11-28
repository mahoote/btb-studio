import React from 'react'
import { useNewGameStore } from '../../../../hooks/useNewGameStore'
import { Box, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useActionCardStore } from '../../../../hooks/useActionCardStore'
import MultilineComponent from '../../../../components/multilineComponent'

const AdvancedSettingsSummaryTableComponent = () => {
    const {
        advancedSettingsData,
        actionCardSettingsData,
        actionCardInputs,
        writingSettingsData,
    } = useNewGameStore()

    const { actionCardStates } = useActionCardStore()

    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                        Advanced Settings Summary
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ verticalAlign: 'top', fontWeight: 'bold' }} scope="row">
                        Game End Type
                    </TableCell>
                    <TableCell>{advancedSettingsData.gameEndType}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ verticalAlign: 'top', fontWeight: 'bold' }} scope="row">
                        Custom End Game Sentence
                    </TableCell>
                    <TableCell>{advancedSettingsData.customEndGameSentence}</TableCell>
                </TableRow>
            </TableBody>

            {actionCardSettingsData && (
                <>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                                Action Card Summary
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                sx={{ verticalAlign: 'top', fontWeight: 'bold' }}
                                scope="row"
                            >
                                State
                            </TableCell>
                            <TableCell>
                                {
                                    actionCardStates.find(
                                        s => s.id === actionCardSettingsData.stateId
                                    )?.name
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{ verticalAlign: 'top', fontWeight: 'bold' }}
                                scope="row"
                            >
                                Limit
                            </TableCell>
                            <TableCell>{actionCardSettingsData.cardLimit}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{ verticalAlign: 'top', fontWeight: 'bold' }}
                                scope="row"
                            >
                                Time
                            </TableCell>
                            <TableCell>{actionCardSettingsData.cardSeconds} seconds</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{ verticalAlign: 'top', fontWeight: 'bold' }}
                                scope="row"
                            >
                                Auto Next
                            </TableCell>
                            <TableCell>
                                {actionCardSettingsData.isAutoNext?.toString()}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{ verticalAlign: 'top', fontWeight: 'bold' }}
                                scope="row"
                            >
                                Buzzer
                            </TableCell>
                            <TableCell>
                                {actionCardSettingsData.hasBuzzer?.toString()}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{ verticalAlign: 'top', fontWeight: 'bold' }}
                                scope="row"
                            >
                                Player Creative
                            </TableCell>
                            <TableCell>
                                {actionCardSettingsData.isPlayerCreative?.toString()}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{ verticalAlign: 'top', fontWeight: 'bold' }}
                                scope="row"
                            >
                                Prompt
                            </TableCell>
                            <TableCell>{actionCardSettingsData.prompt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{ verticalAlign: 'top', fontWeight: 'bold' }}
                                scope="row"
                            >
                                Action Cards
                            </TableCell>
                            <TableCell>
                                {actionCardInputs?.map((input, index) => (
                                    <Box component="ul" key={index} px={1}>
                                        <Box component="li">
                                            <MultilineComponent text={input} />
                                        </Box>
                                    </Box>
                                ))}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </>
            )}

            {writingSettingsData && (
                <>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                                Writing Settings Summary
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                sx={{ verticalAlign: 'top', fontWeight: 'bold' }}
                                scope="row"
                            >
                                Max Writes Per Player
                            </TableCell>
                            <TableCell>{writingSettingsData.writesAmount}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{ verticalAlign: 'top', fontWeight: 'bold' }}
                                scope="row"
                            >
                                Writing Time
                            </TableCell>
                            <TableCell>{writingSettingsData.writeSeconds} seconds</TableCell>
                        </TableRow>
                    </TableBody>
                </>
            )}
        </>
    )
}

export default AdvancedSettingsSummaryTableComponent

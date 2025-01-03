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
                    <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                        Game End Type
                    </TableCell>
                    <TableCell>{advancedSettingsData.gameEndType}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                        Custom End Game Sentence
                    </TableCell>
                    <TableCell>
                        <MultilineComponent
                            text={advancedSettingsData.customEndGameSentence ?? ''}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                        Has Winner
                    </TableCell>
                    <TableCell>{advancedSettingsData.hasWinner?.toString()}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                        Custom Rules Image
                    </TableCell>
                    <TableCell>
                        <Box maxWidth="30rem">
                            <Box
                                component="img"
                                src={advancedSettingsData.customRulesImage?.imageBase64}
                                alt="No image selected"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    fontStyle: 'italic',
                                }}
                            />
                        </Box>
                    </TableCell>
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
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
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
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                                Allow Sentence
                            </TableCell>
                            <TableCell>
                                {actionCardSettingsData.allowSentence.toString()}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                                Limit
                            </TableCell>
                            <TableCell>{actionCardSettingsData.cardLimit}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                                Time
                            </TableCell>
                            <TableCell>
                                {actionCardSettingsData.cardSeconds && (
                                    <>{actionCardSettingsData.cardSeconds} seconds</>
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                                Auto Next
                            </TableCell>
                            <TableCell>
                                {actionCardSettingsData.isAutoNext?.toString()}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                                Buzzer
                            </TableCell>
                            <TableCell>
                                {actionCardSettingsData.hasBuzzer?.toString()}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                                Player Creative
                            </TableCell>
                            <TableCell>
                                {actionCardSettingsData.isPlayerCreative?.toString()}
                            </TableCell>
                        </TableRow>
                        {actionCardSettingsData.isPlayerCreative && (
                            <TableRow>
                                <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                                    Player Creative Prompt
                                </TableCell>
                                <TableCell>
                                    <MultilineComponent
                                        text={
                                            actionCardSettingsData.playerCreativePrompt ?? ''
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                                Action Card Prompt
                            </TableCell>
                            <TableCell>{actionCardSettingsData.prompt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
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
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
                                Max Writes Per Player
                            </TableCell>
                            <TableCell>{writingSettingsData.writesAmount}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ verticalAlign: 'top' }} scope="row">
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

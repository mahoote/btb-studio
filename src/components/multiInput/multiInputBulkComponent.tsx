import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Add } from '@mui/icons-material'

type MultiInputBulkProps = {
    open: boolean
    handleClose: () => void
}

function MultiInputBulkComponent({ open, handleClose }: MultiInputBulkProps) {
    const [jsonObject, setJsonObject] = useState<string>('')

    const handleModalClose = () => {
        setJsonObject('')
        handleClose()
    }

    return (
        <Modal
            aria-labelledby="action-card-bulk-mode"
            aria-describedby="paste-a-json-array-of-action-cards-here"
            open={open}
            onClose={handleModalClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'absolute' as const,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Action Card Bulk Mode
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 1 }}>
                        Paste a JSON array of action cards here.
                    </Typography>
                    <TextField
                        sx={{ mt: 2 }}
                        variant="outlined"
                        name="jsonObject"
                        value={jsonObject}
                        onChange={event => setJsonObject(event.target.value)}
                        multiline
                        fullWidth
                        minRows={6}
                    />
                    <Box display="flex" justifyContent="end" mt={2}>
                        <Button
                            variant="contained"
                            endIcon={<Add />}
                            disabled={jsonObject.length <= 0}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default MultiInputBulkComponent

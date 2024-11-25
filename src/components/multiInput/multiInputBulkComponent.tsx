import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Add } from '@mui/icons-material'

type MultiInputBulkProps = {
    open: boolean
    handleClose: () => void
    handleAdd: (bulkInputs: string[]) => void
}

/**
 * Lets you type in an array of strings for quick adding of multiple inputs.
 * Just separate the strings with a comma.
 * @param open
 * @param handleClose
 * @param handleAdd
 * @constructor
 */
function MultiInputBulkComponent({ open, handleClose, handleAdd }: MultiInputBulkProps) {
    const [jsonObject, setJsonObject] = useState<string>('')

    /**
     * Converts the string to an array of strings and adds them to the inputs.
     * @param event
     */
    const handleModalAdd = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        const jsonArray = jsonObject
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '')

        handleAdd(jsonArray)
        setJsonObject('')
        handleClose()
    }

    return (
        <Modal
            aria-labelledby="bulk-modal-title"
            aria-describedby="bulk-modal-description"
            open={open}
            onClose={handleClose}
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
                        width: { xs: '90%', sm: '70%', md: '50%' },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="bulk-modal-title" variant="h6" component="h2">
                        Action Card Bulk Mode
                    </Typography>
                    <Typography id="bulk-modal-description" sx={{ mt: 1 }}>
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
                        maxRows={18}
                    />
                    <Box display="flex" justifyContent="end" mt={2}>
                        <Button
                            variant="contained"
                            endIcon={<Add />}
                            onClick={handleModalAdd}
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

import React from 'react'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'

type AppModalProps = {
    open: boolean
    handleClose: () => void
    children: React.ReactElement
    title?: string
    description?: string
}

const AppModalComponent = ({
    open,
    handleClose,
    children,
    title,
    description,
}: AppModalProps) => {
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
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
                    <Typography id="modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 1 }}>
                        {description}
                    </Typography>
                    {children}
                </Box>
            </Fade>
        </Modal>
    )
}

export default AppModalComponent

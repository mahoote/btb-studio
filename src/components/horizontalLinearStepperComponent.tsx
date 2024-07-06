import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { StepperObject } from '../types/StepperObject'
import { useEffect } from 'react'

type HorizontalLinearStepperProps = {
    steps: StepperObject[]
    onFinnish?: () => void
    completeMessage?: string
    onReset?: () => void
}

/**
 * Creates a step by step component to wrap around a form.
 * Is able to skip steps and go back and forth.
 * On the last step it will call the onFinnish function if it is provided.
 * @param steps
 * @param onFinnish
 * @param completeMessage
 * @param onReset
 * @constructor
 */
function HorizontalLinearStepperComponent({
    steps,
    onFinnish,
    completeMessage,
    onReset,
}: HorizontalLinearStepperProps) {
    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set<number>())

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    const handleSkip = () => {
        if (!steps[activeStep].isOptional) {
            throw new Error("You can't skip a step that isn't optional.")
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1)
        setSkipped(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values())
            newSkipped.add(activeStep)
            return newSkipped
        })
    }

    const handleReset = () => {
        if (onReset) onReset()
        setActiveStep(0)
    }

    useEffect(() => {
        if (activeStep === steps.length && onFinnish) {
            onFinnish()
        }
    }, [activeStep])

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {}
                    const labelProps: {
                        optional?: React.ReactNode
                    } = {}
                    if (steps[index].isOptional) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        )
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false
                    }
                    return (
                        <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{step.title}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {completeMessage ?? (
                            <span>All steps completed - you&apos;re finished</span>
                        )}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box paddingY={3}>{steps[activeStep].content}</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {steps[activeStep].isOptional && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )
}

export default React.memo(HorizontalLinearStepperComponent)

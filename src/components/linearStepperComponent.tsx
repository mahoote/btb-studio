import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { StepperObject } from '../types/StepperObject'
import { useEffect, useState } from 'react'
import { CircularProgress, Theme, useMediaQuery } from '@mui/material'
import { scrollToTop } from '../utils/windowUtils'

type LinearStepperProps = {
    steps: StepperObject[]
    formStepIndex: number
    setFormStepIndex: (step: number) => void
    onFinnish?: () => void
    completeMessage?: string
    onReset?: () => void
    isComplete?: boolean
    isFormValid?: () => boolean
    isVertical?: boolean
}

/**
 * Creates a step by step component to wrap around a form.
 * Is able to skip steps and go back and forth.
 * On the last step it will call the onFinnish function if it is provided.
 * @param steps
 * @param onFinnish
 * @param completeMessage
 * @param onReset
 * @param isComplete
 * @param isFormValid
 * @param customValidation
 * @constructor
 */
function LinearStepperComponent({
    steps,
    formStepIndex,
    setFormStepIndex,
    onFinnish,
    completeMessage,
    onReset,
    isComplete,
    isFormValid,
    isVertical,
}: LinearStepperProps) {
    const [skipped, setSkipped] = useState(new Set<number>())
    const isMobileSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    /**
     * Returns is the form is invalid or if the custom validation fails.
     */
    const handleNext = () => {
        const activeStep = steps[formStepIndex]

        if (isFormValid && !isFormValid()) return
        if (activeStep.customValidation) {
            const validationMessage = activeStep.customValidation()

            if (validationMessage) {
                alert(validationMessage)
                return
            }
        }

        let newSkipped = skipped
        if (isStepSkipped(formStepIndex)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(formStepIndex)
        }

        setFormStepIndex(formStepIndex + 1)
        setSkipped(newSkipped)

        scrollToTop()
    }

    const handleBack = (index?: number) => {
        setFormStepIndex(index ?? formStepIndex - 1)
        scrollToTop()
    }

    function handleStepClick(index: number) {
        if (formStepIndex < index) {
            handleNext()
        } else if (formStepIndex > index) {
            handleBack(index)
        }
    }

    const handleSkip = () => {
        if (!steps[formStepIndex].isOptional) {
            throw new Error("You can't skip a step that isn't optional.")
        }

        setFormStepIndex(formStepIndex + 1)
        setSkipped(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values())
            newSkipped.add(formStepIndex)
            return newSkipped
        })
    }

    const handleReset = () => {
        if (onReset) onReset()
        setFormStepIndex(0)
    }

    useEffect(() => {
        if (formStepIndex === steps.length && onFinnish) {
            onFinnish()
        }
    }, [formStepIndex])

    const CompleteMessageComponent = () => {
        return (
            <>
                <Typography sx={{ mt: 7, textAlign: 'center' }}>
                    {completeMessage ?? <h3>All steps completed - you&apos;re finished</h3>}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                </Box>
            </>
        )
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper
                activeStep={formStepIndex}
                sx={{ overflowX: 'auto' }}
                orientation={isMobileSize || isVertical ? 'vertical' : 'horizontal'}
            >
                {steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {}
                    const labelProps: {
                        optional?: React.ReactNode
                    } = {}
                    if (steps[index].isOptional) {
                        labelProps.optional = (
                            <Typography key={index} variant="caption">
                                Optional
                            </Typography>
                        )
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false
                    }
                    return (
                        <Step
                            key={index}
                            {...stepProps}
                            onClick={() => handleStepClick(index)}
                            sx={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            <StepLabel {...labelProps}>{step.label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {formStepIndex === steps.length ? (
                isComplete ? (
                    <CompleteMessageComponent />
                ) : (
                    <Box display="flex" justifyContent="center" mt={7}>
                        <CircularProgress />
                    </Box>
                )
            ) : (
                <>
                    <Box paddingY={3}>{steps[formStepIndex].content}</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={formStepIndex === 0}
                            onClick={() => handleBack()}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {steps[formStepIndex].isOptional && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}
                        <Button onClick={handleNext}>
                            {formStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default LinearStepperComponent

import React from 'react'
import { Box, Grid } from '@mui/material'
import TextFieldSuggestionsComponent from '../../../../components/textFieldSuggestionsComponent'
import { actionCardSuggestions } from '../../../../constants/WORD_SUGGESTION_DATA'
import MultilineComponent from '../../../../components/multilineComponent'

type TranslateStringArrayComponentProps = {
    values: string[]
    inputValues?: string[]
    setInputValues?: (values: string[]) => void
    minRows?: number
    minHeight?: string
    gridXs?: number
    gridSm?: number
    gridMd?: number
}

const TranslateStringArrayComponent = ({
    values,
    inputValues,
    setInputValues,
    minRows,
    minHeight,
    gridXs,
    gridSm,
    gridMd,
}: TranslateStringArrayComponentProps) => {
    return (
        <Grid container spacing={2}>
            {values
                .filter(description => description !== '')
                .map((description, index) => {
                    return (
                        <Grid key={index} item xs={gridXs} sm={gridSm} md={gridMd}>
                            <Box>
                                <Box
                                    height="100%"
                                    width="100%"
                                    bgcolor="grey.900"
                                    borderRadius={2}
                                    color="text.primary"
                                    minHeight={minHeight}
                                    flexDirection="column"
                                    padding={2}
                                    sx={{
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    }}
                                >
                                    <MultilineComponent text={description} />
                                </Box>
                                <Box>
                                    <TextFieldSuggestionsComponent
                                        wordSuggestions={actionCardSuggestions}
                                        label={`Input ${index + 1}`}
                                        name={`descriptionPage${index}`}
                                        variant="filled"
                                        multiline
                                        required
                                        fullWidth
                                        minRows={minRows}
                                        value={inputValues?.[index]}
                                        setValue={value => {
                                            const newInputValues: string[] = [
                                                ...(inputValues ?? []),
                                            ]
                                            newInputValues[index] = value
                                            if (setInputValues) setInputValues(newInputValues)
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    )
                })}
        </Grid>
    )
}

export default TranslateStringArrayComponent

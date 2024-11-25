import React from 'react'
import { Box } from '@mui/material'
import TextFieldSuggestionsComponent from '../../../components/textFieldSuggestionsComponent'
import { actionCardSuggestions } from '../../../constants/WORD_SUGGESTION_DATA'
import MultilineComponent from '../../../components/multilineComponent'

type TranslateDescriptionsComponentProps = {
    values: string[]
    minRows?: number
    minHeight?: string
}

const TranslateDescriptionsComponent = ({
    values,
    minRows,
    minHeight,
}: TranslateDescriptionsComponentProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {values
                .filter(description => description !== '')
                .map((description, index) => (
                    <Box key={index}>
                        <Box
                            height="100%"
                            width="100%"
                            bgcolor="grey.900"
                            borderRadius={2}
                            color="text.primary"
                            minHeight={minHeight}
                            flexDirection="column"
                            padding={2}
                            sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
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
                            />
                        </Box>
                    </Box>
                ))}
        </Box>
    )
}

export default TranslateDescriptionsComponent

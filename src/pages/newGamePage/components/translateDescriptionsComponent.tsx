import React from 'react'
import { Box } from '@mui/material'
import TextFieldSuggestionsComponent from '../../../components/textFieldSuggestionsComponent'
import { actionCardSuggestions } from '../../../constants/WORD_SUGGESTION_DATA'
import MultilineComponent from '../../../components/multilineComponent'

type TranslateDescriptionsComponentProps = {
    descriptions: string[]
}

const TranslateDescriptionsComponent = ({
    descriptions,
}: TranslateDescriptionsComponentProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {descriptions
                .filter(description => description !== '')
                .map((description, index) => (
                    <Box key={index}>
                        <Box
                            height="100%"
                            width="100%"
                            bgcolor="grey.900"
                            borderRadius={2}
                            color="text.primary"
                            minHeight="13rem"
                            flexDirection="column"
                            padding={2}
                            sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                        >
                            <MultilineComponent text={description} />
                        </Box>
                        <Box>
                            <TextFieldSuggestionsComponent
                                wordSuggestions={actionCardSuggestions}
                                label={`Page ${index + 1}`}
                                name={`descriptionPage${index}`}
                                variant="filled"
                                multiline
                                required
                                fullWidth
                                minRows={4}
                            />
                        </Box>
                    </Box>
                ))}
        </Box>
    )
}

export default TranslateDescriptionsComponent

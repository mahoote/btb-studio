import React from 'react'
import {
    Box,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { GameCategory } from '../../../types/gameCategory'
import {
    handleNumberChange,
    handleSelectChange,
    handleTextChange,
} from '../../../utils/inputUtils'
import { NewGameFormData } from '../../../types/formData'
import ChipsAutocompleteComponent from '../../../components/chipsAutocompleteComponent'
import { useGameCategories } from '../../../hooks/useGameCategories'
import { useGameTypes } from '../../../hooks/useGameTypes'
import { useAccessories } from '../../../hooks/useAccessories'
import useNewGame from '../../../hooks/useNewGame'
import { getGameTypeCombinations } from '../../../utils/gameTypeUtils'
import TextFieldSuggestionsComponent from '../../../components/textFieldSuggestionsComponent'
import PreviewWindowComponent from './previewWindowComponent'
import { usePlayerGroupTypes } from '../../../hooks/usePlayerGroupTypes'
import { useGameAudience } from '../../../hooks/useGameAudience'
import { activityLevels, drunkLevels } from '../../../constants/newGameFormData'
import { actionCardSuggestions } from '../../../constants/wordSuggestionData'

type NewGameFormProps = {
    formData: NewGameFormData
    setFormData: React.Dispatch<React.SetStateAction<NewGameFormData>>
    descriptions: string[]
    setDescriptions: React.Dispatch<React.SetStateAction<string[]>>
}

function NewGameFormComponent({
    formData,
    setFormData,
    descriptions,
    setDescriptions,
}: NewGameFormProps) {
    const {
        selectedAccessories,
        setSelectedAccessories,
        selectedGameTypes,
        setSelectedGameTypes,
        activeFormRef,
    } = useNewGame()

    const { data: categories, loading: categoriesLoading } = useGameCategories()
    const { data: gameTypes, loading: gameTypesLoading } = useGameTypes()
    const { data: accessories, loading: accessoriesLoading } = useAccessories()
    const { data: playerGroupTypes, loading: playerGroupTypesLoading } = usePlayerGroupTypes()
    const { data: gameAudience, loading: gameAudienceLoading } = useGameAudience()

    if (
        categoriesLoading ||
        gameTypesLoading ||
        accessoriesLoading ||
        playerGroupTypesLoading ||
        gameAudienceLoading
    ) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Grid container spacing={2} component="form" ref={activeFormRef}>
            <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                name="name"
                                value={formData.name}
                                onChange={event =>
                                    handleTextChange(event, formData, setFormData)
                                }
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    label="Category"
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={event =>
                                        handleSelectChange(event, formData, setFormData)
                                    }
                                    required
                                >
                                    {categories?.map((category: GameCategory) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <TextFieldSuggestionsComponent
                        wordSuggestions={actionCardSuggestions}
                        label="Intro Description"
                        variant="outlined"
                        name="introDescription"
                        value={formData.introDescription}
                        setValue={newValue =>
                            setFormData({
                                ...formData,
                                introDescription: newValue,
                            })
                        }
                        multiline
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Minimum Players"
                                variant="outlined"
                                name="minPlayers"
                                type="number"
                                inputProps={{ min: 2 }}
                                value={formData.minPlayers}
                                onChange={event =>
                                    handleNumberChange(event, formData, setFormData)
                                }
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Maximum Players"
                                variant="outlined"
                                name="maxPlayers"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={formData.maxPlayers}
                                onChange={event =>
                                    handleNumberChange(event, formData, setFormData)
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Minutes"
                                variant="outlined"
                                name="minutes"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={formData.minutes}
                                onChange={event =>
                                    handleNumberChange(event, formData, setFormData)
                                }
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="activity-label">Activity Level</InputLabel>
                                <Select
                                    labelId="activity-label"
                                    label="Activity Level"
                                    name="activityLevel"
                                    value={formData.activityLevel}
                                    onChange={event =>
                                        handleSelectChange(event, formData, setFormData)
                                    }
                                >
                                    {activityLevels.map(level => (
                                        <MenuItem key={level.id} value={level.id}>
                                            {level.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="drunk-label">Drunk Level</InputLabel>
                                <Select
                                    labelId="drunk-label"
                                    label="Drunk Level"
                                    name="drunkLevel"
                                    value={formData.drunkLevel}
                                    onChange={event =>
                                        handleSelectChange(event, formData, setFormData)
                                    }
                                >
                                    {drunkLevels.map(level => (
                                        <MenuItem key={level.id} value={level.id}>
                                            {level.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="player-group-type-label">
                                    Player Group Type
                                </InputLabel>
                                <Select
                                    labelId="player-group-type-label"
                                    label="Player Group Type"
                                    name="playerGroupTypeId"
                                    value={formData.playerGroupTypeId}
                                    onChange={event =>
                                        handleSelectChange(event, formData, setFormData)
                                    }
                                >
                                    <MenuItem value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {playerGroupTypes?.map(playerGroupType => (
                                        <MenuItem
                                            key={playerGroupType.id}
                                            value={playerGroupType.id}
                                        >
                                            {playerGroupType.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="game-audience-label">Game Audience</InputLabel>
                                <Select
                                    labelId="game-audience-label"
                                    label="Game Audience"
                                    name="gameAudienceId"
                                    value={formData.gameAudienceId}
                                    onChange={event =>
                                        handleSelectChange(event, formData, setFormData)
                                    }
                                >
                                    <MenuItem value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {gameAudience?.map(audience => (
                                        <MenuItem key={audience.id} value={audience.id}>
                                            {audience.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <ChipsAutocompleteComponent
                        predefinedValues={gameTypes?.map(gameType => gameType.name) ?? []}
                        selectedValues={selectedGameTypes}
                        setSelectedValues={setSelectedGameTypes}
                        label="Game Types"
                        required={true}
                        optionCombinations={getGameTypeCombinations()}
                    />
                    <ChipsAutocompleteComponent
                        predefinedValues={accessories?.map(accessory => accessory.name) ?? []}
                        selectedValues={selectedAccessories}
                        setSelectedValues={setSelectedAccessories}
                        label="Accessories"
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <PreviewWindowComponent
                    name={formData.name}
                    descriptions={descriptions}
                    setDescriptions={setDescriptions}
                />
            </Grid>
        </Grid>
    )
}

export default NewGameFormComponent

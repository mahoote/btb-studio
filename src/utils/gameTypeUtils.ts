import { GameTypeEnum } from '../enums/gameTypeEnum'

// TODO: Is this needed?
export function getGameTypeCombinations(): string[][] {
    return [Object.values(GameTypeEnum)]
}

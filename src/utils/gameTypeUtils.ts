import { GameTypeEnum } from '../enums/gameTypeEnum'

export function getGameTypeCombinations(): string[][] {
    return [
        [GameTypeEnum.ActionCard, GameTypeEnum.Timed, GameTypeEnum.Forfeit],
        [GameTypeEnum.ActionCard, GameTypeEnum.Timed, GameTypeEnum.Finish],
        [
            GameTypeEnum.ActionCard,
            GameTypeEnum.Timed,
            GameTypeEnum.Finish,
            GameTypeEnum.Forfeit,
        ],
        Object.values(GameTypeEnum),
    ]
}

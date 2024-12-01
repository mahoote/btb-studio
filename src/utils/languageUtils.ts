import { LanguageEnum } from '../enums/languageEnum'

const codeToLanguage = (code: string) => {
    return LanguageEnum[code as keyof typeof LanguageEnum]
}

export { codeToLanguage }

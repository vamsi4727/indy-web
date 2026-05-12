import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import id from '../i18n/id'
import en from '../i18n/en'
import type { Translations } from '../i18n/id'

type Language = 'id' | 'en'

interface LanguageState {
  language: Language
  t: Translations
}

type LanguageAction = { type: 'SET_LANGUAGE'; payload: Language }

function languageReducer(state: LanguageState, action: LanguageAction): LanguageState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { language: action.payload, t: action.payload === 'id' ? id : en }
    default:
      return state
  }
}

interface LanguageContextValue extends LanguageState {
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(languageReducer, {
    language: 'id',
    t: id,
  })

  useEffect(() => {
    document.documentElement.lang = state.language
  }, [state.language])

  const setLanguage = (lang: Language) => dispatch({ type: 'SET_LANGUAGE', payload: lang })

  return (
    <LanguageContext.Provider value={{ ...state, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

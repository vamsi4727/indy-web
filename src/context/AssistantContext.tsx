import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'

export interface EstimatedPrice {
  products: number
  tools: number
  service: number
  delivery: number
  total: number
}

export interface AssistantState {
  currentStep: number
  entry_intent: string | null
  project_type: 'interior' | 'exterior' | 'damp' | 'roof' | 'wood_metal' | 'unsure' | null
  area_type: string[]
  user_goals: string[]
  wall_condition: string[]
  photo_uploaded: boolean
  requires_treatment: boolean
  surface_type: string | null
  room_length_m: number | null
  room_width_m: number | null
  wall_height_m: number | null
  doors_count: number
  windows_count: number
  known_wall_area_m2: number | null
  house_type_preset: string | null
  colour_change_intensity: 'similar' | 'light_to_dark' | 'dark_to_light' | 'unknown' | 'new_wall' | null
  style_preference: string[]
  occasion: string[]
  lighting: string | null
  preferred_colour_families: string[]
  selected_palette_id: string | null
  quality_tier: 'hemat' | 'tahan_lama' | 'premium' | null
  primer_required: boolean
  putty_required: boolean
  waterproofing_required: boolean
  topcoat_litres_final: number | null
  primer_litres_final: number | null
  application_method: 'diy' | 'own_tukang' | 'find_tukang' | 'full_service' | 'unsure' | null
  estimated_price: EstimatedPrice | null
  next_best_action: 'buy' | 'sample' | 'whatsapp' | 'book_tukang' | null
}

const initialState: AssistantState = {
  currentStep: 1,
  entry_intent: null,
  project_type: null,
  area_type: [],
  user_goals: [],
  wall_condition: [],
  photo_uploaded: false,
  requires_treatment: false,
  surface_type: null,
  room_length_m: null,
  room_width_m: null,
  wall_height_m: 3,
  doors_count: 1,
  windows_count: 1,
  known_wall_area_m2: null,
  house_type_preset: null,
  colour_change_intensity: null,
  style_preference: [],
  occasion: [],
  lighting: null,
  preferred_colour_families: [],
  selected_palette_id: null,
  quality_tier: null,
  primer_required: false,
  putty_required: false,
  waterproofing_required: false,
  topcoat_litres_final: null,
  primer_litres_final: null,
  application_method: null,
  estimated_price: null,
  next_best_action: null,
}

type AssistantAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_PROJECT_TYPE'; payload: AssistantState['project_type'] }
  | { type: 'SET_AREA_TYPE'; payload: string[] }
  | { type: 'SET_USER_GOALS'; payload: string[] }
  | { type: 'SET_WALL_CONDITION'; payload: string[] }
  | { type: 'SET_PHOTO_UPLOADED'; payload: boolean }
  | { type: 'SET_SURFACE_TYPE'; payload: string }
  | { type: 'SET_MEASUREMENT'; payload: Partial<Pick<AssistantState, 'room_length_m' | 'room_width_m' | 'wall_height_m' | 'doors_count' | 'windows_count' | 'known_wall_area_m2' | 'house_type_preset'>> }
  | { type: 'SET_COLOUR_CHANGE'; payload: AssistantState['colour_change_intensity'] }
  | { type: 'SET_STYLE'; payload: string[] }
  | { type: 'SET_OCCASION'; payload: string[] }
  | { type: 'SET_LIGHTING'; payload: string }
  | { type: 'SET_COLOUR_FAMILIES'; payload: string[] }
  | { type: 'SET_PALETTE'; payload: string }
  | { type: 'SET_QUALITY'; payload: AssistantState['quality_tier'] }
  | { type: 'SET_APPLICATION'; payload: AssistantState['application_method'] }
  | { type: 'DERIVE_RECOMMENDATIONS' }
  | { type: 'RESET' }

function deriveRecommendations(state: AssistantState): Partial<AssistantState> {
  const dampConditions = ['mold', 'damp', 'water']
  const hasDamp = state.wall_condition.some(c => dampConditions.includes(c))

  let requires_treatment = hasDamp || state.project_type === 'damp'
  let waterproofing_required = requires_treatment
  let primer_required = requires_treatment ||
    state.colour_change_intensity === 'dark_to_light' ||
    state.colour_change_intensity === 'new_wall' ||
    state.surface_type === 'new_plaster'

  const unsureCount = [
    state.project_type === 'unsure',
    state.surface_type === 'unsure',
    state.lighting === 'unsure',
    state.colour_change_intensity === 'unknown',
  ].filter(Boolean).length

  let next_best_action: AssistantState['next_best_action'] = 'buy'
  if (requires_treatment || unsureCount >= 2) next_best_action = 'whatsapp'
  else if (state.preferred_colour_families.length > 0) next_best_action = 'sample'

  return { requires_treatment, waterproofing_required, primer_required, next_best_action }
}

function assistantReducer(state: AssistantState, action: AssistantAction): AssistantState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'SET_PROJECT_TYPE': {
      const requires_treatment = action.payload === 'damp' || action.payload === 'roof'
      return { ...state, project_type: action.payload, requires_treatment }
    }
    case 'SET_AREA_TYPE':
      return { ...state, area_type: action.payload }
    case 'SET_USER_GOALS':
      return { ...state, user_goals: action.payload }
    case 'SET_WALL_CONDITION': {
      const dampConditions = ['mold', 'damp', 'water']
      const hasDamp = action.payload.some(c => dampConditions.includes(c))
      return { ...state, wall_condition: action.payload, requires_treatment: hasDamp, waterproofing_required: hasDamp, primer_required: hasDamp }
    }
    case 'SET_PHOTO_UPLOADED':
      return { ...state, photo_uploaded: action.payload }
    case 'SET_SURFACE_TYPE':
      return { ...state, surface_type: action.payload }
    case 'SET_MEASUREMENT':
      return { ...state, ...action.payload }
    case 'SET_COLOUR_CHANGE': {
      const primer_required = action.payload === 'dark_to_light' || action.payload === 'new_wall' || state.primer_required
      return { ...state, colour_change_intensity: action.payload, primer_required }
    }
    case 'SET_STYLE':
      return { ...state, style_preference: action.payload }
    case 'SET_OCCASION':
      return { ...state, occasion: action.payload }
    case 'SET_LIGHTING':
      return { ...state, lighting: action.payload }
    case 'SET_COLOUR_FAMILIES':
      return { ...state, preferred_colour_families: action.payload }
    case 'SET_PALETTE':
      return { ...state, selected_palette_id: action.payload }
    case 'SET_QUALITY':
      return { ...state, quality_tier: action.payload }
    case 'SET_APPLICATION':
      return { ...state, application_method: action.payload }
    case 'DERIVE_RECOMMENDATIONS':
      return { ...state, ...deriveRecommendations(state) }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

interface AssistantContextValue {
  state: AssistantState
  dispatch: React.Dispatch<AssistantAction>
}

const AssistantContext = createContext<AssistantContextValue | null>(null)

const STORAGE_KEY = 'warnarumah_assistant'

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assistantReducer, initialState, (init) => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      return saved ? { ...init, ...JSON.parse(saved) } : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return (
    <AssistantContext.Provider value={{ state, dispatch }}>
      {children}
    </AssistantContext.Provider>
  )
}

export function useAssistant() {
  const ctx = useContext(AssistantContext)
  if (!ctx) throw new Error('useAssistant must be used within AssistantProvider')
  return ctx
}

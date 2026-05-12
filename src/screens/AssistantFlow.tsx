import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import StepProgress from '../components/layout/StepProgress'
import Button from '../components/ui/Button'
import { useAssistant } from '../context/AssistantContext'
import { useLanguage } from '../context/LanguageContext'

import Step1_ProjectType from './steps/Step1_ProjectType'
import Step2_RoomSelection from './steps/Step2_RoomSelection'
import Step3_UserGoal from './steps/Step3_UserGoal'
import Step4_WallCondition from './steps/Step4_WallCondition'
import Step5_SurfaceType from './steps/Step5_SurfaceType'
import Step6_Measurement from './steps/Step6_Measurement'
import Step7_ColourChange from './steps/Step7_ColourChange'
import Step8_StylePreference from './steps/Step8_StylePreference'
import Step9_Occasion from './steps/Step9_Occasion'
import Step10_Lighting from './steps/Step10_Lighting'
import Step11_ColourFamily from './steps/Step11_ColourFamily'

const TOTAL_STEPS = 11
// Map step number to display progress group (1-6 visible)
const STEP_GROUP = [0, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]

const steps = [
  null,
  Step1_ProjectType,
  Step2_RoomSelection,
  Step3_UserGoal,
  Step4_WallCondition,
  Step5_SurfaceType,
  Step6_Measurement,
  Step7_ColourChange,
  Step8_StylePreference,
  Step9_Occasion,
  Step10_Lighting,
  Step11_ColourFamily,
]

const NEXT_ROUTE: Record<number, string> = {
  11: '/panduan/rekomendasi-warna',
}

function SummaryPanel() {
  const { state } = useAssistant()

  return (
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-24 bg-white rounded-2xl border border-ink-500/10 p-5 shadow-sm">
        <div className="font-semibold text-ink-900 mb-4 text-sm">Rencana Anda Sejauh Ini</div>
        <div className="flex flex-col gap-3 text-sm">
          {state.project_type && (
            <div className="flex justify-between">
              <span className="text-ink-500">Proyek</span>
              <span className="font-medium text-ink-900 capitalize">{state.project_type}</span>
            </div>
          )}
          {state.area_type.length > 0 && (
            <div className="flex justify-between">
              <span className="text-ink-500">Area</span>
              <span className="font-medium text-ink-900 text-right max-w-[60%]">{state.area_type.slice(0, 2).join(', ')}</span>
            </div>
          )}
          {state.wall_condition.length > 0 && (
            <div className="flex justify-between">
              <span className="text-ink-500">Dinding</span>
              <span className="font-medium text-ink-900">{state.wall_condition[0]}</span>
            </div>
          )}
          {(state.room_length_m || state.known_wall_area_m2) && (
            <div className="flex justify-between">
              <span className="text-ink-500">Luas</span>
              <span className="font-medium text-forest-700">
                {state.known_wall_area_m2 ? `${state.known_wall_area_m2} m²` :
                  state.room_length_m && state.room_width_m ?
                    `${(2 * (state.room_length_m + state.room_width_m) * (state.wall_height_m ?? 3)).toFixed(0)} m² (kotor)` : '—'}
              </span>
            </div>
          )}
          {state.style_preference.length > 0 && (
            <div className="flex justify-between">
              <span className="text-ink-500">Gaya</span>
              <span className="font-medium text-ink-900">{state.style_preference[0]}</span>
            </div>
          )}
        </div>

        {state.requires_treatment && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-medium">
            Dinding butuh penanganan khusus
          </div>
        )}
        {state.primer_required && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 font-medium">
            Primer diperlukan
          </div>
        )}
      </div>
    </aside>
  )
}

export default function AssistantFlow() {
  const { stepId } = useParams<{ stepId: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { dispatch } = useAssistant()

  const currentStep = parseInt(stepId ?? '1', 10)
  const StepComponent = steps[currentStep]

  const stepTitles = [
    null,
    t.steps.s1.title,
    t.steps.s2.title,
    t.steps.s3.title,
    t.steps.s4.title,
    t.steps.s5.title,
    t.steps.s6.title,
    t.steps.s7.title,
    t.steps.s8.title,
    t.steps.s9.title,
    t.steps.s10.title,
    t.steps.s11.title,
  ]

  const stepHelpers = [
    null,
    t.steps.s1.helper,
    t.steps.s2.helper,
    t.steps.s3.helper,
    t.steps.s4.helper,
    t.steps.s5.helper,
    t.steps.s6.helper,
    t.steps.s7.helper,
    t.steps.s8.helper,
    t.steps.s9.helper,
    t.steps.s10.helper,
    t.steps.s11.helper,
  ]

  if (!StepComponent || currentStep < 1 || currentStep > TOTAL_STEPS) {
    navigate('/panduan/mulai/step/1')
    return null
  }

  const goBack = () => {
    if (currentStep === 1) {
      navigate('/panduan')
    } else {
      navigate(`/panduan/mulai/step/${currentStep - 1}`)
    }
  }

  const goNext = () => {
    dispatch({ type: 'SET_STEP', payload: currentStep + 1 })
    dispatch({ type: 'DERIVE_RECOMMENDATIONS' })

    if (NEXT_ROUTE[currentStep]) {
      navigate(NEXT_ROUTE[currentStep])
    } else {
      navigate(`/panduan/mulai/step/${currentStep + 1}`)
    }
  }

  return (
    <main id="main-content" className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <StepProgress current={STEP_GROUP[currentStep] ?? currentStep} total={6} />
        </div>

        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Back link */}
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 transition-colors mb-6 min-h-[44px]"
            >
              <ArrowLeft size={16} />
              {t.assistant.back}
            </button>

            {/* Step header */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">
                Langkah {currentStep} dari {TOTAL_STEPS}
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-ink-900 mb-2">
                {stepTitles[currentStep]}
              </h1>
              {stepHelpers[currentStep] && (
                <p className="text-sm text-ink-500">{stepHelpers[currentStep]}</p>
              )}
            </div>

            {/* Step content */}
            <StepComponent />

            {/* Mobile nav */}
            <div className="fixed bottom-0 left-0 right-0 h-[72px] bg-cream-50/95 backdrop-blur-sm border-t border-ink-500/10 flex items-center px-4 gap-3 lg:relative lg:bottom-auto lg:bg-transparent lg:border-0 lg:backdrop-blur-none lg:mt-8 z-20">
              <Button
                variant="outline"
                onClick={goBack}
                className="lg:hidden"
              >
                <ArrowLeft size={16} />
              </Button>
              <Button fullWidth onClick={goNext} size="lg" className="flex-1">
                {t.assistant.next}
                <ArrowRight size={18} />
              </Button>
            </div>

            {/* Spacer for fixed bar on mobile */}
            <div className="h-24 lg:h-0" />
          </div>

          {/* Sidebar */}
          <SummaryPanel />
        </div>
      </div>
    </main>
  )
}

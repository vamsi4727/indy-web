import { useState } from 'react'
import Tabs from '../../components/ui/Tabs'
import NumberInput from '../../components/ui/NumberInput'
import RadioCard from '../../components/ui/RadioCard'
import InputField from '../../components/ui/InputField'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'
import { calcWallArea } from '../../utils/calculator'

export default function Step6_Measurement() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()
  const s6 = t.steps.s6
  const [activeTab, setActiveTab] = useState('room')

  type MeasurementPayload = Partial<Pick<typeof state, 'room_length_m' | 'room_width_m' | 'wall_height_m' | 'doors_count' | 'windows_count' | 'known_wall_area_m2' | 'house_type_preset'>>
  const setM = (payload: MeasurementPayload) =>
    dispatch({ type: 'SET_MEASUREMENT', payload })

  const roomArea = state.room_length_m && state.room_width_m && state.wall_height_m
    ? calcWallArea(state.room_length_m, state.room_width_m, state.wall_height_m, state.doors_count, state.windows_count)
    : null

  const tabs = [
    {
      id: 'room',
      label: s6.tabRoom,
      content: (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <NumberInput
              id="length"
              label={s6.length}
              value={state.room_length_m ?? 0}
              onChange={v => setM({ room_length_m: v })}
              min={0} max={100} step={0.5}
              unit="m"
            />
            <NumberInput
              id="width"
              label={s6.width}
              value={state.room_width_m ?? 0}
              onChange={v => setM({ room_width_m: v })}
              min={0} max={100} step={0.5}
              unit="m"
            />
            <NumberInput
              id="height"
              label={s6.height}
              value={state.wall_height_m ?? 3}
              onChange={v => setM({ wall_height_m: v })}
              min={2} max={10} step={0.1}
              unit="m"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              id="doors"
              label={s6.doors}
              value={state.doors_count}
              onChange={v => setM({ doors_count: v })}
              min={0} max={20}
            />
            <NumberInput
              id="windows"
              label={s6.windows}
              value={state.windows_count}
              onChange={v => setM({ windows_count: v })}
              min={0} max={20}
            />
          </div>
          {roomArea !== null && roomArea > 0 && (
            <div className="bg-forest-50 border border-forest-700/20 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-ink-700">{s6.result}</div>
                <div className="text-xs text-ink-500">Sudah dikurangi pintu & jendela</div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-forest-700">{roomArea.toFixed(1)}</span>
                <span className="text-base text-ink-500 ml-1">{s6.sqm}</span>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'area',
      label: s6.tabArea,
      content: (
        <div className="max-w-xs">
          <InputField
            id="known-area"
            label={s6.area}
            type="number"
            min={1}
            value={state.known_wall_area_m2 ?? ''}
            onChange={e => setM({ known_wall_area_m2: parseFloat(e.target.value) || null })}
            trailingText={s6.sqm}
          />
        </div>
      ),
    },
    {
      id: 'preset',
      label: s6.tabPreset,
      content: (
        <div role="radiogroup" aria-label={s6.tabPreset} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {s6.presets.map(preset => (
            <RadioCard
              key={preset.value}
              value={preset.value}
              label={preset.label}
              desc={`~${preset.area} m²`}
              selected={state.house_type_preset === preset.value}
              onSelect={(v) => {
                const found = s6.presets.find(p => p.value === v)
                dispatch({
                  type: 'SET_MEASUREMENT',
                  payload: { house_type_preset: v, known_wall_area_m2: found?.area ?? null },
                })
              }}
            />
          ))}
        </div>
      ),
    },
  ]

  return <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
}

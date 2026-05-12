import { type ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  const activeTab = tabs.find(t => t.id === active)

  return (
    <div>
      <div role="tablist" className="flex gap-1 bg-cream-100 p-1 rounded-xl mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={[
              'flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 min-h-[40px]',
              active === tab.id
                ? 'bg-white text-forest-700 shadow-sm'
                : 'text-ink-500 hover:text-ink-900',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab && (
        <div
          id={`tabpanel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab.id}`}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  )
}

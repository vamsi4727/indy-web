import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="divide-y divide-ink-500/10">
      {items.map(item => (
        <div key={item.id}>
          <button
            type="button"
            aria-expanded={open === item.id}
            aria-controls={`accordion-${item.id}`}
            onClick={() => setOpen(open === item.id ? null : item.id)}
            className="flex items-center justify-between w-full py-4 text-left font-semibold text-ink-900 hover:text-forest-700 transition-colors min-h-[44px]"
          >
            <span>{item.title}</span>
            <ChevronDown
              size={18}
              className={[
                'shrink-0 text-ink-500 transition-transform duration-200',
                open === item.id ? 'rotate-180' : '',
              ].join(' ')}
            />
          </button>
          <div
            id={`accordion-${item.id}`}
            hidden={open !== item.id}
            className="pb-4 text-ink-700 text-sm leading-relaxed"
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}

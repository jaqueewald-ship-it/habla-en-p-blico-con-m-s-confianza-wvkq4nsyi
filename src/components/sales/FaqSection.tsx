import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { FAQ_ITEMS } from '@/data/productData'
import { HelpCircle } from 'lucide-react'

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-bold bg-amber-50 text-amber-900 border-amber-300"
          >
            <HelpCircle className="w-3.5 h-3.5 mr-1 text-amber-600 inline" />
            Preguntas Frecuentes
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
            Resolvemos todas tus dudas antes de empezar
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Todo lo que necesitas saber sobre el formato, la entrega en Google Drive y el método de
            los 21 días.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border-2 border-stone-800 rounded-xl px-4 sm:px-6 py-1 bg-stone-50 data-[state=open]:bg-white shadow-[2px_2px_0px_0px_rgba(28,25,23,0.8)]"
            >
              <AccordionTrigger className="text-left font-bold text-stone-900 text-sm sm:text-base hover:no-underline py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 text-xs sm:text-sm leading-relaxed pb-4 pt-1">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

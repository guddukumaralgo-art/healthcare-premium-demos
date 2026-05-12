import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is this the official website for SmileCare Dental Studio?',
    answer: 'No. This is an unofficial sample concept created only for design preview and outreach demonstration.',
  },
  {
    question: 'Does this page make medical claims?',
    answer: 'No. The copy focuses on user experience, contact clarity, and sample clinic positioning without promising outcomes.',
  },
  {
    question: 'Can visitors contact the sample clinic quickly?',
    answer: 'Yes. The demo includes call and WhatsApp actions across the homepage for a mobile-friendly inquiry flow.',
  },
  {
    question: 'Are the testimonials real patient reviews?',
    answer: 'No. They are clearly labeled sample-only testimonials used to preview layout and tone.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-teal-50/45 px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
      <div className="premium-blob absolute right-[-5rem] top-14 h-72 w-72 bg-teal-100/75" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative mb-14 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Frequently asked questions</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
            Practical answers for a compliant demo concept.
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
              className="overflow-hidden rounded-[1.35rem] border border-slate-100 bg-white p-5 shadow-card"
            >
              <button
                className="flex w-full items-center justify-between gap-4 text-left text-slate-950"
                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-cyan-700 transition ${activeIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <div className={`${activeIndex === index ? 'max-h-96 py-4' : 'max-h-0'} overflow-hidden transition-[max-height] duration-300`}>
                <p className="text-sm leading-7 text-slate-600">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

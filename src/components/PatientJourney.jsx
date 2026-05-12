import { motion } from 'framer-motion';
import { CalendarDays, ClipboardList, MessageCircle, Sparkles } from 'lucide-react';

const steps = [
  { title: 'Connect', description: 'Call or WhatsApp to request an appointment time.', icon: MessageCircle },
  { title: 'Visit', description: 'Arrive at a calm studio-style clinic environment.', icon: CalendarDays },
  { title: 'Discuss', description: 'Share concerns and review general care options with the doctor.', icon: ClipboardList },
  { title: 'Follow up', description: 'Leave with clear next-step communication for your visit.', icon: Sparkles },
];

export default function PatientJourney() {
  return (
    <section id="journey" className="bg-white px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Patient journey</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
            A thoughtful path from first contact to follow-up.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Simple steps designed for comfort and clarity, with measured language and a polished clinic experience.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }}
                className="relative rounded-[1.55rem] border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 p-3 text-cyan-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

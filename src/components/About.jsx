import { motion } from 'framer-motion';
import { Building2, MapPin, MessageCircle, UserRound } from 'lucide-react';
import clinic from '../data/smilecare.json';

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50/55 px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
      <div className="premium-blob absolute -left-28 top-24 h-72 w-72 bg-teal-100/70" />
      <div className="mx-auto max-w-7xl">
        <div className="relative grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-premium">
              <img
                src={clinic.heroImage}
                alt="SmileCare Dental Studio interior design preview"
                className="aspect-[5/4] w-full rounded-[1.55rem] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-5 right-5 rounded-[1.4rem] border border-cyan-100 bg-white/92 p-5 shadow-premium backdrop-blur-xl sm:left-6 sm:right-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Clinic profile</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{clinic.doctorName}</p>
              <p className="text-sm text-slate-600">{clinic.specialty} · {clinic.city}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 pt-10 lg:pt-0"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">About the concept</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
                A warm clinic story without exaggerated healthcare promises.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
                This homepage presents {clinic.clinicName} as a modern dental studio led by {clinic.doctorName}. The copy focuses on comfort, clarity, and contact convenience while staying clearly within sample-design boundaries.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: MapPin, label: 'City', value: clinic.city },
                { icon: UserRound, label: 'Doctor', value: clinic.doctorName },
                { icon: Building2, label: 'Type', value: clinic.businessType },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, delay: 0.06 }}
                    className="rounded-[1.35rem] border border-slate-100 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">{item.value}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="rounded-[1.5rem] border border-teal-100 bg-white p-6 shadow-card">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-950">Direct inquiry paths</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Call and WhatsApp actions remain visible across the page for outreach-ready browsing.</p>
                </div>
                <a href={clinic.whatsappHref} target="_blank" rel="noreferrer" className="premium-button bg-emerald-50 px-5 py-3 text-emerald-800 shadow-sm hover:bg-emerald-100 focus:ring-emerald-100">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

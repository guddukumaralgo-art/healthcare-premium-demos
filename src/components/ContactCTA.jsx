import { motion } from 'framer-motion';
import { MapPin, MessageCircle, Phone, Sparkles } from 'lucide-react';
import clinic from '../data/smilecare.json';

export default function ContactCTA() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-slate-950 via-cyan-950 to-teal-900 p-8 shadow-premium sm:p-12 lg:p-14">
        <div className="premium-blob absolute right-0 top-0 h-72 w-72 bg-cyan-300/20" />
        <div className="premium-blob absolute bottom-0 left-0 h-72 w-72 bg-violet-300/15" />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_340px] lg:items-center">
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Contact CTA
            </p>
            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
              Ready to preview a premium dental inquiry experience?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-cyan-50/80">
              This sample section keeps outreach direct with prominent contact actions for {clinic.clinicName} in {clinic.city}.
            </p>
          </div>

          <div className="relative space-y-4 rounded-[1.55rem] border border-white/10 bg-white/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-xl">
            <a href={clinic.phoneHref} className="flex items-center gap-4 rounded-full bg-white px-5 py-4 shadow-card transition duration-300 hover:-translate-y-1">
              <Phone className="h-5 w-5 text-cyan-700" />
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-semibold text-slate-950">{clinic.phoneDisplay}</p>
              </div>
            </a>
            <a href={clinic.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-full bg-emerald-50 px-5 py-4 shadow-card transition duration-300 hover:-translate-y-1">
              <MessageCircle className="h-5 w-5 text-emerald-700" />
              <div>
                <p className="text-sm text-emerald-700/70">WhatsApp</p>
                <p className="font-semibold text-emerald-950">Chat now</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-full bg-white/10 px-5 py-4 text-white">
              <MapPin className="h-5 w-5 text-cyan-200" />
              <div>
                <p className="text-sm text-cyan-50/70">City</p>
                <p className="font-semibold">{clinic.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

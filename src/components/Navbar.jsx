import { Phone, Sparkles } from 'lucide-react';
import clinic from '../data/smilecare.json';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Trust', href: '#trust' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 px-3 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/80 bg-white/82 px-3 py-3 shadow-card backdrop-blur-2xl sm:px-4">
        <a href="#top" className="flex items-center gap-3 text-base font-semibold tracking-normal text-slate-950">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-300 text-slate-950 shadow-lg shadow-cyan-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="hidden sm:inline">{clinic.clinicName}</span>
          <span className="sm:hidden">{clinic.shortName}</span>
        </a>

        <div className="hidden rounded-full border border-slate-100 bg-slate-50/70 px-4 py-3 md:flex md:gap-7">
          {links.map(link => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-cyan-700">
              {link.label}
            </a>
          ))}
        </div>

        <a href={clinic.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-700 sm:px-5">
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">{clinic.phoneDisplay}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </nav>
  );
}

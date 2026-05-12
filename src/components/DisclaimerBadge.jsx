import defaultClinic from '../data/smilecare.json';

export default function DisclaimerBadge({ text }) {
  const message = text || defaultClinic.disclaimer;
  return (
    <div className="relative z-50 border-b border-slate-100/70 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-2 sm:px-6 lg:px-8">
        <p className="rounded-full border border-amber-100 bg-amber-50/80 px-4 py-1.5 text-center text-xs font-medium text-amber-800 shadow-sm">
          {message}
        </p>
      </div>
    </div>
  );
}

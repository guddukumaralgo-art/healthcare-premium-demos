import clinic from '../data/smilecare.json';

export default function DisclaimerBadge() {
  return (
    <div className="border-b border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-violet-50 text-sm text-slate-600">
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-3 sm:px-6 lg:px-8">
        <p className="rounded-full border border-cyan-100 bg-white/80 px-4 py-2 text-center font-medium shadow-sm">
          {clinic.disclaimer}
        </p>
      </div>
    </div>
  );
}

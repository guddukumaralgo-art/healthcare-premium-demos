import clinic from '../data/smilecare.json';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>{clinic.clinicName} — {clinic.disclaimer}</p>
        <p>{clinic.city} · {clinic.specialty} demo</p>
      </div>
    </footer>
  );
}

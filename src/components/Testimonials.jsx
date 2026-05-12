import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    author: 'Sample visitor persona',
    title: 'Demo feedback',
    quote: 'The page makes it easy to understand how to contact the clinic and what the first step could look like.',
  },
  {
    author: 'Sample patient persona',
    title: 'Demo feedback',
    quote: 'The design feels calm and modern, with reassuring copy that does not overstate treatment outcomes.',
  },
  {
    author: 'Sample family persona',
    title: 'Demo feedback',
    quote: 'The call and WhatsApp options are visible without making the page feel crowded or sales-heavy.',
  },
];

export default function Testimonials() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
      <div className="premium-blob absolute -left-20 top-20 h-60 w-60 bg-cyan-100/70" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative mb-14 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Sample-only testimonials</p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
            Clearly marked demo feedback for preview context.
          </h2>
        </div>
        <div className="rounded-full border border-violet-100 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800">
          Sample copy, not real reviews.
        </div>
      </motion.div>

      <div className="relative grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.article
            key={testimonial.author}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }}
            className="rounded-[1.55rem] border border-slate-100 bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium"
          >
            <Quote className="mb-6 h-8 w-8 text-cyan-600" />
            <p className="text-lg leading-8 text-slate-700">“{testimonial.quote}”</p>
            <div className="mt-6 text-sm text-slate-500">
              <p className="font-semibold text-slate-950">{testimonial.author}</p>
              <p>{testimonial.title}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

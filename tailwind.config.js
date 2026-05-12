export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#ffffff',
        soft: '#e0f2fe',
        glow: '#99f6e4',
      },
      boxShadow: {
        soft: '0 30px 100px rgba(15, 23, 42, 0.11)',
        card: '0 18px 55px rgba(15, 23, 42, 0.08)',
        premium: '0 30px 100px rgba(15, 23, 42, 0.13)',
        glow: '0 24px 80px rgba(8, 145, 178, 0.18)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at 12% 8%, rgba(125, 211, 252, 0.42), transparent 30rem), radial-gradient(circle at 78% 4%, rgba(196, 181, 253, 0.30), transparent 25rem), radial-gradient(circle at 58% 82%, rgba(153, 246, 228, 0.26), transparent 24rem), linear-gradient(135deg, #ffffff 0%, #f0fdff 44%, #f8f5ff 100%)',
      },
    },
  },
  plugins: [],
};

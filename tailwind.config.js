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
        'accent-glow': '0 8px 32px var(--accent-glow, rgba(34,211,238,0.35))',
        'white-glow': '0 0 40px rgba(255,255,255,0.15)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at 12% 8%, rgba(125, 211, 252, 0.42), transparent 30rem), radial-gradient(circle at 78% 4%, rgba(196, 181, 253, 0.30), transparent 25rem), radial-gradient(circle at 58% 82%, rgba(153, 246, 228, 0.26), transparent 24rem), linear-gradient(135deg, #ffffff 0%, #f0fdff 44%, #f8f5ff 100%)',
        'mesh-gradient':
          'radial-gradient(at 40% 20%, rgba(125, 211, 252, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(196, 181, 253, 0.25) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(153, 246, 228, 0.2) 0px, transparent 50%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2.5s infinite',
        'float-slow': 'float 9s ease-in-out 1s infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'spin-slow': 'spin 14s linear infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'slide-up': 'slide-up 0.55s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '1' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(-3px)' },
          '50%': { transform: 'translateY(3px)' },
        },
      },
    },
  },
  plugins: [],
};

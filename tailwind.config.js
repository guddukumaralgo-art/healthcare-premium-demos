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
        soft:        '0 30px 100px rgba(15, 23, 42, 0.11)',
        card:        '0 4px 6px rgba(15,23,42,0.04), 0 12px 40px rgba(15,23,42,0.07)',
        'card-md':   '0 4px 6px rgba(15,23,42,0.05), 0 20px 48px rgba(15,23,42,0.09)',
        premium:     '0 8px 12px rgba(15,23,42,0.05), 0 32px 80px rgba(15,23,42,0.12)',
        'premium-lg':'0 12px 20px rgba(15,23,42,0.06), 0 48px 100px rgba(15,23,42,0.14)',
        glow:        '0 24px 80px rgba(8, 145, 178, 0.18)',
        'float-card':
          '0 2px 0 rgba(255,255,255,1) inset, 0 32px 72px rgba(15,23,42,0.10), 0 8px 24px rgba(15,23,42,0.06)',
        'accent-glow':
          '0 0 0 3px var(--accent-soft, rgba(34,211,238,0.2)), 0 8px 28px rgba(15,23,42,0.14), 0 0 24px var(--accent-glow, rgba(34,211,238,0.28))',
        'white-inner':
          '0 1px 0 rgba(255,255,255,0.95) inset, 0 -1px 0 rgba(255,255,255,0.3) inset',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at 12% 8%, rgba(125,211,252,0.38), transparent 30rem), radial-gradient(circle at 78% 4%, rgba(196,181,253,0.26), transparent 25rem), radial-gradient(circle at 58% 82%, rgba(153,246,228,0.22), transparent 24rem), linear-gradient(135deg,#ffffff 0%,#f0fdff 44%,#f8f5ff 100%)',
        'mesh-gradient':
          'radial-gradient(at 40% 20%, rgba(125,211,252,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(196,181,253,0.22) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(153,246,228,0.18) 0px, transparent 50%)',
      },
      fontSize: {
        'display-sm': ['2.875rem',  { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-md': ['3.75rem',   { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'display-lg': ['5.25rem',   { lineHeight: '0.96', letterSpacing: '-0.03em' }],
        'display-xl': ['6rem',      { lineHeight: '0.93', letterSpacing: '-0.035em' }],
      },
      animation: {
        float:           'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2.5s infinite',
        'float-slow':    'float 9s ease-in-out 1.2s infinite',
        shimmer:         'shimmer 2.2s linear infinite',
        'gradient-x':    'gradient-x 8s ease infinite',
        'spin-slow':     'spin 14s linear infinite',
        'pulse-ring':    'pulse-ring 2.5s cubic-bezier(0.215,0.61,0.355,1) infinite',
        'bounce-subtle': 'bounce-subtle 2.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-10px) rotate(0.5deg)' },
          '66%':     { transform: 'translateY(-6px)  rotate(-0.3deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(0.85)', opacity: '1' },
          '100%': { transform: 'scale(1.9)',  opacity: '0' },
        },
        'bounce-subtle': {
          '0%,100%': { transform: 'translateY(-2px)' },
          '50%':     { transform: 'translateY(2px)'  },
        },
      },
    },
  },
  plugins: [],
};

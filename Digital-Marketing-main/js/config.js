// Guard against Tailwind CDN failures so we don't throw when offline.
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: '#00F0FF', // Neon Cyan
          secondary: '#7000FF', // Electric Purple
          accent: '#FF006E', // Hot Pink
          success: '#00FF88', // Neon Green
          warning: '#FFB800', // Golden Yellow
          dark: '#050505', // Deep Void
          charcoal: '#0A0A0A',
          surface: '#111111',
          light: '#F5F5F5',
          muted: '#888888',
        },
        fontFamily: {
          sans: ['Space Grotesk', 'sans-serif'],
          display: ['Space Grotesk', 'sans-serif'],
          arabic: ['Tajawal', 'sans-serif'],
          serif: ['Playfair Display', 'serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        animation: {
          'spin-slow': 'spin 10s linear infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 6s ease-in-out infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
          'slide-up': 'slideUp 0.6s ease-out forwards',
          'slide-down': 'slideDown 0.6s ease-out forwards',
          'fade-in': 'fadeIn 0.8s ease-out forwards',
          'scale-in': 'scaleIn 0.5s ease-out forwards',
          'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          glow: {
            '0%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' },
            '100%': { boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)' },
          },
          slideUp: {
            '0%': { opacity: '0', transform: 'translateY(30px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideDown: {
            '0%': { opacity: '0', transform: 'translateY(-30px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          scaleIn: {
            '0%': { opacity: '0', transform: 'scale(0.9)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
          bounceSoft: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
        transitionTimingFunction: {
          smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
          bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        },
      },
    },
  };
} else {
  console.warn('Tailwind CDN failed to load; using default styles without custom config.');
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'dancing': ['"Dancing Script"', 'cursive'],
        'playfair': ['"Playfair Display"', 'serif'],
      },
      colors: {
        rose: {
          blush: '#FFB7C5',
          soft: '#FFDDE4',
          deep: '#E8527A',
        },
        lavender: {
          light: '#E8D5F5',
          soft: '#C9B1E8',
          deep: '#9B72CF',
        },
        cream: '#FFF8F0',
        petal: '#FFE4EC',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'heart-beat': 'heartBeat 1.4s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 82, 122, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 82, 122, 0.8), 0 0 80px rgba(232, 82, 122, 0.3)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.3, transform: 'scale(0.5)' },
        },
        heartBeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

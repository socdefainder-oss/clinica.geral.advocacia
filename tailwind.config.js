/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta institucional: azul petróleo profundo + dourado discreto + verde sofisticado
        petrol: {
          50: '#eef6f9',
          100: '#d4e6ee',
          200: '#a6cad9',
          300: '#6fa6bd',
          400: '#3d7e9c',
          500: '#1f5e7d',
          600: '#134a66',
          700: '#0f3b53',
          800: '#0c2e41',
          900: '#0a2433',
          950: '#061722',
        },
        gold: {
          400: '#e2c578',
          500: '#cda94f',
          600: '#b8923a',
        },
        sage: {
          400: '#5fb39a',
          500: '#3f9b80',
          600: '#2f7d66',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(10, 36, 51, 0.25)',
        glow: '0 0 60px -10px rgba(205, 169, 79, 0.35)',
        card: '0 20px 50px -20px rgba(10, 36, 51, 0.45)',
      },
      backgroundImage: {
        'grid-petrol':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}

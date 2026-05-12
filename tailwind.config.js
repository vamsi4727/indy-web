/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          50: '#e8f0ec',
          100: '#c4d8cc',
          200: '#8db09b',
          300: '#5a8f6e',
          500: '#2d7a5a',
          700: '#1a4a3a',
          800: '#123326',
          900: '#0b2219',
        },
        cream: {
          50: '#fdf8f0',
          100: '#f5ead5',
          200: '#ead4ac',
          300: '#d9bb85',
        },
        terra: {
          300: '#e08050',
          400: '#c4622d',
          500: '#a84d20',
          600: '#8c3d17',
        },
        gold: {
          300: '#e0b84a',
          400: '#c9952a',
          500: '#a87b1f',
        },
        ink: {
          900: '#1a1e1f',
          700: '#3d4549',
          500: '#6b7280',
        },
      },
      backgroundImage: {
        'paint-stroke': "url(\"data:image/svg+xml,%3Csvg...%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

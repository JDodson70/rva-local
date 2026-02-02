import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brick: {
          50: '#fef2f2',
          100: '#fde6e6',
          200: '#fbd0d0',
          300: '#f7abab',
          400: '#f07878',
          500: '#e54848',
          600: '#d12929',
          700: '#9B2C2C',
          800: '#822525',
          900: '#6c2424',
        },
        cream: {
          DEFAULT: '#FAF5EF',
          50: '#FFFFFF',
          100: '#FAF5EF',
          200: '#F0E6D8',
          300: '#E6D7C1',
        },
        forest: {
          50: '#f3f6f0',
          100: '#e4eadd',
          200: '#c9d6bc',
          300: '#a5bb92',
          400: '#7f9c67',
          500: '#5f7d49',
          600: '#2D5016',
          700: '#254413',
          800: '#1f3710',
          900: '#1a2e0e',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#999999',
          400: '#666666',
          500: '#4d4d4d',
          600: '#333333',
          700: '#1A1A1A',
          800: '#0d0d0d',
          900: '#000000',
        },
      },
      fontFamily: {
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('/textures/paper.png')",
        'concrete-texture': "url('/textures/concrete.png')",
      },
    },
  },
  plugins: [],
}
export default config

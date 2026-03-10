import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', ...fontFamily.sans],
        display: ['Playfair Display', ...fontFamily.serif]
      },
      colors: {
        background: '#0c0c0f',
        surface: '#13131a',
        accent: '#d4af37',
        accentSoft: '#e8d8a6',
        muted: '#a8a8b3'
      },
      boxShadow: {
        soft: '0 20px 60px rgba(0,0,0,0.45)',
        glow: '0 10px 30px rgba(212,175,55,0.25)'
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(135deg, rgba(12,12,15,0.75), rgba(19,19,26,0.85)), url(/images/hero.jpg)'
      }
    }
  },
  plugins: []
};

export default config;

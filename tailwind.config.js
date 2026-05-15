/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          DEFAULT: '#6F4E37',
          light: '#8B6347',
          dark: '#4A3425',
          deeper: '#2C1F15',
        },
        beige: {
          DEFAULT: '#F5E6D3',
          light: '#FAF0E6',
          dark: '#E8D0B8',
        },
        cream: {
          DEFAULT: '#FFF8F0',
          dark: '#F5EDE0',
        },
        soft: {
          black: '#1E1E1E',
          gray: '#4A4A4A',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Poppins', 'sans-serif'],
        accent: ['Outfit', 'sans-serif'],
        mono: ['Manrope', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'cursor-glow': 'cursorGlow 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'waveform': 'waveform 1.2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        waveform: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '20px' },
        },
      },
      backgroundImage: {
        'coffee-gradient': 'linear-gradient(135deg, #2C1F15 0%, #4A3425 40%, #6F4E37 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFF8F0 0%, #F5E6D3 100%)',
        'hero-gradient': 'radial-gradient(ellipse at 60% 40%, #F5E6D3 0%, #FFF8F0 50%, #FAF0E6 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

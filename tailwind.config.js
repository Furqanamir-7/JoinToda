/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0A0A0A',
          secondary: '#111111',
          card: '#171717',
          elevated: '#1E1E1E',
        },
        accent: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          glow: 'rgba(59,130,246,0.15)',
        },
        border: {
          subtle: 'rgba(255,255,255,0.08)',
          accent: 'rgba(59,130,246,0.4)',
        },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

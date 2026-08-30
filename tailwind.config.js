export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        canvas: '#F5F7F4',
        surface: '#FFFFFF',
        line: '#E3E8E3',
        ink: {
          DEFAULT: '#0D1A14',
          muted: '#576760',
          soft: '#8B9A92',
        },
        forest: {
          50: '#EFF6F2',
          100: '#D9EBE1',
          200: '#B0D4C1',
          300: '#7FB79B',
          400: '#4E9576',
          500: '#2E7A5B',
          600: '#1F6247',
          700: '#164B37',
          800: '#0E3527',
          900: '#082019',
        },
        clay: {
          50: '#FDF4EC',
          100: '#FAE7D5',
          300: '#EFBE93',
          500: '#D2762F',
          600: '#B05C1F',
        },
        gold: {
          50: '#FDF8E7',
          100: '#F8EFC6',
          500: '#B99219',
        },
        alert: {
          50: '#FCEEEB',
          100: '#F8DAD3',
          500: '#C0412C',
          600: '#9C3222',
        },
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(13, 26, 20, 0.04), 0 8px 24px -16px rgba(13, 26, 20, 0.18)',
        pop: '0 12px 40px -12px rgba(13, 26, 20, 0.28)',
      },
    },
  },
}

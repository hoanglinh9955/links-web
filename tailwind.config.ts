import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'bluePurple': {
          50: '#edf1ff',
          100: '#dde6ff',
          200: '#c3cfff',
          300: '#9eafff',
          400: '#7784ff',
          500: '#575bfd',
          600: '#4339f2',
          700: '#392cd6',
          800: '#2f27ac',
          900: '#2b2788',
          950: '#1b174f',
        },
        'soft-amber': {
          50: '#f8f6f4',
          100: '#efece5',
          200: '#ded7ca',
          300: '#cfc4b1',
          400: '#b39f84',
          500: '#a3896c',
          600: '#967960',
          700: '#7d6351',
          800: '#675245',
          900: '#54443a',
          950: '#2c231e',
        },

      },
    },
  },
}

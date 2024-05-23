import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        bluePurple: {
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
        parchment: {
          50: '#f9f6ed',
          100: '#f1ead2',
          200: '#e4d3a4',
          300: '#d3b671',
          400: '#c69b49',
          500: '#e4d3a4',
          600: '#9d6b31',
          700: '#7e502a',
          800: '#6a4229',
          900: '#5b3928',
          950: '#341d14',
        },
        salomie: {
          50: '#fef9ec',
          100: '#faeecb',
          200: '#f4d686',
          300: '#f0c259',
          400: '#ecab33',
          500: '#e58b1b',
          600: '#ca6915',
          700: '#a84a15',
          800: '#893a17',
          900: '#713016',
          950: '#401708',
        },
      },
    },
  },
}

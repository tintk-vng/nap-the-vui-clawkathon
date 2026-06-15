/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'white-500': '#FFFFFF',
        'green-500': '#00CF6A',
        'green-600': '#00A856',
        'green-700': '#007C40',
        'red-50': '#FCE8EC',
        'red-500': '#E3173C',
        'orange-50': '#FFF6D3',
        'orange-500': '#FF8D00',
        'blue-25': '#E7F6FF',
        'blue-50': '#D3EEFF',
        'blue-500': '#0033C9',
        'blue-800': '#001F7A',
        'dark-25': '#F2F4F5',
        'dark-50': '#E6E9EC',
        'dark-100': '#CCD2D8',
        'dark-200': '#99A5B2',
        'dark-300': '#66798B',
        'dark-400': '#334C65',
        'dark-500': '#001F3E',
        'dark-700': '#001325'
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0, 31, 62, 0.05)'
      },
      fontSize: {
        'heading-sm': ['1rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        'heading-md': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        'heading-lg': ['1.5rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'label-xs': ['10px', '12px'],
        'label-sm': ['0.75rem', '1rem'],
        'label-md': ['0.875rem', '18px'],
        'label-lg': ['1rem', '1.25rem']
      }
    }
  },
  plugins: []
}

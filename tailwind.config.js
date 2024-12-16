/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          light: '#4f46e5',
          DEFAULT: '#4338ca',
          dark: '#3730a3'
        },
        'secondary': {
          light: '#3b82f6',
          DEFAULT: '#2563eb',
          dark: '#1e3a8a'
        },
        'background': {
          light: '#f4f5f7',
          DEFAULT: '#e5e7eb',
          dark: '#d1d5db'
        },
        'text-primary': {
          light: '#1f2937',
          DEFAULT: '#111827',
          dark: '#000000'
        },
        'gradient-start': '#dbeafe',
        'gradient-end': '#93c5fd'
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'button-hover': '0 4px 6px rgba(0, 0, 0, 0.2)'
      },
      transitionProperty: {
        'default': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform'
      },
      borderRadius: {
        'input': '0.375rem',
        'button': '0.5rem',
        'card': '1rem'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
/** @type {import('tailwindcss').Config} */



module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
    extend: {
      colors: {
        twitterBlue: 'var(--twitter-blue)',
        twitterBorder: 'var(--twitter-border)',
        twitterHover: 'var(--twitter-text)',
        dimBackGround: 'var(--dim-background)',
        twitterBlack: 'var(--twitter-black)',
        twitterRed: 'var(--twitter-red)',
        twitterYellow: 'var(--twitter-yellow)',
        twitterPurple: 'var(--twitter-purple)',
        twitterGreen: 'var(--twitter-green)'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: '#1C9BF0 transparent',
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '2px',
          height: '2px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          backgroundColor: '#1C9BF0',
          borderRadius: '1px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: 'transparent',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ]
};
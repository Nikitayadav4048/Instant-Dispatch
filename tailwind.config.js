


/* eslint-disable no-undef */
//tailwind.config.js 
module.exports ={
  corePlugins:{
    preflight:false,//Disable Tailwind's preflight
  },
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme:{
    extend:{
      colors: {
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#F8AD42',
          500: '#F8AD42',
          600: '#F8AD42',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        }
      }
    },
  },
  plugins:[],
}
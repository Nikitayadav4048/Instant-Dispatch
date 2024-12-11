


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
    extend:{},
  },
  plugins:[],
}
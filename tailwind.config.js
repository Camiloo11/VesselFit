/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Paleta VesselFit (tema oscuro + acentos dorados de los diseños)
        background: '#0C0A09', // fondo principal casi negro
        surface: '#1C1917', // tarjetas y paneles
        'surface-light': '#292524', // bordes y separadores
        gold: {
          DEFAULT: '#F4CE4B', // botones y acentos principales
          muted: '#C9A227', // dorado apagado para detalles
        },
        cream: '#FAFAF9', // texto principal
        sage: '#7BC496', // acentos verdes (kcal, tipo de entrenamiento)
      },
    },
  },
  plugins: [],
};

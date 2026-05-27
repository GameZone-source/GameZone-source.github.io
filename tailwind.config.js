/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './data/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070713',
        panel: '#101026',
        panelSoft: '#171833',
        line: '#2A2B50',
        violet: '#8B5CF6',
        cyan: '#22D3EE',
        mint: '#10B981',
        amber: '#F59E0B'
      },
      boxShadow: {
        surface: '0 14px 34px rgba(0, 0, 0, 0.18)',
        lift: '0 18px 42px rgba(0, 0, 0, 0.24)',
        neon: '0 0 20px rgba(34, 211, 238, 0.10)'
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'Arial', 'sans-serif'],
        display: ['Orbitron', 'Manrope', 'sans-serif']
      }
    }
  },
  plugins: []
}

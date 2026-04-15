/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
  		keyframes: {
  			shake: {
  				'0%, 100%': { transform: 'translateX(0)' },
  				'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
  				'20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
  			},
  			'slide-in': {
  				'0%': { transform: 'translateX(100%)', opacity: '0' },
  				'100%': { transform: 'translateX(0)', opacity: '1' },
  			},
  		},
  		animation: {
  			shake: 'shake 0.5s ease-in-out',
  			'slide-in': 'slide-in 0.3s ease-out',
  		},
  	}
  },
  plugins: [import("tailwindcss-animate")],
}


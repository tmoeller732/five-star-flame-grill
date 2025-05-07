
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				grill: {
					gold: '#E2B13C',
					orange: '#FF9D00',
					brown: '#3C2415',
					black: '#121212',
					cream: '#F5F5DC'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'flame': {
					'0%, 100%': { 
						transform: 'scale(1) rotate(-2deg)',
						filter: 'brightness(1)'
					},
					'50%': { 
						transform: 'scale(1.05) rotate(2deg)',
						filter: 'brightness(1.1)'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'flame-intense': {
					'0%, 100%': { 
						transform: 'scale(0.95) rotate(-3deg)',
						filter: 'brightness(1) blur(0px)'
					},
					'25%': { 
						transform: 'scale(1.05) rotate(1deg)',
						filter: 'brightness(1.2) blur(1px)'
					},
					'50%': { 
						transform: 'scale(1) rotate(-1deg)',
						filter: 'brightness(1.1) blur(0px)'
					},
					'75%': { 
						transform: 'scale(1.03) rotate(2deg)',
						filter: 'brightness(1.3) blur(1px)'
					}
				},
				'ember-float': {
					'0%': { 
						transform: 'translate(0, 0) scale(1)', 
						opacity: '1' 
					},
					'100%': { 
						transform: 'translate(10px, -20px) scale(0)', 
						opacity: '0'
					}
				},
				'ember-float-alt': {
					'0%': { 
						transform: 'translate(0, 0) scale(1)', 
						opacity: '1' 
					},
					'100%': { 
						transform: 'translate(-10px, -15px) scale(0)', 
						opacity: '0'
					}
				},
				'ember-float-slow': {
					'0%': { 
						transform: 'translate(0, 0) scale(1)', 
						opacity: '1' 
					},
					'100%': { 
						transform: 'translate(5px, -25px) scale(0)', 
						opacity: '0'
					}
				},
				'glow-pulse': {
					'0%, 100%': { 
						opacity: '0.3',
						transform: 'scale(0.95)'
					},
					'50%': { 
						opacity: '0.5',
						transform: 'scale(1.05)'
					}
				},
				'marquee': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flame': 'flame 3s ease-in-out infinite',
				'flame-slow': 'flame 4s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'spin': 'spin 1s linear infinite',
				'flame-intense': 'flame-intense 2s ease-in-out infinite',
				'ember-1': 'ember-float 2s ease-out forwards infinite',
				'ember-2': 'ember-float-alt 2.5s ease-out forwards infinite',
				'ember-3': 'ember-float-slow 3s ease-out forwards infinite',
				'glow': 'glow-pulse 2s ease-in-out infinite',
				'marquee': 'marquee 30s linear infinite'
			},
			rotate: {
				'360': '360deg'
			},
			fontFamily: {
				'playfair': ['"Playfair Display"', 'serif'],
				'raleway': ['Raleway', 'sans-serif']
			},
			backgroundImage: {
				'hero-pattern': "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/public/lovable-uploads/1769fc8b-f400-416e-ad38-c763a0dfa09a.png')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

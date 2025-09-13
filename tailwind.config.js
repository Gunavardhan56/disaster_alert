/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        data: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: 'var(--color-border)', /* slate-400 with opacity */
        input: 'var(--color-input)', /* slate-800 */
        ring: 'var(--color-ring)', /* red-600 */
        background: 'var(--color-background)', /* slate-900 */
        foreground: 'var(--color-foreground)', /* slate-50 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* red-600 */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* blue-700 */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-700 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* slate-700 */
          foreground: 'var(--color-muted-foreground)', /* slate-400 */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* amber-500 */
          foreground: 'var(--color-accent-foreground)', /* slate-900 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* slate-800 */
          foreground: 'var(--color-popover-foreground)', /* slate-50 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* slate-800 */
          foreground: 'var(--color-card-foreground)', /* slate-50 */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-600 */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-600 */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-700 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-alert": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "connection-pulse": {
          "0%, 100%": { borderColor: "var(--color-success)" },
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-alert": "pulse-alert 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "connection-pulse": "connection-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      boxShadow: {
        'elevation': '0 1px 3px rgba(0,0,0,0.12)',
        'elevation-md': '0 4px 6px rgba(0,0,0,0.12)',
        'elevation-lg': '0 10px 15px rgba(0,0,0,0.12)',
      },
      transitionTimingFunction: {
        'emergency': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
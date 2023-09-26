/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                green: '#2CA062',
                gray: '#747474',
            },
            borderRadius: {
                input: '14px',
            },
        },
    },
    plugins: [],
}

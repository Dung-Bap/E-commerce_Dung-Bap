/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'public/index.html'],
    theme: {
        fontFamily: {
            main: ['Poppins', 'sans-serif', 'Montserrat', 'Roboto'],
        },
        extend: {
            width: {
                main: '1220px',
            },
            backgroundColor: {
                main: '#ee3131',
            },
            colors: {
                main: '#ee3131',
            },
            gridTemplateRows: {
                10: 'repeat(10, minmax(0, 1fr))',
                layout: '200px minmax(900px, 1fr) 100px',
            },
            gridRow: {
                'span-7': 'span 7 / span 8',
            },
        },
        keyframes: {
            'slide-top': {
                '0%': {
                    '-webkit-transform': 'translateY(20px);',
                    transform: 'translateY(20px);',
                },
                '100%': {
                    '-webkit-transform': 'translateY(0);',
                    transform: 'translateY(0);',
                },
            },
            'slide-left': {
                '0%': {
                    '-webkit-transform': 'translateX(400px);',
                    opacity: 0,
                    transform: 'translateX(400px);',
                },
                '100%': {
                    '-webkit-transform': ' translateX(0);',
                    opacity: 1,
                    transform: ' translateX(0);',
                },
            },
            'slide-right': {
                '0%': {
                    '-webkit-transform': 'translateX(-400px);',
                    opacity: 0,
                    transform: 'translateX(-400px);',
                },
                '100%': {
                    '-webkit-transform': ' translateX(0);',
                    opacity: 1,
                    transform: ' translateX(0);',
                },
            },
            spin: {
                from: {
                    transform: 'rotate(0deg);',
                },
                to: {
                    transform: 'rotate(360deg);',
                },
            },
            pulse: {
                '0%, 100%': {
                    opacity: '1;',
                },
                '50%': {
                    ' opacity ': '.5;',
                },
            },
        },
        animation: {
            'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
            'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
            'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
            spin: 'spin 1s linear infinite;',
            pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
};

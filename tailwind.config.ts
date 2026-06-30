import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { boxShadow: { soft: '0 24px 80px rgba(82,64,130,.13)' } } },
  plugins: []
};
export default config;

/* Single source of truth for Tailwind (theme colours, fonts, plugins). Netlify rebuilds tw.css from this on every deploy. */
module.exports = Object.assign({
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "background": "#F6F2E8",
            "surface": "#F6F2E8",
            "surface-card": "#FFFFFF",
            "surface-container": "#FFFFFF",
            "surface-container-high": "#EFE9DA",
            "surface-variant": "#E6E0D0",
            "outline-variant": "#CFC8B4",
            "primary-gold": "#9A7410",
            "primary-container": "#DEB74C",
            "on-primary-container": "#000000",
            "secondary-green": "#0A8A3C",
            "secondary-container": "#0A8A3C",
            "on-secondary-container": "#E8FFF0",
            "silver": "#767676",
            "bronze": "#A5611C",
            "on-surface": "#1B1A14",
            "on-surface-variant": "#5A5546",
            "text-muted": "#6B6757",
            "ink": "rgb(var(--ink-rgb) / <alpha-value>)"
          },
          fontFamily: {
            "display": ["Sora", "sans-serif"],
            "body": ["Hanken Grotesk", "sans-serif"],
            "mono": ["JetBrains Mono", "monospace"]
          }
        }
      }
    }, {
  content: ['../index.html', '../*.js'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
});

# ZetuRoots change list

## Done (branch `perf-load`)
- Faster first load: removed the Tailwind CDN script (render-blocking), the duplicate Google Fonts `@import` in app.css, and blocking text-font CSS; icon font uses display=block so icon names never flash as words
- Logo 152 KB to 14 KB; images lazy-load and request WebP/AVIF from Unsplash (`auto=format`)
- Service worker: network-first but falls back to cache after 3 s on slow connections (cache v1.15.0)
- Netlify now builds `tw.css` on every deploy (`netlify.toml` build command), so new Tailwind classes work without a manual rebuild. Tailwind settings live only in `tools/tailwind.config.js`
- Images and icons cached for a week

## Done (branch `light-glass`)
- Light glass theme: cream canvas with soft gold and green light, frosted top bar, nav, player, menus and modals
- Fixed blank pages: the Profile section was never closed, so 24 pages (Channels, About, Library, Login, Podcasts and more) sat inside it and vanished whenever Profile was hidden
- Broken or blocked images now show a gold music tile instead of alt text (`zr-ui.js`)
- Pages that fail to load show a Retry bar instead of staying blank; home trending shows a loading shimmer
- App shell (HTML, CSS, JS) is now network-first in the service worker, so users never get old and new files mixed
- Prebuilt `tw.css` paints instantly (no unstyled flash). After adding new Tailwind classes, run `cd tools && npm install && npm run build:css`. Keep the `theme` block in `tools/tailwind.config.js` the same as the one in `index.html`

## Done (branch `youtube-links`)
- Brand reskin: black, metallic gold and green, new logo and launch icons
- Supabase backend: profiles, genres, links library, playlists, coin wallet, gifts, play counting, artist stats, cash-out requests
- Email login, YouTube "Add a link", YouTube audio/video player, playlists
- Compact button styling

## Requested next
- [x] Chat between users (rooms and direct messages; pages built)
- [x] Follow (page built)
- [x] Subscribe: free bell alerts and fan clubs (paid joining waits on M-Pesa)

## Backlog
### Old features with no working backend (still call the missing `/api/...` server)
- [ ] Events and tickets with QR check-in
- [ ] Subscriptions and "Go Ad-Free"
- [ ] Brand ads engine
- [x] Browse pages on the database: home trending, Top 100, genres, artists, mixtapes, podcasts, labels
- [ ] Reactions

### Money
- [ ] M-Pesa Daraja: payment prompt, callback, payouts (needs Daraja credentials)
- [x] Wallet page: balance, coin packs, activity, gift history, cash-outs (M-Pesa top-up button waits on Daraja)

### Running the platform
- [x] Admin page: overview, payouts, reports (admin accounts only)
- [x] Report buttons on links and chat messages
- [ ] Dead-link detection
- [ ] Legal: terms, privacy policy, copyright takedown process, virtual-coin review, data protection registration

### Listening experience
- [ ] Custom player controls and mini-player bar
- [ ] Search, county filters, likes (genre pages and trending done)
- [ ] Public artist pages with verified badges
- [x] More sources: Spotify, SoundCloud, Audiomack, Mixcloud, Vimeo (auto-advance to the next item works on YouTube only)
- [ ] Sleep timer, lock-screen controls (best effort)

### Getting it to users
- [ ] Phone OTP login and password reset
- [ ] Capacitor wrapper, push notifications, Play Store (check Google billing rules)
- [ ] Error monitoring, backups, spam protection, account deletion
- [ ] Merge the branch to `main` and make the Netlify site public

### Deferred
- Picture-in-picture

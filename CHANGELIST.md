# ZetuRoots change list

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
- [ ] Reactions, labels, podcasts, mixtapes

### Money
- [ ] M-Pesa Daraja: payment prompt, callback, payouts (needs Daraja credentials)
- [ ] Wallet screens: top-up, gift history, wallet page

### Running the platform
- [ ] Admin screen: approve payouts, remove content, handle reports
- [ ] Moderation: report-a-link button, takedowns, dead-link detection
- [ ] Legal: terms, privacy policy, copyright takedown process, virtual-coin review, data protection registration

### Listening experience
- [ ] Custom player controls and mini-player bar
- [ ] Search, genre and county filters, trending, likes
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

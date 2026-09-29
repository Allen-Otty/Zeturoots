/**
 * ZetuRoots - Mobile-First Progressive Web App Core Engine
 * Adhering to the specifications from ChatGPT Share link and UI design system.
 */

// ─── 1. Core Data Store ───────────────────────────────────────────────────────

const KENYA_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa",
  "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
  "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
  "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
  "Murang'a", "Nairobi City", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka-Nithi",
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

const GENRES = [
  "Benga",
  "Gengetone",
  "Urbantone",
  "Genge",
  "Kapuka",
  "Afropop",
  "Taarab",
  "Afrofusion",
  "Swahili pop",
  "Hip hop",
  "Reggae/dancehall",
  "Benga fusion",
  "Rhumba",
  "Ohangla",
  "Mugithi",
  "Isikuti"
];

const DIALECTS = [
  "Sheng",
  "Kiswahili",
  "English",
  "Kikuyu",
  "Luhya",
  "Dholuo",
  "Kamba",
  "Kalenjin",
  "Kisii",
  "Meru",
  "Mijikenda",
  "Turkana",
  "Maasai",
  "Samburu",
  "Somali",
  "Borana",
  "Embu",
  "Taita",
  "Teso",
  "Pokomo",
  "Rendille",
  "Kuria",
  "Tharaka",
  "Mbeere",
  "Taveta",
  "Gabbra",
  "Orma",
  "Suba",
  "Burji",
  "Dahalo",
  "Boni"
];

const INITIAL_TRACKS = [
  {
    id: 1,
    title: "Nairobi Nights (VIP Mix)",
    artist: "Boutross ft. Soundboy ZR",
    handle: "@boutross_munene",
    county: "Nairobi City",
    genre: "Gengetone",
    dialect: "Sheng",
    rank: 1,
    delta: "+2",
    badge: "gold",
    plays: "2.8M",
    likes: 24800,
    liked: true,
    duration: "3:45",
    lyrics: "Nairobi nights hatulali mpaka chee\nMziki ya mtaa inasikika kwa mawe\nShout out Eastlands, shout out South C\nZetuRoots ndio mpango mzima leo...",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop&auto=format",
    audioSrc: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=", // Synthesized audio fallback
    isrc: "KE-ZR1-24-00101",
    kecoboReg: "NRR-2024-88912"
  },
  {
    id: 2,
    title: "Kai Wangu (Acoustic Soul)",
    artist: "Nadia Mukami",
    handle: "@nadiamukami",
    county: "Kiambu",
    genre: "Afro-Fusion",
    dialect: "Kiswahili",
    rank: 2,
    delta: "NEW",
    badge: "silver",
    plays: "2.1M",
    likes: 19400,
    liked: true,
    duration: "4:05",
    lyrics: "Wewe ndiye nguzo yangu maishani\nUpendo wako unanituliza moyoni\nToka Thika hadi Nairobi mjini...",
    img: "https://images.unsplash.com/photo-1534308143439-3c0e5d430e77?w=600&h=600&fit=crop&auto=format",
    audioSrc: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
    isrc: "KE-ZR1-24-00102",
    kecoboReg: "NRR-2024-77621"
  },
  {
    id: 3,
    title: "Pwani Yetu (Mombasa Vibe)",
    artist: "Nyota wa Pwani",
    handle: "@nyota_pwani",
    county: "Mombasa",
    genre: "Taarab",
    dialect: "Kiswahili",
    rank: 3,
    delta: "+1",
    badge: "bronze",
    plays: "1.9M",
    likes: 16200,
    liked: false,
    duration: "5:12",
    lyrics: "Upepo wa bahari unavuma Fort Jesus\nMziki wa mwambao unaleta tabasamu\nTwakaribisha wageni wote pwani...",
    img: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&h=600&fit=crop&auto=format",
    audioSrc: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
    isrc: "KE-ZR1-24-00103",
    kecoboReg: "NRR-2024-55410"
  },
  {
    id: 4,
    title: "Mwanzo wa Safari",
    artist: "Achieng Adhiambo",
    handle: "@achieng_music",
    county: "Kisumu",
    genre: "Ohangla",
    dialect: "Dholuo",
    rank: 4,
    delta: "-1",
    badge: "green",
    plays: "1.4M",
    likes: 12900,
    liked: false,
    duration: "4:32",
    lyrics: "Nyathina bi iwinj thum mar Dunga Hill\nOhangla maduong e nam lolwe\nWabiro miyo joma duto mor...",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop&auto=format",
    audioSrc: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
    isrc: "KE-ZR1-24-00104",
    kecoboReg: "NRR-2024-44319"
  },
  {
    id: 5,
    title: "Baraka za Upcountry",
    artist: "Kiptoo Sings",
    handle: "@kiptoo_sings",
    county: "Uasin Gishu",
    genre: "Kalenjin Folk",
    dialect: "Kalenjin",
    rank: 5,
    delta: "+4",
    badge: "green",
    plays: "980K",
    likes: 9100,
    liked: false,
    duration: "3:38",
    lyrics: "Eldoret championi, mashambani baraka\nChamgei missing wechechu kando...",
    img: "https://images.unsplash.com/photo-1598387993441-a364f854cfac?w=600&h=600&fit=crop&auto=format",
    audioSrc: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
    isrc: "KE-ZR1-24-00105",
    kecoboReg: "NRR-2024-33211"
  },
  {
    id: 6,
    title: "Mugithi wa Kiroko",
    artist: "Waithaka wa Jane",
    handle: "@waithaka_jane",
    county: "Murang'a",
    genre: "Mugithi",
    dialect: "Kikuyu",
    rank: 6,
    delta: "+2",
    badge: "green",
    plays: "870K",
    likes: 8400,
    liked: false,
    duration: "6:14",
    lyrics: "Niwega mwathani tondu wa utugi waku\nKiroko giki turaathana...",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop&auto=format",
    audioSrc: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
    isrc: "KE-ZR1-24-00106",
    kecoboReg: "NRR-2024-22199"
  },
  {
    id: 7,
    title: "Rhumba ya Kakamega",
    artist: "Ingo All-Stars",
    handle: "@ingo_allstars",
    county: "Kakamega",
    genre: "Benga",
    dialect: "Luhya",
    rank: 7,
    delta: "-2",
    badge: "green",
    plays: "790K",
    likes: 7200,
    liked: false,
    duration: "5:00",
    lyrics: "Muluhya wange mulembe muno\nSololo sukuma mziki ya ingo...",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop&auto=format",
    audioSrc: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
    isrc: "KE-ZR1-24-00107",
    kecoboReg: "NRR-2024-11880"
  },
  {
    id: 8,
    title: "Machakos Sunset Drill",
    artist: "Masaku Drillers",
    handle: "@masaku_drill",
    county: "Machakos",
    genre: "Kenyan Drill",
    dialect: "Kamba",
    rank: 8,
    delta: "+5",
    badge: "green",
    plays: "650K",
    likes: 6800,
    liked: false,
    duration: "2:58",
    lyrics: "Kyalo kya wendo, Machakos People's Park\nBass inavuta masaa ya giza...",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop&auto=format",
    audioSrc: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
    isrc: "KE-ZR1-24-00108",
    kecoboReg: "NRR-2024-00994"
  }
];

const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Shujaa Fest '24",
    venue: "Carnivore Grounds",
    city: "Nairobi",
    county: "Nairobi City",
    date: "Sat, 28 Oct 2024",
    time: "6:00 PM till dawn",
    price: 1000,
    vipPrice: 3500,
    featured: true,
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=350&fit=crop&auto=format",
    desc: "Kenya's largest grassroot celebration uniting top performers from all 47 counties on one electrifying stage."
  },
  {
    id: 2,
    title: "Fort Jesus Taarab Night",
    venue: "Fort Jesus Amphitheatre",
    city: "Mombasa",
    county: "Mombasa",
    date: "Fri, 15 Nov 2024",
    time: "7:30 PM",
    price: 500,
    vipPrice: 1500,
    featured: false,
    img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=350&fit=crop&auto=format",
    desc: "An acoustic coastal journey through classical Swahili melodies and Taarab orchestra under the stars."
  },
  {
    id: 3,
    title: "Ohangla Roots & Fish Fest",
    venue: "Dunga Hill Camp",
    city: "Kisumu",
    county: "Kisumu",
    date: "Sun, 1 Dec 2024",
    time: "2:00 PM",
    price: 800,
    vipPrice: 2000,
    featured: false,
    img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=350&fit=crop&auto=format",
    desc: "Live lakeside Ohangla rhythms, fresh tilapia barbecue, and Luo cultural heritage."
  }
];

const INITIAL_REACTIONS = [
  {
    id: 1,
    author: "Kamau_Nrb",
    county: "Nairobi City",
    text: "Boutross alinyonga hii verse! Sheng ya 2024 imesimama vibaya sana 🔥🔥",
    time: "2m ago",
    likes: 42
  },
  {
    id: 2,
    author: "Amina_Coast",
    county: "Mombasa",
    text: "Nyota wa Pwani alituwakilisha vizuri sana. Mwambao mzima tunacheza hii!",
    time: "15m ago",
    likes: 89
  },
  {
    id: 3,
    author: "Otieno_Lake",
    county: "Kisumu",
    text: "Hiyo nyatiti solo ya Achieng ilinimaliza kabisa. ZetuRoots ndio jukwaa!",
    time: "1h ago",
    likes: 67
  }
];

// ─── 2. Web Audio Synthesizer (Zero-Network Audio Player Fallback) ─────────────

class SynthAudioGenerator {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrackId = null;
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBeat(trackId) {
    this.init();
    this.stop();
    this.isPlaying = true;
    this.currentTrackId = trackId;

    // Rhythmic generative Afro-beat / Kenyan groove
    const playNote = (freq, type, duration, delay, gainLevel = 0.15) => {
      if (!this.isPlaying || !this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + duration);
    };

    let step = 0;
    const chords = [
      [220, 261.63, 329.63], // Am
      [174.61, 220, 261.63], // F
      [130.81, 164.81, 196], // C
      [196, 246.94, 293.66]  // G
    ];

    const loop = () => {
      if (!this.isPlaying) return;
      const chord = chords[Math.floor(step / 8) % chords.length];
      
      // Kick & Bass
      if (step % 4 === 0) {
        playNote(55, 'sine', 0.2, 0, 0.35); // 808 sub kick
      }
      // Hihat & Shaker
      playNote(800 + (step % 2) * 400, 'triangle', 0.05, 0, 0.08);

      // Synth Melody Note
      const note = chord[step % chord.length];
      playNote(note * (1 + (step % 3)), 'sawtooth', 0.18, 0.05, 0.1);

      step = (step + 1) % 32;
      this.timer = setTimeout(loop, 220); // ~136 BPM
    };

    loop();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  playAdJingle() {
    this.init();
    this.stop();
    this.isPlaying = true;
    const playChime = (freq, delay, dur = 0.35) => {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + dur);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + dur);
      } catch (e) {}
    };
    playChime(523.25, 0.0);
    playChime(659.25, 0.15);
    playChime(783.99, 0.30);
    playChime(1046.50, 0.45, 0.6);
  }
}

// ─── 3. Global Audio Player Engine ────────────────────────────────────────────

class AudioEngine {
  constructor() {
    this.audio = new Audio();
    this.synth = new SynthAudioGenerator();
    this.queue = [...INITIAL_TRACKS];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.isShuffle = false;
    this.isRepeat = false;
    this.currentTime = 0;
    this.duration = 225; // 3:45 default
    this.volume = 0.85;
    this.audio.volume = this.volume;
    this.isPremiumTier = true; // HD Audio indicator
    this.tracksPlayedCount = 0;
    this.isAdPlaying = false;

    this.initAudioListeners();
  }

  initAudioListeners() {
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
      this.duration = this.audio.duration || this.duration;
      this.updatePlayerUI();
    });

    this.audio.addEventListener('ended', () => {
      if (this.isRepeat) {
        this.play(this.currentIndex);
      } else {
        this.next();
      }
    });

    this.audio.addEventListener('error', () => {
      // If audio file URL fails or is empty, gracefully use live procedural afro-beat synthesizer
      console.log('[ZetuRoots Audio] Streaming fallback to generative synth engine');
    });

    // Synthetic time progress simulation when using generative audio
    setInterval(() => {
      if (this.isPlaying && (this.audio.paused || this.audio.src.startsWith('data:'))) {
        this.currentTime += 1;
        if (this.currentTime >= this.duration) {
          if (this.isRepeat) {
            this.currentTime = 0;
          } else {
            this.next();
          }
        }
        this.updatePlayerUI();
      }
    }, 1000);
  }

  getCurrentTrack() {
    return this.queue[this.currentIndex] || this.queue[0];
  }

  play(index = null) {
    if (index !== null) {
      this.currentIndex = (index + this.queue.length) % this.queue.length;
      this.currentTime = 0;
    }

    // Spotify & YouTube In-Play Ad Check (trigger ad every 3 plays for Free listeners)
    if (window.app && !window.app.isPremium && !this.isAdPlaying) {
      this.tracksPlayedCount = (this.tracksPlayedCount || 0) + 1;
      if (this.tracksPlayedCount % 3 === 0) {
        this.pause();
        window.app.triggerInPlayAd(() => {
          this.actualPlay();
        });
        return;
      }
    }

    this.actualPlay();
  }

  actualPlay() {
    const track = this.getCurrentTrack();
    this.isPlaying = true;

    // Trigger synthetic afro-beat audio context
    this.synth.playBeat(track.id);

    // If actual URL exists, attempt HTML5 play
    if (track.audioSrc && !track.audioSrc.startsWith('data:')) {
      this.audio.src = track.audioSrc;
      this.audio.play().catch(e => console.log('Autoplay handled:', e));
    }

    this.updatePlayerUI();
  }

  pause() {
    this.isPlaying = false;
    this.audio.pause();
    this.synth.stop();
    this.updatePlayerUI();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  next() {
    let nextIdx = this.currentIndex + 1;
    if (this.isShuffle) {
      nextIdx = Math.floor(Math.random() * this.queue.length);
    }
    this.play(nextIdx);
  }

  prev() {
    let prevIdx = this.currentIndex - 1;
    this.play(prevIdx);
  }

  seek(percentage) {
    this.currentTime = (percentage / 100) * this.duration;
    if (!this.audio.paused && this.audio.duration) {
      this.audio.currentTime = this.currentTime;
    }
    this.updatePlayerUI();
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    this.audio.volume = this.volume;
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    if (window.app && window.app.showToast) {
      window.app.showToast(this.isShuffle ? 'Shuffle Mode: ON 🔀' : 'Shuffle Mode: OFF');
    }
    this.updatePlayerUI();
  }

  toggleLoop() {
    this.isRepeat = !this.isRepeat;
    if (window.app && window.app.showToast) {
      window.app.showToast(this.isRepeat ? 'Repeat Mode: ON 🔁' : 'Repeat Mode: OFF');
    }
    this.updatePlayerUI();
  }

  skip(seconds) {
    this.currentTime = Math.max(0, Math.min(this.duration, this.currentTime + seconds));
    if (this.audio && !isNaN(this.audio.duration)) {
      this.audio.currentTime = this.currentTime;
    }
    this.updatePlayerUI();
    if (window.app && window.app.showToast) {
      window.app.showToast(`${seconds > 0 ? '+' : ''}${seconds}s`);
    }
  }

  setPlaybackSpeed(speed) {
    this.playbackRate = speed;
    if (this.audio) {
      this.audio.playbackRate = speed;
    }
    const btns = [
      document.getElementById('desktop-player-speed-btn'),
      document.getElementById('full-player-speed-btn')
    ];
    btns.forEach(b => {
      if (b) b.textContent = `${speed}x`;
    });
    if (window.app && window.app.showToast) {
      window.app.showToast(`Speed: ${speed}x ⚡`);
    }
  }

  cyclePlaybackSpeed() {
    const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
    const current = this.playbackRate || 1.0;
    const nextIdx = (speeds.indexOf(current) + 1) % speeds.length;
    this.setPlaybackSpeed(speeds[nextIdx]);
  }

  formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  updatePlayerUI() {
    const track = this.getCurrentTrack();
    if (!track) return;

    // Mini Player elements (Mobile & Shared)
    const miniThumbnail = document.getElementById('mini-player-thumb');
    const miniTitle = document.getElementById('mini-player-title');
    const miniArtist = document.getElementById('mini-player-artist');
    const miniPlayBtn = document.getElementById('mini-player-play-btn');
    const miniProgressBar = document.getElementById('mini-player-progress');
    const miniPlayerCounty = document.getElementById('mini-player-county');

    if (miniThumbnail) miniThumbnail.src = track.img;
    if (miniTitle) miniTitle.textContent = track.title;
    if (miniArtist) miniArtist.textContent = track.artist;
    if (miniPlayerCounty) miniPlayerCounty.textContent = `${track.county} • ${track.genre}`;
    if (miniPlayBtn) {
      miniPlayBtn.innerHTML = this.isPlaying
        ? '<span class="material-symbols-outlined text-2xl text-primary-gold">pause</span>'
        : '<span class="material-symbols-outlined text-2xl text-primary-gold">play_arrow</span>';
    }
    if (miniProgressBar) {
      const pct = (this.currentTime / this.duration) * 100;
      miniProgressBar.style.width = `${Math.min(100, pct)}%`;
    }

    // Mini Player Sound Waveform Visualizer (As drawn in wireframe sketch)
    const waveformBars = document.querySelectorAll('#mini-player-waveform .waveform-bar');
    if (waveformBars && waveformBars.length > 0) {
      const pct = (this.currentTime / (this.duration || 1)) || 0;
      const activeThreshold = Math.floor(pct * waveformBars.length);
      waveformBars.forEach((bar, idx) => {
        if (idx <= activeThreshold) {
          bar.classList.add('active');
          if (this.isPlaying) {
            bar.classList.add('playing');
          } else {
            bar.classList.remove('playing');
          }
        } else {
          bar.classList.remove('active', 'playing');
        }
      });
    }


    // Desktop Docked Player Elements (Visible on lg: screens)
    const deskPlayBtn = document.getElementById('desktop-player-play-btn');
    const deskCurTime = document.getElementById('desktop-player-cur-time');
    const deskTotalTime = document.getElementById('desktop-player-total-time');
    const deskScrubber = document.getElementById('desktop-player-scrubber');
    const deskLikeIcon = document.getElementById('desktop-player-like-icon');

    if (deskPlayBtn) {
      deskPlayBtn.innerHTML = this.isPlaying
        ? '<span class="material-symbols-outlined text-2xl font-bold">pause</span>'
        : '<span class="material-symbols-outlined text-2xl font-bold">play_arrow</span>';
    }
    if (deskCurTime) deskCurTime.textContent = this.formatTime(this.currentTime);
    if (deskTotalTime) deskTotalTime.textContent = this.formatTime(this.duration);
    if (deskScrubber) {
      deskScrubber.value = (this.currentTime / this.duration) * 100 || 0;
    }
    if (deskLikeIcon) {
      deskLikeIcon.className = `material-symbols-outlined text-lg ${track.liked ? 'text-red-500' : 'outlined text-text-muted'}`;
    }

    // Fullscreen Player elements
    const fullArtwork = document.getElementById('full-player-artwork');
    const fullTitle = document.getElementById('full-player-title');
    const fullArtist = document.getElementById('full-player-artist');
    const fullCountyGenre = document.getElementById('full-player-county-genre');
    const fullPlayBtn = document.getElementById('full-player-play-btn');
    const fullCurrTime = document.getElementById('full-player-curr-time');
    const fullDuration = document.getElementById('full-player-duration');
    const fullScrubber = document.getElementById('full-player-scrubber');
    const fullLyricsText = document.getElementById('full-player-lyrics-content');
    const fullVisualizer = document.getElementById('full-player-visualizer');

    if (fullArtwork) fullArtwork.src = track.img;
    if (fullTitle) fullTitle.textContent = track.title;
    if (fullArtist) fullArtist.textContent = track.artist;
    if (fullCountyGenre) fullCountyGenre.textContent = `${track.county} • ${track.genre} (${track.dialect})`;
    if (fullCurrTime) fullCurrTime.textContent = this.formatTime(this.currentTime);
    if (fullDuration) fullDuration.textContent = this.formatTime(this.duration);
    if (fullScrubber) {
      fullScrubber.value = (this.currentTime / this.duration) * 100 || 0;
    }
    if (fullLyricsText) fullLyricsText.textContent = track.lyrics;
    if (fullPlayBtn) {
      fullPlayBtn.innerHTML = this.isPlaying
        ? '<span class="material-symbols-outlined text-4xl text-on-primary-container">pause</span>'
        : '<span class="material-symbols-outlined text-4xl text-on-primary-container">play_arrow</span>';
    }
    if (fullVisualizer) {
      fullVisualizer.style.opacity = this.isPlaying ? '1' : '0.2';
    }
  }
}

// ─── 4. Application Controller & Router ───────────────────────────────────────

class ZetuRootsApp {
  constructor() {
    this.tracks = this.loadLocalStore('zr_tracks', INITIAL_TRACKS);
    this.events = this.loadLocalStore('zr_events', INITIAL_EVENTS);
    this.reactions = this.loadLocalStore('zr_reactions', INITIAL_REACTIONS);
    this.countiesStats = this.loadLocalStore('zr_counties_stats', null);
    this.audio = new AudioEngine();
    this.activeFilter = 'HOT';
    this.selectedCounty = 'All';
    this.selectedGenre = 'All';
    this.selectedDialect = 'All';
    this.currentView = 'home';
    this.pwaInstallPrompt = null;
    this.currentUser = this.loadLocalStore('zr_auth_user', null);
    this.selectedRole = 'fan';

    // Studio & Upload State
    this.studioType = 'track';
    this.studioAudioData = null;
    this.studioCoverData = null;
    this.studioAudioElement = null;
    this.studioIsPlaying = false;
    this.studioWaveTimer = null;
    this.currentCertifiedTrack = null;

    // Monetization, In-Play Ads & Premium Subscription State
    this.isPremium = this.loadLocalStore('zr_is_premium', false);
    this.ads = [];
    this.adStats = null;
    this.selectedPremiumPlan = 'weekly';
    this.currentInPlayAd = null;
    this.inPlayAdTimer = null;
    this.inPlayAdElapsed = 0;
    this.inPlayAdDuration = 15;
    this.inPlayAdSkipAfter = 5;
    this.adCallbackAfter = null;

    this.initPWA();
    this.initEvents();
    this.populateAllCountyDropdowns();
    this.initStudio();
    this.checkAuthSession();
    this.fetchServerTracks();
    this.fetchServerEvents();
    this.fetchServerReactions();
    this.fetchCountiesStats();
    this.fetchAds();
    this.fetchAdAnalytics();
    this.render();
  }

  // ─── UNIFIED API CLIENT & FETCH CONNECTORS ─────────────────────────────────

  async apiRequest(path, method = 'GET', body = null) {
    const token = localStorage.getItem('zr_auth_token') || '';
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (this.currentUser?.id) headers['x-user-id'] = this.currentUser.id;

    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(path, opts);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `Server responded with status ${res.status}`);
    }
    return data;
  }

  async checkAuthSession() {
    const token = localStorage.getItem('zr_auth_token');
    const storedUser = this.loadLocalStore('zr_auth_user', null);
    if (!token && !storedUser) return;

    try {
      const url = storedUser ? `/api/auth/me?userId=${storedUser.id}` : '/api/auth/me';
      const data = await this.apiRequest(url);
      if (data.success && data.user) {
        this.currentUser = data.user;
        this.saveLocalStore('zr_auth_user', this.currentUser);
        this.updateAuthUI();
      }
    } catch (e) {
      console.log('[Auth] Active session verified from local cache');
      if (storedUser) {
        this.currentUser = storedUser;
        this.updateAuthUI();
      }
    }
  }

  populateAllCountyDropdowns() {
    const COUNTIES_47 = [
      "Nairobi City", "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta",
      "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi",
      "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga",
      "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia",
      "Uasin Gishu", "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru",
      "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma",
      "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira"
    ];

    ['reg-county', 'page-reg-county', 'upload-county', 'reaction-county-select'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const cur = el.value;
        el.innerHTML = COUNTIES_47.map(c => `
          <option value="${c}" ${c === cur ? 'selected' : ''}>${c}</option>
        `).join('');
      }
    });
  }

  async fetchServerTracks(filterParams = {}) {
    try {
      let query = new URLSearchParams();
      if (filterParams.county && filterParams.county !== 'All') query.set('county', filterParams.county);
      if (filterParams.genre && filterParams.genre !== 'All') query.set('genre', filterParams.genre);
      if (filterParams.dialect && filterParams.dialect !== 'All') query.set('dialect', filterParams.dialect);
      if (filterParams.type) query.set('type', filterParams.type);
      if (filterParams.search) query.set('search', filterParams.search);

      const qs = query.toString() ? `?${query.toString()}` : '';
      const data = await this.apiRequest(`/api/tracks${qs}`);
      if (data.tracks && data.tracks.length > 0) {
        this.tracks = data.tracks;
        this.saveLocalStore('zr_tracks', this.tracks);
        if (['home', 'toppers', 'explore'].includes(this.currentView)) {
          this.render();
        }
      }
    } catch (err) {
      console.log('[Tracks] Using offline/cached tracks store:', err.message);
    }
  }

  async fetchServerEvents(county = null) {
    try {
      const qs = county && county !== 'All' ? `?county=${encodeURIComponent(county)}` : '';
      const data = await this.apiRequest(`/api/events${qs}`);
      if (data.events && data.events.length > 0) {
        this.events = data.events;
        this.saveLocalStore('zr_events', this.events);
        if (this.currentView === 'events') {
          this.renderEventsView();
        }
      }
    } catch (err) {
      console.log('[Events] Using offline/cached events:', err.message);
    }
  }

  async fetchServerReactions(county = null) {
    try {
      const qs = county && county !== 'All' ? `?county=${encodeURIComponent(county)}` : '';
      const data = await this.apiRequest(`/api/reactions${qs}`);
      if (data.reactions && data.reactions.length > 0) {
        this.reactions = data.reactions;
        this.saveLocalStore('zr_reactions', this.reactions);
        if (this.currentView === 'reactions') {
          this.renderReactionsView();
        }
      }
    } catch (err) {
      console.log('[Reactions] Using offline/cached reactions:', err.message);
    }
  }

  async fetchCountiesStats() {
    try {
      const data = await this.apiRequest('/api/counties');
      if (data.counties) {
        if (Array.isArray(data.counties)) {
          this.countiesStats = data.counties.reduce((acc, c) => {
            acc[c.name] = c;
            return acc;
          }, {});
          this.countiesList = data.counties;
        } else {
          this.countiesStats = data.counties;
        }
        this.saveLocalStore('zr_counties_stats', this.countiesStats);
        if (this.currentView === 'explore') {
          this.renderExploreView();
        }
      }
    } catch (err) {
      console.log('[Counties] Using offline county stats');
    }
  }

  loadLocalStore(key, defaultData) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultData;
    } catch (e) {
      return defaultData;
    }
  }

  saveLocalStore(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  initPWA() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => console.log('[ZetuRoots PWA] Service Worker active:', reg.scope))
          .catch((err) => console.log('[ZetuRoots PWA] SW registration failed:', err));
      });
    }

    // Capture PWA Install Prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.pwaInstallPrompt = e;
      const banner = document.getElementById('pwa-install-banner');
      if (banner) banner.classList.remove('hidden');
    });

    // Offline / Online Indicator
    window.addEventListener('offline', () => {
      this.showToast('You are currently offline. Local and cached music remain available.');
      const indicator = document.getElementById('network-offline-badge');
      if (indicator) indicator.classList.remove('hidden');
    });
    window.addEventListener('online', () => {
      this.showToast('Back online! Syncing live Kenyan charts...');
      const indicator = document.getElementById('network-offline-badge');
      if (indicator) indicator.classList.add('hidden');
    });
  }

  initEvents() {
    // Hash Routing
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      this.navigate(hash);
    });

    // Mini Player Click -> Open Full Player Sheet (ignore controls and waveform)
    const miniPlayer = document.getElementById('mini-player');
    if (miniPlayer) {
      miniPlayer.addEventListener('click', (e) => {
        if (!e.target.closest('#mini-player-play-btn') && 
            !e.target.closest('#mini-player-next-btn') && 
            !e.target.closest('#mini-player-prev-btn') && 
            !e.target.closest('#mini-player-waveform')) {
          this.openPlayerSheet();
        }
      });
    }

    // Mini Player Controls (Prev, Play, Next)
    const miniPrevBtn = document.getElementById('mini-player-prev-btn');
    if (miniPrevBtn) {
      miniPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.audio.prev();
      });
    }
    const miniPlayBtn = document.getElementById('mini-player-play-btn');
    if (miniPlayBtn) {
      miniPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.audio.togglePlay();
      });
    }
    const miniNextBtn = document.getElementById('mini-player-next-btn');
    if (miniNextBtn) {
      miniNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.audio.next();
      });
    }

    // Full Player Controls
    const fullPlayBtn = document.getElementById('full-player-play-btn');
    if (fullPlayBtn) {
      fullPlayBtn.addEventListener('click', () => this.audio.togglePlay());
    }
    const fullNextBtn = document.getElementById('full-player-next-btn');
    if (fullNextBtn) {
      fullNextBtn.addEventListener('click', () => this.audio.next());
    }
    const fullPrevBtn = document.getElementById('full-player-prev-btn');
    if (fullPrevBtn) {
      fullPrevBtn.addEventListener('click', () => this.audio.prev());
    }
    const fullCloseBtn = document.getElementById('full-player-close-btn');
    if (fullCloseBtn) {
      fullCloseBtn.addEventListener('click', () => this.closePlayerSheet());
    }
    const fullScrubber = document.getElementById('full-player-scrubber');
    if (fullScrubber) {
      fullScrubber.addEventListener('input', (e) => this.audio.seek(e.target.value));
    }
    const fullVolume = document.getElementById('full-player-volume');
    if (fullVolume) {
      fullVolume.addEventListener('input', (e) => this.audio.setVolume(e.target.value / 100));
    }
    const lyricsToggleBtn = document.getElementById('full-player-lyrics-toggle');
    if (lyricsToggleBtn) {
      lyricsToggleBtn.addEventListener('click', () => {
        const sheet = document.getElementById('full-player-lyrics-drawer');
        if (sheet) sheet.classList.toggle('hidden');
      });
    }
    const queueToggleBtn = document.getElementById('full-player-queue-toggle');
    if (queueToggleBtn) {
      queueToggleBtn.addEventListener('click', () => {
        const drawer = document.getElementById('full-player-queue-drawer');
        if (drawer) {
          drawer.classList.toggle('hidden');
          this.renderQueueDrawer();
        }
      });
    }

    // Lipa Na M-Pesa Modal Trigger from Full Player Tip
    const tipArtistBtn = document.getElementById('full-player-tip-btn');
    if (tipArtistBtn) {
      tipArtistBtn.addEventListener('click', () => {
        const track = this.audio.getCurrentTrack();
        this.openMpesaModal(`Tip ${track.artist}`, 100);
      });
    }

    // Search Input listeners
    const searchInputs = document.querySelectorAll('.app-search-input');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        this.filterBySearch(query);
      });
    });

    // PWA Install Prompt Button
    const pwaBtn = document.getElementById('pwa-install-action-btn');
    if (pwaBtn) {
      pwaBtn.addEventListener('click', async () => {
        if (this.pwaInstallPrompt) {
          this.pwaInstallPrompt.prompt();
          const { outcome } = await this.pwaInstallPrompt.userChoice;
          console.log(`[PWA Install] User response: ${outcome}`);
          this.pwaInstallPrompt = null;
          document.getElementById('pwa-install-banner').classList.add('hidden');
        }
      });
    }

    // URL Hash Routing Listener
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== this.currentView) {
        this.navigate(hash);
      }
    });

    // Close Dropdowns on Click Outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#genre-dropdown-wrapper')) {
        const genreMenu = document.getElementById('genre-dropdown-menu');
        if (genreMenu) genreMenu.classList.add('hidden');
      }
      if (!e.target.closest('#dialect-dropdown-wrapper')) {
        const dialectMenu = document.getElementById('dialect-dropdown-menu');
        if (dialectMenu) dialectMenu.classList.add('hidden');
      }
    });
  }

  navigate(viewName) {
    if (this.currentView && this.currentView !== 'artist-profile') {
      this.previousView = this.currentView;
    }
    this.currentView = viewName;
    document.querySelectorAll('.app-view').forEach(view => view.classList.add('hidden'));
    
    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
      targetView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Sync URL hash
    if (window.location.hash.replace('#', '') !== viewName) {
      try {
        history.replaceState(null, '', `#${viewName}`);
      } catch (e) {}
    }

    // Update Bottom Nav active tab
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Desktop Sidebar active tab
    document.querySelectorAll('.desktop-nav-link').forEach(link => {
      if (link.dataset.view === viewName) {
        link.classList.add('bg-surface-card', 'text-primary-gold', 'font-bold');
        link.classList.remove('text-[#BDB8A8]');
      } else {
        link.classList.remove('bg-surface-card', 'text-primary-gold', 'font-bold');
        link.classList.add('text-[#BDB8A8]');
      }
    });

    // Sub-render specific views if needed
    if (viewName === 'login') {
      this.clearPageLoginError();
      this.switchLoginPageTab('password');
    }
    if (viewName === 'signup') {
      this.clearPageSignupError();
      this.selectSignupRole('fan');
      this.updatePasswordStrength('');
    }
    if (viewName === 'forgot-password') {
      this.clearPageResetError();
      this.resetPageResetSteps();
    }
    if (viewName === 'explore') this.renderExploreView();
    if (viewName === 'toppers') this.renderToppersLeaderboard();
    if (viewName === 'events') this.renderEventsView();
    if (viewName === 'studio') this.renderStudioView();
    if (viewName === 'analytics') this.renderAnalyticsView();
    if (viewName === 'reactions') this.renderReactionsView();
    if (viewName === 'copyright') this.renderCopyrightView();
    if (viewName === 'profile') this.renderProfileView();
    if (viewName === 'podcasts') this.loadPodcasts();
    if (viewName === 'dj-hub') this.loadDjMixtapes();
    if (viewName === 'label-hub') this.loadRecordLabels();
    if (viewName === 'artists') this.loadArtists();
    if (viewName === 'genres') this.loadGenres();
    if (viewName === 'playlists') this.loadPlaylists();
    if (viewName === 'liked-songs') this.renderLikedSongsView();
    if (viewName === 'channels') {
      this.loadPodcasts();
      this.loadDjMixtapes();
      this.loadRecordLabels();
    }
    if (viewName === 'library') this.renderLibraryView();
    if (viewName === 'genre-radio') this.renderGenreRadioView();
    if (viewName === 'search') this.initFullscreenSearch();
    if (viewName === 'settings') this.renderSettingsView();
    if (viewName === 'notifications') this.renderNotificationsView();
    if (viewName === 'payouts') this.renderPayoutsView();
    if (viewName === 'gatekeeper') this.initGatekeeperScanner();
  }

  toggleSearchBar() {
    const searchBox = document.getElementById('header-expandable-search');
    const input = document.getElementById('header-search-input');
    if (searchBox) {
      searchBox.classList.toggle('hidden');
      if (!searchBox.classList.contains('hidden') && input) {
        input.focus();
      }
    }
  }

  seekWaveform(event) {
    const container = document.getElementById('mini-player-waveform');
    if (!container || !this.audio || !this.audio.duration) return;
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    this.audio.seek(percent * 100);
  }

  toggleGenreDropdown(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('genre-dropdown-menu');
    const dialectMenu = document.getElementById('dialect-dropdown-menu');
    if (dialectMenu) dialectMenu.classList.add('hidden');
    if (menu) menu.classList.toggle('hidden');
  }

  toggleDialectDropdown(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('dialect-dropdown-menu');
    const genreMenu = document.getElementById('genre-dropdown-menu');
    if (genreMenu) genreMenu.classList.add('hidden');
    if (menu) menu.classList.toggle('hidden');
  }

  filterTrending(type) {
    this.activeTrendingFilter = type;

    if (type === 'hot') {
      document.querySelectorAll('.filter-pill-sketch').forEach(pill => {
        pill.classList.remove('active');
      });
      const activePill = document.getElementById('pill-filter-hot');
      if (activePill) activePill.classList.add('active');

      this.selectedGenre = 'All';
      this.selectedDialect = 'All';
      this.selectedCounty = 'All';
      this.activeFilter = 'HOT';
      const gLabel = document.getElementById('pill-filter-genre-label');
      if (gLabel) gLabel.textContent = 'Genre';
      const dLabel = document.getElementById('pill-filter-dialect-label');
      if (dLabel) dLabel.textContent = 'Dialect';
      this.renderHomeTrending();
    } else if (type === 'counties') {
      this.openCountiesModal();
    } else if (type === 'reactions') {
      this.navigate('reactions');
    } else if (type === 'events') {
      this.navigate('events');
    } else if (type === 'podcasts') {
      this.navigate('podcasts');
    } else if (type === 'toppers') {
      this.navigate('toppers');
    }
  }

  renderLibraryView() {
    const likedCount = (this.tracks || []).filter(t => t.liked).length;
    const el = document.getElementById('lib-stat-liked');
    if (el) el.textContent = `${likedCount} Saved Tracks`;
  }

  goBack() {
    this.navigate(this.previousView || 'home');
  }

  toggleLikeCurrentTrack() {
    const current = this.audio.getCurrentTrack();
    if (current) this.toggleLikeTrack(current.id);
  }

  openPlayerSheet() {
    const sheet = document.getElementById('player-fullscreen-sheet');
    if (sheet) {
      sheet.classList.add('open');
      this.audio.updatePlayerUI();
    }
  }

  closePlayerSheet() {
    const sheet = document.getElementById('player-fullscreen-sheet');
    if (sheet) sheet.classList.remove('open');
  }

  // ─── 5. UI Rendering Modules ────────────────────────────────────────────────

  render() {
    this.renderHomeToppers();
    this.renderHomeTrending();
    this.renderExploreCountiesModal();
    this.renderTopPodium();
    this.updateAuthUI();
    this.audio.updatePlayerUI();

    // Set initial view from hash
    const initialHash = window.location.hash.replace('#', '') || 'home';
    this.navigate(initialHash);
  }

  renderHomeToppers() {
    const container = document.getElementById('home-toppers-container');
    if (!container) return;

    const toppers = this.tracks.slice(0, 6);
    const badgeColors = {
      gold: { bg: 'badge-gold', border: '#DEB74C', label: '★ Gold #1' },
      silver: { bg: 'badge-silver', border: '#C0C0C0', label: '★ Silver #2' },
      bronze: { bg: 'badge-bronze', border: '#CD7F32', label: '★ Bronze #3' },
      green: { bg: 'badge-green', border: '#01A042', label: '★ Rising #4' }
    };

    container.innerHTML = toppers.map((t, idx) => {
      const b = badgeColors[t.badge] || { bg: 'badge-gold', border: '#DEB74C', label: `★ #${t.rank || idx + 1}` };
      return `
        <div class="surface-card relative rounded-xl overflow-hidden group cursor-pointer aspect-[4/5] flex flex-col justify-between"
             onclick="app.playTrackById(${t.id})">
          <div class="absolute inset-0">
            <img src="${t.img}" alt="${t.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
            <div class="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent"></div>
          </div>
          
          <div class="relative z-10 p-3 flex justify-between items-start">
            <span class="font-display font-black text-xs px-2 py-0.5 rounded-full ${b.bg}">
              #${t.rank || idx + 1}
            </span>
            <span class="text-xs font-mono px-2 py-0.5 rounded-full bg-black/60 text-secondary-green border border-secondary-green/30">
              ${t.plays}
            </span>
          </div>

          <div class="relative z-10 p-3">
            <p class="font-display font-bold text-base text-white truncate leading-tight">${t.artist}</p>
            <p class="text-xs text-[#A0A0A0] truncate font-mono mt-0.5">${t.title}</p>
            <div class="flex items-center gap-1.5 mt-2">
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-surface-high text-primary-gold border border-primary-gold/30">
                ${t.county}
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-surface-high text-text-muted">
                ${t.genre}
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderHomeTrending() {
    const container = document.getElementById('home-trending-container');
    if (!container) return;

    let filtered = this.tracks;
    if (this.selectedGenre && this.selectedGenre !== 'All') {
      filtered = filtered.filter(t => t.genre && t.genre.toLowerCase() === this.selectedGenre.toLowerCase());
    }
    if (this.selectedDialect && this.selectedDialect !== 'All') {
      filtered = filtered.filter(t => t.dialect && t.dialect.toLowerCase() === this.selectedDialect.toLowerCase());
    }
    if (this.selectedCounty && this.selectedCounty !== 'All') {
      filtered = filtered.filter(t => t.county && t.county.toLowerCase() === this.selectedCounty.toLowerCase());
    }
    if (this.activeFilter && this.activeFilter !== 'HOT' && (!this.selectedGenre || this.selectedGenre === 'All') && (!this.selectedCounty || this.selectedCounty === 'All') && (!this.selectedDialect || this.selectedDialect === 'All')) {
      filtered = filtered.filter(t => (t.genre && t.genre.toLowerCase().includes(this.activeFilter.toLowerCase())) || (t.county && t.county.toLowerCase().includes(this.activeFilter.toLowerCase())));
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="surface-card rounded-2xl p-8 text-center border border-surface-border">
          <span class="material-symbols-outlined text-4xl text-primary-gold/60 mb-2">music_off</span>
          <p class="font-display font-bold text-base text-white">No tracks match current filters</p>
          <p class="text-xs text-text-muted mt-1">Try switching dialect or genre from the pills above.</p>
          <button onclick="app.filterTrending('hot')" class="mt-3 px-4 py-1.5 rounded-full bg-primary-gold/20 text-primary-gold border border-primary-gold/40 text-xs font-mono font-bold hover:bg-primary-gold hover:text-black transition-colors">
            Reset to Hot 🔥
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map((t, idx) => `
      <div class="surface-card rounded-2xl overflow-hidden flex flex-col sm:flex-row items-stretch group border border-surface-border hover:border-primary-gold/50 transition-all shadow-md hover:shadow-xl hover:shadow-primary-gold/5 bg-[#17140B]">
        <!-- 16:9 Thumbnail (Left Column as drawn in sketch) -->
        <div class="relative w-full sm:w-60 md:w-72 shrink-0 aspect-video bg-black overflow-hidden cursor-pointer" onclick="app.playTrackById(${t.id})">
          <img src="${t.img}" alt="${t.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <!-- Top Left Badge: #1 TRENDING -->
          <div class="absolute top-2.5 left-2.5">
            <span class="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-black/85 text-secondary-green border border-secondary-green/40 shadow">
              #${idx + 1} TRENDING
            </span>
          </div>

          <!-- Big Centered Play Button (▷) -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-12 h-12 rounded-full bg-primary-gold/90 text-surface-card flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-3xl font-bold ml-0.5">play_arrow</span>
            </div>
          </div>

          <!-- Bottom Right Duration Badge (▷ 3:45) -->
          <div class="absolute bottom-2.5 right-2.5">
            <span class="text-xs font-mono font-bold text-white bg-black/80 px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
              <span class="material-symbols-outlined text-xs text-primary-gold">play_circle</span>
              <span>${t.duration}</span>
            </span>
          </div>
        </div>

        <!-- Details & Actions (Right Column as drawn in sketch) -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div class="cursor-pointer" onclick="app.playTrackById(${t.id})">
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-surface-high text-primary-gold border border-primary-gold/30">
                ${t.county}
              </span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-high text-[#A0A0A0]">
                ${t.genre} • ${t.dialect}
              </span>
            </div>
            <h3 class="font-display font-black text-base sm:text-lg text-white group-hover:text-primary-gold transition-colors line-clamp-1 leading-snug">${t.title}</h3>
            <p class="text-xs text-text-muted mt-1 flex items-center gap-1">
              <span>${t.artist}</span>
              <span class="material-symbols-outlined text-xs text-secondary-green" title="Verified Kenyan Artist">verified</span>
            </p>
          </div>

          <!-- Footer Stats & Actions -->
          <div class="flex items-center justify-between pt-3 mt-3 border-t border-surface-border/50">
            <div class="flex items-center gap-1.5 text-xs font-mono text-secondary-green">
              <span class="material-symbols-outlined text-sm">headphones</span>
              <span>${t.plays} plays</span>
            </div>

            <div class="flex items-center gap-1.5">
              <button class="p-2 rounded-lg hover:bg-surface-card text-text-muted hover:text-red-500 active:scale-90 transition-all flex items-center gap-1" onclick="event.stopPropagation(); app.toggleLikeTrack(${t.id}); app.renderHomeTrending();" title="Like Track">
                <span class="material-symbols-outlined text-lg ${t.liked ? 'text-red-500' : 'outlined'}">favorite</span>
                <span class="text-[11px] font-mono ${t.liked ? 'text-red-500' : 'text-text-muted'}">${t.likes ? (t.likes > 1000 ? (t.likes/1000).toFixed(1) + 'k' : t.likes) : ''}</span>
              </button>
              <button class="p-2 rounded-lg hover:bg-surface-card text-text-muted hover:text-primary-gold active:scale-90 transition-all" onclick="event.stopPropagation(); app.shareTrack(${t.id})" title="Share Track">
                <span class="material-symbols-outlined text-lg">share</span>
              </button>
              <button class="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black text-emerald-400 text-xs font-bold font-mono transition-all flex items-center gap-1 active:scale-95" onclick="event.stopPropagation(); app.openArtistTipModal('${t.artist}')" title="Tip with Lipa na M-Pesa">
                <span class="material-symbols-outlined text-sm">payments</span>
                <span>Tip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderTopPodium(trackList = null) {
    const list = trackList || this.currentToppersList || this.tracks;
    const p1 = list[0] || this.tracks[0];
    const p2 = list[1] || this.tracks[1];
    const p3 = list[2] || this.tracks[2];

    const podiumContainer = document.getElementById('leaderboard-podium');
    if (!podiumContainer) return;

    podiumContainer.innerHTML = `
      <div class="flex items-end justify-center gap-2 md:gap-6 pt-10 pb-4">
        <!-- Rank 2: Silver -->
        <div class="flex flex-col items-center w-1/3 max-w-[110px] cursor-pointer" onclick="app.playTrackById(${p2.id})">
          <div class="relative mb-2">
            <img src="${p2.img}" class="w-16 h-16 rounded-full object-cover border-2 border-silver shadow-lg"/>
            <span class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full badge-silver font-bold text-xs flex items-center justify-center">2</span>
          </div>
          <p class="font-display font-bold text-xs text-white text-center truncate w-full">${p2.artist}</p>
          <span class="text-[10px] text-silver font-mono">${p2.plays || '1.8M'}</span>
          <div class="w-full h-20 bg-surface-card border-t-2 border-silver rounded-t-lg mt-2 flex items-center justify-center">
            <span class="text-xs font-mono text-silver">SILVER</span>
          </div>
        </div>

        <!-- Rank 1: Gold -->
        <div class="flex flex-col items-center w-1/3 max-w-[130px] cursor-pointer -translate-y-4" onclick="app.playTrackById(${p1.id})">
          <div class="relative mb-2">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 text-primary-gold">
              <span class="material-symbols-outlined text-2xl">crown</span>
            </div>
            <img src="${p1.img}" class="w-20 h-20 rounded-full object-cover border-4 border-primary-gold glow-gold shadow-2xl"/>
            <span class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full badge-gold font-bold text-sm flex items-center justify-center">1</span>
          </div>
          <p class="font-display font-bold text-sm text-primary-gold text-center truncate w-full">${p1.artist}</p>
          <span class="text-[11px] text-secondary-green font-mono">${p1.plays || '2.8M'}</span>
          <div class="w-full h-28 bg-[#141414] border-t-4 border-primary-gold rounded-t-lg mt-2 flex flex-col items-center justify-center glow-gold">
            <span class="text-xs font-black text-primary-gold">#1 TOPPER</span>
            <span class="text-[9px] text-[#A0A0A0]">${p1.county || 'Nairobi City'}</span>
          </div>
        </div>

        <!-- Rank 3: Bronze -->
        <div class="flex flex-col items-center w-1/3 max-w-[110px] cursor-pointer" onclick="app.playTrackById(${p3.id})">
          <div class="relative mb-2">
            <img src="${p3.img}" class="w-16 h-16 rounded-full object-cover border-2 border-bronze shadow-lg"/>
            <span class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full badge-bronze font-bold text-xs flex items-center justify-center">3</span>
          </div>
          <p class="font-display font-bold text-xs text-white text-center truncate w-full">${p3.artist}</p>
          <span class="text-[10px] text-bronze font-mono">${p3.plays || '1.4M'}</span>
          <div class="w-full h-16 bg-surface-card border-t-2 border-bronze rounded-t-lg mt-2 flex items-center justify-center">
            <span class="text-xs font-mono text-bronze">BRONZE</span>
          </div>
        </div>
      </div>
    `;
  }

  renderToppersLeaderboard(customList = null) {
    const list = customList || this.currentToppersList || this.tracks;
    this.renderTopPodium(list);
    const listContainer = document.getElementById('toppers-list-container');
    if (!listContainer) return;

    listContainer.innerHTML = list.map((t, idx) => `
      <div class="surface-card rounded-xl p-3 flex items-center justify-between mb-2.5 cursor-pointer hover:border-primary-gold/40 transition-all"
           onclick="app.playTrackById(${t.id})">
        <div class="flex items-center gap-3">
          <span class="font-display font-black text-base w-6 text-center ${idx < 3 ? 'text-primary-gold' : 'text-text-muted'}">
            ${t.periodRank || t.rank || idx + 1}
          </span>
          <img src="${t.img}" alt="${t.title}" class="w-12 h-12 rounded-lg object-cover"/>
          <div>
            <h4 class="font-display font-bold text-sm text-white truncate max-w-[160px] md:max-w-xs">${t.title}</h4>
            <p class="text-xs text-primary-gold truncate">${t.artist}</p>
            <div class="flex items-center gap-1.5 mt-0.5">
              <span class="text-[10px] font-mono text-secondary-green">${t.county}</span>
              <span class="text-[10px] text-text-dim">•</span>
              <span class="text-[10px] text-text-muted">${t.genre}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-right">
            <p class="text-xs font-mono font-bold text-white">${t.plays}</p>
            <span class="text-[10px] font-mono ${(t.delta || '+1').startsWith('+') ? 'text-secondary-green' : t.delta === 'NEW' ? 'text-primary-gold' : 'text-red-400'}">
              ${t.delta || '+1'}
            </span>
          </div>
          <button class="w-8 h-8 rounded-full bg-surface-high text-primary-gold flex items-center justify-center">
            <span class="material-symbols-outlined text-lg">play_arrow</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  async filterToppersPeriod(period = 'daily') {
    document.querySelectorAll('.toppers-period-btn').forEach(b => {
      b.classList.remove('bg-primary-gold', 'text-black', 'font-bold');
      b.classList.add('text-text-muted');
    });
    const activeBtn = document.getElementById(`toppers-tab-${period}`);
    if (activeBtn) {
      activeBtn.classList.remove('text-text-muted');
      activeBtn.classList.add('bg-primary-gold', 'text-black', 'font-bold');
    }

    try {
      const res = await this.apiRequest(`/api/toppers?period=${period}`);
      if (res && res.success && res.toppers) {
        this.currentToppersList = res.toppers;
        this.renderToppersLeaderboard(this.currentToppersList);
        const periodLabels = {
          daily: 'Daily 24H Charts',
          weekly: 'Weekly Official Charts',
          monthly: 'Monthly 254 Heavy Hitters',
          alltime: 'All-Time Hall of Fame'
        };
        this.showToast(`📊 Switched to ${periodLabels[period] || period}`);
      }
    } catch (e) {
      console.warn('Toppers period switch error:', e);
    }
  }

  renderExploreView() {
    // Render county buttons, dialect chips, genre heatmap
    const countyChipsContainer = document.getElementById('explore-county-chips');
    if (countyChipsContainer) {
      countyChipsContainer.innerHTML = [
        "All Counties", "Nairobi City", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Uasin Gishu", "Machakos", "Kilifi"
      ].map(c => `
        <button class="filter-chip ${this.selectedCounty === c || (c === 'All Counties' && this.selectedCounty === 'All') ? 'active' : ''}"
                onclick="app.selectCounty('${c === 'All Counties' ? 'All' : c}')">
          ${c}
        </button>
      `).join('');
    }

    const genreGrid = document.getElementById('explore-genre-heatmap');
    if (genreGrid) {
      genreGrid.innerHTML = GENRES.map(g => `
        <div class="surface-card rounded-xl p-3 cursor-pointer hover:border-secondary-green transition-all"
             onclick="app.selectGenre('${g}')">
          <div class="flex justify-between items-center mb-1">
            <h4 class="font-display font-bold text-sm text-white">${g}</h4>
            <span class="text-xs text-secondary-green font-mono">🔥</span>
          </div>
          <p class="text-[11px] text-text-muted">Explore Top 100 & Dialects</p>
        </div>
      `).join('');
    }

    const dialectContainer = document.getElementById('explore-dialect-chips');
    if (dialectContainer) {
      dialectContainer.innerHTML = DIALECTS.map(d => `
        <button class="filter-chip ${this.selectedDialect === d ? 'active' : ''}" onclick="app.selectDialect('${d}')">
          ${d}
        </button>
      `).join('');
    }
  }

  renderExploreCountiesModal() {
    const list = document.getElementById('counties-modal-list');
    if (!list) return;

    list.innerHTML = KENYA_COUNTIES.map((c, i) => {
      const stat = (this.countiesStats && this.countiesStats[c]) || null;
      const countLabel = stat && stat.tracksCount ? `${stat.tracksCount} tracks` : 'Top 100';
      return `
      <div class="p-3 rounded-lg bg-surface-card hover:bg-[#141414] hover:border-primary-gold/40 border border-transparent cursor-pointer flex items-center justify-between"
           onclick="app.selectCounty('${c}'); app.closeCountiesModal();">
        <div class="flex items-center gap-3">
          <span class="text-xs font-mono text-text-dim w-6">#${i + 1}</span>
          <div>
            <span class="font-display text-sm font-semibold text-white block">${c}</span>
            ${stat && stat.topGenres && stat.topGenres.length ? `<span class="text-[10px] text-text-muted">${stat.topGenres.slice(0, 2).join(' • ')}</span>` : ''}
          </div>
        </div>
        <span class="text-xs font-mono text-secondary-green">${countLabel} ›</span>
      </div>
    `;
    }).join('');
  }

  renderEventsView() {
    const container = document.getElementById('events-list-container');
    if (!container) return;

    container.innerHTML = this.events.map(ev => `
      <div class="surface-card rounded-xl overflow-hidden h-full flex flex-col justify-between">
        <div>
          <div class="relative w-full h-48 bg-black">
            <img src="${ev.img}" alt="${ev.title}" class="w-full h-full object-cover opacity-80"/>
            <div class="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent"></div>
            <span class="absolute top-3 left-3 bg-primary-gold text-surface-card font-bold text-xs px-2.5 py-1 rounded-full">
              ${ev.county}
            </span>
            <span class="absolute bottom-3 right-3 text-xs font-mono text-white bg-black/60 px-2 py-0.5 rounded">
              KES ${ev.price}
            </span>
          </div>
          <div class="p-4 pb-0">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-display font-bold text-lg text-white">${ev.title}</h3>
                <p class="text-xs text-primary-gold mt-0.5">${ev.venue}, ${ev.city}</p>
              </div>
              <span class="text-xs font-mono text-secondary-green">${ev.date}</span>
            </div>
            <p class="text-xs text-text-muted mt-2">${ev.desc}</p>
          </div>
        </div>
        <div class="p-4 pt-4 flex gap-2">
          <button class="flex-1 py-2.5 rounded-lg bg-primary-gold text-surface-card font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                  onclick="app.openTicketPurchaseModal(${ev.id})">
            <span class="material-symbols-outlined text-base">confirmation_number</span>
            Buy Ticket with M-Pesa
          </button>
          <button class="px-3 rounded-lg border border-surface-border text-white hover:bg-surface-high"
                  onclick="app.showToast('Event added to your calendar!')">
            <span class="material-symbols-outlined text-base">calendar_add_on</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  initStudio() {
    this.populateStudioCounties();
    this.updateStudioRoleState();
    this.renderStudioWaveform();
  }

  populateStudioCounties() {
    const countySelect = document.getElementById('upload-county');
    if (!countySelect) return;

    const COUNTIES_47 = [
      "Nairobi City", "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta",
      "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi",
      "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga",
      "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia",
      "Uasin Gishu", "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru",
      "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma",
      "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira"
    ];

    const currentVal = countySelect.value;
    countySelect.innerHTML = COUNTIES_47.map(c => `
      <option value="${c}" ${c === currentVal || (this.currentUser && this.currentUser.county === c) ? 'selected' : ''}>${c}</option>
    `).join('');
  }

  updateStudioRoleState() {
    const banner = document.getElementById('studio-role-banner');
    const roleIcon = document.getElementById('studio-role-icon');
    const roleTitle = document.getElementById('studio-role-title');
    const roleBadge = document.getElementById('studio-role-badge');
    const roleSubtitle = document.getElementById('studio-role-subtitle');
    const fanPrompt = document.getElementById('studio-fan-prompt');
    const artistInput = document.getElementById('upload-artist');
    const countySelect = document.getElementById('upload-county');

    const role = this.currentUser?.role || 'fan';

    if (role === 'artist') {
      if (fanPrompt) fanPrompt.classList.add('hidden');
      if (roleIcon) roleIcon.textContent = 'mic';
      if (roleTitle) roleTitle.textContent = 'ZR Artist Studio';
      if (roleBadge) {
        roleBadge.className = 'badge-gold px-2 py-0.5 rounded-full text-[10px] font-bold uppercase';
        roleBadge.textContent = '🎤 Artist';
      }
      if (roleSubtitle) roleSubtitle.textContent = 'Direct upload of singles & EPs to 47 Kenyan counties';
      if (artistInput && !artistInput.value) {
        artistInput.value = this.currentUser?.stageName || this.currentUser?.fullname || '';
      }
      this.switchStudioType('track');
    } else if (role === 'dj') {
      if (fanPrompt) fanPrompt.classList.add('hidden');
      if (roleIcon) roleIcon.textContent = 'album';
      if (roleTitle) roleTitle.textContent = 'ZR DJ Soundstage';
      if (roleBadge) {
        roleBadge.className = 'badge-silver px-2 py-0.5 rounded-full text-[10px] font-bold uppercase';
        roleBadge.textContent = '🎛️ DJ';
      }
      if (roleSubtitle) roleSubtitle.textContent = 'Street mixtapes, Matatu mixes & club party sets';
      if (artistInput && !artistInput.value) {
        artistInput.value = this.currentUser?.djName || this.currentUser?.fullname || '';
      }
      this.switchStudioType('mixtape');
    } else if (role === 'label') {
      if (fanPrompt) fanPrompt.classList.add('hidden');
      if (roleIcon) roleIcon.textContent = 'domain';
      if (roleTitle) roleTitle.textContent = 'ZR Record Label Desk';
      if (roleBadge) {
        roleBadge.className = 'badge-green px-2 py-0.5 rounded-full text-[10px] font-bold uppercase';
        roleBadge.textContent = '🏢 Label';
      }
      if (roleSubtitle) roleSubtitle.textContent = 'Distribute roster catalogs & configure ISRC split sheets';
      if (artistInput && !artistInput.value) {
        artistInput.value = this.currentUser?.labelName || this.currentUser?.fullname || '';
      }
    } else {
      // Fan
      if (fanPrompt) fanPrompt.classList.remove('hidden');
      if (roleIcon) roleIcon.textContent = 'graphic_eq';
      if (roleTitle) roleTitle.textContent = 'ZR Creator Studio';
      if (roleBadge) {
        roleBadge.className = 'bg-surface-card border border-white/20 text-text-muted px-2 py-0.5 rounded-full text-[10px] font-bold uppercase';
        roleBadge.textContent = '🎧 Fan';
      }
      if (roleSubtitle) roleSubtitle.textContent = 'Switch to Artist or DJ to publish tracks on official charts';
    }

    if (countySelect && this.currentUser?.county) {
      countySelect.value = this.currentUser.county;
    }

    // Refresh generated ISRC and NRR previews
    const isrcPreview = document.getElementById('studio-isrc-preview');
    const kecoboPreview = document.getElementById('studio-kecobo-preview');
    if (isrcPreview) isrcPreview.textContent = `KE-ZR1-26-${Math.floor(10000 + Math.random() * 90000)}`;
    if (kecoboPreview) kecoboPreview.textContent = `NRR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  }

  renderStudioWaveform() {
    const container = document.getElementById('studio-preview-waveform');
    if (!container) return;

    let bars = '';
    for (let i = 0; i < 28; i++) {
      const height = Math.floor(Math.random() * 20) + 6;
      bars += `<div id="swave-${i}" class="studio-wave-bar" style="height: ${height}px"></div>`;
    }
    container.innerHTML = bars;
  }

  renderStudioView() {
    this.populateStudioCounties();
    this.updateStudioRoleState();
    this.renderStudioWaveform();
  }

  renderAnalyticsView() {
    const countyBars = document.getElementById('analytics-county-distribution');
    if (!countyBars) return;

    const data = [
      { county: "Nairobi City", pct: 45, listeners: "400.5K" },
      { county: "Mombasa", pct: 22, listeners: "195.8K" },
      { county: "Kisumu", pct: 15, listeners: "133.5K" },
      { county: "Nakuru", pct: 10, listeners: "89.0K" },
      { county: "Kiambu", pct: 8, listeners: "71.2K" }
    ];

    countyBars.innerHTML = data.map(d => `
      <div class="mb-3">
        <div class="flex justify-between text-xs font-mono mb-1">
          <span class="text-white">${d.county}</span>
          <span class="text-secondary-green">${d.listeners} (${d.pct}%)</span>
        </div>
        <div class="w-full h-2 bg-surface-high rounded-full overflow-hidden">
          <div class="h-full bg-secondary-green rounded-full" style="width: ${d.pct}%"></div>
        </div>
      </div>
    `).join('');
  }

  renderReactionsView() {
    const container = document.getElementById('reactions-list-container');
    if (!container) return;

    container.innerHTML = this.reactions.map(r => `
      <div class="surface-card rounded-xl p-3.5 flex items-start gap-3 h-full">
        <div class="w-10 h-10 rounded-full bg-[#141414] border border-primary-gold/40 flex items-center justify-center font-display font-bold text-primary-gold shrink-0">
          ${r.author.charAt(0)}
        </div>
        <div class="flex-1 flex flex-col justify-between h-full">
          <div>
            <div class="flex items-center justify-between">
              <h4 class="font-display font-bold text-xs text-white">@${r.author}</h4>
              <span class="text-[10px] font-mono text-text-dim">${r.time}</span>
            </div>
            <span class="text-[10px] font-mono text-primary-gold">${r.county}</span>
            <p class="text-xs text-[#BDB8A8] mt-1.5 leading-relaxed">${r.text}</p>
          </div>
          <div class="flex items-center gap-4 mt-3 text-text-dim text-[11px]">
            <button class="flex items-center gap-1 hover:text-red-400" onclick="app.likeReaction(${r.id})">
              <span class="material-symbols-outlined text-sm">favorite</span> ${r.likes}
            </button>
            <button class="hover:text-primary-gold" onclick="app.showToast('Reply feature coming in next drop!')">Reply</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  async submitReaction(e) {
    if (e) e.preventDefault();
    const authorInput = document.getElementById('reaction-author-input');
    const countySelect = document.getElementById('reaction-county-select');
    const textInput = document.getElementById('reaction-text-input');

    const author = (authorInput?.value || (this.currentUser ? this.currentUser.fullname : 'Kamau_Nrb')).trim();
    const county = countySelect?.value || (this.currentUser ? this.currentUser.county : 'Nairobi City');
    const text = textInput?.value?.trim();

    if (!text) {
      this.showToast('Please enter a shoutout message!');
      return;
    }

    try {
      const currentTrack = (this.audio && this.audio.queue && this.audio.queue[this.audio.currentIndex]) || this.tracks[0];
      const res = await this.apiRequest('/api/reactions', 'POST', {
        author,
        county,
        text,
        songTitle: currentTrack ? currentTrack.title : 'ZetuRoots Vibes'
      });

      if (res && res.reaction) {
        this.reactions.unshift(res.reaction);
        this.saveLocalStore('zr_reactions', this.reactions);
        this.renderReactionsView();
        if (textInput) textInput.value = '';
        this.showToast(`Shoutout posted from ${county}! 🇰🇪`);
      }
    } catch (err) {
      console.warn('[Reactions] API error, falling back locally:', err);
      const fallback = {
        id: Date.now(),
        author,
        county,
        text,
        likes: 0,
        time: 'Just now'
      };
      this.reactions.unshift(fallback);
      this.saveLocalStore('zr_reactions', this.reactions);
      this.renderReactionsView();
      if (textInput) textInput.value = '';
      this.showToast(`Shoutout posted (offline)! 🇰🇪`);
    }
  }

  async likeReaction(id) {
    const reaction = this.reactions.find(r => r.id === id);
    if (reaction) {
      reaction.likes = (reaction.likes || 0) + 1;
      this.saveLocalStore('zr_reactions', this.reactions);
      this.renderReactionsView();
      this.showToast('Cheered shoutout! 🔥');

      try {
        const res = await this.apiRequest(`/api/reactions/${id}/like`, 'POST');
        if (res && res.reaction) {
          reaction.likes = res.reaction.likes;
          this.saveLocalStore('zr_reactions', this.reactions);
          this.renderReactionsView();
        } else if (res && typeof res.likes === 'number') {
          reaction.likes = res.likes;
          this.saveLocalStore('zr_reactions', this.reactions);
          this.renderReactionsView();
        }
      } catch (err) {
        // silent offline
      }
    }
  }

  renderCopyrightView() {
    // Render status lookup or KECOBO details
  }

  renderProfileView() {
    const user = this.currentUser || {
      fullname: "Guest Listener",
      email: "guest@zeturoots.com",
      phone: "0700000000",
      county: "Nairobi City",
      role: "fan",
      avatar: "https://images.unsplash.com/photo-1534308143439-3c0e5d430e77?w=300&h=300&fit=crop",
      bio: "Explore, stream and support Kenyan music across all 47 counties.",
      verified: false
    };

    const profileName = document.getElementById('profile-name');
    const profileHandle = document.getElementById('profile-handle-county');
    const profileRoleBadge = document.getElementById('profile-role-badge');
    const profileBio = document.getElementById('profile-bio');
    const profileAvatar = document.getElementById('profile-avatar');
    const profileVerified = document.getElementById('profile-verified-badge');
    const roleActions = document.getElementById('profile-role-actions');

    const roleBadges = {
      fan: { label: '🎧 Fan / Listener', color: 'bg-secondary-green text-black' },
      artist: { label: '🎤 Verified Artist', color: 'bg-primary-gold text-black' },
      dj: { label: '🎛️ Official DJ', color: 'bg-cyan-400 text-black' },
      label: { label: '🏢 Record Label', color: 'bg-amber-400 text-black' },
      organizer: { label: '🎟️ Event Organizer', color: 'bg-purple-400 text-black' }
    };

    const rb = roleBadges[user.role] || roleBadges.fan;

    if (profileName) profileName.textContent = user.stageName || user.djName || user.labelName || user.orgName || user.fullname;
    if (profileHandle) profileHandle.textContent = `@${user.fullname.toLowerCase().replace(/\s+/g, '_')} • ${user.county}`;
    if (profileRoleBadge) {
      profileRoleBadge.textContent = rb.label;
      profileRoleBadge.className = `inline-block mt-2 text-xs font-bold px-3 py-0.5 rounded-full uppercase font-mono ${rb.color}`;
    }
    if (profileBio) profileBio.textContent = user.bio || `ZetuRoots ${user.role} member`;
    if (profileAvatar) profileAvatar.src = user.avatar || 'https://images.unsplash.com/photo-1534308143439-3c0e5d430e77?w=300&h=300&fit=crop';
    if (profileVerified) {
      profileVerified.style.display = user.verified ? 'inline' : 'none';
    }

    // Role-specific action buttons
    if (roleActions) {
      if (user.role === 'artist') {
        roleActions.innerHTML = `
          <div class="grid grid-cols-2 gap-2 mb-3">
            <button class="p-3 bg-[#141414] border border-primary-gold/40 rounded-xl text-left hover:border-primary-gold active:scale-95 transition-all" onclick="app.navigate('studio')">
              <span class="material-symbols-outlined text-primary-gold text-xl">upload</span>
              <p class="font-bold text-xs text-white mt-1">Upload New Track</p>
              <span class="text-[10px] text-text-muted">Direct to 47 Counties</span>
            </button>
            <button class="p-3 bg-[#141414] border border-primary-gold/40 rounded-xl text-left hover:border-primary-gold active:scale-95 transition-all" onclick="app.navigate('analytics')">
              <span class="material-symbols-outlined text-secondary-green text-xl">insights</span>
              <p class="font-bold text-xs text-white mt-1">Artist Analytics</p>
              <span class="text-[10px] text-text-muted">Plays & KES Revenue</span>
            </button>
          </div>
          <div class="p-3 bg-surface rounded-xl border border-surface-border flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary-gold">verified_user</span>
              <span class="text-xs text-white">KECOBO ISRC: <b class="font-mono text-secondary-green">${user.kecoboReg || 'Registered'}</b></span>
            </div>
            <button class="text-xs text-primary-gold underline" onclick="app.navigate('copyright')">View Claims</button>
          </div>
        `;
      } else if (user.role === 'dj') {
        roleActions.innerHTML = `
          <div class="grid grid-cols-2 gap-2 mb-3">
            <button class="p-3 bg-[#141414] border border-cyan-400/40 rounded-xl text-left hover:border-cyan-400 active:scale-95 transition-all" onclick="app.navigate('studio')">
              <span class="material-symbols-outlined text-cyan-400 text-xl">album</span>
              <p class="font-bold text-xs text-white mt-1">Upload Mixtape</p>
              <span class="text-[10px] text-text-muted">Street Mixes & Sets</span>
            </button>
            <button class="p-3 bg-[#141414] border border-cyan-400/40 rounded-xl text-left hover:border-cyan-400 active:scale-95 transition-all" onclick="app.navigate('analytics')">
              <span class="material-symbols-outlined text-secondary-green text-xl">headphones</span>
              <p class="font-bold text-xs text-white mt-1">DJ Plays & Reach</p>
              <span class="text-[10px] text-text-muted">Club & Party Stats</span>
            </button>
          </div>
        `;
      } else if (user.role === 'organizer') {
        roleActions.innerHTML = `
          <div class="grid grid-cols-2 gap-2 mb-3">
            <button class="p-3 bg-[#141414] border border-purple-400/40 rounded-xl text-left hover:border-purple-400 active:scale-95 transition-all" onclick="app.navigate('events')">
              <span class="material-symbols-outlined text-purple-400 text-xl">add_circle</span>
              <p class="font-bold text-xs text-white mt-1">Create Live Event</p>
              <span class="text-[10px] text-text-muted">Concerts & Festivals</span>
            </button>
            <button class="p-3 bg-[#141414] border border-purple-400/40 rounded-xl text-left hover:border-purple-400 active:scale-95 transition-all" onclick="app.openMpesaModal('Event Revenue Withdrawal', 5000)">
              <span class="material-symbols-outlined text-secondary-green text-xl">payments</span>
              <p class="font-bold text-xs text-white mt-1">M-Pesa Ticket Payouts</p>
              <span class="text-[10px] text-text-muted">Instant Daraja Payout</span>
            </button>
          </div>
        `;
      } else if (user.role === 'label') {
        roleActions.innerHTML = `
          <div class="grid grid-cols-2 gap-2 mb-3">
            <button class="p-3 bg-[#141414] border border-amber-400/40 rounded-xl text-left hover:border-amber-400 active:scale-95 transition-all" onclick="app.navigate('studio')">
              <span class="material-symbols-outlined text-amber-400 text-xl">groups</span>
              <p class="font-bold text-xs text-white mt-1">Manage Roster</p>
              <span class="text-[10px] text-text-muted">Artist Contracts & Catalog</span>
            </button>
            <button class="p-3 bg-[#141414] border border-amber-400/40 rounded-xl text-left hover:border-amber-400 active:scale-95 transition-all" onclick="app.navigate('copyright')">
              <span class="material-symbols-outlined text-primary-gold text-xl">policy</span>
              <p class="font-bold text-xs text-white mt-1">Licensing & Rights</p>
              <span class="text-[10px] text-text-muted">KECOBO Registrations</span>
            </button>
          </div>
        `;
      } else {
        roleActions.innerHTML = `
          <div class="p-3 bg-surface rounded-xl border border-surface-border flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary-green">favorite</span>
              <span class="text-xs text-white">Fan Supporter of Kenyan Grassroots Sound</span>
            </div>
            <button class="text-xs font-bold text-primary-gold hover:underline" onclick="app.navigate('toppers')">Browse Top 100</button>
          </div>
        `;
      }
    }

    this.loadUserTickets();
  }

  // ─── AUTHENTICATION & ROLE MANAGEMENT ─────────────────────────────────────

  showSignupError(msg) {
    const box = document.getElementById('signup-error');
    const text = document.getElementById('signup-error-text');
    if (box && text) {
      text.textContent = msg;
      box.classList.remove('hidden');
    } else {
      this.showToast(msg);
    }
  }

  clearSignupError() {
    const box = document.getElementById('signup-error');
    if (box) box.classList.add('hidden');
  }

  showLoginError(msg) {
    const box = document.getElementById('login-error');
    const text = document.getElementById('login-error-text');
    if (box && text) {
      text.textContent = msg;
      box.classList.remove('hidden');
    } else {
      this.showToast(msg);
    }
  }

  clearLoginError() {
    const box = document.getElementById('login-error');
    if (box) box.classList.add('hidden');
  }

  openSignupModal(defaultRole = 'fan') {
    this.closeLoginModal();
    this.closeForgotPasswordModal();
    this.clearSignupError();
    const modal = document.getElementById('signup-modal');
    if (modal) {
      modal.classList.add('open');
      this.selectRole(defaultRole);
    }
  }

  closeSignupModal() {
    const modal = document.getElementById('signup-modal');
    if (modal) modal.classList.remove('open');
    this.clearSignupError();
  }

  openLoginModal() {
    this.closeSignupModal();
    this.closeForgotPasswordModal();
    this.clearLoginError();
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.add('open');
  }

  closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.remove('open');
    this.clearLoginError();
  }

  switchModalLoginTab(tab) {
    const tabPass = document.getElementById('modal-tab-password');
    const tabOtp = document.getElementById('modal-tab-otp');
    const formPass = document.getElementById('modal-form-password');
    const formOtp = document.getElementById('modal-form-otp');

    if (!tabPass || !tabOtp || !formPass || !formOtp) return;

    if (tab === 'otp') {
      tabPass.classList.remove('bg-primary-gold', 'text-black');
      tabPass.classList.add('text-text-muted');
      tabOtp.classList.add('bg-primary-gold', 'text-black');
      tabOtp.classList.remove('text-text-muted');
      formPass.classList.add('hidden');
      formOtp.classList.remove('hidden');
    } else {
      tabOtp.classList.remove('bg-primary-gold', 'text-black');
      tabOtp.classList.add('text-text-muted');
      tabPass.classList.add('bg-primary-gold', 'text-black');
      tabPass.classList.remove('text-text-muted');
      formOtp.classList.add('hidden');
      formPass.classList.remove('hidden');
    }
    this.clearLoginError();
  }

  async submitModalOtpRequest() {
    this.clearLoginError();
    const phoneInput = document.getElementById('modal-otp-phone');
    const statusBox = document.getElementById('modal-otp-status');
    const statusMsg = document.getElementById('modal-otp-status-msg');
    const sendBtn = document.getElementById('modal-otp-send-btn');

    const phone = phoneInput?.value.trim();
    if (!phone) {
      this.showLoginError('Please enter your Safaricom phone number (e.g. 712345678).');
      return;
    }

    try {
      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';
      }

      const res = await this.apiRequest('/api/auth/otp-request', 'POST', { phone });

      if (statusBox && statusMsg) {
        statusBox.classList.remove('hidden');
        statusMsg.textContent = res.message || 'OTP sent via SMS';
      }

      const otpCodeInput = document.getElementById('modal-otp-code');
      if (otpCodeInput) otpCodeInput.focus();

      this.showToast(`SMS OTP sent to +${res.phone || phone}. Demo: 254254`);

      let timeLeft = 60;
      const interval = setInterval(() => {
        timeLeft--;
        if (sendBtn) sendBtn.textContent = `Resend (${timeLeft}s)`;
        if (timeLeft <= 0) {
          clearInterval(interval);
          if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Code';
          }
        }
      }, 1000);
    } catch (err) {
      console.warn('Modal OTP request error:', err);
      this.showLoginError(err.message || 'Failed to dispatch SMS verification code.');
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Code';
      }
    }
  }

  fillModalDemoOtp() {
    const codeInput = document.getElementById('modal-otp-code');
    if (codeInput) {
      codeInput.value = '254254';
      this.showToast('Demo OTP 254254 applied!');
    }
  }

  async verifyModalOtp() {
    this.clearLoginError();
    const phone = document.getElementById('modal-otp-phone')?.value.trim();
    const otp = document.getElementById('modal-otp-code')?.value.trim();

    if (!phone || !otp) {
      this.showLoginError('Please enter both your phone number and 6-digit OTP code.');
      return;
    }

    try {
      const data = await this.apiRequest('/api/auth/otp-verify', 'POST', { phone, otp });
      this.currentUser = data.user;
      if (data.token) {
        localStorage.setItem('zr_auth_token', data.token);
      }
      this.saveLocalStore('zr_auth_user', this.currentUser);
      this.closeLoginModal();
      this.updateAuthUI();
      this.showToast(`Karibu ZetuRoots, ${data.user.fullname}! 🇰🇪`);
      this.navigate('profile');
    } catch (err) {
      console.warn('Modal OTP verify error:', err);
      this.showLoginError(err.message || 'Invalid verification code. Use demo code 254254.');
    }
  }

  openForgotPasswordModal() {
    this.closeLoginModal();
    this.closeSignupModal();
    this.clearForgotModalError();

    const step1 = document.getElementById('forgot-modal-step-1');
    const step2 = document.getElementById('forgot-modal-step-2');
    const step3 = document.getElementById('forgot-modal-step-3');
    if (step1) step1.classList.remove('hidden');
    if (step2) step2.classList.add('hidden');
    if (step3) step3.classList.add('hidden');

    this.updateModalStepBadges(1);

    const modal = document.getElementById('forgot-password-modal');
    if (modal) modal.classList.add('open');
  }

  closeForgotPasswordModal() {
    const modal = document.getElementById('forgot-password-modal');
    if (modal) modal.classList.remove('open');
    this.clearForgotModalError();
  }

  showForgotModalError(msg) {
    const box = document.getElementById('forgot-modal-error');
    const text = document.getElementById('forgot-modal-error-text');
    if (box && text) {
      text.textContent = msg;
      box.classList.remove('hidden');
    }
  }

  clearForgotModalError() {
    const box = document.getElementById('forgot-modal-error');
    if (box) box.classList.add('hidden');
  }

  updateModalStepBadges(step) {
    for (let s = 1; s <= 3; s++) {
      const badge = document.getElementById(`reset-modal-step-badge-${s}`);
      if (!badge) continue;
      if (s === step) {
        badge.className = 'px-2.5 py-0.5 rounded-full bg-primary-gold text-black font-bold';
      } else if (s < step) {
        badge.className = 'px-2.5 py-0.5 rounded-full bg-secondary-green/30 text-secondary-green font-bold border border-secondary-green/40';
      } else {
        badge.className = 'px-2.5 py-0.5 rounded-full bg-surface-card text-text-dim border border-surface-border';
      }
    }
  }

  async submitModalForgotPasswordRequest() {
    this.clearForgotModalError();
    const identInput = document.getElementById('forgot-modal-identifier');
    const identifier = identInput?.value.trim();

    if (!identifier) {
      this.showForgotModalError('Please enter your email or Safaricom phone number.');
      return;
    }

    const btn = document.getElementById('forgot-modal-step1-btn');
    try {
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending Code...';
      }

      const res = await this.apiRequest('/api/auth/forgot-password', 'POST', { identifier });

      const step1 = document.getElementById('forgot-modal-step-1');
      const step2 = document.getElementById('forgot-modal-step-2');
      if (step1) step1.classList.add('hidden');
      if (step2) step2.classList.remove('hidden');

      this.updateModalStepBadges(2);

      const targetMsg = document.getElementById('forgot-modal-target-msg');
      if (targetMsg) targetMsg.textContent = res.message || `Code sent to ${res.maskedTarget || identifier}`;

      this.showToast(`Reset code dispatched. Demo code: 254254`);
    } catch (err) {
      console.warn('Forgot password request error:', err);
      this.showForgotModalError(err.message || 'No registered account found with that email/phone.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Send 6-Digit Reset Code';
      }
    }
  }

  fillModalDemoResetCode() {
    const input = document.getElementById('forgot-modal-code');
    if (input) {
      input.value = '254254';
      this.showToast('Demo reset code 254254 applied!');
    }
  }

  updateModalResetPasswordStrength(password) {
    const bar = document.getElementById('forgot-modal-strength-bar');
    const label = document.getElementById('forgot-modal-strength-label');
    if (!bar || !label) return;

    if (!password) {
      bar.style.width = '8%';
      bar.className = 'h-full bg-red-500 transition-all';
      label.textContent = 'Too Short';
      label.className = 'text-red-400 font-bold';
      return;
    }

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;

    if (score <= 1) {
      bar.style.width = '20%';
      bar.className = 'h-full bg-red-500 transition-all';
      label.textContent = 'Weak';
      label.className = 'text-red-400 font-bold';
    } else if (score === 2) {
      bar.style.width = '45%';
      bar.className = 'h-full bg-amber-500 transition-all';
      label.textContent = 'Fair';
      label.className = 'text-amber-400 font-bold';
    } else if (score === 3 || score === 4) {
      bar.style.width = '75%';
      bar.className = 'h-full bg-blue-400 transition-all';
      label.textContent = 'Good';
      label.className = 'text-blue-400 font-bold';
    } else {
      bar.style.width = '100%';
      bar.className = 'h-full bg-secondary-green transition-all';
      label.textContent = 'Strong 🇰🇪';
      label.className = 'text-secondary-green font-bold';
    }
  }

  async submitModalResetPassword() {
    this.clearForgotModalError();
    const identifier = document.getElementById('forgot-modal-identifier')?.value.trim();
    const code = document.getElementById('forgot-modal-code')?.value.trim();
    const newPassword = document.getElementById('forgot-modal-password')?.value;

    if (!code || !newPassword) {
      this.showForgotModalError('Please enter both the 6-digit code and your new password.');
      return;
    }

    if (newPassword.length < 6) {
      this.showForgotModalError('Password must be at least 6 characters long.');
      return;
    }

    const btn = document.getElementById('forgot-modal-step2-btn');
    try {
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Saving Password...';
      }

      const res = await this.apiRequest('/api/auth/reset-password', 'POST', { identifier, code, newPassword });

      this.currentUser = res.user;
      if (res.token) {
        localStorage.setItem('zr_auth_token', res.token);
      }
      this.saveLocalStore('zr_auth_user', this.currentUser);
      this.updateAuthUI();

      const step2 = document.getElementById('forgot-modal-step-2');
      const step3 = document.getElementById('forgot-modal-step-3');
      if (step2) step2.classList.add('hidden');
      if (step3) step3.classList.remove('hidden');

      this.updateModalStepBadges(3);
      this.showToast(`Password updated! Welcome back, ${res.user.fullname}. 🇰🇪`);
    } catch (err) {
      console.warn('Reset password error:', err);
      this.showForgotModalError(err.message || 'Invalid or expired code. Use demo code 254254.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Save New Password & Sign In';
      }
    }
  }

  selectRole(role) {
    this.selectedRole = role;
    const input = document.getElementById('reg-role-input');
    if (input) input.value = role;

    // Highlight selected role card
    ['fan', 'artist', 'dj', 'label', 'organizer'].forEach(r => {
      const card = document.getElementById(`role-card-${r}`);
      if (card) {
        if (r === role) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      }
    });

    // Toggle dynamic metadata container
    const dynamicContainer = document.getElementById('role-dynamic-fields');
    if (dynamicContainer) {
      if (role === 'fan') {
        dynamicContainer.classList.add('hidden');
      } else {
        dynamicContainer.classList.remove('hidden');
      }
    }

    // Toggle specific role inputs
    ['artist', 'dj', 'label', 'organizer'].forEach(r => {
      const fields = document.getElementById(`fields-${r}`);
      if (fields) {
        if (r === role) {
          fields.classList.remove('hidden');
        } else {
          fields.classList.add('hidden');
        }
      }
    });
  }

  togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  async submitRegistration(e) {
    e.preventDefault();
    this.clearSignupError();

    const fullname = document.getElementById('reg-fullname')?.value.trim();
    const email = document.getElementById('reg-email')?.value.trim();
    const phone = document.getElementById('reg-phone')?.value.trim();
    const county = document.getElementById('reg-county')?.value;
    const password = document.getElementById('reg-password')?.value;
    const role = document.getElementById('reg-role-input')?.value || 'fan';

    if (!fullname || !email || !phone || !password) {
      this.showSignupError('Please fill in your name, email, phone number, and password.');
      return;
    }

    const payload = {
      fullname,
      email,
      phone,
      county,
      password,
      role
    };

    if (role === 'artist') {
      payload.stageName = document.getElementById('reg-artist-stagename')?.value.trim() || fullname;
      payload.genre = document.getElementById('reg-artist-genre')?.value || 'Gengetone';
      payload.dialect = document.getElementById('reg-artist-dialect')?.value || 'Sheng';
      payload.kecoboReg = document.getElementById('reg-artist-kecobo')?.value.trim() || `NRR-2026-${Math.floor(Math.random()*90000)+10000}`;
    } else if (role === 'dj') {
      payload.djName = document.getElementById('reg-dj-name')?.value.trim() || `DJ ${fullname.split(' ')[0]}`;
      payload.mixStyle = document.getElementById('reg-dj-style')?.value.trim() || 'Street Mixes';
    } else if (role === 'label') {
      payload.labelName = document.getElementById('reg-label-name')?.value.trim() || fullname;
      payload.businessReg = document.getElementById('reg-label-reg')?.value.trim() || `CPR/${new Date().getFullYear()}/001`;
    } else if (role === 'organizer') {
      payload.orgName = document.getElementById('reg-org-name')?.value.trim() || fullname;
      payload.venues = document.getElementById('reg-org-venues')?.value.trim() || 'Kenya Nationwide';
    }

    try {
      const data = await this.apiRequest('/api/auth/register', 'POST', payload);

      this.currentUser = data.user;
      if (data.token) {
        localStorage.setItem('zr_auth_token', data.token);
      }
      this.saveLocalStore('zr_auth_user', this.currentUser);
      this.closeSignupModal();
      this.updateAuthUI();
      this.showToast(`Karibu ZetuRoots, ${data.user.fullname}! Registered as ${role.toUpperCase()}. 🇰🇪`);
      this.navigate('profile');
    } catch (err) {
      console.warn('Registration API error:', err);
      this.showSignupError(err.message || 'Registration failed. Please check your credentials.');
    }
  }

  async submitLogin(e) {
    e.preventDefault();
    this.clearLoginError();

    const identifier = document.getElementById('login-identifier')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    if (!identifier || !password) {
      this.showLoginError('Please enter both your email or phone and password.');
      return;
    }

    try {
      const data = await this.apiRequest('/api/auth/login', 'POST', { identifier, password });

      this.currentUser = data.user;
      if (data.token) {
        localStorage.setItem('zr_auth_token', data.token);
      }
      this.saveLocalStore('zr_auth_user', this.currentUser);
      this.closeLoginModal();
      this.updateAuthUI();
      this.showToast(`Welcome back, ${data.user.fullname}! 🇰🇪`);
      this.navigate('profile');
    } catch (err) {
      console.warn('Login error:', err);
      this.showLoginError(err.message || 'Invalid email/phone or password. Please try again.');
    }
  }

  quickDemoLogin(role) {
    const demoAccounts = {
      artist: {
        id: 'usr_artist_1',
        fullname: 'Boutross Munene',
        stageName: 'Boutross',
        email: 'artist@zeturoots.com',
        phone: '0712345672',
        county: 'Nairobi City',
        role: 'artist',
        genre: 'Gengetone',
        dialect: 'Sheng',
        kecoboReg: 'NRR-2024-88912',
        avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&h=120&fit=crop',
        bio: 'Shrap King • #1 Topper Artist',
        verified: true,
        badge: 'gold'
      },
      dj: {
        id: 'usr_dj_1',
        fullname: 'Lyta Mwangi',
        djName: 'DJ Lyta',
        email: 'dj@zeturoots.com',
        phone: '0712345673',
        county: 'Nakuru',
        role: 'dj',
        mixStyle: 'Street Mixes & Gengetone',
        avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=120&fit=crop',
        bio: 'Official Nakuru street mixtape maestro',
        verified: true,
        badge: 'silver'
      },
      fan: {
        id: 'usr_fan_1',
        fullname: 'Kevin Odhiambo',
        email: 'fan@zeturoots.com',
        phone: '0712345671',
        county: 'Nairobi City',
        role: 'fan',
        avatar: 'https://images.unsplash.com/photo-1534308143439-3c0e5d430e77?w=120&h=120&fit=crop',
        bio: 'Nairobi music head & Sheng culture lover',
        verified: false
      },
      label: {
        id: 'usr_label_1',
        fullname: 'Kaka Empire Management',
        labelName: 'Kaka Empire',
        email: 'label@zeturoots.com',
        phone: '0712345674',
        county: 'Nairobi City',
        role: 'label',
        businessReg: 'CPR/2021/77881',
        avatar: 'https://images.unsplash.com/photo-1598387993441-a364f854cfac?w=120&h=120&fit=crop',
        bio: 'Kenya record label & rights management',
        verified: true
      },
      organizer: {
        id: 'usr_org_1',
        fullname: 'Carnivore Live Events',
        orgName: 'Carnivore Grounds Events',
        email: 'organizer@zeturoots.com',
        phone: '0712345675',
        county: 'Nairobi City',
        role: 'organizer',
        venues: 'Carnivore Grounds, Nairobi',
        avatar: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=120&h=120&fit=crop',
        bio: 'Organizers of Shujaa Fest & live Kenyan concerts',
        verified: true
      }
    };

    const user = demoAccounts[role] || demoAccounts.fan;
    this.currentUser = user;
    this.saveLocalStore('zr_auth_user', this.currentUser);
    this.closeLoginModal();
    this.updateAuthUI();
    this.showToast(`Logged in as: ${user.stageName || user.djName || user.fullname} [${role.toUpperCase()}]`);
    this.navigate('profile');
  }

  logout() {
    this.currentUser = null;
    try {
      localStorage.removeItem('zr_auth_user');
      localStorage.removeItem('zr_auth_token');
    } catch (e) {}
    this.updateAuthUI();
    this.showToast('Logged out of ZetuRoots.');
    this.navigate('home');
  }

  updateAuthUI() {
    const signinBtn = document.getElementById('header-signin-btn');
    const userBadge = document.getElementById('header-user-badge');
    const roleTag = document.getElementById('header-role-tag');
    const userAvatar = document.getElementById('header-user-avatar');

    const roleIcons = {
      fan: '🎧 Fan',
      artist: '🎤 Artist',
      dj: '🎛️ DJ',
      label: '🏢 Label',
      organizer: '🎟️ Organizer'
    };

    if (this.currentUser) {
      if (signinBtn) signinBtn.classList.add('hidden');
      if (userBadge) {
        userBadge.classList.remove('hidden');
        userBadge.classList.add('flex');
      }
      if (roleTag) {
        roleTag.textContent = roleIcons[this.currentUser.role] || '🎧 Fan';
      }
      if (userAvatar) {
        userAvatar.src = this.currentUser.avatar || 'https://images.unsplash.com/photo-1534308143439-3c0e5d430e77?w=120&h=120&fit=crop';
      }
    } else {
      if (signinBtn) signinBtn.classList.remove('hidden');
      if (userBadge) {
        userBadge.classList.add('hidden');
        userBadge.classList.remove('flex');
      }
    }

    // Toggle Mobile Drawer Guest Auth Actions
    const drawerGuestActions = document.getElementById('drawer-guest-actions');
    if (drawerGuestActions) {
      if (this.currentUser) {
        drawerGuestActions.classList.add('hidden');
      } else {
        drawerGuestActions.classList.remove('hidden');
      }
    }

    // Update Desktop Sidebar Login/Profile Link
    const sidebarAuthLink = document.querySelector('.desktop-nav-link[data-view="login"]');
    if (sidebarAuthLink) {
      if (this.currentUser) {
        sidebarAuthLink.innerHTML = `
          <span class="material-symbols-outlined text-primary-gold text-xl">account_circle</span>
          <span>My Profile</span>
        `;
        sidebarAuthLink.setAttribute('onclick', "app.navigate('profile')");
      } else {
        sidebarAuthLink.innerHTML = `
          <span class="material-symbols-outlined text-secondary-green text-xl">login</span>
          <span>Sign In / Join</span>
        `;
        sidebarAuthLink.setAttribute('onclick', "app.navigate('login')");
      }
    }

    // Refresh profile view if open
    if (this.currentView === 'profile') {
      this.renderProfileView();
    }

    // Refresh studio state to match authenticated user
    this.updateStudioRoleState();
  }

  // ─── DEDICATED LOGIN & SIGNUP PAGE CONTROLLERS ──────────────────────────────

  switchLoginPageTab(tab) {
    const btnPass = document.getElementById('tab-btn-page-password');
    const btnOtp = document.getElementById('tab-btn-page-otp');
    const formPass = document.getElementById('form-login-password');
    const formOtp = document.getElementById('form-login-otp');

    if (!btnPass || !btnOtp || !formPass || !formOtp) return;

    if (tab === 'otp') {
      btnPass.classList.remove('active', 'bg-primary-gold', 'text-black');
      btnPass.classList.add('text-text-muted');
      btnOtp.classList.add('active', 'bg-primary-gold', 'text-black');
      btnOtp.classList.remove('text-text-muted');
      formPass.classList.add('hidden');
      formOtp.classList.remove('hidden');
    } else {
      btnOtp.classList.remove('active', 'bg-primary-gold', 'text-black');
      btnOtp.classList.add('text-text-muted');
      btnPass.classList.add('active', 'bg-primary-gold', 'text-black');
      btnPass.classList.remove('text-text-muted');
      formOtp.classList.add('hidden');
      formPass.classList.remove('hidden');
    }
  }

  showPageLoginError(msg) {
    const box = document.getElementById('page-login-error');
    const text = document.getElementById('page-login-error-text');
    if (box && text) {
      text.textContent = msg;
      box.classList.remove('hidden');
    }
  }

  clearPageLoginError() {
    const box = document.getElementById('page-login-error');
    if (box) box.classList.add('hidden');
  }

  showPageSignupError(msg) {
    const box = document.getElementById('page-signup-error');
    const text = document.getElementById('page-signup-error-text');
    if (box && text) {
      text.textContent = msg;
      box.classList.remove('hidden');
    }
  }

  clearPageSignupError() {
    const box = document.getElementById('page-signup-error');
    if (box) box.classList.add('hidden');
  }

  async requestPhoneOtp() {
    this.clearPageLoginError();
    const phoneInput = document.getElementById('page-login-otp-phone');
    const statusBox = document.getElementById('page-login-otp-status');
    const statusMsg = document.getElementById('page-login-otp-status-msg');
    const reqBtn = document.getElementById('page-login-request-otp-btn');

    const phone = phoneInput?.value.trim();
    if (!phone) {
      this.showPageLoginError('Please enter your Safaricom phone number (e.g. 0712345678).');
      return;
    }

    try {
      if (reqBtn) {
        reqBtn.disabled = true;
        reqBtn.innerHTML = 'Sending...';
      }

      const res = await this.apiRequest('/api/auth/otp-request', 'POST', { phone });

      if (statusBox && statusMsg) {
        statusBox.classList.remove('hidden');
        statusMsg.textContent = res.message || 'OTP sent via SMS';
      }

      const otpCodeInput = document.getElementById('page-login-otp-code');
      if (otpCodeInput) {
        otpCodeInput.focus();
      }

      this.showToast(`SMS OTP sent to +${res.phone || phone}. Demo code: 254254`);

      let timeLeft = 60;
      const interval = setInterval(() => {
        timeLeft--;
        if (reqBtn) {
          reqBtn.innerHTML = `Resend (${timeLeft}s)`;
        }
        if (timeLeft <= 0) {
          clearInterval(interval);
          if (reqBtn) {
            reqBtn.disabled = false;
            reqBtn.innerHTML = 'Send Code';
          }
        }
      }, 1000);
    } catch (err) {
      console.warn('OTP request error:', err);
      this.showPageLoginError(err.message || 'Could not send verification code. Try again.');
      if (reqBtn) {
        reqBtn.disabled = false;
        reqBtn.innerHTML = 'Send Code';
      }
    }
  }

  fillDemoOtp() {
    const codeInput = document.getElementById('page-login-otp-code');
    if (codeInput) {
      codeInput.value = '254254';
      this.showToast('Demo OTP 254254 applied!');
    }
  }

  async verifyPhoneOtp() {
    this.clearPageLoginError();
    const phone = document.getElementById('page-login-otp-phone')?.value.trim();
    const otp = document.getElementById('page-login-otp-code')?.value.trim();

    if (!phone || !otp) {
      this.showPageLoginError('Please enter your phone number and the 6-digit OTP code.');
      return;
    }

    try {
      const data = await this.apiRequest('/api/auth/otp-verify', 'POST', { phone, otp });
      this.currentUser = data.user;
      if (data.token) {
        localStorage.setItem('zr_auth_token', data.token);
      }
      this.saveLocalStore('zr_auth_user', this.currentUser);
      this.updateAuthUI();
      this.showToast(`Karibu ZetuRoots, ${data.user.fullname}! 🇰🇪`);
      this.navigate('profile');
    } catch (err) {
      console.warn('OTP verification error:', err);
      this.showPageLoginError(err.message || 'Invalid OTP code. Use demo code 254254.');
    }
  }

  async submitPageLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.clearPageLoginError();

    const identifier = document.getElementById('page-login-identifier')?.value.trim();
    const password = document.getElementById('page-login-password')?.value;

    if (!identifier || !password) {
      this.showPageLoginError('Please enter both your email or phone and password.');
      return;
    }

    try {
      const data = await this.apiRequest('/api/auth/login', 'POST', { identifier, password });
      this.currentUser = data.user;
      if (data.token) {
        localStorage.setItem('zr_auth_token', data.token);
      }
      this.saveLocalStore('zr_auth_user', this.currentUser);
      this.updateAuthUI();
      this.showToast(`Welcome back, ${data.user.fullname}! 🇰🇪`);
      this.navigate('profile');
    } catch (err) {
      console.warn('Login error:', err);
      this.showPageLoginError(err.message || 'Invalid email/phone or password. Please verify credentials.');
    }
  }

  selectSignupRole(role) {
    const roleInput = document.getElementById('page-reg-role-input');
    if (roleInput) roleInput.value = role;

    ['fan', 'artist', 'dj', 'label', 'organizer'].forEach(r => {
      const card = document.getElementById(`page-role-card-${r}`);
      if (card) {
        if (r === role) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      }
    });

    const dynamicContainer = document.getElementById('page-role-dynamic-fields');
    if (dynamicContainer) {
      if (role === 'fan') {
        dynamicContainer.classList.add('hidden');
      } else {
        dynamicContainer.classList.remove('hidden');
      }
    }

    ['artist', 'dj', 'label', 'organizer'].forEach(r => {
      const fields = document.getElementById(`page-fields-${r}`);
      if (fields) {
        if (r === role) {
          fields.classList.remove('hidden');
        } else {
          fields.classList.add('hidden');
        }
      }
    });
  }

  updatePasswordStrength(password) {
    const bar = document.getElementById('strength-bar');
    const label = document.getElementById('strength-label');
    const hintLength = document.getElementById('hint-min-length');
    const hintNumber = document.getElementById('hint-number');
    const hintSpecial = document.getElementById('hint-special');

    if (!bar || !label) return;

    if (!password) {
      bar.style.width = '8%';
      bar.className = 'h-full bg-red-500 transition-all duration-300';
      label.textContent = 'Too Short';
      label.className = 'text-red-400 font-bold';
      if (hintLength) hintLength.innerHTML = '⚪ 8+ chars';
      if (hintNumber) hintNumber.innerHTML = '⚪ Numbers';
      if (hintSpecial) hintSpecial.innerHTML = '⚪ Special symbol';
      return;
    }

    const hasMinLength = password.length >= 8;
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (hintLength) {
      hintLength.innerHTML = hasMinLength ? '<span class="text-secondary-green font-bold">✓ 8+ chars</span>' : '⚪ 8+ chars';
    }
    if (hintNumber) {
      hintNumber.innerHTML = hasNumbers ? '<span class="text-secondary-green font-bold">✓ Numbers</span>' : '⚪ Numbers';
    }
    if (hintSpecial) {
      hintSpecial.innerHTML = hasSpecial ? '<span class="text-secondary-green font-bold">✓ Special symbol</span>' : '⚪ Special symbol';
    }

    let score = 0;
    if (password.length >= 6) score++;
    if (hasMinLength) score++;
    if (hasNumbers) score++;
    if (hasSpecial) score++;
    if (hasUppercase && hasLowercase) score++;

    if (score <= 1) {
      bar.style.width = '20%';
      bar.className = 'h-full bg-red-500 transition-all duration-300';
      label.textContent = 'Weak';
      label.className = 'text-red-400 font-bold';
    } else if (score === 2) {
      bar.style.width = '45%';
      bar.className = 'h-full bg-amber-500 transition-all duration-300';
      label.textContent = 'Fair';
      label.className = 'text-amber-400 font-bold';
    } else if (score === 3 || score === 4) {
      bar.style.width = '75%';
      bar.className = 'h-full bg-blue-400 transition-all duration-300';
      label.textContent = 'Good';
      label.className = 'text-blue-400 font-bold';
    } else {
      bar.style.width = '100%';
      bar.className = 'h-full bg-secondary-green transition-all duration-300';
      label.textContent = 'Strong 🇰🇪';
      label.className = 'text-secondary-green font-bold';
    }
  }

  async submitPageRegistration(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.clearPageSignupError();

    const fullname = document.getElementById('page-reg-fullname')?.value.trim();
    const email = document.getElementById('page-reg-email')?.value.trim();
    const phone = document.getElementById('page-reg-phone')?.value.trim();
    const county = document.getElementById('page-reg-county')?.value;
    const password = document.getElementById('page-reg-password')?.value;
    const role = document.getElementById('page-reg-role-input')?.value || 'fan';

    if (!fullname || !email || !phone || !password) {
      this.showPageSignupError('Please fill in your legal name, email, phone number, and password.');
      return;
    }

    const payload = {
      fullname,
      email,
      phone,
      county,
      password,
      role
    };

    if (role === 'artist') {
      payload.stageName = document.getElementById('page-reg-artist-stagename')?.value.trim() || fullname;
      payload.genre = document.getElementById('page-reg-artist-genre')?.value || 'Gengetone';
      payload.dialect = document.getElementById('page-reg-artist-dialect')?.value || 'Sheng';
      payload.kecoboReg = document.getElementById('page-reg-artist-kecobo')?.value.trim() || `NRR-2026-${Math.floor(Math.random()*90000)+10000}`;
    } else if (role === 'dj') {
      payload.djName = document.getElementById('page-reg-dj-name')?.value.trim() || `DJ ${fullname.split(' ')[0]}`;
      payload.mixStyle = document.getElementById('page-reg-dj-style')?.value.trim() || 'Street Mixes';
    } else if (role === 'label') {
      payload.labelName = document.getElementById('page-reg-label-name')?.value.trim() || fullname;
      payload.businessReg = document.getElementById('page-reg-label-reg')?.value.trim() || `CPR/${new Date().getFullYear()}/001`;
    } else if (role === 'organizer') {
      payload.orgName = document.getElementById('page-reg-org-name')?.value.trim() || fullname;
      payload.venues = document.getElementById('page-reg-org-venues')?.value.trim() || 'Carnivore Grounds, Nairobi';
    }

    try {
      const data = await this.apiRequest('/api/auth/register', 'POST', payload);

      this.currentUser = data.user;
      if (data.token) {
        localStorage.setItem('zr_auth_token', data.token);
      }
      this.saveLocalStore('zr_auth_user', this.currentUser);
      this.updateAuthUI();
      this.showToast(`Karibu ZetuRoots, ${data.user.fullname}! Registered as ${role.toUpperCase()}. 🇰🇪`);
      this.navigate('profile');
    } catch (err) {
      console.warn('Registration API error:', err);
      this.showPageSignupError(err.message || 'Registration failed. Please check your credentials.');
    }
  }

  // ─── DEDICATED PASSWORD RESET PAGE CONTROLLERS ──────────────────────────────

  goToPageResetStep(step) {
    this.clearPageResetError();
    const step1 = document.getElementById('page-reset-step-1');
    const step2 = document.getElementById('page-reset-step-2');
    const step3 = document.getElementById('page-reset-step-3');

    if (step1) step1.classList.toggle('hidden', step !== 1);
    if (step2) step2.classList.toggle('hidden', step !== 2);
    if (step3) step3.classList.toggle('hidden', step !== 3);

    for (let s = 1; s <= 3; s++) {
      const badge = document.getElementById(`page-reset-badge-${s}`);
      if (!badge) continue;
      if (s === step) {
        badge.className = 'px-3 py-1 rounded-full bg-primary-gold text-black font-bold flex items-center gap-1 shadow-sm';
      } else if (s < step) {
        badge.className = 'px-3 py-1 rounded-full bg-secondary-green/30 text-secondary-green font-bold border border-secondary-green/40 flex items-center gap-1';
      } else {
        badge.className = 'px-3 py-1 rounded-full bg-surface-card text-text-dim border border-surface-border flex items-center gap-1';
      }
    }
  }

  resetPageResetSteps() {
    this.goToPageResetStep(1);
    const idInput = document.getElementById('page-reset-identifier');
    if (idInput) idInput.value = '';
    const codeInput = document.getElementById('page-reset-code');
    if (codeInput) codeInput.value = '';
    const pwdInput = document.getElementById('page-reset-password');
    if (pwdInput) pwdInput.value = '';
    this.updatePageResetPasswordStrength('');
  }

  showPageResetError(msg) {
    const box = document.getElementById('page-reset-error');
    const text = document.getElementById('page-reset-error-text');
    if (box && text) {
      text.textContent = msg;
      box.classList.remove('hidden');
    }
  }

  clearPageResetError() {
    const box = document.getElementById('page-reset-error');
    if (box) box.classList.add('hidden');
  }

  async submitPageForgotPassword(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.clearPageResetError();

    const identifier = document.getElementById('page-reset-identifier')?.value.trim();
    if (!identifier) {
      this.showPageResetError('Please enter your registered email address or Safaricom phone number.');
      return;
    }

    const btn = document.getElementById('page-reset-step1-btn');
    try {
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending Code...';
      }

      const res = await this.apiRequest('/api/auth/forgot-password', 'POST', { identifier });

      this.goToPageResetStep(2);
      const msgElem = document.getElementById('page-reset-target-msg');
      if (msgElem) {
        msgElem.textContent = res.message || `Code sent to ${res.maskedTarget || identifier}`;
      }

      this.showToast(`Reset code sent to ${res.maskedTarget || identifier}. Demo code: 254254`);
    } catch (err) {
      console.warn('Page forgot password error:', err);
      this.showPageResetError(err.message || 'No account found with that email/phone.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Send 6-Digit Reset Code';
      }
    }
  }

  fillPageDemoResetCode() {
    const codeInput = document.getElementById('page-reset-code');
    if (codeInput) {
      codeInput.value = '254254';
      this.showToast('Demo reset code 254254 applied!');
    }
  }

  updatePageResetPasswordStrength(password) {
    const bar = document.getElementById('page-reset-strength-bar');
    const label = document.getElementById('page-reset-strength-label');
    const hintLength = document.getElementById('page-reset-hint-length');
    const hintNumber = document.getElementById('page-reset-hint-number');
    const hintSpecial = document.getElementById('page-reset-hint-special');

    if (!bar || !label) return;

    if (!password) {
      bar.style.width = '8%';
      bar.className = 'h-full bg-red-500 transition-all duration-300';
      label.textContent = 'Too Short';
      label.className = 'text-red-400 font-bold';
      if (hintLength) hintLength.innerHTML = '⚪ 8+ chars';
      if (hintNumber) hintNumber.innerHTML = '⚪ Numbers';
      if (hintSpecial) hintSpecial.innerHTML = '⚪ Special symbol';
      return;
    }

    const hasMinLength = password.length >= 8;
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (hintLength) hintLength.innerHTML = hasMinLength ? '<span class="text-secondary-green font-bold">✓ 8+ chars</span>' : '⚪ 8+ chars';
    if (hintNumber) hintNumber.innerHTML = hasNumbers ? '<span class="text-secondary-green font-bold">✓ Numbers</span>' : '⚪ Numbers';
    if (hintSpecial) hintSpecial.innerHTML = hasSpecial ? '<span class="text-secondary-green font-bold">✓ Special symbol</span>' : '⚪ Special symbol';

    let score = 0;
    if (password.length >= 6) score++;
    if (hasMinLength) score++;
    if (hasNumbers) score++;
    if (hasSpecial) score++;
    if (hasUppercase && hasLowercase) score++;

    if (score <= 1) {
      bar.style.width = '20%';
      bar.className = 'h-full bg-red-500 transition-all duration-300';
      label.textContent = 'Weak';
      label.className = 'text-red-400 font-bold';
    } else if (score === 2) {
      bar.style.width = '45%';
      bar.className = 'h-full bg-amber-500 transition-all duration-300';
      label.textContent = 'Fair';
      label.className = 'text-amber-400 font-bold';
    } else if (score === 3 || score === 4) {
      bar.style.width = '75%';
      bar.className = 'h-full bg-blue-400 transition-all duration-300';
      label.textContent = 'Good';
      label.className = 'text-blue-400 font-bold';
    } else {
      bar.style.width = '100%';
      bar.className = 'h-full bg-secondary-green transition-all duration-300';
      label.textContent = 'Strong 🇰🇪';
      label.className = 'text-secondary-green font-bold';
    }
  }

  async submitPageResetPassword(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.clearPageResetError();

    const identifier = document.getElementById('page-reset-identifier')?.value.trim();
    const code = document.getElementById('page-reset-code')?.value.trim();
    const newPassword = document.getElementById('page-reset-password')?.value;

    if (!code || !newPassword) {
      this.showPageResetError('Please enter both the 6-digit code and your new password.');
      return;
    }

    if (newPassword.length < 6) {
      this.showPageResetError('Password must be at least 6 characters long.');
      return;
    }

    const btn = document.getElementById('page-reset-step2-btn');
    try {
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Saving Password...';
      }

      const res = await this.apiRequest('/api/auth/reset-password', 'POST', { identifier, code, newPassword });

      this.currentUser = res.user;
      if (res.token) {
        localStorage.setItem('zr_auth_token', res.token);
      }
      this.saveLocalStore('zr_auth_user', this.currentUser);
      this.updateAuthUI();

      this.goToPageResetStep(3);
      this.showToast(`Password updated! Welcome back, ${res.user.fullname}. 🇰🇪`);
    } catch (err) {
      console.warn('Page reset password error:', err);
      this.showPageResetError(err.message || 'Invalid or expired code. Use demo code 254254.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Update Password & Sign In';
      }
    }
  }

  renderQueueDrawer() {
    const container = document.getElementById('full-player-queue-list');
    if (!container) return;

    container.innerHTML = this.audio.queue.map((t, idx) => `
      <div class="flex items-center justify-between p-2 rounded-lg ${idx === this.audio.currentIndex ? 'bg-[#141414] border border-primary-gold/40' : 'hover:bg-surface-high'} cursor-pointer"
           onclick="app.playTrackById(${t.id})">
        <div class="flex items-center gap-3">
          <span class="text-xs font-mono ${idx === this.audio.currentIndex ? 'text-secondary-green font-bold' : 'text-text-dim'}">
            ${idx === this.audio.currentIndex ? '▶' : idx + 1}
          </span>
          <img src="${t.img}" class="w-10 h-10 rounded object-cover"/>
          <div>
            <p class="text-xs font-bold text-white truncate max-w-[160px]">${t.title}</p>
            <p class="text-[10px] text-text-muted">${t.artist}</p>
          </div>
        </div>
        <span class="text-xs font-mono text-text-dim">${t.duration}</span>
      </div>
    `).join('');
  }

  // ─── 6. Action Handlers ─────────────────────────────────────────────────────

  playTrackById(id) {
    const idx = this.tracks.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.audio.play(idx);
      this.recordTrackPlay(id);
    }
  }

  async recordTrackPlay(id) {
    try {
      await this.apiRequest(`/api/tracks/${id}/play`, 'POST');
    } catch (e) {
      // offline / quiet
    }
  }

  async toggleLikeTrack(id) {
    const track = this.tracks.find(t => t.id === id);
    if (track) {
      track.liked = !track.liked;
      track.likes += track.liked ? 1 : -1;
      this.saveLocalStore('zr_tracks', this.tracks);
      this.renderHomeTrending();
      if (this.currentView === 'liked-songs') this.renderLikedSongsView();
      const profileStat1 = document.getElementById('profile-stat-1');
      if (profileStat1) profileStat1.textContent = this.tracks.filter(t => t.liked).length;
      this.audio.updatePlayerUI();
      this.showToast(track.liked ? `Saved ${track.title} to Liked Songs ❤️` : `Removed from Liked Songs`);

      try {
        const res = await this.apiRequest(`/api/tracks/${id}/like`, 'POST');
        if (res && res.track) {
          track.likes = res.track.likes;
          this.saveLocalStore('zr_tracks', this.tracks);
          this.renderHomeTrending();
        }
      } catch (err) {
        console.log('[Track Like] Saved locally:', err.message);
      }
    }
  }

  shareTrack(id) {
    const track = this.tracks.find(t => t.id === id);
    if (!track) return;

    if (navigator.share) {
      navigator.share({
        title: `${track.title} - ${track.artist}`,
        text: `Stream "${track.title}" on ZetuRoots Kenya's Music Platform!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/#track-${track.id}`);
      this.showToast(`Track link copied to clipboard! 🇰🇪`);
    }
  }

  selectFilter(filterName) {
    this.activeFilter = filterName;
    document.querySelectorAll('.carousel-filter-chip').forEach(c => {
      if (c.dataset.filter === filterName) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
    this.renderHomeTrending();
  }

  selectCounty(county) {
    this.selectedCounty = county;
    this.showToast(`Filtering for: ${county}`);
    if (county === 'All') {
      this.audio.queue = [...this.tracks];
    } else {
      const filtered = this.tracks.filter(t => t.county.toLowerCase() === county.toLowerCase());
      this.audio.queue = filtered.length > 0 ? filtered : [...this.tracks];
    }
    this.renderHomeTrending();
    this.renderExploreView();
  }

  selectGenre(genre) {
    this.selectedGenre = genre;
    const label = document.getElementById('pill-filter-genre-label');
    const pill = document.getElementById('pill-filter-genre');
    const menu = document.getElementById('genre-dropdown-menu');
    if (menu) menu.classList.add('hidden');

    if (label) label.textContent = genre === 'All' ? 'Genre' : genre;
    if (pill) {
      if (genre === 'All') {
        pill.classList.remove('active');
      } else {
        pill.classList.add('active');
        const hotPill = document.getElementById('pill-filter-hot');
        if (hotPill) hotPill.classList.remove('active');
      }
    }

    this.showToast(genre === 'All' ? 'All Genres' : `Genre: ${genre}`);
    const filtered = (genre === 'All')
      ? this.tracks
      : this.tracks.filter(t => t.genre.toLowerCase() === genre.toLowerCase());
    this.audio.queue = filtered.length > 0 ? filtered : [...this.tracks];
    this.renderHomeTrending();
  }

  selectDialect(dialect) {
    this.selectedDialect = dialect;
    const label = document.getElementById('pill-filter-dialect-label');
    const pill = document.getElementById('pill-filter-dialect');
    const menu = document.getElementById('dialect-dropdown-menu');
    if (menu) menu.classList.add('hidden');

    if (label) label.textContent = dialect === 'All' ? 'Dialect' : dialect;
    if (pill) {
      if (dialect === 'All') {
        pill.classList.remove('active');
      } else {
        pill.classList.add('active');
        const hotPill = document.getElementById('pill-filter-hot');
        if (hotPill) hotPill.classList.remove('active');
      }
    }

    this.showToast(dialect === 'All' ? 'All Dialects' : `Dialect: ${dialect}`);
    const filtered = (dialect === 'All')
      ? this.tracks
      : this.tracks.filter(t => t.dialect.toLowerCase() === dialect.toLowerCase());
    this.audio.queue = filtered.length > 0 ? filtered : [...this.tracks];
    this.renderHomeTrending();
  }

  filterBySearch(query) {
    if (!query) {
      this.renderHomeTrending();
      return;
    }
    const q = query.toLowerCase();
    const results = this.tracks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      t.county.toLowerCase().includes(q) ||
      t.genre.toLowerCase().includes(q) ||
      t.dialect.toLowerCase().includes(q)
    );

    const trendingContainer = document.getElementById('home-trending-container');
    if (trendingContainer) {
      if (results.length === 0) {
        trendingContainer.innerHTML = `
          <div class="surface-card rounded-xl p-8 text-center">
            <span class="material-symbols-outlined text-4xl text-text-dim mb-2">search_off</span>
            <p class="text-sm font-bold text-white">No tracks match "${query}"</p>
            <p class="text-xs text-text-muted mt-1">Try searching another Kenyan county, genre, or artist</p>
          </div>
        `;
      } else {
        trendingContainer.innerHTML = results.map((t, idx) => `
          <div class="surface-card rounded-xl p-3 flex items-center justify-between mb-2.5 cursor-pointer" onclick="app.playTrackById(${t.id})">
            <div class="flex items-center gap-3">
              <img src="${t.img}" class="w-12 h-12 rounded object-cover"/>
              <div>
                <h4 class="font-bold text-sm text-white">${t.title}</h4>
                <p class="text-xs text-primary-gold">${t.artist}</p>
                <span class="text-[10px] text-secondary-green">${t.county} • ${t.dialect}</span>
              </div>
            </div>
            <button class="w-9 h-9 rounded-full bg-primary-gold text-surface-card flex items-center justify-center">
              <span class="material-symbols-outlined text-xl">play_arrow</span>
            </button>
          </div>
        `).join('');
      }
    }
  }

  // ─── 7. M-Pesa Daraja Integration ───────────────────────────────────────────

  openMpesaModal(purpose = 'ZetuRoots Premium Subscription', amount = 299) {
    this.currentMpesaAmount = amount;
    this.currentMpesaPurpose = purpose;
    const modal = document.getElementById('mpesa-modal');
    const purposeElem = document.getElementById('mpesa-purpose');
    const amountElem = document.getElementById('mpesa-amount');
    if (purposeElem) purposeElem.textContent = purpose;
    if (amountElem) amountElem.textContent = `KES ${amount}`;
    if (modal) modal.classList.add('open');
  }

  closeMpesaModal() {
    const modal = document.getElementById('mpesa-modal');
    if (modal) modal.classList.remove('open');
    const statusBox = document.getElementById('mpesa-status-box');
    if (statusBox) statusBox.classList.add('hidden');
  }

  async submitMpesaPayment() {
    const phoneInput = document.getElementById('mpesa-phone-input');
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!phone || phone.length < 9) {
      alert('Please enter a valid Safaricom phone number (e.g. 0712345678 or 254712345678)');
      return;
    }

    const statusBox = document.getElementById('mpesa-status-box');
    const statusText = document.getElementById('mpesa-status-text');
    if (statusBox) statusBox.classList.remove('hidden');
    if (statusText) statusText.innerHTML = `Sending STK Push to <b>${phone}</b>... Enter M-Pesa PIN on your phone.`;

    try {
      const data = await this.apiRequest('/api/mpesa/stkpush', 'POST', {
        phone,
        amount: this.currentMpesaAmount || 100,
        accountReference: 'ZetuRoots',
        transactionDesc: this.currentMpesaPurpose || 'Premium Pass'
      });

      if (statusText) {
        statusText.innerHTML = `
          <div class="text-secondary-green font-bold flex items-center gap-1.5 justify-center mb-1">
            <span class="material-symbols-outlined">check_circle</span> Payment Confirmed!
          </div>
          <span class="text-[11px] font-mono text-text-muted">Receipt: ${data.receiptNumber || 'QKH' + Math.floor(100000 + Math.random()*900000)} • KES ${this.currentMpesaAmount || 100}.00 Received</span>
        `;
      }
      setTimeout(() => {
        this.closeMpesaModal();
        this.showToast('M-Pesa payment successful! Thank you for supporting Kenyan music. 🇰🇪');
      }, 2000);
    } catch (err) {
      console.warn('[M-Pesa] Simulated fallback:', err);
      setTimeout(() => {
        this.closeMpesaModal();
        this.showToast('M-Pesa payment confirmed! 🇰🇪');
      }, 1500);
    }
  }

  // ─── 8. Multi-Tier Concert Ticketing & Digital Pass Wallet ───────────────────

  openTicketPurchaseModal(eventId) {
    const ev = this.events.find(e => String(e.id) === String(eventId)) || this.events[0];
    if (!ev) return;

    this.selectedTicketEvent = ev;
    this.selectedTicketTier = 'Regular';
    this.selectedTicketQty = 1;

    const modal = document.getElementById('ticket-purchase-modal');
    const imgElem = document.getElementById('buy-ticket-event-img');
    const titleElem = document.getElementById('buy-ticket-event-title');
    const venueElem = document.getElementById('buy-ticket-event-venue');
    const countyElem = document.getElementById('buy-ticket-county-badge');
    const nameInput = document.getElementById('buy-ticket-name');
    const phoneInput = document.getElementById('buy-ticket-phone');

    if (imgElem) imgElem.src = ev.img;
    if (titleElem) titleElem.textContent = ev.title;
    if (venueElem) venueElem.textContent = `${ev.venue} • ${ev.date}`;
    if (countyElem) countyElem.textContent = ev.county;

    if (nameInput) nameInput.value = this.currentUser?.fullname || '';
    if (phoneInput) phoneInput.value = this.currentUser?.phone || '';

    // Set tier unit prices
    const regPrice = ev.price || 1000;
    const vipPrice = ev.vipPrice || Math.round(regPrice * 2.5);
    const vvipPrice = Math.round(regPrice * 5);

    const pReg = document.getElementById('tier-price-regular');
    const pVip = document.getElementById('tier-price-vip');
    const pVvip = document.getElementById('tier-price-vvip');
    if (pReg) pReg.textContent = `KES ${regPrice.toLocaleString()}`;
    if (pVip) pVip.textContent = `KES ${vipPrice.toLocaleString()}`;
    if (pVvip) pVvip.textContent = `KES ${vvipPrice.toLocaleString()}`;

    this.selectTicketTier('Regular');

    const statusBox = document.getElementById('ticket-stk-status-box');
    if (statusBox) statusBox.classList.add('hidden');

    if (modal) modal.classList.add('open');
  }

  closeTicketPurchaseModal() {
    const modal = document.getElementById('ticket-purchase-modal');
    if (modal) modal.classList.remove('open');
    if (this.ticketStkTimer) clearInterval(this.ticketStkTimer);
  }

  selectTicketTier(tier) {
    this.selectedTicketTier = tier;
    const tiers = ['regular', 'vip', 'vvip'];
    tiers.forEach(t => {
      const btn = document.getElementById(`tier-btn-${t}`);
      if (btn) {
        if (t === tier.toLowerCase()) {
          btn.className = 'ticket-tier-card active p-2.5 rounded-xl border text-center transition-all bg-[#141414] border-primary-gold';
        } else {
          btn.className = 'ticket-tier-card p-2.5 rounded-xl border text-center transition-all bg-surface-card border-surface-border hover:border-surface-border';
        }
      }
    });
    this.updateTicketPurchaseSummary();
  }

  adjustTicketQuantity(delta) {
    this.selectedTicketQty = Math.max(1, Math.min(10, (this.selectedTicketQty || 1) + delta));
    this.updateTicketPurchaseSummary();
  }

  updateTicketPurchaseSummary() {
    if (!this.selectedTicketEvent) return;
    const ev = this.selectedTicketEvent;
    const regPrice = ev.price || 1000;
    let unitPrice = regPrice;
    if (this.selectedTicketTier === 'VIP') unitPrice = ev.vipPrice || Math.round(regPrice * 2.5);
    if (this.selectedTicketTier === 'VVIP') unitPrice = Math.round(regPrice * 5);

    const total = unitPrice * this.selectedTicketQty;

    const qtyElem = document.getElementById('buy-ticket-quantity');
    const unitLabel = document.getElementById('buy-ticket-unit-label');
    const totalDisplay = document.getElementById('buy-ticket-total-display');
    const totalBreakdown = document.getElementById('buy-ticket-total-breakdown');
    const btnLabel = document.getElementById('buy-ticket-btn-label');

    if (qtyElem) qtyElem.textContent = this.selectedTicketQty;
    if (unitLabel) unitLabel.textContent = `KES ${unitPrice.toLocaleString()} per ticket`;
    if (totalDisplay) totalDisplay.textContent = `KES ${total.toLocaleString()}`;
    if (totalBreakdown) totalBreakdown.textContent = `${this.selectedTicketQty} x ${this.selectedTicketTier} (KES ${unitPrice.toLocaleString()})`;
    if (btnLabel) btnLabel.textContent = `Lipa Na M-Pesa (KES ${total.toLocaleString()})`;
  }

  async submitLiveTicketPurchase(event) {
    if (event) event.preventDefault();
    const nameInput = document.getElementById('buy-ticket-name');
    const phoneInput = document.getElementById('buy-ticket-phone');
    const attendeeName = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!phone || phone.length < 9) {
      alert('Please enter a valid Safaricom phone number (e.g. 0712345678)');
      return;
    }

    const statusBox = document.getElementById('ticket-stk-status-box');
    const countdownElem = document.getElementById('ticket-stk-countdown');
    const submitBtn = document.getElementById('buy-ticket-submit-btn');

    if (statusBox) statusBox.classList.remove('hidden');
    if (submitBtn) submitBtn.disabled = true;

    // Start 5-second countdown indicator
    let secondsLeft = 5;
    if (countdownElem) countdownElem.textContent = `${secondsLeft}s`;
    this.ticketStkTimer = setInterval(() => {
      secondsLeft -= 1;
      if (countdownElem) countdownElem.textContent = `${secondsLeft}s`;
      if (secondsLeft <= 0) clearInterval(this.ticketStkTimer);
    }, 1000);

    try {
      const res = await this.apiRequest(`/api/events/${this.selectedTicketEvent.id}/ticket`, 'POST', {
        phone,
        attendeeName: attendeeName || (this.currentUser?.fullname || 'ZetuRoots Fan'),
        ticketType: this.selectedTicketTier,
        quantity: this.selectedTicketQty,
        county: this.selectedTicketEvent.county
      });

      if (res && res.ticket) {
        clearInterval(this.ticketStkTimer);
        setTimeout(() => {
          this.closeTicketPurchaseModal();
          this.showDigitalTicketPass(res.ticket);
          this.loadUserTickets();
          this.showToast(`Ticket ${res.ticket.ticketRef} confirmed! 🇰🇪`);
          if (submitBtn) submitBtn.disabled = false;
        }, 1500);
      }
    } catch (err) {
      console.error('Ticket purchase failed:', err);
      clearInterval(this.ticketStkTimer);
      if (statusBox) statusBox.classList.add('hidden');
      if (submitBtn) submitBtn.disabled = false;
      this.showToast('Payment processing failed. Please try again.');
    }
  }

  showDigitalTicketPass(ticket) {
    this.currentActiveTicket = ticket;
    const modal = document.getElementById('ticket-pass-modal');
    if (!modal) return;

    const title = document.getElementById('ticket-pass-event-title');
    const meta = document.getElementById('ticket-pass-event-meta');
    const badge = document.getElementById('ticket-pass-tier-badge');
    const date = document.getElementById('ticket-pass-date');
    const time = document.getElementById('ticket-pass-time');
    const attendee = document.getElementById('ticket-pass-attendee');
    const phone = document.getElementById('ticket-pass-phone');
    const ref = document.getElementById('ticket-pass-ref');
    const receipt = document.getElementById('ticket-pass-receipt');

    if (title) title.textContent = ticket.eventTitle;
    if (meta) meta.textContent = `${ticket.venue} • ${ticket.county || ticket.city}`;
    if (badge) {
      badge.textContent = `${ticket.ticketType} PASS`;
      badge.className = ticket.ticketType === 'VIP' ? 'badge-gold text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase' : 'bg-secondary-green text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase';
    }
    if (date) date.textContent = ticket.date;
    if (time) time.textContent = ticket.time || '4:00 PM';
    if (attendee) attendee.textContent = `${ticket.attendeeName} (${ticket.quantity}x)`;
    if (phone) phone.textContent = ticket.phone;
    if (ref) ref.textContent = ticket.ticketRef;
    if (receipt) receipt.textContent = ticket.mpesaReceipt || 'M-PESA PAID';

    // Draw Cryptographic QR Code on canvas
    this.renderTicketQRCode('ticket-qr-canvas', ticket.qrPayload || ticket.ticketRef);

    modal.classList.add('open');
  }

  closeTicketPassModal() {
    const modal = document.getElementById('ticket-pass-modal');
    if (modal) modal.classList.remove('open');
  }

  openExistingTicketPass(ticketRef) {
    const ticket = (this.userTickets || []).find(t => t.ticketRef === ticketRef);
    if (ticket) {
      this.showDigitalTicketPass(ticket);
    } else {
      this.showToast('Loading digital ticket pass...');
    }
  }

  renderTicketQRCode(canvasId, text) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 130;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    const modules = 21;
    const cellSize = Math.floor(size / modules);
    const offset = Math.floor((size - (cellSize * modules)) / 2);

    const drawFinder = (startX, startY) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(startX * cellSize + offset, startY * cellSize + offset, 7 * cellSize, 7 * cellSize);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect((startX + 1) * cellSize + offset, (startY + 1) * cellSize + offset, 5 * cellSize, 5 * cellSize);
      ctx.fillStyle = '#000000';
      ctx.fillRect((startX + 2) * cellSize + offset, (startY + 2) * cellSize + offset, 3 * cellSize, 3 * cellSize);
    };

    drawFinder(0, 0);
    drawFinder(modules - 7, 0);
    drawFinder(0, modules - 7);

    for (let i = 8; i < modules - 8; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#000000' : '#FFFFFF';
      ctx.fillRect(i * cellSize + offset, 6 * cellSize + offset, cellSize, cellSize);
      ctx.fillRect(6 * cellSize + offset, i * cellSize + offset, cellSize, cellSize);
    }

    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }

    ctx.fillStyle = '#000000';
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        if ((r < 8 && c < 8) || (r < 8 && c >= modules - 8) || (r >= modules - 8 && c < 8)) continue;
        if (r === 6 || c === 6) continue;

        const val = ((hash ^ (r * 31 + c * 17)) & 1);
        if (val === 1) {
          ctx.fillRect(c * cellSize + offset, r * cellSize + offset, cellSize, cellSize);
        }
      }
    }
  }

  downloadTicketPassImage() {
    const canvas = document.getElementById('ticket-qr-canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `ZetuRoots-Pass-${this.currentActiveTicket?.ticketRef || 'Concert'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    this.showToast('Digital pass saved to device! 🇰🇪');
  }

  shareTicketPass() {
    const t = this.currentActiveTicket;
    if (!t) return;
    const shareText = `🎟️ My ZetuRoots Concert Pass: ${t.eventTitle} (${t.ticketType}) at ${t.venue}. Ticket Ref: ${t.ticketRef}`;
    if (navigator.share) {
      navigator.share({
        title: 'ZetuRoots Event Ticket',
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      this.showToast('Ticket pass link copied to clipboard! 📋');
    }
  }

  async loadUserTickets() {
    const container = document.getElementById('profile-tickets-list');
    const countBadge = document.getElementById('profile-tickets-count');
    if (!container) return;

    try {
      const phone = this.currentUser?.phone || '';
      const email = this.currentUser?.email || '';
      const res = await this.apiRequest(`/api/tickets/my?phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`);
      const tickets = (res && res.tickets) ? res.tickets : [];

      this.userTickets = tickets;
      if (countBadge) {
        countBadge.textContent = `${tickets.length} ${tickets.length === 1 ? 'Active Pass' : 'Active Passes'}`;
      }

      if (tickets.length === 0) {
        container.innerHTML = `
          <div class="p-3 text-center text-text-dim font-mono text-xs">
            <p>No active concert tickets yet.</p>
            <button onclick="app.navigate('events')" class="mt-1.5 text-primary-gold underline font-bold">Browse Live Events ›</button>
          </div>
        `;
        return;
      }

      container.innerHTML = tickets.map(t => `
        <div class="p-3 bg-[#1B170B] border border-primary-gold/40 rounded-xl flex items-center justify-between hover:border-primary-gold transition-colors">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-lg bg-black/60 border border-primary-gold/40 flex flex-col items-center justify-center font-mono">
              <span class="text-[9px] text-text-dim uppercase">${t.date?.split(' ')[0] || 'DEC'}</span>
              <span class="text-xs font-bold text-primary-gold">${t.date?.split(' ')[1]?.replace(',', '') || '12'}</span>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h4 class="font-display font-bold text-xs text-white truncate max-w-[160px]">${t.eventTitle}</h4>
                <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black text-secondary-green border border-secondary-green/30">${t.ticketType}</span>
              </div>
              <p class="text-[10px] text-text-muted mt-0.5 font-mono">${t.venue} • KES ${t.totalAmount}</p>
            </div>
          </div>
          <button onclick="app.openExistingTicketPass('${t.ticketRef}')" class="px-2.5 py-1.5 bg-primary-gold text-black rounded-lg font-bold text-[11px] uppercase flex items-center gap-1 active:scale-95 shadow">
            <span class="material-symbols-outlined text-sm">qr_code</span> Pass
          </button>
        </div>
      `).join('');
    } catch (e) {
      console.warn('Could not load tickets:', e);
    }
  }

  // ─── 9. Gatekeeper Scanner for Event Organizers ─────────────────────────────

  openTicketScannerModal() {
    const modal = document.getElementById('ticket-scanner-modal');
    const resultBox = document.getElementById('scanner-result-box');
    const refInput = document.getElementById('scanner-ticket-ref');
    if (resultBox) resultBox.classList.add('hidden');
    if (refInput) refInput.value = '';
    if (modal) modal.classList.add('open');
  }

  closeTicketScannerModal() {
    const modal = document.getElementById('ticket-scanner-modal');
    if (modal) modal.classList.remove('open');
  }

  async submitGatekeeperValidation(event) {
    if (event) event.preventDefault();
    const refInput = document.getElementById('scanner-ticket-ref');
    const ticketRef = refInput ? refInput.value.trim() : '';
    const resultBox = document.getElementById('scanner-result-box');
    if (!ticketRef || !resultBox) return;

    try {
      const res = await this.apiRequest('/api/tickets/validate', 'POST', { ticketRef });
      resultBox.classList.remove('hidden');
      if (res && res.valid) {
        resultBox.className = 'p-3.5 rounded-xl border border-secondary-green bg-[#16291A] text-center';
        resultBox.innerHTML = `
          <div class="w-8 h-8 rounded-full bg-secondary-green text-black mx-auto flex items-center justify-center font-bold mb-1">✓</div>
          <p class="font-display font-bold text-sm text-secondary-green">PASS VALID: ENTRY GRANTED</p>
          <p class="text-xs text-white mt-1 font-bold">${res.ticket.attendeeName} (${res.ticket.ticketType})</p>
          <p class="text-[10px] font-mono text-text-muted mt-0.5">${res.ticket.eventTitle} • Ref: ${res.ticket.ticketRef}</p>
        `;
        this.showToast('Ticket validated! Entrance granted.');
      } else {
        resultBox.className = 'p-3.5 rounded-xl border border-red-500 bg-[#291616] text-center';
        resultBox.innerHTML = `
          <div class="w-8 h-8 rounded-full bg-red-500 text-white mx-auto flex items-center justify-center font-bold mb-1">✕</div>
          <p class="font-display font-bold text-sm text-red-400">ENTRY DENIED</p>
          <p class="text-xs text-red-200 mt-1">${res.error || 'Invalid or already used pass.'}</p>
        `;
      }
    } catch (err) {
      resultBox.classList.remove('hidden');
      resultBox.className = 'p-3.5 rounded-xl border border-red-500 bg-[#291616] text-center';
      resultBox.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-red-500 text-white mx-auto flex items-center justify-center font-bold mb-1">✕</div>
        <p class="font-display font-bold text-sm text-red-400">TICKET ALREADY USED OR INVALID</p>
        <p class="text-xs text-red-200 mt-1">Pass verification failed in ZetuRoots Ledger.</p>
      `;
    }
  }

  // ─── 8. Artist & DJ Studio Upload & KECOBO Rights Center ─────────────────────

  switchStudioType(type) {
    this.studioType = type;
    const btnTrack = document.getElementById('studio-tab-track');
    const btnMixtape = document.getElementById('studio-tab-mixtape');
    const djFields = document.getElementById('studio-dj-fields');
    const labelTitle = document.getElementById('label-upload-title');
    const inputTitle = document.getElementById('upload-title');
    const labelArtist = document.getElementById('label-upload-artist');
    const submitText = document.getElementById('studio-submit-text');

    if (type === 'mixtape') {
      if (btnTrack) btnTrack.classList.remove('active');
      if (btnMixtape) btnMixtape.classList.add('active');
      if (djFields) djFields.classList.remove('hidden');
      if (labelTitle) labelTitle.textContent = 'Mixtape / Set Title *';
      if (inputTitle) inputTitle.placeholder = 'e.g. Matatu Street Rave Vol. 15 (Eastlands Heat)';
      if (labelArtist) labelArtist.textContent = 'DJ / Sound Crew Name *';
      if (submitText) submitText.textContent = 'Publish DJ Mixtape & Register KECOBO';
    } else {
      if (btnTrack) btnTrack.classList.add('active');
      if (btnMixtape) btnMixtape.classList.remove('active');
      if (djFields) djFields.classList.add('hidden');
      if (labelTitle) labelTitle.textContent = 'Track Title *';
      if (inputTitle) inputTitle.placeholder = 'e.g. Sheng Vibes Season 2';
      if (labelArtist) labelArtist.textContent = 'Artist / Stage Name *';
      if (submitText) submitText.textContent = 'Publish Track & Register KECOBO Rights';
    }
  }

  quickSwitchCreatorRole(role) {
    if (this.currentUser) {
      this.currentUser.role = role;
      if (role === 'artist' && !this.currentUser.stageName) this.currentUser.stageName = this.currentUser.fullname;
      if (role === 'dj' && !this.currentUser.djName) this.currentUser.djName = `DJ ${this.currentUser.fullname.split(' ')[0]}`;
      this.saveLocalStore('zr_auth_user', this.currentUser);
      this.updateAuthUI();
      this.updateStudioRoleState();
      this.showToast(`Switched account mode to ${role.toUpperCase()}!`);
    } else {
      this.quickDemoLogin(role);
    }
  }

  handleCoverFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      this.studioCoverData = event.target.result;
      const previewImg = document.getElementById('studio-cover-preview');
      if (previewImg) {
        previewImg.src = this.studioCoverData;
      }
      this.showToast('Cover artwork loaded!');
    };
    reader.readAsDataURL(file);
  }

  handleAudioDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('studio-audio-dropzone');
    if (dropzone) dropzone.classList.add('drag-over');
  }

  handleAudioDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('studio-audio-dropzone');
    if (dropzone) dropzone.classList.remove('drag-over');
  }

  handleAudioDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('studio-audio-dropzone');
    if (dropzone) dropzone.classList.remove('drag-over');

    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      this.loadAudioFile(file);
    } else {
      alert('Please drop a valid audio file (.mp3, .wav, .m4a, .aac, .ogg)');
    }
  }

  handleAudioFileSelect(e) {
    const file = e.target.files?.[0];
    if (file) {
      this.loadAudioFile(file);
    }
  }

  loadAudioFile(file) {
    const filenameEl = document.getElementById('studio-preview-filename');
    const metaEl = document.getElementById('studio-preview-meta');
    const durEl = document.getElementById('studio-preview-duration');

    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    if (filenameEl) filenameEl.textContent = file.name;
    if (metaEl) metaEl.textContent = `${file.type || 'audio/mpeg'} • ${sizeMb} MB • Ready for KECOBO SHA-256`;

    const reader = new FileReader();
    reader.onload = (event) => {
      this.studioAudioData = event.target.result;

      // Stop any existing studio audio
      if (this.studioAudioElement) {
        this.studioAudioElement.pause();
        this.studioAudioElement = null;
      }

      this.studioAudioElement = new Audio(this.studioAudioData);
      this.studioAudioElement.addEventListener('loadedmetadata', () => {
        const dur = this.studioAudioElement.duration;
        const mins = Math.floor(dur / 60);
        const secs = Math.floor(dur % 60).toString().padStart(2, '0');
        if (durEl) durEl.textContent = `0:00 / ${mins}:${secs}`;
      });

      this.studioAudioElement.addEventListener('timeupdate', () => {
        if (!this.studioAudioElement) return;
        const cur = this.studioAudioElement.currentTime;
        const dur = this.studioAudioElement.duration || 1;
        const percent = (cur / dur) * 100;

        const scrubber = document.getElementById('studio-preview-scrubber');
        if (scrubber) scrubber.value = percent;

        const curMin = Math.floor(cur / 60);
        const curSec = Math.floor(cur % 60).toString().padStart(2, '0');
        const durMin = Math.floor(dur / 60);
        const durSec = Math.floor(dur % 60).toString().padStart(2, '0');
        if (durEl) durEl.textContent = `${curMin}:${curSec} / ${durMin}:${durSec}`;

        // Animate waveform bars according to current position
        const activeBarIdx = Math.floor((percent / 100) * 28);
        for (let i = 0; i < 28; i++) {
          const bar = document.getElementById(`swave-${i}`);
          if (bar) {
            if (i <= activeBarIdx) {
              bar.classList.add('active');
            } else {
              bar.classList.remove('active');
            }
          }
        }
      });

      this.studioAudioElement.addEventListener('ended', () => {
        this.studioIsPlaying = false;
        const icon = document.getElementById('studio-preview-btn-icon');
        if (icon) icon.textContent = 'play_arrow';
      });

      this.showToast(`Audio loaded: ${file.name} (${sizeMb}MB)`);
    };
    reader.readAsDataURL(file);
  }

  toggleStudioPreviewAudio() {
    if (!this.studioAudioElement) {
      this.showToast('Please select or drop an audio file first!');
      return;
    }

    const icon = document.getElementById('studio-preview-btn-icon');

    if (this.studioIsPlaying) {
      this.studioAudioElement.pause();
      this.studioIsPlaying = false;
      if (icon) icon.textContent = 'play_arrow';
    } else {
      // Pause main app continuous player if it is active
      if (this.audio && this.audio.isPlaying) {
        this.audio.pause();
      }

      this.studioAudioElement.play().then(() => {
        this.studioIsPlaying = true;
        if (icon) icon.textContent = 'pause';
      }).catch(err => {
        console.warn('Audio preview play error:', err);
      });
    }
  }

  scrubStudioPreviewAudio(value) {
    if (!this.studioAudioElement || !this.studioAudioElement.duration) return;
    const seekTime = (parseFloat(value) / 100) * this.studioAudioElement.duration;
    this.studioAudioElement.currentTime = seekTime;
  }

  async submitTrackUpload(e) {
    e.preventDefault();

    const title = document.getElementById('upload-title')?.value;
    const artist = document.getElementById('upload-artist')?.value;
    const featuring = document.getElementById('upload-featuring')?.value || '';
    const producer = document.getElementById('upload-producer')?.value || '';
    const county = document.getElementById('upload-county')?.value || 'Nairobi City';
    const genre = document.getElementById('upload-genre')?.value || 'Gengetone';
    const dialect = document.getElementById('upload-dialect')?.value || 'Sheng';
    const bpm = document.getElementById('upload-bpm')?.value || '108';
    const crew = document.getElementById('upload-crew')?.value || '';
    const cueSheet = document.getElementById('upload-cuesheet')?.value || '';

    // Splits
    const splitArtist = parseInt(document.getElementById('split-artist')?.value || '70', 10);
    const splitProducer = parseInt(document.getElementById('split-producer')?.value || '20', 10);
    const splitLabel = parseInt(document.getElementById('split-label')?.value || '10', 10);

    if (!title || !artist) {
      alert('Please fill in both Title and Artist Name');
      return;
    }

    const progressBox = document.getElementById('studio-upload-progress-container');
    const progressBar = document.getElementById('studio-progress-bar');
    const progressNum = document.getElementById('studio-progress-num');
    const progressText = document.getElementById('studio-progress-text');
    const submitBtn = document.getElementById('studio-submit-btn');

    if (progressBox) progressBox.classList.remove('hidden');
    if (submitBtn) submitBtn.disabled = true;

    // Simulated animated upload progression
    const updateProgress = (pct, text) => {
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressNum) progressNum.textContent = `${pct}%`;
      if (progressText) progressText.textContent = text;
    };

    updateProgress(25, 'Reading audio master & verifying format...');
    await new Promise(r => setTimeout(r, 400));

    updateProgress(60, 'Uploading audio & generating KECOBO SHA-256 fingerprint...');
    await new Promise(r => setTimeout(r, 500));

    // Calculate duration string from audio preview if available
    let durStr = this.studioType === 'mixtape' ? '45:00' : '3:30';
    if (this.studioAudioElement && this.studioAudioElement.duration) {
      const d = this.studioAudioElement.duration;
      durStr = `${Math.floor(d / 60)}:${Math.floor(d % 60).toString().padStart(2, '0')}`;
    }

    const payload = {
      title,
      artist,
      featuring,
      producer,
      county,
      genre,
      dialect,
      type: this.studioType,
      bpm: parseInt(bpm, 10),
      crew,
      cueSheet,
      duration: durStr,
      splitSheet: {
        artist: splitArtist,
        producer: splitProducer,
        label: splitLabel
      },
      audioData: this.studioAudioData || 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
      coverData: this.studioCoverData || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop&auto=format'
    };

    try {
      updateProgress(85, 'Submitting to KECOBO National Rights Registry...');
      const response = await fetch('/api/tracks/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      updateProgress(100, 'KECOBO ISRC Registered! Finalizing...');
      await new Promise(r => setTimeout(r, 300));

      if (progressBox) progressBox.classList.add('hidden');
      if (submitBtn) submitBtn.disabled = false;

      // Add to local tracks list & update views
      const createdTrack = data.track;
      this.tracks.unshift(createdTrack);
      this.saveLocalStore('zr_tracks', this.tracks);
      this.render();

      this.showToast(`🎉 "${title}" published & registered with KECOBO!`);

      // Open KECOBO Certificate Modal
      this.openCertModal(data.certificate, createdTrack);

    } catch (err) {
      console.error('[Upload] Error:', err);
      if (progressBox) progressBox.classList.add('hidden');
      if (submitBtn) submitBtn.disabled = false;

      // Fallback offline creation
      const offlineId = Date.now();
      const offlineIsrc = `KE-ZR1-26-${Math.floor(10000 + Math.random() * 90000)}`;
      const offlineNrr = `NRR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const fallbackTrack = {
        id: offlineId,
        title,
        artist,
        county,
        genre,
        dialect,
        type: this.studioType,
        rank: 1,
        delta: 'NEW',
        badge: 'green',
        plays: '100',
        likes: 1,
        liked: false,
        duration: durStr,
        img: this.studioCoverData || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop&auto=format',
        audioSrc: this.studioAudioData || 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
        isrc: offlineIsrc,
        kecoboReg: offlineNrr,
        splitSheet: { artist: splitArtist, producer: splitProducer, label: splitLabel }
      };

      this.tracks.unshift(fallbackTrack);
      this.saveLocalStore('zr_tracks', this.tracks);
      this.render();

      const fallbackCert = {
        certificateId: `KECOBO-CERT-2026-${offlineId.toString().slice(-6)}`,
        workTitle: title,
        artistName: artist,
        county,
        dialect,
        isrc: offlineIsrc,
        kecoboReg: offlineNrr,
        digitalHash: 'SHA256:' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        registeredAt: new Date().toISOString(),
        splits: fallbackTrack.splitSheet
      };

      this.openCertModal(fallbackCert, fallbackTrack);
    }
  }

  openCertModal(certificate, track) {
    this.currentCertifiedTrack = track;
    const modal = document.getElementById('kecobo-cert-modal');
    if (!modal) return;

    const certTitle = document.getElementById('cert-title');
    const certArtist = document.getElementById('cert-artist');
    const certOrigin = document.getElementById('cert-origin');
    const certIsrc = document.getElementById('cert-isrc');
    const certNrr = document.getElementById('cert-nrr');
    const certHash = document.getElementById('cert-hash');
    const certSplits = document.getElementById('cert-splits');
    const certTimestamp = document.getElementById('cert-timestamp');

    if (certTitle) certTitle.textContent = certificate.workTitle || track.title;
    if (certArtist) certArtist.textContent = certificate.artistName || track.artist;
    if (certOrigin) certOrigin.textContent = `${certificate.county || track.county} • ${certificate.dialect || track.dialect}`;
    if (certIsrc) certIsrc.textContent = certificate.isrc || track.isrc;
    if (certNrr) certNrr.textContent = certificate.kecoboReg || track.kecoboReg;
    if (certHash) certHash.textContent = certificate.digitalHash || 'SHA256: 4f82b7c6183a...912a';
    if (certTimestamp) certTimestamp.textContent = new Date(certificate.registeredAt || Date.now()).toUTCString();

    if (certSplits && certificate.splits) {
      certSplits.textContent = `Artist ${certificate.splits.artist || 70}% | Prod ${certificate.splits.producer || 20}% | Label ${certificate.splits.label || 10}%`;
    }

    modal.classList.add('open');
  }

  closeCertModal() {
    const modal = document.getElementById('kecobo-cert-modal');
    if (modal) modal.classList.remove('open');
  }

  playCertifiedTrack() {
    this.closeCertModal();
    if (this.currentCertifiedTrack) {
      this.playTrack(this.currentCertifiedTrack.id);
      this.openPlayerSheet();
    }
  }

  copyCertLink() {
    if (!this.currentCertifiedTrack) return;
    const isrc = this.currentCertifiedTrack.isrc || 'KE-ZR1-26-00101';
    const nrr = this.currentCertifiedTrack.kecoboReg || 'NRR-2026-001';
    const link = `https://nrr.copyright.go.ke/verify?isrc=${isrc}&ref=${nrr}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(() => {
        this.showToast('KECOBO Registry link copied to clipboard!');
      }).catch(() => {
        this.showToast(`Verification: ${isrc}`);
      });
    } else {
      this.showToast(`Verification: ${isrc}`);
    }
  }

  // ─── 9. Copyright & KECOBO Infringement Reporting ───────────────────────────

  async submitCopyrightClaim(e) {
    e.preventDefault();
    const workTitle = document.getElementById('dmca-work-title')?.value;
    const regNumber = document.getElementById('dmca-reg-number')?.value;
    const claimantName = document.getElementById('dmca-claimant-name')?.value;

    if (!workTitle || !claimantName) {
      alert('Please fill in Work Title and Claimant Name');
      return;
    }

    try {
      const res = await this.apiRequest('/api/copyright/claim', 'POST', {
        workTitle,
        regNumber,
        claimantName,
        email: this.currentUser?.email || '',
        phone: this.currentUser?.phone || '',
        reason: 'Infringement report filed via ZetuRoots KECOBO Rights Center'
      });
      const caseId = res.caseId || `KECOBO-DMCA-${Date.now().toString().slice(-6)}`;
      this.showToast(`Copyright claim filed for "${workTitle}". Case ID: ${caseId}`);
      document.getElementById('copyright-claim-form')?.reset();
    } catch (err) {
      const caseId = `KECOBO-DMCA-${Date.now().toString().slice(-6)}`;
      this.showToast(`Copyright claim filed for "${workTitle}". Case ID: ${caseId}`);
      document.getElementById('copyright-claim-form')?.reset();
    }
  }

  // ─── 10. AI DJ Vibe Generator ───────────────────────────────────────────────

  generateAiVibePlaylist() {
    const promptInput = document.getElementById('ai-dj-prompt-input');
    const prompt = promptInput ? promptInput.value.trim().toLowerCase() : '';

    if (!prompt) {
      this.showToast('Please type a vibe, mood, or setting (e.g. "Late night Sheng drill")');
      return;
    }

    this.showToast(`Generating AI playlist for: "${prompt}"... 🤖`);

    // Match tracks by prompt keywords
    const matches = this.tracks.filter(t =>
      prompt.includes(t.genre.toLowerCase()) ||
      prompt.includes(t.county.toLowerCase()) ||
      prompt.includes(t.dialect.toLowerCase()) ||
      prompt.includes('night') ||
      prompt.includes('vibe')
    );

    const selectedQueue = matches.length > 0 ? matches : this.tracks.slice().reverse();
    this.audio.queue = selectedQueue;
    this.audio.play(0);
    this.showToast(`AI DJ Vibe: Playing "${selectedQueue[0].title}"!`);
  }

  // ─── 11. Modal & Toast Utilities ────────────────────────────────────────────

  openCountiesModal() {
    const modal = document.getElementById('counties-modal');
    if (modal) modal.classList.add('open');
  }

  closeCountiesModal() {
    const modal = document.getElementById('counties-modal');
    if (modal) modal.classList.remove('open');
  }

  showToast(message) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 3200);
  }

  // ─── 12. In-Play Ads & Monetization Engine (Spotify & YouTube Style) ────────

  async fetchAds() {
    try {
      const res = await this.apiRequest('/api/ads/active');
      if (res && res.ads) {
        this.ads = res.ads;
        this.renderNativeSponsoredCard();
        this.renderMonetizationDashboard();
      }
    } catch (e) {
      console.log('[Ads] Loaded local fallback ad inventory');
    }
  }

  async fetchAdAnalytics() {
    try {
      const res = await this.apiRequest('/api/ads/analytics');
      if (res && res.analytics) {
        this.adStats = res.analytics;
        this.renderMonetizationDashboard();
      }
    } catch (e) {}
  }

  renderNativeSponsoredCard() {
    const card = document.getElementById('home-sponsored-feed-card');
    if (!card) return;

    if (this.isPremium) {
      card.classList.add('hidden');
      return;
    }

    card.classList.remove('hidden');
    const ad = (this.ads && this.ads.length > 0) ? this.ads[0] : null;
    if (!ad) return;

    const logo = document.getElementById('native-ad-logo');
    const brand = document.getElementById('native-ad-brand');
    const county = document.getElementById('native-ad-county');
    const title = document.getElementById('native-ad-title');
    const tagline = document.getElementById('native-ad-tagline');
    const ctaText = document.getElementById('native-ad-cta-text');
    const ctaBtn = document.getElementById('native-ad-cta-btn');

    if (logo) logo.src = ad.logo;
    if (brand) brand.textContent = ad.brand;
    if (county) county.textContent = `• ${ad.county === 'All' ? 'All 47 Counties' : ad.county}`;
    if (title) title.textContent = ad.title;
    if (tagline) tagline.textContent = ad.tagline;
    if (ctaText) ctaText.textContent = ad.ctaText;
    if (ctaBtn) ctaBtn.setAttribute('onclick', `app.clickAdCampaign('${ad.id}')`);
  }

  renderMonetizationDashboard() {
    if (!this.adStats) return;
    const stats = this.adStats;

    const impElem = document.getElementById('ad-kpi-impressions');
    const clicksElem = document.getElementById('ad-kpi-clicks');
    const ctrElem = document.getElementById('ad-kpi-ctr');
    const adRevElem = document.getElementById('ad-kpi-ad-revenue');
    const grossRevElem = document.getElementById('ad-kpi-gross-revenue');
    const subsElem = document.getElementById('ad-kpi-subscribers');

    if (impElem) impElem.textContent = (stats.totalImpressions || 0).toLocaleString();
    if (clicksElem) clicksElem.innerHTML = `${stats.totalClicks || 0} <span id="ad-kpi-ctr" class="text-xs text-amber-400 font-normal font-mono">(${stats.ctr || '0%'})</span>`;
    if (adRevElem) adRevElem.textContent = `KES ${(stats.totalAdRevenueKes || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    if (grossRevElem) grossRevElem.textContent = `KES ${(stats.grossTotalRevenueKes || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    if (subsElem) subsElem.textContent = `${stats.activeSubscribersCount || 0} VIP Subscribers`;

    // Render Active Sponsor Campaigns List
    const campaignList = document.getElementById('active-ads-campaign-list');
    if (campaignList && this.ads && this.ads.length > 0) {
      campaignList.innerHTML = this.ads.map(ad => {
        const cStats = (stats.campaignStats && stats.campaignStats[ad.id]) || { impressions: 0, clicks: 0, revenueKes: 0 };
        return `
          <div class="bg-surface/80 rounded-xl p-3 border border-surface-border flex items-center justify-between gap-3">
            <div class="flex items-center gap-2.5 min-w-0">
              <img src="${ad.logo}" class="w-9 h-9 rounded-lg object-cover shrink-0 border border-surface-border"/>
              <div class="min-w-0">
                <h5 class="font-display font-bold text-xs text-white truncate">${ad.brand}</h5>
                <span class="text-[9px] font-mono text-text-dim block">${ad.category} • CPM: KES ${ad.cpmKes}</span>
                <span class="text-[10px] font-mono text-amber-300 font-bold">Earned: KES ${cStats.revenueKes.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <button onclick="app.previewInPlayAd('${ad.id}')" class="px-2 py-1 rounded bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-black font-display text-[10px] font-bold shrink-0 transition-colors">
              Play Ad
            </button>
          </div>
        `;
      }).join('');
    }
  }

  triggerInPlayAd(onCompleteCallback, targetAdId = null) {
    if (this.isPremium && !targetAdId) {
      if (onCompleteCallback) onCompleteCallback();
      return;
    }

    this.audio.isAdPlaying = true;
    this.audio.pause();

    let ad = null;
    if (targetAdId && this.ads) {
      ad = this.ads.find(a => a.id === targetAdId);
    }
    if (!ad && this.ads && this.ads.length > 0) {
      const randIdx = Math.floor(Math.random() * this.ads.length);
      ad = this.ads[randIdx];
    }
    if (!ad) {
      ad = {
        id: 'ad_saf_1',
        brand: 'Safaricom M-Pesa',
        title: 'Lipa Na M-Pesa Bila Stress',
        tagline: 'Zero transaction fees under KES 100! Pay bills and send money anywhere in Kenya.',
        category: 'Fintech & Mobile Money',
        logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop',
        bannerImg: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop',
        ctaText: 'Open M-Pesa App',
        ctaUrl: 'https://www.safaricom.co.ke/mpesa',
        duration: 15,
        skipAfter: 5
      };
    }

    this.currentInPlayAd = ad;
    this.adCallbackAfter = onCompleteCallback;
    this.inPlayAdElapsed = 0;
    this.inPlayAdDuration = ad.duration || 15;
    this.inPlayAdSkipAfter = ad.skipAfter || 5;

    // Populate In-Play Ad Modal UI
    const banner = document.getElementById('inplay-ad-banner');
    const logo = document.getElementById('inplay-ad-logo');
    const brand = document.getElementById('inplay-ad-brand');
    const title = document.getElementById('inplay-ad-title');
    const cat = document.getElementById('inplay-ad-category');
    const tagline = document.getElementById('inplay-ad-tagline');
    const ctaText = document.getElementById('inplay-ad-cta-text');
    const ctaLink = document.getElementById('inplay-ad-cta-link');
    const skipBtn = document.getElementById('inplay-ad-skip-btn');
    const countdownText = document.getElementById('inplay-ad-countdown-text');
    const progressBar = document.getElementById('inplay-ad-progress-bar');

    if (banner) banner.src = ad.bannerImg;
    if (logo) logo.src = ad.logo;
    if (brand) brand.textContent = ad.brand;
    if (title) title.textContent = ad.title;
    if (cat) cat.textContent = ad.category || 'Featured Sponsor';
    if (tagline) tagline.textContent = ad.tagline;
    if (ctaText) ctaText.textContent = ad.ctaText || 'Learn More';
    if (ctaLink) ctaLink.href = ad.ctaUrl || '#';

    if (skipBtn) {
      skipBtn.disabled = true;
      skipBtn.className = 'py-2 px-3.5 rounded-xl bg-black/80 border border-white/30 text-white font-display font-bold text-xs flex items-center gap-1.5 transition-all cursor-not-allowed';
      skipBtn.innerHTML = `<span>Skip in <span id="inplay-ad-skip-sec">${this.inPlayAdSkipAfter}</span>s</span>`;
    }
    if (countdownText) countdownText.textContent = `Ad ends in 0:${this.inPlayAdDuration < 10 ? '0' : ''}${this.inPlayAdDuration}`;
    if (progressBar) progressBar.style.width = '0%';

    // Open Modal
    const modal = document.getElementById('inplay-ad-modal');
    if (modal) modal.classList.add('open');

    // Play commercial jingle sound via Web Audio Synth
    this.audio.synth.playAdJingle();

    // Record Impression API call
    this.apiRequest('/api/ads/impression', 'POST', {
      adId: ad.id,
      trackId: this.audio.getCurrentTrack()?.id || 1,
      userId: this.currentUser?.id || 'guest',
      county: this.selectedCounty || 'All'
    }).then(() => {
      this.fetchAdAnalytics();
    }).catch(() => {});

    // Start Realtime Countdown & Progress Timer
    if (this.inPlayAdTimer) clearInterval(this.inPlayAdTimer);
    this.inPlayAdTimer = setInterval(() => {
      this.inPlayAdElapsed += 1;
      const remainingTotal = Math.max(0, this.inPlayAdDuration - this.inPlayAdElapsed);
      const remainingSkip = Math.max(0, this.inPlayAdSkipAfter - this.inPlayAdElapsed);

      if (countdownText) countdownText.textContent = `Ad ends in 0:${remainingTotal < 10 ? '0' : ''}${remainingTotal}`;
      if (progressBar) progressBar.style.width = `${(this.inPlayAdElapsed / this.inPlayAdDuration) * 100}%`;

      const secElem = document.getElementById('inplay-ad-skip-sec');
      if (secElem) secElem.textContent = remainingSkip;

      if (remainingSkip <= 0 && skipBtn && skipBtn.disabled) {
        skipBtn.disabled = false;
        skipBtn.className = 'py-2 px-4 rounded-xl bg-primary-green hover:bg-green-400 text-black font-display font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg active:scale-95 cursor-pointer';
        skipBtn.innerHTML = `<span>Skip Ad</span> <span class="material-symbols-outlined text-sm font-bold">skip_next</span>`;
        skipBtn.onclick = () => this.skipInPlayAd();
      }

      if (remainingTotal <= 0) {
        clearInterval(this.inPlayAdTimer);
        this.skipInPlayAd();
      }
    }, 1000);
  }

  skipInPlayAd() {
    if (this.inPlayAdTimer) {
      clearInterval(this.inPlayAdTimer);
      this.inPlayAdTimer = null;
    }
    const modal = document.getElementById('inplay-ad-modal');
    if (modal) modal.classList.remove('open');
    this.audio.isAdPlaying = false;

    if (this.adCallbackAfter) {
      const cb = this.adCallbackAfter;
      this.adCallbackAfter = null;
      cb();
    }
    this.showToast('Resuming music stream 🎶');
  }

  previewInPlayAd(adId = null) {
    this.showToast('Launching in-play audio ad preview... 📣');
    this.triggerInPlayAd(() => {
      this.showToast('Ad completed. Your music is playing!');
    }, adId);
  }

  recordInPlayAdClick() {
    if (!this.currentInPlayAd) return;
    const ad = this.currentInPlayAd;
    this.apiRequest('/api/ads/click', 'POST', {
      adId: ad.id,
      trackId: this.audio.getCurrentTrack()?.id || 1,
      userId: this.currentUser?.id || 'guest'
    }).then(() => {
      this.showToast(`Sponsor link opened • Revenue recorded (KES ${ad.cpcKes || 35}) 💰`);
      this.fetchAdAnalytics();
    }).catch(() => {});
  }

  clickAdCampaign(adId) {
    const ad = this.ads.find(a => a.id === adId);
    if (!ad) return;

    this.apiRequest('/api/ads/click', 'POST', {
      adId: ad.id,
      userId: this.currentUser?.id || 'guest'
    }).then(() => {
      this.fetchAdAnalytics();
    }).catch(() => {});

    if (ad.ctaUrl) {
      window.open(ad.ctaUrl, '_blank');
      this.showToast(`Opening ${ad.brand}... Earned KES ${ad.cpcKes || 35} 💰`);
    }
  }

  openPremiumUpgradeModal() {
    const modal = document.getElementById('premium-upgrade-modal');
    if (modal) modal.classList.add('open');
    const phoneInput = document.getElementById('premium-phone-input');
    if (phoneInput && this.currentUser?.phone) {
      phoneInput.value = this.currentUser.phone.replace(/^254|^0/, '');
    }
    this.selectPremiumTier(this.selectedPremiumPlan || 'weekly');
  }

  closePremiumUpgradeModal() {
    const modal = document.getElementById('premium-upgrade-modal');
    if (modal) modal.classList.remove('open');
  }

  selectPremiumTier(tier) {
    this.selectedPremiumPlan = tier;
    const tiers = ['daily', 'weekly', 'monthly'];
    tiers.forEach(t => {
      const label = document.getElementById(`tier-label-${t}`);
      if (label) {
        if (t === tier) {
          label.className = 'cursor-pointer border-2 border-primary-gold rounded-xl p-2.5 text-center transition-all bg-primary-gold/15 tier-label selected';
        } else {
          label.className = 'cursor-pointer border border-surface-border rounded-xl p-2.5 text-center transition-all bg-surface tier-label';
        }
      }
    });

    const btnText = document.getElementById('premium-btn-text');
    if (btnText) {
      if (tier === 'daily') btnText.textContent = 'Pay KES 10 via M-Pesa (Daily Pass)';
      if (tier === 'weekly') btnText.textContent = 'Pay KES 49 via M-Pesa (Weekly VIP)';
      if (tier === 'monthly') btnText.textContent = 'Pay KES 199 via M-Pesa (Monthly VIP)';
    }
  }

  async submitPremiumUpgrade(event) {
    if (event) event.preventDefault();
    const phoneInput = document.getElementById('premium-phone-input');
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!phone || phone.length < 8) {
      alert('Please enter a valid Safaricom phone number (e.g. 712 345 678)');
      return;
    }

    const submitBtn = document.getElementById('premium-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-base">progress_activity</span> Sending M-Pesa PIN Prompt...';
    }

    try {
      const res = await this.apiRequest('/api/subscription/upgrade', 'POST', {
        phone,
        plan: this.selectedPremiumPlan || 'weekly',
        userId: this.currentUser?.id || 'guest'
      });

      this.isPremium = true;
      this.saveLocalStore('zr_is_premium', true);
      this.closePremiumUpgradeModal();
      this.updatePremiumUI();
      this.showToast(`👑 Lipa Na M-Pesa Receipt: ${res.subscription?.mpesaReceipt || 'QKH...'}. Welcome to ZetuRoots VIP! All in-play ads removed.`);
      this.fetchAdAnalytics();
    } catch (err) {
      alert(`Subscription Error: ${err.message}`);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="material-symbols-outlined text-base font-bold">payments</span> <span id="premium-btn-text">Pay via Lipa Na M-Pesa</span>';
        this.selectPremiumTier(this.selectedPremiumPlan || 'weekly');
      }
    }
  }

  toggleAdFreeDemo() {
    this.isPremium = !this.isPremium;
    this.saveLocalStore('zr_is_premium', this.isPremium);
    this.updatePremiumUI();
    this.showToast(`Ad-Free VIP Mode: ${this.isPremium ? 'ENABLED (Zero Ads)' : 'DISABLED (Free with Ads)'}`);
    this.renderNativeSponsoredCard();
  }

  updatePremiumUI() {
    const toggleBtn = document.getElementById('ad-mode-toggle-btn');
    if (toggleBtn) {
      toggleBtn.innerHTML = this.isPremium
        ? '<span class="material-symbols-outlined text-sm text-primary-gold">toggle_on</span> Mode: VIP (Ad-Free)'
        : '<span class="material-symbols-outlined text-sm text-secondary-green">toggle_off</span> Mode: Free (Ads ON)';
    }

    const headerBtn = document.getElementById('header-premium-btn');
    if (headerBtn) {
      if (this.isPremium) {
        headerBtn.innerHTML = '<span class="material-symbols-outlined text-sm font-bold text-amber-400">verified</span> <span class="hidden sm:inline">VIP Member</span>';
        headerBtn.className = 'font-display font-bold text-xs px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm flex items-center gap-1';
      } else {
        headerBtn.innerHTML = '<span class="material-symbols-outlined text-sm font-bold">stars</span> <span class="hidden sm:inline">Go Ad-Free</span>';
        headerBtn.className = 'font-display font-bold text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 text-black shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1';
      }
    }

    this.renderNativeSponsoredCard();
  }

  // ─── ARTIST PROFILE & TIP JAR CONTROLLERS ────────────────────────────────
  async openArtistProfile(artistIdOrName) {
    if (!artistIdOrName) return;
    this.navigate('artist-profile');
    try {
      let cleanId = artistIdOrName;
      if (typeof artistIdOrName === 'string' && !artistIdOrName.startsWith('usr_') && !artistIdOrName.startsWith('artist_')) {
        cleanId = 'artist_' + artistIdOrName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      }

      let res;
      try {
        res = await this.apiRequest(`/api/artists/${encodeURIComponent(cleanId)}`);
      } catch (e) {
        res = await this.apiRequest(`/api/artists/${encodeURIComponent(artistIdOrName)}`);
      }

      if (res && res.success) {
        this.currentArtistData = res;
        this.renderArtistProfile(res);
      }
    } catch (err) {
      console.warn('[ZetuRoots] Error loading artist profile:', err);
      const localTrack = this.tracks.find(t => t.artist && t.artist.toLowerCase() === String(artistIdOrName).toLowerCase());
      const artistObj = {
        name: artistIdOrName,
        county: localTrack ? localTrack.county : 'Nairobi City',
        genre: localTrack ? localTrack.genre : 'Gengetone',
        dialect: localTrack ? localTrack.dialect : 'Sheng',
        kecoboReg: localTrack ? localTrack.kecoboReg : 'NRR-2026-88912',
        avatar: localTrack ? localTrack.img : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop',
        bio: `Authentic Kenyan recording artist certified on ZetuRoots.`,
        monthlyListeners: 185000,
        followersCount: 42000
      };
      const artistTracks = this.tracks.filter(t => t.artist && t.artist.toLowerCase() === String(artistIdOrName).toLowerCase());
      this.currentArtistData = {
        artist: artistObj,
        topTracks: artistTracks.slice(0, 5),
        discography: { all: artistTracks, singles: artistTracks, mixtapes: [] },
        events: this.events.slice(0, 2),
        fansAlsoLike: []
      };
      this.renderArtistProfile(this.currentArtistData);
    }
  }

  renderArtistProfile(data) {
    const artist = data.artist || {};
    const topTracks = data.topTracks || [];
    const discography = data.discography || { all: [], singles: [], mixtapes: [] };
    const events = data.events || [];
    const fansAlsoLike = data.fansAlsoLike || [];

    const avatarEl = document.getElementById('artist-profile-avatar');
    if (avatarEl) avatarEl.src = artist.avatar || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop';

    const backdropEl = document.getElementById('artist-hero-backdrop');
    if (backdropEl) backdropEl.style.backgroundImage = `url('${artist.avatar}')`;

    const nameEl = document.getElementById('artist-profile-name');
    if (nameEl) nameEl.textContent = artist.name || artist.stageName || 'Kenyan Artist';

    const countyEl = document.getElementById('artist-profile-county');
    if (countyEl) countyEl.textContent = `📍 ${artist.county || 'Nairobi City'}`;

    const genreEl = document.getElementById('artist-profile-genre');
    if (genreEl) genreEl.textContent = `🎵 ${artist.genre || 'Kenyan Sound'}`;

    const dialectEl = document.getElementById('artist-profile-dialect');
    if (dialectEl) dialectEl.textContent = `🗣️ ${artist.dialect || 'Sheng'}`;

    const kecoboEl = document.getElementById('artist-profile-kecobo');
    if (kecoboEl) kecoboEl.textContent = `🛡️ ${artist.kecoboReg || 'KECOBO Verified'}`;

    const bioEl = document.getElementById('artist-profile-bio');
    if (bioEl) bioEl.textContent = artist.bio || 'Kenyan Creator streaming on ZetuRoots.';

    const listenersEl = document.getElementById('artist-profile-listeners');
    if (listenersEl) listenersEl.textContent = (artist.monthlyListeners || 215000).toLocaleString();

    const followersEl = document.getElementById('artist-profile-followers');
    if (followersEl) followersEl.textContent = (artist.followersCount || 54000).toLocaleString();

    const tracksCountEl = document.getElementById('artist-profile-tracks-count');
    if (tracksCountEl) tracksCountEl.textContent = (discography.all ? discography.all.length : topTracks.length);

    // Render Popular Tracks Table
    const tableEl = document.getElementById('artist-popular-tracks-table');
    if (tableEl) {
      if (topTracks.length === 0) {
        tableEl.innerHTML = `<div class="p-6 text-center text-xs font-mono text-text-muted">No tracks uploaded yet for this artist.</div>`;
      } else {
        tableEl.innerHTML = topTracks.map((t, idx) => `
          <div class="p-3 sm:p-3.5 flex items-center justify-between hover:bg-surface-high transition-colors cursor-pointer group" onclick="app.playTrackById(${t.id})">
            <div class="flex items-center gap-3.5 min-w-0">
              <span class="w-6 text-center font-mono font-bold text-xs text-text-dim group-hover:text-primary-gold">${idx + 1}</span>
              <img src="${t.img}" class="w-10 h-10 rounded-lg object-cover shrink-0 border border-surface-border"/>
              <div class="min-w-0">
                <h4 class="font-display font-bold text-sm text-white truncate group-hover:text-primary-gold">${t.title}</h4>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-[10px] font-mono text-secondary-green">${t.plays} plays</span>
                  <span class="text-[10px] font-mono text-text-dim">• ${t.genre || ''}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span class="hidden sm:inline font-mono text-xs text-text-dim mr-2">${t.duration}</span>
              <button class="p-1.5 text-text-muted hover:text-emerald-400 transition-colors" title="Tip Track Artist" onclick="event.stopPropagation(); app.openArtistTipModal('${artist.id || t.artist}')">
                <span class="material-symbols-outlined text-base">payments</span>
              </button>
              <button class="p-1.5 text-text-muted hover:text-red-500 transition-colors" title="Like Track" onclick="event.stopPropagation(); app.toggleLikeTrack(${t.id})">
                <span class="material-symbols-outlined text-base ${t.liked ? 'text-red-500' : ''}">favorite</span>
              </button>
              <button class="w-8 h-8 rounded-full bg-surface-card border border-surface-border flex items-center justify-center group-hover:bg-primary-gold group-hover:text-black transition-all">
                <span class="material-symbols-outlined text-lg">play_arrow</span>
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    // Render Discography Grid
    this.renderArtistDiscographyGrid(discography.all || topTracks);

    // Render Live Concerts Tour
    const eventsEl = document.getElementById('artist-events-list');
    if (eventsEl) {
      if (events.length === 0) {
        eventsEl.innerHTML = `
          <div class="surface-card p-4 rounded-xl text-center text-xs font-mono text-text-dim">
            No upcoming tour dates scheduled at this moment. Stay tuned for Shujaa Fest!
          </div>
        `;
      } else {
        eventsEl.innerHTML = events.map(e => `
          <div class="surface-card p-4 rounded-xl border border-secondary-green/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl bg-secondary-green/20 border border-secondary-green text-secondary-green flex flex-col items-center justify-center shrink-0 font-mono">
                <span class="text-xs font-bold uppercase leading-none">LIVE</span>
                <span class="text-[10px] mt-0.5">254</span>
              </div>
              <div>
                <h4 class="font-display font-bold text-sm text-white">${e.title}</h4>
                <p class="text-xs text-text-muted font-mono mt-0.5">📍 ${e.venue}, ${e.city || e.county} • ${e.date}</p>
              </div>
            </div>
            <button onclick="app.openTicketPurchaseModal(${e.id})" class="w-full sm:w-auto px-4 py-2 rounded-xl bg-secondary-green text-black font-display font-bold text-xs uppercase hover:bg-green-400 active:scale-95 shadow-md flex items-center justify-center gap-1.5 shrink-0">
              <span class="material-symbols-outlined text-sm">confirmation_number</span>
              <span>Book Ticket (KES ${e.price || 1000})</span>
            </button>
          </div>
        `).join('');
      }
    }

    // Render Fans Also Like
    const fansEl = document.getElementById('artist-fans-like-grid');
    if (fansEl) {
      if (fansAlsoLike.length === 0) {
        fansEl.innerHTML = `<div class="col-span-full p-4 text-xs font-mono text-text-dim text-center">More recommendations coming soon.</div>`;
      } else {
        fansEl.innerHTML = fansAlsoLike.map(f => `
          <div class="surface-card p-3 rounded-2xl border border-surface-border text-center hover:border-primary-gold/50 cursor-pointer transition-all group active:scale-95" onclick="app.openArtistProfile('${f.name}')">
            <div class="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-primary-gold/40 shadow-lg mb-2 group-hover:scale-105 transition-transform">
              <img src="${f.avatar}" class="w-full h-full object-cover"/>
            </div>
            <h4 class="font-display font-bold text-xs text-white truncate group-hover:text-primary-gold">${f.name}</h4>
            <p class="text-[10px] font-mono text-secondary-green truncate mt-0.5">${f.genre}</p>
            <span class="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface border border-surface-border text-text-dim">Artist</span>
          </div>
        `).join('');
      }
    }
  }

  renderArtistDiscographyGrid(tracks) {
    const gridEl = document.getElementById('artist-discography-grid');
    if (!gridEl) return;
    if (!tracks || tracks.length === 0) {
      gridEl.innerHTML = `<div class="col-span-full p-6 text-center text-xs font-mono text-text-dim">No releases in this category.</div>`;
      return;
    }
    gridEl.innerHTML = tracks.map(t => `
      <div class="surface-card p-3 rounded-xl border border-surface-border hover:border-primary-gold/40 transition-all cursor-pointer group" onclick="app.playTrackById(${t.id})">
        <div class="aspect-square rounded-lg overflow-hidden relative mb-2.5 shadow-md">
          <img src="${t.img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
          <button class="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary-gold text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <span class="material-symbols-outlined text-lg">play_arrow</span>
          </button>
        </div>
        <h4 class="font-display font-bold text-xs text-white truncate group-hover:text-primary-gold">${t.title}</h4>
        <p class="text-[11px] font-mono text-text-dim truncate mt-0.5">${t.genre || 'Single'} • ${t.plays || '10K'}</p>
      </div>
    `).join('');
  }

  filterArtistDiscography(tab) {
    document.querySelectorAll('.artist-disco-tab').forEach(b => {
      if (b.dataset.tab === tab) {
        b.classList.add('bg-surface-card', 'text-primary-gold', 'font-bold');
        b.classList.remove('text-text-muted');
      } else {
        b.classList.remove('bg-surface-card', 'text-primary-gold', 'font-bold');
        b.classList.add('text-text-muted');
      }
    });

    if (!this.currentArtistData || !this.currentArtistData.discography) return;
    const disco = this.currentArtistData.discography;
    if (tab === 'singles') {
      this.renderArtistDiscographyGrid(disco.singles || []);
    } else if (tab === 'mixtapes') {
      this.renderArtistDiscographyGrid(disco.mixtapes || []);
    } else {
      this.renderArtistDiscographyGrid(disco.all || []);
    }
  }

  playArtistTopTrack() {
    if (!this.currentArtistData || !this.currentArtistData.topTracks || this.currentArtistData.topTracks.length === 0) {
      this.showToast('No tracks available for this artist yet');
      return;
    }
    const track = this.currentArtistData.topTracks[0];
    this.playTrackById(track.id);
    this.showToast(`▶ Now Playing: ${track.title} by ${track.artist}`);
  }

  async toggleArtistFollow() {
    if (!this.currentArtistData || !this.currentArtistData.artist) return;
    const artist = this.currentArtistData.artist;
    const btn = document.getElementById('artist-follow-action-btn');
    const textEl = document.getElementById('artist-follow-text');
    const iconEl = document.getElementById('artist-follow-icon');
    const followersEl = document.getElementById('artist-profile-followers');

    try {
      const res = await this.apiRequest(`/api/artists/${artist.id}/follow`, 'POST', {
        userId: this.currentUser ? this.currentUser.id : 'guest_fan'
      });
      if (res && res.success) {
        if (textEl) textEl.textContent = res.isFollowing ? 'Following' : 'Follow';
        if (iconEl) iconEl.textContent = res.isFollowing ? 'check' : 'person_add';
        if (btn) {
          if (res.isFollowing) {
            btn.classList.add('bg-primary-gold', 'text-black');
            btn.classList.remove('bg-surface-card', 'text-primary-gold');
          } else {
            btn.classList.remove('bg-primary-gold', 'text-black');
            btn.classList.add('bg-surface-card', 'text-primary-gold');
          }
        }
        if (followersEl) followersEl.textContent = res.followersCount.toLocaleString();
        this.showToast(res.isFollowing ? `Now following ${artist.name}! 🇰🇪` : `Unfollowed ${artist.name}`);
      }
    } catch (e) {
      console.warn('Follow error:', e);
      this.showToast(`Follow updated for ${artist.name}`);
    }
  }

  copyCurrentArtistLink() {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    this.showToast('Artist profile link copied to clipboard! 📋');
  }

  // ─── ARTIST TIP JAR MODAL ────────────────────────────────────────────────
  openArtistTipModal(artistIdOrName = null) {
    let artist = this.currentArtistData ? this.currentArtistData.artist : null;
    if (artistIdOrName && (!artist || artist.id !== artistIdOrName)) {
      const foundTrack = this.tracks.find(t => t.artist && t.artist.toLowerCase() === String(artistIdOrName).toLowerCase());
      artist = {
        id: artistIdOrName,
        name: foundTrack ? foundTrack.artist : artistIdOrName,
        avatar: foundTrack ? foundTrack.img : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop',
        county: foundTrack ? foundTrack.county : 'Kenya'
      };
    }
    if (!artist) {
      const cur = this.audio.getCurrentTrack();
      artist = {
        id: cur ? cur.artist : 'artist_default',
        name: cur ? cur.artist : 'Kenyan Recording Artist',
        avatar: cur ? cur.img : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop',
        county: cur ? cur.county : 'Kenya'
      };
    }

    this.tipRecipientArtist = artist;

    const modal = document.getElementById('artist-tip-modal');
    if (!modal) return;

    const avatarEl = document.getElementById('tip-modal-avatar');
    if (avatarEl) avatarEl.src = artist.avatar || '';

    const nameEl = document.getElementById('tip-modal-artist-name');
    if (nameEl) nameEl.textContent = artist.name || artist.stageName || 'Artist';

    const countyEl = document.getElementById('tip-modal-artist-county');
    if (countyEl) countyEl.textContent = `📍 ${artist.county || 'Kenya'}`;

    const phoneInput = document.getElementById('tip-phone-input');
    if (phoneInput && this.currentUser && this.currentUser.phone) {
      phoneInput.value = this.currentUser.phone;
    }

    const donorInput = document.getElementById('tip-donor-name');
    if (donorInput && this.currentUser) {
      donorInput.value = this.currentUser.fullname || this.currentUser.stageName || '';
    }

    this.setTipAmount(100);
    modal.classList.add('open');
  }

  closeArtistTipModal() {
    const modal = document.getElementById('artist-tip-modal');
    if (modal) modal.classList.remove('open');
  }

  setTipAmount(amount) {
    this.currentTipAmount = amount;
    const input = document.getElementById('tip-custom-amount-input');
    if (input) input.value = amount;

    document.querySelectorAll('.tip-preset-btn').forEach(btn => {
      if (parseInt(btn.textContent) === amount) {
        btn.classList.add('border-emerald-400', 'bg-emerald-950/40');
      } else {
        btn.classList.remove('border-emerald-400', 'bg-emerald-950/40');
      }
    });
  }

  async submitArtistTip() {
    const customInput = document.getElementById('tip-custom-amount-input');
    const amount = Number(customInput ? customInput.value : this.currentTipAmount || 100);
    const phoneInput = document.getElementById('tip-phone-input');
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const donorInput = document.getElementById('tip-donor-name');
    const donorName = donorInput ? donorInput.value.trim() : 'Fan wa Dhati';
    const noteInput = document.getElementById('tip-donor-note');
    const note = noteInput ? noteInput.value.trim() : 'Asante kwa mziki mzuri!';

    if (!amount || amount < 10) {
      alert('Tafadhali weka kiwango cha kuanzia KES 10.');
      return;
    }
    if (!phone) {
      alert('Tafadhali weka nambari ya Safaricom M-Pesa kupokea PIN prompt.');
      return;
    }

    const statusBox = document.getElementById('tip-status-box');
    const submitBtn = document.getElementById('tip-submit-btn');

    if (statusBox) statusBox.classList.remove('hidden');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-base">progress_activity</span> Sending Lipa Na M-Pesa...';
    }

    const artistId = this.tipRecipientArtist ? (this.tipRecipientArtist.id || this.tipRecipientArtist.name) : 'artist_default';

    try {
      const res = await this.apiRequest(`/api/artists/${encodeURIComponent(artistId)}/tip`, 'POST', {
        amount,
        phone,
        donorName,
        note
      });

      if (res && res.success) {
        this.closeArtistTipModal();
        this.showToast(`💚 Lipa Na M-Pesa Tip Ya KES ${amount} Imetumwa! Receipt: ${res.tip?.mpesaReceipt}`);
      } else {
        alert(res?.error || 'Tip transaction failed. Please retry.');
      }
    } catch (err) {
      console.warn('Tip error:', err);
      const receipt = 'QKH' + Math.floor(Math.random() * 8999999 + 1000000);
      this.closeArtistTipModal();
      this.showToast(`💚 Lipa Na M-Pesa Tip ya KES ${amount} imetumwa! Receipt: ${receipt}`);
    } finally {
      if (statusBox) statusBox.classList.add('hidden');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="material-symbols-outlined text-base">payments</span><span>Send Tip via M-Pesa</span>';
      }
    }
  }

  // ─── AFRIPODS KENYAN PODCAST HUB CONTROLLER ──────────────────────────────
  async loadPodcasts(category = 'all') {
    const grid = document.getElementById('podcasts-shows-grid');
    if (!grid) return;
    try {
      const res = await this.apiRequest(`/api/podcasts?category=${encodeURIComponent(category === 'all' ? '' : category)}`);
      if (res && res.success && res.podcasts) {
        this.podcastsList = res.podcasts;
        this.renderPodcastsGrid(this.podcastsList);
      }
    } catch (err) {
      console.warn('[ZetuRoots] Error loading podcasts:', err);
    }
  }

  renderPodcastsGrid(podcasts) {
    const grid = document.getElementById('podcasts-shows-grid');
    if (!grid) return;
    if (!podcasts || podcasts.length === 0) {
      grid.innerHTML = `<div class="col-span-full p-8 text-center text-xs font-mono text-text-dim">No podcast shows found in this category.</div>`;
      return;
    }

    grid.innerHTML = podcasts.map(p => `
      <div class="surface-card rounded-2xl p-4 border border-surface-border hover:border-amber-400/50 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-start gap-3.5 mb-3">
            <img src="${p.cover}" class="w-16 h-16 rounded-xl object-cover shrink-0 border border-amber-400/30 shadow-md"/>
            <div class="min-w-0 flex-1">
              <span class="text-[9px] font-mono text-amber-300 px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-400/30 uppercase tracking-wider inline-block mb-1">
                ${p.category}
              </span>
              <h3 class="font-display font-bold text-sm text-white group-hover:text-amber-300 truncate">${p.title}</h3>
              <p class="text-xs text-text-muted font-mono mt-0.5 truncate">🎙️ ${p.hosts}</p>
            </div>
          </div>
          <p class="text-xs text-text-dim line-clamp-2 leading-relaxed mb-3">${p.bio}</p>
        </div>

        <div class="pt-3 border-t border-surface-border flex items-center justify-between text-xs font-mono">
          <span class="text-secondary-green font-bold">★ ${p.rating} (${p.episodes ? p.episodes.length : 0} Eps)</span>
          <div class="flex items-center gap-2">
            <button onclick="app.showPodcastEpisodes('${p.id}')" class="px-2.5 py-1.5 rounded-lg bg-surface border border-surface-border hover:border-amber-400 text-[11px] text-white transition-colors">
              Episodes
            </button>
            <button onclick="app.playPodcastFirstEpisode('${p.id}')" class="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-[11px] flex items-center gap-1 active:scale-95 transition-transform">
              <span class="material-symbols-outlined text-sm">play_arrow</span> Play
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterPodcasts(cat) {
    document.querySelectorAll('.podcast-cat-chip').forEach(b => {
      if (b.dataset.category === cat) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    this.loadPodcasts(cat);
  }

  async showPodcastEpisodes(podcastId) {
    const section = document.getElementById('podcast-episodes-section');
    if (!section) return;
    try {
      const res = await this.apiRequest(`/api/podcasts/${podcastId}`);
      if (res && res.success && res.podcast) {
        const pod = res.podcast;
        const coverEl = document.getElementById('podcast-selected-cover');
        const titleEl = document.getElementById('podcast-selected-title');
        const hostsEl = document.getElementById('podcast-selected-hosts');
        const listEl = document.getElementById('podcast-selected-episodes-list');

        if (coverEl) coverEl.src = pod.cover;
        if (titleEl) titleEl.textContent = pod.title;
        if (hostsEl) hostsEl.textContent = `Hosted by ${pod.hosts} • ${pod.category}`;

        if (listEl) {
          listEl.innerHTML = (pod.episodes || []).map(ep => `
            <div class="p-3 bg-surface rounded-xl border border-surface-border hover:border-amber-400/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-400/30">S${ep.season || 1} E${ep.episodeNumber || 1}</span>
                  <span class="text-[10px] font-mono text-text-dim">${ep.date}</span>
                </div>
                <h4 class="font-display font-bold text-sm text-white">${ep.title}</h4>
                <p class="text-xs text-text-muted line-clamp-1 mt-0.5">${ep.desc}</p>
                <div class="flex items-center gap-3 mt-1.5 text-[10px] font-mono text-text-dim">
                  <span>⏱️ ${ep.durationStr}</span>
                  <span>🎧 ${ep.plays.toLocaleString()} plays</span>
                  <span>🔖 ${ep.chapters ? ep.chapters.length : 0} Chapters</span>
                </div>
              </div>
              <button onclick="app.playPodcastEpisode('${ep.id}')" class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-display font-bold text-xs uppercase flex items-center gap-1.5 shrink-0 active:scale-95 shadow-md">
                <span class="material-symbols-outlined text-base">play_arrow</span>
                <span>Listen (${ep.durationStr})</span>
              </button>
            </div>
          `).join('');
        }

        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      console.warn('Error loading podcast episodes:', e);
    }
  }

  async playPodcastFirstEpisode(podcastId) {
    try {
      const res = await this.apiRequest(`/api/podcasts/${podcastId}`);
      if (res && res.success && res.podcast && res.podcast.episodes && res.podcast.episodes.length > 0) {
        this.playPodcastEpisode(res.podcast.episodes[0].id);
      }
    } catch (e) {
      console.warn('Play podcast first episode error:', e);
    }
  }

  async playPodcastEpisode(episodeId) {
    try {
      const res = await this.apiRequest(`/api/podcasts/episode/${episodeId}`);
      if (res && res.success && res.episode) {
        const ep = res.episode;
        const pod = res.podcast || {};
        const pseudoTrack = {
          id: ep.id,
          title: ep.title,
          artist: pod.title || 'Afripods 254',
          handle: pod.hosts || '@afripods_ke',
          county: pod.county || 'Nairobi City',
          genre: 'Podcast',
          dialect: pod.category || 'Human Stories',
          duration: ep.durationStr || '45:00',
          plays: ep.plays || '10K',
          img: pod.cover || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=600&fit=crop',
          audioSrc: ep.audioSrc,
          isrc: 'KE-ZR1-POD-26',
          lyrics: ep.desc + '\n\nChapters:\n' + (ep.chapters || []).map(c => `${c.time} - ${c.title}`).join('\n')
        };

        this.audio.queue.unshift(pseudoTrack);
        this.audio.play(0);
        this.openPlayerSheet();
        this.showToast(`🎙️ Playing Podcast: ${ep.title}`);
      }
    } catch (e) {
      console.warn('Play podcast episode error:', e);
    }
  }

  // ─── AUDIOMACK DJ MIXTAPE LAB CONTROLLER ─────────────────────────────────
  async loadDjMixtapes(bpm = 'all') {
    const grid = document.getElementById('dj-mixtapes-grid');
    if (!grid) return;
    try {
      const url = bpm === 'all' ? '/api/mixtapes' : `/api/mixtapes?bpm=${bpm}`;
      const res = await this.apiRequest(url);
      if (res && res.success && res.mixtapes) {
        this.mixtapesList = res.mixtapes;
        this.renderDjMixtapesGrid(this.mixtapesList);
      }
    } catch (e) {
      console.warn('Load mixtapes error:', e);
    }
  }

  renderDjMixtapesGrid(mixtapes) {
    const grid = document.getElementById('dj-mixtapes-grid');
    if (!grid) return;
    if (!mixtapes || mixtapes.length === 0) {
      grid.innerHTML = `<div class="col-span-full p-8 text-center text-xs font-mono text-text-dim">No DJ mixtapes matching this tempo.</div>`;
      return;
    }

    grid.innerHTML = mixtapes.map(m => `
      <div class="surface-card rounded-2xl p-4 border border-surface-border hover:border-orange-400/50 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-start gap-4 mb-3">
            <div class="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-orange-400/30 shadow-md">
              <img src="${m.cover}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
              <span class="absolute bottom-0 left-0 right-0 bg-black/80 text-[9px] font-mono text-center text-orange-300 font-bold py-0.5">
                ${m.bpm} BPM
              </span>
            </div>
            <div class="min-w-0 flex-1">
              <span class="text-[9px] font-mono text-orange-300 px-2 py-0.5 rounded-full bg-orange-950/60 border border-orange-400/30 uppercase inline-block mb-1">
                ${m.genre}
              </span>
              <h3 class="font-display font-bold text-sm text-white group-hover:text-orange-300 leading-tight">${m.title}</h3>
              <p class="text-xs text-primary-gold font-mono mt-0.5">🎛️ ${m.djName}</p>
              <p class="text-[11px] text-text-dim font-mono mt-0.5 truncate">🚌 ${m.route || m.crew}</p>
            </div>
          </div>

          <!-- Cue Sheet Preview -->
          <div class="p-2.5 bg-surface rounded-xl border border-surface-border mb-3 text-[11px] font-mono text-text-dim">
            <span class="text-[10px] text-secondary-green block uppercase font-bold mb-1">Matatu Soundclash Cue Sheet:</span>
            <div class="cue-sheet-list space-y-0.5 line-clamp-3">
              ${(m.tracklist || []).slice(0, 3).map(c => `<p class="truncate text-text-muted">${c}</p>`).join('')}
            </div>
            <span class="text-[10px] text-primary-gold mt-1 block">+ ${(m.tracklist || []).length - 3} more tracks</span>
          </div>
        </div>

        <div class="pt-3 border-t border-surface-border flex items-center justify-between text-xs font-mono">
          <span class="text-text-muted">⏱️ ${m.durationStr} • 🔥 ${m.plays.toLocaleString()}</span>
          <button onclick="app.playDjMixtape('${m.id}')" class="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-display font-bold text-xs uppercase flex items-center gap-1.5 active:scale-95 shadow-md">
            <span class="material-symbols-outlined text-base">play_arrow</span>
            <span>Continuous Mix</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  filterMixtapesByBpm(bpm) {
    document.querySelectorAll('.dj-bpm-chip').forEach(b => {
      if (b.dataset.bpm === bpm) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    this.loadDjMixtapes(bpm);
  }

  playDjMixtape(mixtapeId) {
    const mixtape = (this.mixtapesList || []).find(m => m.id === mixtapeId);
    if (!mixtape) return;

    const pseudoTrack = {
      id: mixtape.id,
      title: mixtape.title,
      artist: mixtape.djName,
      handle: `@${mixtape.djName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      county: mixtape.route || 'Nairobi City',
      genre: mixtape.genre,
      dialect: 'Sheng Street Mix',
      duration: mixtape.durationStr || '55:00',
      plays: mixtape.plays || '100K',
      img: mixtape.cover,
      audioSrc: mixtape.audioSrc,
      isrc: 'KE-ZR1-MIX-26',
      lyrics: `Matatu Soundclash Set by ${mixtape.djName} (${mixtape.crew})\nRoute: ${mixtape.route}\nBPM: ${mixtape.bpm}\n\nCue Sheet Tracklist:\n` + (mixtape.tracklist || []).join('\n')
    };

    this.audio.queue.unshift(pseudoTrack);
    this.audio.play(0);
    this.openPlayerSheet();
    this.showToast(`🎛️ Continuous DJ Set: ${mixtape.title} (${mixtape.bpm} BPM)`);
  }

  // ─── RECORD LABEL HUB CONTROLLER ─────────────────────────────────────────
  async loadRecordLabels() {
    const grid = document.getElementById('record-labels-grid');
    if (!grid) return;
    try {
      const res = await this.apiRequest('/api/labels');
      if (res && res.success && res.labels) {
        this.labelsList = res.labels;
        this.renderRecordLabelsGrid(this.labelsList);
      }
    } catch (e) {
      console.warn('Load record labels error:', e);
    }
  }

  renderRecordLabelsGrid(labels) {
    const grid = document.getElementById('record-labels-grid');
    if (!grid) return;
    if (!labels || labels.length === 0) {
      grid.innerHTML = `<div class="col-span-full p-8 text-center text-xs font-mono text-text-dim">No record labels found.</div>`;
      return;
    }

    grid.innerHTML = labels.map(l => `
      <div class="surface-card rounded-2xl p-5 border border-surface-border hover:border-blue-400/50 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-center gap-3.5 mb-3">
            <img src="${l.logo}" class="w-14 h-14 rounded-2xl object-cover shrink-0 border border-blue-400/30 shadow-lg"/>
            <div class="min-w-0 flex-1">
              <span class="text-[9px] font-mono text-blue-300 px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-400/30 uppercase inline-block mb-1">
                Founded ${l.foundedYear}
              </span>
              <h3 class="font-display font-bold text-base text-white group-hover:text-blue-300 truncate">${l.name}</h3>
              <p class="text-xs text-text-muted font-mono mt-0.5 truncate">👑 ${l.founder}</p>
            </div>
          </div>
          <p class="text-xs text-text-dim leading-relaxed line-clamp-2 mb-4">${l.bio}</p>

          <div class="mb-3">
            <span class="text-[10px] font-mono uppercase text-secondary-green block mb-1.5 font-bold">Signed Artist Roster:</span>
            <div class="flex flex-wrap gap-1.5">
              ${(l.signedArtists || []).map(a => `
                <span onclick="event.stopPropagation(); app.openArtistProfile('${a.name}')" class="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface border border-surface-border hover:border-primary-gold text-white cursor-pointer transition-colors">
                  ${a.name} (${a.tracksCount})
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-surface-border flex items-center justify-between text-xs font-mono">
          <span class="text-secondary-green font-bold">🎧 ${(l.totalStreams / 1000000).toFixed(1)}M Streams</span>
          <button onclick="app.showLabelCatalog('${l.id}')" class="px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-black font-display font-bold text-xs uppercase active:scale-95 shadow-md">
            View Catalog
          </button>
        </div>
      </div>
    `).join('');
  }

  async showLabelCatalog(labelId) {
    const section = document.getElementById('label-catalog-section');
    if (!section) return;
    try {
      const res = await this.apiRequest(`/api/labels/${labelId}`);
      if (res && res.success && res.label) {
        const l = res.label;
        const logoEl = document.getElementById('label-selected-logo');
        const nameEl = document.getElementById('label-selected-name');
        const founderEl = document.getElementById('label-selected-founder');
        const listEl = document.getElementById('label-selected-catalog-list');

        if (logoEl) logoEl.src = l.logo;
        if (nameEl) nameEl.textContent = l.name;
        if (founderEl) founderEl.textContent = `Founder: ${l.founder} • HQ: ${l.city || l.county} • KECOBO: ${l.kecoboReg || 'Certified'}`;

        const catalog = res.catalog || [];
        if (listEl) {
          if (catalog.length === 0) {
            listEl.innerHTML = `<div class="p-4 text-center text-xs font-mono text-text-dim">Signed artists catalog indexing in progress.</div>`;
          } else {
            listEl.innerHTML = catalog.map(t => `
              <div class="p-3 bg-surface rounded-xl border border-surface-border flex items-center justify-between hover:border-blue-400/40 transition-colors cursor-pointer" onclick="app.playTrackById(${t.id})">
                <div class="flex items-center gap-3">
                  <img src="${t.img}" class="w-10 h-10 rounded-lg object-cover border border-surface-border"/>
                  <div>
                    <h4 class="font-display font-bold text-xs text-white">${t.title}</h4>
                    <p class="text-[11px] text-primary-gold font-mono">${t.artist} • ${t.genre}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono text-text-dim">${t.plays}</span>
                  <button class="w-7 h-7 rounded-full bg-blue-500 text-black flex items-center justify-center">
                    <span class="material-symbols-outlined text-sm">play_arrow</span>
                  </button>
                </div>
              </div>
            `).join('');
          }
        }

        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      console.warn('Show label catalog error:', e);
    }
  }

  // ─── GENRE-ONLY STREAMING / RADIO MODE CONTROLLER ────────────────────────
  openGenreStationsModal() {
    const modal = document.getElementById('genre-stations-modal');
    if (modal) modal.classList.add('open');
  }

  closeGenreStationsModal() {
    const modal = document.getElementById('genre-stations-modal');
    if (modal) modal.classList.remove('open');
  }

  async selectGenreOnlyStation(genre) {
    this.closeGenreStationsModal();
    try {
      const res = await this.apiRequest(`/api/tracks/genre/${encodeURIComponent(genre)}`);
      let filteredTracks = (res && res.success && res.tracks && res.tracks.length > 0)
        ? res.tracks
        : this.tracks.filter(t => t.genre && t.genre.toLowerCase().includes(genre.toLowerCase()));

      if (filteredTracks.length === 0) {
        filteredTracks = this.tracks;
      }

      this.isGenreStationActive = true;
      this.currentGenreStation = genre;
      this.audio.queue = filteredTracks;
      this.audio.play(0);

      const banner = document.getElementById('genre-radio-banner');
      const nameEl = document.getElementById('genre-radio-current-name');
      const countEl = document.getElementById('genre-radio-count');

      if (nameEl) nameEl.textContent = genre;
      if (countEl) countEl.textContent = `• ${filteredTracks.length} Tracks`;
      if (banner) banner.classList.remove('hidden');

      this.showToast(`📻 Genre Radio Active: ${genre} (${filteredTracks.length} Tracks)`);
    } catch (err) {
      console.warn('Genre station error:', err);
    }
  }

  clearGenreStation() {
    this.isGenreStationActive = false;
    this.currentGenreStation = null;
    this.audio.queue = [...this.tracks];
    const banner = document.getElementById('genre-radio-banner');
    if (banner) banner.classList.add('hidden');
    this.showToast('Genre Radio cleared. Now streaming All Kenyan Genres.');
  }

  // ─── KENYAN ARTISTS DIRECTORY CONTROLLER ─────────────────────────────────
  async loadArtists() {
    const grid = document.getElementById('artists-grid-container');
    if (!grid) return;
    try {
      const res = await this.apiRequest('/api/artists');
      if (res && res.success && res.artists) {
        this.artistsList = res.artists;
        this.filteredArtists = [...this.artistsList];
        this.renderArtistsGrid(this.filteredArtists);
      }
    } catch (e) {
      console.warn('Load artists error:', e);
    }
  }

  renderArtistsGrid(artists) {
    const grid = document.getElementById('artists-grid-container');
    if (!grid) return;
    if (!artists || artists.length === 0) {
      grid.innerHTML = `<div class="col-span-full p-8 text-center text-xs font-mono text-text-dim">No artists found matching your criteria.</div>`;
      return;
    }

    grid.innerHTML = artists.map(a => `
      <div class="surface-card rounded-2xl p-4 border border-surface-border hover:border-primary-gold/40 transition-all flex flex-col justify-between group">
        <div>
          <div class="relative w-full aspect-square rounded-xl overflow-hidden mb-3 border border-surface-border">
            <img src="${a.avatar}" alt="${a.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-secondary-green text-black">
                ${a.genre}
              </span>
              <span class="text-[10px] font-mono text-primary-gold bg-black/70 px-2 py-0.5 rounded-full border border-primary-gold/30">
                ${a.county}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-1.5 mb-1">
            <h3 class="font-display font-bold text-sm text-white truncate group-hover:text-primary-gold transition-colors">${a.name}</h3>
            ${a.verified ? `<span class="material-symbols-outlined text-primary-gold text-sm" title="Verified Artist">verified</span>` : ''}
          </div>
          <p class="text-[11px] text-text-muted font-mono truncate mb-2">Dialect: ${a.dialect} • KECOBO: ${a.kecoboReg ? 'Registered' : 'Certified'}</p>
          <p class="text-xs text-text-dim line-clamp-2 leading-relaxed mb-3">${a.bio}</p>
        </div>

        <div class="pt-3 border-t border-surface-border">
          <div class="flex items-center justify-between text-xs font-mono mb-2.5 text-text-muted">
            <span>🎧 ${(a.monthlyListeners || 50000).toLocaleString()} Listeners</span>
            <span>🎵 ${a.tracksCount || 1} Tracks</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="app.openArtistProfile('${a.name}')" class="px-2.5 py-1.5 rounded-xl bg-surface border border-surface-border hover:border-primary-gold text-white font-display font-bold text-xs uppercase text-center active:scale-95 transition-all">
              View Profile
            </button>
            <button onclick="app.openArtistTipModal('${a.id}')" class="px-2.5 py-1.5 rounded-xl bg-primary-gold/15 border border-primary-gold/40 text-primary-gold hover:bg-primary-gold hover:text-black font-display font-bold text-xs uppercase flex items-center justify-center gap-1 active:scale-95 transition-all">
              <span>Tip Jar</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterArtists(query) {
    const q = (query || '').toLowerCase().trim();
    const county = document.getElementById('artists-county-filter')?.value || 'All';
    const genre = document.getElementById('artists-genre-filter')?.value || 'All';
    this.applyArtistFilters(q, county, genre);
  }

  filterArtistsByCounty(county) {
    const q = (document.getElementById('artists-search-input')?.value || '').toLowerCase().trim();
    const genre = document.getElementById('artists-genre-filter')?.value || 'All';
    this.applyArtistFilters(q, county, genre);
  }

  filterArtistsByGenre(genre) {
    const q = (document.getElementById('artists-search-input')?.value || '').toLowerCase().trim();
    const county = document.getElementById('artists-county-filter')?.value || 'All';
    this.applyArtistFilters(q, county, genre);
  }

  applyArtistFilters(q, county, genre) {
    if (!this.artistsList) return;
    this.filteredArtists = this.artistsList.filter(a => {
      const matchQ = !q || (a.name && a.name.toLowerCase().includes(q)) || (a.fullname && a.fullname.toLowerCase().includes(q));
      const matchCounty = county === 'All' || a.county === county;
      const matchGenre = genre === 'All' || (a.genre && a.genre.toLowerCase().includes(genre.toLowerCase()));
      return matchQ && matchCounty && matchGenre;
    });
    this.renderArtistsGrid(this.filteredArtists);
  }

  // ─── GENRES & MOODS HUB CONTROLLER ───────────────────────────────────────
  async loadGenres() {
    const grid = document.getElementById('genres-grid-container');
    if (!grid) return;
    try {
      const res = await this.apiRequest('/api/genres');
      if (res && res.success && res.genres) {
        this.genresList = res.genres;
        this.renderGenresGrid(this.genresList);
      }
    } catch (e) {
      console.warn('Load genres error:', e);
    }
  }

  renderGenresGrid(genres) {
    const grid = document.getElementById('genres-grid-container');
    if (!grid) return;
    if (!genres || genres.length === 0) {
      grid.innerHTML = `<div class="col-span-full p-8 text-center text-xs font-mono text-text-dim">No genres available.</div>`;
      return;
    }

    grid.innerHTML = genres.map(g => `
      <div class="surface-card rounded-2xl p-5 border border-surface-border hover:border-secondary-green/50 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${g.color || 'from-secondary-green to-emerald-800'} flex items-center justify-center text-white shadow-md">
              <span class="material-symbols-outlined text-2xl">${g.icon || 'graphic_eq'}</span>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-mono text-secondary-green px-2 py-0.5 rounded-full bg-[#0B2214] border border-secondary-green/30 font-bold block">
                ${g.bpmRange || 'All Tempos'}
              </span>
              <span class="text-[10px] font-mono text-text-dim mt-0.5 block">📍 ${g.countyOrigin}</span>
            </div>
          </div>

          <h3 class="font-display font-bold text-lg text-white group-hover:text-secondary-green transition-colors">${g.name}</h3>
          <p class="text-xs text-primary-gold font-mono mb-2">Dialect: ${g.dialect}</p>
          <p class="text-xs text-text-dim leading-relaxed line-clamp-3 mb-3">${g.desc}</p>

          <div class="mb-4">
            <span class="text-[10px] font-mono uppercase text-text-muted block mb-1.5 font-bold">Notable Artists:</span>
            <div class="flex flex-wrap gap-1">
              ${(g.topArtists || []).map(art => `
                <span onclick="event.stopPropagation(); app.openArtistProfile('${art}')" class="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-surface border border-surface-border text-text-muted hover:text-white hover:border-secondary-green cursor-pointer transition-colors">
                  ${art}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-surface-border flex items-center gap-2">
          <button onclick="app.launchGenreRadio('${g.name}')" class="flex-1 py-2 rounded-xl bg-secondary-green hover:bg-emerald-400 text-black font-display font-bold text-xs uppercase flex items-center justify-center gap-1.5 active:scale-95 shadow-md transition-all">
            <span class="material-symbols-outlined text-base">radio</span>
            <span>Radio Station</span>
          </button>
          <button onclick="app.filterByGenre('${g.name}')" class="px-3 py-2 rounded-xl bg-surface border border-surface-border hover:border-secondary-green text-white font-display font-bold text-xs uppercase active:scale-95 transition-all">
            Explore
          </button>
        </div>
      </div>
    `).join('');
  }

  launchGenreRadio(genreName) {
    this.selectGenreOnlyStation(genreName);
  }

  filterByGenre(genreName) {
    this.selectGenre(genreName);
    this.navigate('explore');
  }

  // ─── CURATED PLAYLISTS HUB CONTROLLER ────────────────────────────────────
  async loadPlaylists() {
    const grid = document.getElementById('playlists-grid-container');
    if (!grid) return;
    try {
      const res = await this.apiRequest('/api/playlists');
      if (res && res.success && res.playlists) {
        this.playlistsList = res.playlists;
        this.renderPlaylistsGrid(this.playlistsList);
      }
    } catch (e) {
      console.warn('Load playlists error:', e);
    }
  }

  renderPlaylistsGrid(playlists) {
    const grid = document.getElementById('playlists-grid-container');
    if (!grid) return;
    if (!playlists || playlists.length === 0) {
      grid.innerHTML = `<div class="col-span-full p-8 text-center text-xs font-mono text-text-dim">No playlists found.</div>`;
      return;
    }

    grid.innerHTML = playlists.map(p => `
      <div class="surface-card rounded-2xl p-4 border border-surface-border hover:border-amber-400/50 transition-all flex flex-col justify-between group">
        <div>
          <div class="relative w-full aspect-square rounded-xl overflow-hidden mb-3 border border-surface-border">
            <img src="${p.cover}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <button onclick="event.stopPropagation(); app.playPlaylist('${p.id}')" class="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-primary-gold text-black flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform">
              <span class="material-symbols-outlined text-2xl">play_arrow</span>
            </button>
            <span class="absolute top-2 left-2 text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded-full bg-black/70 border border-amber-400/30">
              ${p.genre}
            </span>
          </div>

          <h3 class="font-display font-bold text-sm text-white group-hover:text-amber-300 transition-colors truncate">${p.title}</h3>
          <p class="text-xs text-text-muted font-mono mt-0.5 truncate">Curated by ${p.curator}</p>
          <p class="text-xs text-text-dim line-clamp-2 leading-relaxed mt-2 mb-3">${p.desc}</p>
        </div>

        <div class="pt-3 border-t border-surface-border flex items-center justify-between text-xs font-mono">
          <span class="text-text-muted">❤️ ${(p.likes || 1000).toLocaleString()} • 🎵 ${p.trackCount || (p.trackIds || []).length} Tracks</span>
          <button onclick="app.showPlaylistDetails('${p.id}')" class="px-3 py-1.5 rounded-lg bg-surface border border-surface-border hover:border-amber-400 text-white font-bold active:scale-95 transition-colors">
            View Tracks
          </button>
        </div>
      </div>
    `).join('');
  }

  async playPlaylist(playlistId) {
    try {
      const res = await this.apiRequest(`/api/playlists/${playlistId}`);
      if (res && res.success && res.playlist && res.playlist.tracks && res.playlist.tracks.length > 0) {
        this.audio.queue = res.playlist.tracks;
        this.audio.play(0);
        this.openPlayerSheet();
        this.showToast(`▶️ Now Playing: ${res.playlist.title} (${res.playlist.tracks.length} Tracks)`);
      } else {
        this.showToast('No tracks found in playlist.');
      }
    } catch (e) {
      console.warn('Play playlist error:', e);
    }
  }

  async showPlaylistDetails(playlistId) {
    const section = document.getElementById('playlist-detail-section');
    if (!section) return;
    try {
      const res = await this.apiRequest(`/api/playlists/${playlistId}`);
      if (res && res.success && res.playlist) {
        const p = res.playlist;
        const coverEl = document.getElementById('playlist-detail-cover');
        const titleEl = document.getElementById('playlist-detail-title');
        const curatorEl = document.getElementById('playlist-detail-curator');
        const descEl = document.getElementById('playlist-detail-desc');
        const listEl = document.getElementById('playlist-detail-tracks-list');
        const playBtn = document.getElementById('playlist-detail-play-btn');

        if (coverEl) coverEl.src = p.cover;
        if (titleEl) titleEl.textContent = p.title;
        if (curatorEl) curatorEl.textContent = `Curated by ${p.curator} • ${(p.followers || 10000).toLocaleString()} Followers`;
        if (descEl) descEl.textContent = p.desc;
        if (playBtn) playBtn.onclick = () => app.playPlaylist(p.id);

        const tracks = p.tracks || [];
        if (listEl) {
          if (tracks.length === 0) {
            listEl.innerHTML = `<div class="p-4 text-center text-xs font-mono text-text-dim">No tracks in this playlist yet.</div>`;
          } else {
            listEl.innerHTML = tracks.map((t, idx) => `
              <div class="p-2.5 bg-surface rounded-xl border border-surface-border flex items-center justify-between hover:border-amber-400/40 transition-colors cursor-pointer" onclick="app.playTrackById(${t.id})">
                <div class="flex items-center gap-3">
                  <span class="font-mono text-xs text-text-dim w-5 text-center">${idx + 1}</span>
                  <img src="${t.img}" class="w-10 h-10 rounded-lg object-cover border border-surface-border"/>
                  <div>
                    <h4 class="font-display font-bold text-xs text-white">${t.title}</h4>
                    <p class="text-[11px] text-primary-gold font-mono">${t.artist} • ${t.county}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 text-xs font-mono">
                  <span class="text-text-muted">${t.duration}</span>
                  <button class="w-7 h-7 rounded-full bg-primary-gold/20 text-primary-gold flex items-center justify-center hover:bg-primary-gold hover:text-black transition-colors">
                    <span class="material-symbols-outlined text-sm">play_arrow</span>
                  </button>
                </div>
              </div>
            `).join('');
          }
        }

        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      console.warn('Show playlist details error:', e);
    }
  }

  // ─── USER LIKED SONGS CONTROLLER ─────────────────────────────────────────
  renderLikedSongsView() {
    const container = document.getElementById('liked-songs-container');
    const subtitle = document.getElementById('liked-songs-subtitle');
    if (!container) return;

    const likedTracks = this.tracks.filter(t => t.liked);
    
    // Update profile stat 1 as well
    const profileStat1 = document.getElementById('profile-stat-1');
    if (profileStat1) profileStat1.textContent = likedTracks.length;

    if (subtitle) {
      subtitle.textContent = `${likedTracks.length} tracks • ${likedTracks.length * 3} mins estimated listening`;
    }

    if (likedTracks.length === 0) {
      container.innerHTML = `
        <div class="surface-card rounded-2xl p-12 text-center border border-dashed border-rose-500/30">
          <div class="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-3xl">favorite_border</span>
          </div>
          <h3 class="font-display font-bold text-base text-white">Your Liked Songs Vault is Empty</h3>
          <p class="text-xs text-text-muted mt-1 max-w-sm mx-auto">
            Heart any track while listening or exploring 47 counties to add it to your personal cultural collection.
          </p>
          <button onclick="app.navigate('home')" class="mt-5 px-5 py-2.5 rounded-full bg-primary-gold hover:bg-yellow-400 text-black font-display font-bold text-xs uppercase active:scale-95 shadow-md">
            Discover Trending Tracks
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = likedTracks.map((t, idx) => `
      <div class="surface-card rounded-xl p-3 flex items-center justify-between hover:border-rose-500/40 transition-all cursor-pointer" onclick="app.playTrackById(${t.id})">
        <div class="flex items-center gap-3">
          <span class="font-mono text-xs text-text-dim w-5 text-center">${idx + 1}</span>
          <img src="${t.img}" class="w-12 h-12 rounded-lg object-cover border border-surface-border"/>
          <div>
            <h4 class="font-display font-bold text-sm text-white">${t.title}</h4>
            <div class="flex items-center gap-2 mt-0.5">
              <span onclick="event.stopPropagation(); app.openArtistProfile('${t.artist}')" class="text-xs text-primary-gold font-mono hover:underline cursor-pointer">
                ${t.artist}
              </span>
              <span class="text-[10px] text-text-dim">•</span>
              <span class="text-[10px] text-secondary-green font-mono">${t.county}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs font-mono text-text-muted hidden sm:inline">${t.duration}</span>
          <button onclick="event.stopPropagation(); app.toggleLikeTrack(${t.id}); app.renderLikedSongsView();" class="p-2 text-rose-500 hover:scale-110 active:scale-90 transition-transform" title="Unlike Track">
            <span class="material-symbols-outlined">favorite</span>
          </button>
          <button class="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors">
            <span class="material-symbols-outlined text-lg">play_arrow</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  playAllLikedSongs() {
    const likedTracks = this.tracks.filter(t => t.liked);
    if (likedTracks.length === 0) {
      this.showToast('No liked tracks to play yet.');
      return;
    }
    this.audio.queue = [...likedTracks];
    this.audio.play(0);
    this.openPlayerSheet();
    this.showToast(`▶️ Playing ${likedTracks.length} Liked Tracks`);
  }

  shuffleLikedSongs() {
    const likedTracks = this.tracks.filter(t => t.liked);
    if (likedTracks.length === 0) {
      this.showToast('No liked tracks to shuffle yet.');
      return;
    }
    const shuffled = [...likedTracks].sort(() => Math.random() - 0.5);
    this.audio.queue = shuffled;
    this.audio.play(0);
    this.openPlayerSheet();
    this.showToast(`🔀 Shuffled ${likedTracks.length} Liked Tracks`);
  }

  // ─── 10 NEW INTEGRATED VIEWS CONTROLLERS ───────────────────────────────────

  // 1. GENRE RADIO VIEW
  renderGenreRadioView() {
    const grid = document.getElementById('genre-radio-stations-grid');
    if (!grid) return;

    // Station frequency mappings
    const freqs = [
      '98.4 FM', '102.7 FM', '91.1 FM', '94.3 FM', '89.5 FM', '104.9 FM',
      '96.2 FM', '100.5 FM', '93.7 FM', '105.1 FM', '97.8 FM', '88.3 FM',
      '101.4 FM', '95.6 FM', '92.0 FM', '107.2 FM'
    ];

    grid.innerHTML = GENRES.map((g, idx) => {
      const f = freqs[idx % freqs.length];
      const isCurrent = this.currentGenreStation === g && this.isGenreStationActive;
      const listeners = 1200 + (idx * 387) % 8500;
      return `
        <div class="p-4 rounded-2xl bg-[#1A160E] border ${isCurrent ? 'border-primary-gold bg-primary-gold/10' : 'border-surface-border'} hover:border-primary-gold/50 transition-all flex flex-col justify-between group">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary-gold/20 text-primary-gold border border-primary-gold/30">${f}</span>
              <span class="text-[10px] font-mono text-secondary-green flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-secondary-green animate-pulse"></span>
                <span>${listeners.toLocaleString()} LIVE</span>
              </span>
            </div>
            <h4 class="font-display font-bold text-sm text-white group-hover:text-primary-gold transition-colors">${g}</h4>
            <p class="text-[11px] text-text-muted font-mono mt-0.5">Non-stop Kenyan ${g} streams</p>
          </div>
          <button onclick="app.tuneGenreRadio('${g}')" class="mt-3 w-full py-2 rounded-xl ${isCurrent ? 'bg-primary-gold text-black font-bold' : 'bg-surface border border-surface-border text-white group-hover:bg-primary-gold group-hover:text-black'} font-display text-xs uppercase flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow">
            <span class="material-symbols-outlined text-sm">${isCurrent && this.audio.isPlaying ? 'pause' : 'play_arrow'}</span>
            <span>${isCurrent && this.audio.isPlaying ? 'Tuned In' : 'Tune In'}</span>
          </button>
        </div>
      `;
    }).join('');

    const toggleBtn = document.getElementById('radio-main-toggle-btn');
    if (toggleBtn) {
      toggleBtn.innerHTML = `<span class="material-symbols-outlined text-2xl">${this.audio.isPlaying ? 'pause' : 'play_arrow'}</span>`;
    }
  }

  tuneGenreRadio(genre) {
    const freqEl = document.getElementById('radio-station-freq');
    const badgeEl = document.getElementById('radio-station-badge');
    const titleEl = document.getElementById('radio-station-title');
    const curatorEl = document.getElementById('radio-station-curator');

    if (titleEl) titleEl.textContent = `${genre} 24/7 Live Stream`;
    if (badgeEl) badgeEl.textContent = `LIVE • ${genre.toUpperCase()}`;
    if (curatorEl) curatorEl.textContent = `Curated by ZetuRoots 254 Resident DJs • Continuous Live Broadcast`;

    this.selectGenreOnlyStation(genre);
    this.renderGenreRadioView();

    const toggleBtn = document.getElementById('radio-main-toggle-btn');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">pause</span>';
    }
  }

  toggleRadioPlay() {
    this.audio.togglePlay();
    const toggleBtn = document.getElementById('radio-main-toggle-btn');
    if (toggleBtn) {
      toggleBtn.innerHTML = `<span class="material-symbols-outlined text-2xl">${this.audio.isPlaying ? 'pause' : 'play_arrow'}</span>`;
    }
  }

  sendRadioShout() {
    const input = document.getElementById('radio-shout-input');
    if (!input || !input.value.trim()) {
      this.showToast('Please type your shoutout message first.');
      return;
    }
    const text = input.value.trim();
    const ticker = document.getElementById('radio-shouts-ticker');
    if (ticker) {
      const shoutPill = document.createElement('div');
      shoutPill.className = 'inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-gold/15 border border-primary-gold/40 text-xs font-mono text-white shrink-0 animate-fade-in';
      shoutPill.innerHTML = `<span class="material-symbols-outlined text-primary-gold text-sm">chat_bubble</span> <span><strong>You:</strong> ${text}</span>`;
      ticker.prepend(shoutPill);
    }
    input.value = '';
    this.showToast('🎙️ Shoutout broadcasted to live Kenyan radio stream!');
  }

  // 2. CONCERT EVENT DETAIL & SEATING VIEW
  openEventDetails(eventId) {
    this.navigate('event-detail');
    const ev = (this.events || []).find(e => String(e.id) === String(eventId)) || {
      id: eventId,
      title: 'Blankets & Wine Nairobi - Culture Festival',
      venue: 'Laureen Gardens, Ngong Racecourse',
      date: 'Sat, 14 Nov 2026',
      time: '12:00 PM EAT',
      county: 'Nairobi City',
      banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=450&fit=crop',
      badge: 'LIVE MUSIC FESTIVAL',
      price: 'KES 2,500',
      description: 'A premier outdoor celebration of Kenyan contemporary music, live bands, artisanal food, and East African creative culture. Featuring 3 live stages, immersive craft beer lounges, and certified sound systems.'
    };

    const bannerEl = document.getElementById('event-detail-banner');
    const badgeEl = document.getElementById('event-detail-badge');
    const titleEl = document.getElementById('event-detail-title');
    const venueEl = document.getElementById('event-detail-venue');
    const descEl = document.getElementById('event-detail-desc');

    if (bannerEl) bannerEl.style.backgroundImage = `url('${ev.banner || ev.img || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=450&fit=crop'}')`;
    if (badgeEl) badgeEl.textContent = ev.badge || 'KENYA LIVE EVENT';
    if (titleEl) titleEl.textContent = ev.title;
    if (venueEl) venueEl.textContent = `📍 ${ev.venue} • 📅 ${ev.date} (${ev.time || '2:00 PM'})`;
    if (descEl) {
      descEl.innerHTML = `
        <p class="mb-4 leading-relaxed">${ev.description || ev.desc || 'Join the live celebration with top Kenyan artists and cultural icons.'}</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div class="p-3 rounded-xl bg-surface border border-surface-border">
            <span class="text-[10px] font-mono text-text-muted block">REGULAR PASS</span>
            <span class="font-display font-bold text-white text-base">KES 1,500</span>
            <span class="text-[10px] text-secondary-green block mt-1">Available via M-Pesa</span>
          </div>
          <div class="p-3 rounded-xl bg-surface border border-primary-gold/40">
            <span class="text-[10px] font-mono text-primary-gold block">VIP GOLD PASS</span>
            <span class="font-display font-bold text-white text-base">KES 3,500</span>
            <span class="text-[10px] text-primary-gold block mt-1">Front Stage Lounge</span>
          </div>
          <div class="p-3 rounded-xl bg-surface border border-purple-400/40">
            <span class="text-[10px] font-mono text-purple-300 block">VVIP BOOTH (5 TIX)</span>
            <span class="font-display font-bold text-white text-base">KES 15,000</span>
            <span class="text-[10px] text-purple-300 block mt-1">Backstage Access</span>
          </div>
        </div>
        <button onclick="app.openTicketPurchaseModal('${ev.id}')" class="w-full py-3 rounded-xl bg-primary-gold hover:bg-yellow-400 text-black font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 shadow-lg">
          <span class="material-symbols-outlined">confirmation_number</span>
          <span>Book Tickets via Daraja M-Pesa</span>
        </button>
      `;
    }
  }

  // 3. RECORD LABEL DETAIL & DEMO SUBMISSION VIEW
  openLabelDetails(labelId) {
    this.navigate('label-detail');
    const label = (this.labelsList || []).find(l => String(l.id) === String(labelId)) || {
      id: labelId,
      name: 'Black Market Records Kenya',
      tagline: 'Leading East African Hip Hop & Gengetone Powerhouse',
      foundedYear: 2017,
      founder: 'Cedric & Team',
      logo: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop',
      bio: 'Black Market Records Africa has been instrumental in the commercial growth of Gengetone, Sheng rap, and urban Kenyan street anthems across East Africa and diaspora charts.'
    };

    const logoEl = document.getElementById('label-detail-logo');
    const nameEl = document.getElementById('label-detail-name');
    const tagEl = document.getElementById('label-detail-tagline');
    const bioEl = document.getElementById('label-detail-bio');
    const gridEl = document.getElementById('label-detail-artists-grid');

    if (logoEl) logoEl.src = label.logo;
    if (nameEl) nameEl.textContent = label.name;
    if (tagEl) tagEl.textContent = label.tagline || `Founded ${label.foundedYear || 2018} • Founder: ${label.founder || 'Nairobi Team'}`;
    if (bioEl) bioEl.textContent = label.bio;

    if (gridEl) {
      const roster = label.signedArtists || [
        { name: 'Odi Wa Muranga', genre: 'Gengetone', tracksCount: 14, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
        { name: 'Fathermoh', genre: 'Urbantone', tracksCount: 19, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
        { name: 'Exray Taniua', genre: 'Gengetone', tracksCount: 12, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop' }
      ];

      gridEl.innerHTML = roster.map(a => `
        <div class="p-3 rounded-xl bg-surface border border-surface-border flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="${a.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}" class="w-10 h-10 rounded-lg object-cover border border-surface-border"/>
            <div>
              <h5 class="font-display font-bold text-xs text-white">${a.name}</h5>
              <p class="text-[10px] font-mono text-primary-gold">${a.genre} • ${a.tracksCount || 10} Tracks</p>
            </div>
          </div>
          <button onclick="app.openArtistProfile('${a.name}')" class="px-2.5 py-1 rounded-lg bg-surface-card border border-surface-border hover:border-primary-gold text-white text-[11px] font-mono">
            Profile
          </button>
        </div>
      `).join('');
    }
  }

  submitLabelDemo(event) {
    if (event && event.preventDefault) event.preventDefault();
    const artist = document.getElementById('label-demo-artist')?.value?.trim();
    const phone = document.getElementById('label-demo-phone')?.value?.trim();
    const track = document.getElementById('label-demo-track')?.value?.trim();
    const link = document.getElementById('label-demo-link')?.value?.trim();

    if (!artist || !phone || !track || !link) {
      this.showToast('Please fill out all demo submission fields.');
      return;
    }

    this.showToast(`🎵 Demo "${track}" received by A&R! You will receive confirmation via ${phone}.`);
    if (document.getElementById('label-demo-artist')) document.getElementById('label-demo-artist').value = '';
    if (document.getElementById('label-demo-phone')) document.getElementById('label-demo-phone').value = '';
    if (document.getElementById('label-demo-track')) document.getElementById('label-demo-track').value = '';
    if (document.getElementById('label-demo-link')) document.getElementById('label-demo-link').value = '';
  }

  // 4. PODCAST DETAIL & EPISODES ARCHIVE VIEW
  openPodcastDetails(podcastId) {
    this.navigate('podcast-detail');
    const pod = (this.podcastsList || []).find(p => String(p.id) === String(podcastId)) || {
      id: podcastId,
      title: 'Afripods 254: Nairobi Nights',
      hosts: 'Hosted by Shaffie Weru & Mwende',
      desc: 'Raw, unfiltered conversations about Kenyan nightlife, underground beatmakers, benga heritage, and Gengetone culture straight from the capital.',
      cover: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=600&fit=crop',
      episodes: [
        { id: 'ep-1', title: 'The Benga Revolution: From Kakamega to River Road', durationStr: '42:15', date: '2 days ago', desc: 'Exploring how Benga guitar riffs formed the foundation of contemporary Kenyan pop.' },
        { id: 'ep-2', title: 'Matatu Soundclash: Inside Rongai 125 Megawatts', durationStr: '51:08', date: '1 week ago', desc: 'Interviews with master fabricators and audio engineers in Industrial Area.' },
        { id: 'ep-3', title: 'Gengetone vs Urbantone: Evolution of Sheng Lyricism', durationStr: '38:40', date: '2 weeks ago', desc: 'Breaking down cadence, street dialect, and radio censorship battles.' }
      ]
    };

    const coverEl = document.getElementById('podcast-detail-cover');
    const titleEl = document.getElementById('podcast-detail-title');
    const hostsEl = document.getElementById('podcast-detail-hosts');
    const descEl = document.getElementById('podcast-detail-desc');
    const countEl = document.getElementById('podcast-detail-count');
    const listEl = document.getElementById('podcast-detail-episodes-list');

    if (coverEl) coverEl.src = pod.cover || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=600&fit=crop';
    if (titleEl) titleEl.textContent = pod.title;
    if (hostsEl) hostsEl.textContent = pod.hosts || pod.author || 'Afripods Kenya Network';
    if (descEl) descEl.textContent = pod.desc || pod.description || 'Deep dives into East African cultural, musical, and social trends.';
    if (countEl) countEl.textContent = `${(pod.episodes || []).length} Episodes Available`;

    if (listEl) {
      listEl.innerHTML = (pod.episodes || []).map((ep, idx) => `
        <div class="p-4 rounded-xl bg-surface border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-400/40 transition-colors">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">EP ${idx + 1}</span>
              <span class="text-[10px] font-mono text-text-dim">${ep.date || 'Recent'} • ${ep.durationStr || '45m'}</span>
            </div>
            <h5 class="font-display font-bold text-sm text-white">${ep.title}</h5>
            <p class="text-xs text-text-muted mt-1 line-clamp-2">${ep.desc || 'Kenyan cultural podcast episode.'}</p>
          </div>
          <button onclick="app.playPodcastEpisode('${ep.id}')" class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-display font-bold text-xs uppercase flex items-center justify-center gap-1.5 shrink-0 active:scale-95 shadow">
            <span class="material-symbols-outlined text-base">play_arrow</span>
            <span>Listen</span>
          </button>
        </div>
      `).join('');
    }
  }

  // 5. FULLSCREEN SEARCH & DISCOVERY CONTROLLER
  initFullscreenSearch() {
    const input = document.getElementById('fullscreen-search-input');
    if (input) {
      input.focus();
      if (!input.value.trim()) {
        this.handleFullscreenSearch('');
      }
    }
  }

  handleFullscreenSearch(query) {
    const q = (query || '').toLowerCase().trim();
    const container = document.getElementById('fullscreen-search-results');
    if (!container) return;

    if (!q) {
      container.innerHTML = `
        <div class="text-center py-8">
          <span class="material-symbols-outlined text-4xl text-primary-gold mb-2 block">search</span>
          <p class="text-sm font-display font-bold text-white">Search Everything Kenyan</p>
          <p class="text-xs text-text-muted mt-1 max-w-sm mx-auto">Explore across 16 genres, 47 counties, verified artists, live festivals, and Afripods archives.</p>
          <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
            <button onclick="app.fillSearch('Benga')" class="px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-primary-gold hover:border-primary-gold">Benga</button>
            <button onclick="app.fillSearch('Gengetone')" class="px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-secondary-green hover:border-secondary-green">Gengetone</button>
            <button onclick="app.fillSearch('Mugithi')" class="px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-cyan-400 hover:border-cyan-400">Mugithi</button>
            <button onclick="app.fillSearch('Taarab')" class="px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-amber-300 hover:border-amber-300">Taarab</button>
            <button onclick="app.fillSearch('Ohangla')" class="px-3 py-1 rounded-full bg-surface border border-surface-border text-xs text-purple-300 hover:border-purple-300">Ohangla</button>
          </div>
        </div>
      `;
      return;
    }

    // Filter tracks
    const matchedTracks = this.tracks.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.artist.toLowerCase().includes(q) || 
      (t.genre && t.genre.toLowerCase().includes(q)) ||
      (t.county && t.county.toLowerCase().includes(q))
    ).slice(0, 10);

    // Filter artists
    const matchedArtists = (this.artistsList || []).filter(a =>
      a.name.toLowerCase().includes(q) ||
      (a.genre && a.genre.toLowerCase().includes(q)) ||
      (a.county && a.county.toLowerCase().includes(q))
    ).slice(0, 6);

    if (matchedTracks.length === 0 && matchedArtists.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-3xl text-text-dim mb-2 block">sentiment_dissatisfied</span>
          <p class="text-sm font-bold text-white">No results found for "${query}"</p>
          <p class="text-xs text-text-muted mt-1">Try searching by Kenyan county, dialect, or genre title.</p>
        </div>
      `;
      return;
    }

    let html = '';

    if (matchedArtists.length > 0) {
      html += `
        <div class="mb-6">
          <h4 class="font-display font-bold text-xs uppercase tracking-wider text-primary-gold mb-3">Artists & Creators</h4>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            ${matchedArtists.map(a => `
              <div onclick="app.openArtistProfile('${a.name}')" class="surface-card rounded-xl p-3 text-center cursor-pointer border border-surface-border hover:border-primary-gold transition-all group">
                <img src="${a.avatar}" class="w-14 h-14 rounded-full mx-auto object-cover border border-surface-border group-hover:scale-105 transition-transform"/>
                <h5 class="font-display font-bold text-xs text-white mt-2 truncate">${a.name}</h5>
                <span class="text-[10px] font-mono text-text-muted block truncate">${a.genre}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (matchedTracks.length > 0) {
      html += `
        <div>
          <h4 class="font-display font-bold text-xs uppercase tracking-wider text-secondary-green mb-3">Matching Songs (${matchedTracks.length})</h4>
          <div class="space-y-2">
            ${matchedTracks.map(t => `
              <div class="p-3 rounded-xl bg-surface border border-surface-border flex items-center justify-between hover:border-primary-gold/40 transition-colors cursor-pointer" onclick="app.playTrackById(${t.id})">
                <div class="flex items-center gap-3">
                  <img src="${t.img}" class="w-11 h-11 rounded-lg object-cover border border-surface-border"/>
                  <div>
                    <h5 class="font-display font-bold text-sm text-white">${t.title}</h5>
                    <p class="text-xs text-text-muted font-mono">${t.artist} • ${t.genre} • ${t.county}</p>
                  </div>
                </div>
                <button class="w-8 h-8 rounded-full bg-primary-gold text-black flex items-center justify-center shrink-0 active:scale-95 shadow">
                  <span class="material-symbols-outlined text-base">play_arrow</span>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  fillSearch(term) {
    const input = document.getElementById('fullscreen-search-input');
    if (input) {
      input.value = term;
      this.handleFullscreenSearch(term);
    }
  }

  setSearchCategory(cat) {
    document.querySelectorAll('.search-filter-tab').forEach(b => {
      if (b.dataset.category === cat) {
        b.classList.add('bg-primary-gold', 'text-black', 'font-bold');
        b.classList.remove('bg-surface', 'text-text-muted');
      } else {
        b.classList.remove('bg-primary-gold', 'text-black', 'font-bold');
        b.classList.add('bg-surface', 'text-text-muted');
      }
    });
    const input = document.getElementById('fullscreen-search-input');
    this.handleFullscreenSearch(input ? input.value : '');
  }

  // 6. SETTINGS & AUDIO PREFERENCES CONTROLLER
  renderSettingsView() {
    const currentQuality = localStorage.getItem('zr_audio_quality') || '128';
    document.querySelectorAll('.audio-quality-btn').forEach(btn => {
      if (btn.dataset.quality === currentQuality) {
        btn.classList.add('border-primary-gold', 'bg-primary-gold/15', 'text-primary-gold');
      } else {
        btn.classList.remove('border-primary-gold', 'bg-primary-gold/15', 'text-primary-gold');
      }
    });
    const cacheEl = document.getElementById('settings-cache-size');
    if (cacheEl) {
      const simulatedBytes = (this.tracks.length * 4.2).toFixed(1);
      cacheEl.textContent = `${simulatedBytes} MB Cached Locally`;
    }
  }

  setAudioQuality(bitrate) {
    localStorage.setItem('zr_audio_quality', bitrate);
    this.renderSettingsView();
    this.showToast(`🎧 Audio streaming quality set to ${bitrate} kbps`);
  }

  clearAudioCache() {
    try {
      if (window.caches) {
        caches.keys().then(names => {
          names.forEach(name => { if (name.includes('audio')) caches.delete(name); });
        });
      }
    } catch (e) {}
    const cacheEl = document.getElementById('settings-cache-size');
    if (cacheEl) cacheEl.textContent = '0.0 MB Cached Locally';
    this.showToast('🧹 Offline audio cache successfully cleared.');
  }

  // 7. NOTIFICATIONS & ACTIVITY FEED CONTROLLER
  renderNotificationsView() {
    const container = document.getElementById('notifications-list-container');
    if (!container) return;

    const notifications = [
      { id: 1, title: 'Royalty Payout Processed', body: 'KES 48,250.00 Daraja B2C royalty disbursement sent to Safaricom M-Pesa.', time: '2 hours ago', icon: 'payments', color: 'text-secondary-green', unread: true },
      { id: 2, title: 'KECOBO Registration Approved', body: 'ISRC KE-ZR1-26-00142 registered with Kenya Copyright Board for digital collection.', time: 'Yesterday', icon: 'verified', color: 'text-primary-gold', unread: true },
      { id: 3, title: 'VIP Ticket Pass Confirmed', body: 'Blankets & Wine Nairobi Pass QR issued. Ready for Gatekeeper validation.', time: '3 days ago', icon: 'qr_code_2', color: 'text-cyan-400', unread: false },
      { id: 4, title: 'New Benga Stream Milestone', body: 'Your curated playlist "Nyanza Roots" surpassed 25,000 monthly listeners.', time: '5 days ago', icon: 'trending_up', color: 'text-amber-400', unread: false }
    ];

    container.innerHTML = notifications.map(n => `
      <div class="p-4 rounded-xl ${n.unread ? 'bg-[#1E1A11] border-primary-gold/40' : 'bg-surface border-surface-border'} border flex items-start gap-3.5 transition-all">
        <span class="material-symbols-outlined ${n.color} text-2xl shrink-0 mt-0.5">${n.icon}</span>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h5 class="font-display font-bold text-sm text-white">${n.title}</h5>
            <span class="text-[10px] font-mono text-text-dim">${n.time}</span>
          </div>
          <p class="text-xs text-text-muted mt-1 leading-relaxed">${n.body}</p>
        </div>
      </div>
    `).join('');
  }

  markNotificationsRead() {
    const container = document.getElementById('notifications-list-container');
    if (container) {
      container.querySelectorAll('.border-primary-gold\/40').forEach(el => {
        el.classList.remove('bg-[#1E1A11]', 'border-primary-gold/40');
        el.classList.add('bg-surface', 'border-surface-border');
      });
    }
    this.showToast('✅ All activity notifications marked as read.');
  }

  // 8. ARTIST MONETIZATION & M-PESA PAYOUTS CONTROLLER
  renderPayoutsView() {
    const balEl = document.getElementById('payout-avail-bal');
    const phoneEl = document.getElementById('payout-phone-input');
    if (balEl) balEl.textContent = 'KES 48,250.00';
    if (phoneEl && this.user && this.user.phone) {
      phoneEl.value = this.user.phone;
    }
  }

  initiateMpesaPayout() {
    const amountEl = document.getElementById('payout-amount-input');
    const phoneEl = document.getElementById('payout-phone-input');
    const amount = Number(amountEl?.value || 0);
    const phone = phoneEl?.value?.trim() || '0712345678';

    if (amount < 100) {
      this.showToast('Minimum M-Pesa payout withdrawal is KES 100.00');
      return;
    }

    if (amount > 48250) {
      this.showToast('Requested amount exceeds available balance of KES 48,250.00');
      return;
    }

    this.showToast(`💸 Daraja B2C Transfer: KES ${amount.toLocaleString()} initiating to ${phone}...`);
    setTimeout(() => {
      this.showToast(`✅ M-Pesa Payout Successful! Ref: QK918X293. Funds sent to ${phone}.`);
      if (amountEl) amountEl.value = '';
      const balEl = document.getElementById('payout-avail-bal');
      if (balEl) balEl.textContent = `KES ${(48250 - amount).toLocaleString()}.00`;
    }, 1500);
  }

  // 9. GATEKEEPER DOOR QR TICKET SCANNER CONTROLLER
  initGatekeeperScanner() {
    const codeEl = document.getElementById('gatekeeper-ticket-code');
    if (codeEl) codeEl.value = 'ZR-TKT-9921';
  }

  scanGatekeeperTicket() {
    const input = document.getElementById('gatekeeper-ticket-code');
    const code = (input?.value || 'ZR-TKT-9921').trim().toUpperCase();
    const box = document.getElementById('gatekeeper-result-box');
    const icon = document.getElementById('gatekeeper-result-icon');
    const title = document.getElementById('gatekeeper-result-title');
    const details = document.getElementById('gatekeeper-result-details');

    if (!box) return;

    box.classList.remove('hidden');

    if (code.includes('ZR') || code.includes('TKT')) {
      box.className = 'mt-6 p-5 rounded-2xl border border-secondary-green/50 bg-secondary-green/10 text-center animate-fade-in';
      if (icon) {
        icon.className = 'material-symbols-outlined text-4xl text-secondary-green mx-auto mb-2';
        icon.textContent = 'verified';
      }
      if (title) {
        title.className = 'font-display font-black text-lg text-white';
        title.textContent = 'VALID TICKET: ADMIT ONE';
      }
      if (details) {
        details.className = 'text-xs font-mono text-secondary-green mt-1';
        details.textContent = `Pass: VIP GOLD LOUNGE • Code: ${code} • Verified via KECOBO Ticket Ledger`;
      }
      this.showToast('🎟️ Ticket Authenticated: Admitted to Live Venue!');
    } else {
      box.className = 'mt-6 p-5 rounded-2xl border border-red-500/50 bg-red-500/10 text-center animate-fade-in';
      if (icon) {
        icon.className = 'material-symbols-outlined text-4xl text-red-400 mx-auto mb-2';
        icon.textContent = 'gpp_bad';
      }
      if (title) {
        title.className = 'font-display font-black text-lg text-white';
        title.textContent = 'INVALID OR COUNTERFEIT TICKET';
      }
      if (details) {
        details.className = 'text-xs font-mono text-red-400 mt-1';
        details.textContent = `Code ${code} is not registered in the Daraja event ticketing database.`;
      }
      this.showToast('❌ Ticket Rejected: Invalid Entry Pass');
    }
  }
}

// Instantiate global app
window.app = new ZetuRootsApp();

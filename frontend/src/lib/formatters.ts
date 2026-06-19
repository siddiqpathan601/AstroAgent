// ── Degree Formatting ─────────────────────────────────────────────────────────
export function formatDegree(deg: number): string {
  const degrees = Math.floor(deg);
  const minutes = Math.round((deg - degrees) * 60);
  return `${degrees}°${minutes.toString().padStart(2, '0')}'`;
}

// ── Date Formatting ───────────────────────────────────────────────────────────
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatRelativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = now - then;
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 1)  return 'just now';
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days  < 7)  return `${days}d ago`;
  return formatShortDate(iso);
}

// ── Planet Name Formatting ────────────────────────────────────────────────────
export function capitalizePlanet(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// ── Sign Name ─────────────────────────────────────────────────────────────────
export function getSignShort(sign: string): string {
  const shorts: Record<string, string> = {
    Aries: 'Ari', Taurus: 'Tau', Gemini: 'Gem', Cancer: 'Can',
    Leo: 'Leo', Virgo: 'Vir', Libra: 'Lib', Scorpio: 'Sco',
    Sagittarius: 'Sag', Capricorn: 'Cap', Aquarius: 'Aqu', Pisces: 'Pis',
  };
  return shorts[sign] || sign.slice(0, 3);
}

// ── Greeting ──────────────────────────────────────────────────────────────────
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5)  return 'Good night';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

// ── Truncate ──────────────────────────────────────────────────────────────────
export function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len - 1) + '…' : str;
}

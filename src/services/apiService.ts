const BASE = import.meta.env.VITE_API_URL + '/v1';

const get = async (path: string) => {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

// ── Types ────────────────────────────────────────────────────────────────────

export interface Devotional {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  scripture_reference: string[];
  verse_text: string;
  excerpt: string;
  message: string;
  prayer: string;
  featured_image: string | null;
  views: number;
}

export interface Sermon {
  id: number;
  title: string;
  speaker: string;
  scripture_reference: string;
  description: string;
  youtube_url: string;
  youtube_video_id: string;
  embed_url: string;
  thumbnail: string;
  date: string;
  series: string | null;
  is_featured: boolean;
}

export interface ChurchEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  end_date: string | null;
  time: string | null;
  location: string;
  category: string | null;
  theme: string | null; 
  registration_url: string | null;
  is_featured: boolean;
  image: string | null;
}

export interface Ministry {
  id: number;
  name: string;
  slug: string;
  description: string;
  leader: string | null;
  email: string | null;
  meeting_time: string | null;
  icon: string | null;
  image: string | null;
}

export interface DailyVerse {
  id: number;
  verse_text: string;
  reference: string;
  translation: string;
  date: string | null;
  theme_color: string | null;
  background_image: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string | null;
  sort_order: number;
}

// ── API Functions ─────────────────────────────────────────────────────────────

export const getDailyVerse = (): Promise<{ data: DailyVerse }> =>
  get('/daily-verse');

export const getDevotionals = (page = 1): Promise<PaginatedResponse<Devotional>> =>
  get(`/devotionals?page=${page}`);

export const getTodayDevotional = (): Promise<{ data: Devotional }> =>
  get('/devotionals/today');

export const getDevotionalBySlug = (slug: string): Promise<{ data: Devotional }> =>
  get(`/devotionals/${slug}`);

export const getSermons = (page = 1): Promise<PaginatedResponse<Sermon>> =>
  get(`/sermons?page=${page}`);

export const getFeaturedSermons = (): Promise<{ data: Sermon[] }> =>
  get('/sermons/featured');

export const getSermonById = (id: number): Promise<{ data: Sermon }> =>
  get(`/sermons/${id}`);

export const getEvents = (): Promise<PaginatedResponse<ChurchEvent>> =>
  get('/events');

export const getMinistries = (): Promise<{ data: Ministry[] }> =>
  get('/ministries');

export const getEventById = (id: number): Promise<{ data: ChurchEvent }> =>
  get(`/events/${id}`);

export const getMinistryBySlug = (slug: string): Promise<{ data: Ministry }> =>
  get(`/ministries/${slug}`);

export const getTeamMembers = (): Promise<{ data: TeamMember[] }> =>
  get('/team');

export const submitContactForm = (data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ message: string }> =>
  fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) return res.json().then((err) => Promise.reject(err));
    return res.json();
  });
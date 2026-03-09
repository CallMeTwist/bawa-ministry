// Central API service — configure base URL to your Laravel backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-laravel-api.com/api";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Types
export interface DailyVerse {
  verse: string;
  reference: string;
  image_url?: string;
}

export interface Devotional {
  id: number;
  slug: string;
  title: string;
  scripture_reference: string;
  verse_text: string;
  message: string;
  prayer: string;
  author: string;
  date: string;
  excerpt: string;
  image_url?: string;
}

export interface Sermon {
  id: number;
  title: string;
  speaker: string;
  scripture_reference: string;
  date: string;
  video_url: string;
  thumbnail_url?: string;
}

export interface ChurchEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
}

export interface Ministry {
  id: number;
  name: string;
  description: string;
  image_url: string;
  slug: string;
}

// API functions
export const getDailyVerse = () => fetchApi<DailyVerse>("/daily-verse");
export const getDevotionals = () => fetchApi<Devotional[]>("/devotionals");
export const getDevotionalBySlug = (slug: string) => fetchApi<Devotional>(`/devotionals/${slug}`);
export const getSermons = () => fetchApi<Sermon[]>("/sermons");
export const getEvents = () => fetchApi<ChurchEvent[]>("/events");
export const getMinistries = () => fetchApi<Ministry[]>("/ministries");

// Mock data for development
export const mockDailyVerse: DailyVerse = {
  verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
  reference: "Jeremiah 29:11",
};

export const mockDevotionals: Devotional[] = [
  {
    id: 1, slug: "walking-in-faith", title: "Walking in Faith", scripture_reference: "Hebrews 11:1",
    verse_text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    message: "Faith is not just a feeling — it is a decision to trust God even when we cannot see the full picture. Every step we take in faith brings us closer to God's purpose for our lives. When the road is unclear, faith becomes the light that guides our path. Today, let us choose to walk boldly in the direction God is leading us, trusting that His plans are greater than our understanding.\n\nConsider Abraham, who left everything familiar because God called him to a new land. He didn't have GPS or a detailed map. He had a promise. And that promise was enough. In the same way, God's promises to us are sufficient for every journey we undertake.",
    prayer: "Lord, strengthen our faith today. Help us to trust You completely, even when the path ahead is unclear. Give us courage to step forward knowing You are with us. Amen.",
    author: "Pastor James", date: "2026-03-06", excerpt: "Faith is not just a feeling — it is a decision to trust God even when we cannot see the full picture."
  },
  {
    id: 2, slug: "gods-unfailing-love", title: "God's Unfailing Love", scripture_reference: "Romans 8:38-39",
    verse_text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God.",
    message: "Nothing in this world or beyond can separate us from God's love. In times of struggle, doubt, or pain, His love remains constant and unwavering. Let this truth be the anchor of your soul today.",
    prayer: "Heavenly Father, thank You for Your unfailing love. Help us to rest in the assurance that nothing can separate us from You. Amen.",
    author: "Sister Grace", date: "2026-03-05", excerpt: "Nothing in this world or beyond can separate us from God's love."
  },
  {
    id: 3, slug: "strength-in-weakness", title: "Strength in Weakness", scripture_reference: "2 Corinthians 12:9",
    verse_text: "My grace is sufficient for you, for my power is made perfect in weakness.",
    message: "Our weaknesses are not liabilities — they are opportunities for God's strength to shine through. When we acknowledge our limitations, we open the door for God to work mightily in our lives.",
    prayer: "God, we surrender our weaknesses to You. Use them for Your glory and let Your power be made perfect in our lives. Amen.",
    author: "Pastor James", date: "2026-03-04", excerpt: "Our weaknesses are not liabilities — they are opportunities for God's strength to shine through."
  },
];

export const mockSermons: Sermon[] = [
  { id: 1, title: "The Power of Prayer", speaker: "Pastor James", scripture_reference: "Philippians 4:6-7", date: "2026-03-02", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, title: "Living with Purpose", speaker: "Pastor James", scripture_reference: "Ephesians 2:10", date: "2026-02-23", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 3, title: "Grace Abounds", speaker: "Sister Grace", scripture_reference: "Ephesians 2:8-9", date: "2026-02-16", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 4, title: "Finding Rest in God", speaker: "Pastor James", scripture_reference: "Matthew 11:28-30", date: "2026-02-09", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

export const mockEvents: ChurchEvent[] = [
  { id: 1, title: "Easter Sunday Service", description: "Join us for a special Easter celebration with worship, communion, and a message of hope.", date: "2026-04-05", location: "Main Sanctuary" },
  { id: 2, title: "Youth Conference 2026", description: "A weekend of worship, teaching, and fellowship for young people ages 13-25.", date: "2026-04-18", location: "Fellowship Hall" },
  { id: 3, title: "Community Outreach Day", description: "Serve our local community through various outreach projects and activities.", date: "2026-04-25", location: "Church Campus & Community" },
  { id: 4, title: "Women's Prayer Breakfast", description: "A morning of prayer, worship, and fellowship for women of all ages.", date: "2026-05-03", location: "Fellowship Hall" },
];

export const mockMinistries: Ministry[] = [
  { id: 1, name: "Youth Ministry", description: "Empowering the next generation through worship, discipleship, and community.", image_url: "", slug: "youth" },
  { id: 2, name: "Prayer Ministry", description: "Dedicated to lifting up our church, community, and world through intercessory prayer.", image_url: "", slug: "prayer" },
  { id: 3, name: "Outreach Ministry", description: "Reaching our community and beyond with the love of Christ through service and evangelism.", image_url: "", slug: "outreach" },
  { id: 4, name: "Bible Study Groups", description: "Deep dive into God's Word through small group studies and discussions.", image_url: "", slug: "bible-study" },
];

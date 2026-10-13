// Fallback images and path helpers.
//
// Convention used across the whole project: every image lives in
// frontend/public/images/ and is referenced as "/images/...". The database
// stores only that relative path, never a full URL, so the API host can change
// without touching any data.

export const PLACEHOLDER = '/images/placeholder.svg'

export const REAL_EVENT_IMAGES = {
  weddingCeremony: '/images/real-events/indian-wedding-ceremony.jpg',
  weddingCouple: '/images/real-events/indian-wedding-couple.jpg',
  receptionDecor: '/images/real-events/indian-reception-stage.jpg',
  sangeet: '/images/real-events/indian-sangeet.jpg',
  photography: '/images/real-events/event-photography.jpg',
  corporateEvent: '/images/real-events/indian-corporate-event.jpg',
  conferenceRoom: '/images/real-events/mumbai-conference-room.jpg',
  birthdayEvents: '/images/real-events/indian-birthday-family.jpg',
  concertCrowd: '/images/real-events/indian-concert-crowd.jpg',
  concertLights: '/images/real-events/indian-concert-lights.jpg',
  comedyPerformance: '/images/real-events/indian-comedy-stage.jpg',
}

const LEGACY_MAP = {
  'wedding-grand': REAL_EVENT_IMAGES.weddingCeremony,
  'wedding-beach': REAL_EVENT_IMAGES.weddingCouple,
  'wedding-sangeet': REAL_EVENT_IMAGES.sangeet,
  'photo-video': REAL_EVENT_IMAGES.photography,
  'corporate-summit': REAL_EVENT_IMAGES.conferenceRoom,
  'corporate-kickoff': REAL_EVENT_IMAGES.corporateEvent,
  'birthday-50th': REAL_EVENT_IMAGES.birthdayEvents,
  'birthday-garden': REAL_EVENT_IMAGES.birthdayEvents,
  'concert-festival': REAL_EVENT_IMAGES.concertCrowd,
  'concert-comedy': REAL_EVENT_IMAGES.comedyPerformance,
}

/**
 * Normalise whatever the API returned into a URL the browser can load.
 *
 *   'https://images.unsplash.com/...' -> absolute external URL, used as-is
 *   '/images/real-events/x.jpg'       -> served from frontend/public/
 *   'x.svg'                           -> bare filename, resolved under /images/
 *   null / undefined / ''             -> the local placeholder
 *
 * @param {string} [src] Image path or URL from the database
 * @returns {string} A URL the browser can load
 */
export function resolveImageUrl(src) {
  if (!src) return PLACEHOLDER

  if (/^https?:\/\//i.test(src)) return src

  for (const [key, mapped] of Object.entries(LEGACY_MAP)) {
    if (src.includes(key)) {
      return mapped
    }
  }

  if (src.startsWith('/')) return src

  return `/images/${src}`
}
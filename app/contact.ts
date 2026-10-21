export const EMAIL = "s00laimang@icloud.com";

// Paste the Cal.com (or Calendly) event link here, e.g.
// "https://cal.com/s00laimang/intro". Every "Book a call" button reads from
// this; while it's empty they open an email instead.
export const BOOKING_URL = "https://cal.com/s00laimang/30min";

// spread onto an <a>: opens the booking page in a new tab, or falls back to email
export const bookCall = BOOKING_URL
  ? { href: BOOKING_URL, target: "_blank", rel: "noopener noreferrer" }
  : { href: `mailto:${EMAIL}?subject=${encodeURIComponent("Book a call")}` };

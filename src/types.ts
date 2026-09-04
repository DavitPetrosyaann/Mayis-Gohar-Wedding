export interface TimelineItem {
  id: string;
  time: string;
  titleHy: string;
  titleEn: string;
  locationName: string;
  address: string;
  description?: string;
  mapUrl: string;
  icon: 'groom' | 'bride' | 'church' | 'hall' | 'cake';
  highlight?: boolean;
}

export interface RSVPFormData {
  guestName: string;
  attendance: 'attending' | 'not_attending';
  guestsCount: number;
  phone: string;
  dietaryOrNote: string;
  musicWish?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  title?: string;
  caption?: string;
  span?: string;
  location?: string;
}

export interface ScratchCardItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  revealedTitle: string;
  revealedMessage: string;
  badge: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

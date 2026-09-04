import { TimelineItem, GalleryPhoto, ScratchCardItem } from '../types';

export const WEDDING_COUPLE = {
  groom: 'Մայիս',
  bride: 'Գոհար',
  groomEn: 'Mayis',
  brideEn: 'Gohar',
  dateFormatted: '03.10.2026',
  fullDateHy: 'Շաբաթ, 3 Հոկտեմբերի, 2026',
  fullDateEn: 'Saturday, October 3, 2026',
  // October 3, 2026 at 15:00 (Church ceremony)
  targetDateISO: '2026-10-03T15:00:00+04:00',
  hashtag: '#MayisAndGohar2026',
  primaryPhone: '+374 91 000000',
  welcomeQuote: '«Սերը կյանքի ամենագեղեցիկ ճամփորդությունն է: Սիրով և մեծ ուրախությամբ հրավիրում ենք Ձեզ կիսելու մեզ հետ մեր կյանքի ամենահիշարժան և լուսավոր օրը»',
  closingNote: 'Սիրով կսպասենք Ձեզ',
};

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'groom-home',
    time: '11:00',
    titleHy: 'Փեսայի տուն',
    titleEn: "Groom's Home",
    locationName: 'Փեսայի հայրական տուն',
    address: 'ք. Երևան Շերամի 3/1 տուն',
    mapUrl: 'https://maps.google.com/?q=Sherami+St+3/1,+Yerevan,+Armenia',
    icon: 'groom',
  },
  {
    id: 'bride-home',
    time: '13:00',
    titleHy: 'Հարսի տուն',
    titleEn: "Bride's Home",
    locationName: 'Հարսի տուն',
    address: 'ք.Աբովյան 3-րդ միկրոշրջան 19 շենք',
    mapUrl: 'https://maps.google.com/?q=3rd+Microdistrict+19,+Abovyan,+Armenia',
    icon: 'bride',
  },
  {
    id: 'church',
    time: '15:00',
    titleHy: 'Եկեղեցի',
    titleEn: 'Church',
    locationName: 'Սուրբ Հովհաննես Մկրտիչ եկեղեցի(Աբովյան)',
    address: '',
    mapUrl: 'https://maps.google.com/?q=Saint+John+the+Baptist+Church,+Abovyan,+Armenia',
    icon: 'church',
    highlight: true,
  },
  {
    id: 'hall',
    time: '17:30',
    titleHy: 'Հարսանյաց սրահ',
    titleEn: 'Banquet Celebration',
    locationName: 'Աղաբաբյանս Մեծ Դահլիճ',
    address: '',
    mapUrl: 'https://maps.google.com/?q=Aghababyans+Restaurant,+Nazarbekyan+St+25/5,+Yerevan',
    icon: 'hall',
    highlight: true,
  },
];

export const SCRATCH_CARDS: ScratchCardItem[] = [
  {
    id: 'scratch-1',
    title: 'Գաղտնի Վայր',
    subtitle: '',
    icon: '🏰',
    badge: 'Հանդիսություն',
    revealedTitle: 'Բացօթյա Լյուքս Տարածք',
    revealedMessage: 'Հարսանեկան սրահում Ձեզ սպասում է ծաղկազարդ բացօթյա կոկտեյլ գոտի և ռոմանտիկ լուսավորություն:',
  },
  {
    id: 'scratch-2',
    title: 'Երաժշտական Անակնկալ',
    subtitle: '',
    icon: '🎷',
    badge: 'Live Band',
    revealedTitle: 'Կենդանի Ջազ & Ժամանակակից Հիթեր',
    revealedMessage: 'Երեկոն կուղեկցվի սիրված երգիչների և կենդանի նվագախմբի կատարումներով:',
  },
  {
    id: 'scratch-3',
    title: 'Դրես-կոդի Գաղտնիքը',
    subtitle: '',
    icon: '✨',
    badge: 'Dress Code',
    revealedTitle: 'Black Tie & Royal Armenian Chic',
    revealedMessage: 'Նախընտրելի երանգներ՝ Շամպայն, Փղոսկր (Ivory), Շքեղ Արծաթափայլ, Տեռակոտա և Դասական Սև:',
  },
  {
    id: 'scratch-4',
    title: 'Զույգի Խոսքը',
    subtitle: '',
    icon: '💌',
    badge: 'Մեծ Սիրով',
    revealedTitle: 'Մեր Մեծագույն Ուրախությունը',
    revealedMessage: '«Դուք մեր ամենասիրելի մարդիկ եք: Ձեր ժպիտներն ու ներկայությունը մեր օրվա ամենաթանկ նվերն են»:',
  },
];

export const CAROUSEL_PHOTOS: GalleryPhoto[] = [
  {
    id: 'carousel-1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    alt: 'Romantic wedding couple holding hands',
  },
  {
    id: 'carousel-2',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop',
    alt: 'Bride and groom walking in a golden sunset garden',
  },
  {
    id: 'carousel-3',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop',
    alt: 'Luxury wedding ring box with florals and champagne tone',
  },
  {
    id: 'carousel-4',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop',
    alt: 'Tender wedding embrace with veil blowing in the wind',
  },
  {
    id: 'carousel-5',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop',
    alt: 'Bride holding elegant floral bouquet in champagne sunlight',
  },
];

export const MASONRY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'masonry-1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
    alt: 'Couple tender portrait',
    span: 'row-span-2',
  },
  {
    id: 'masonry-2',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1000&auto=format&fit=crop',
    alt: 'Wedding rings detail',
    span: 'row-span-1',
  },
  {
    id: 'masonry-3',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
    alt: 'Groom and bride sunset walk',
    span: 'row-span-2',
  },
  {
    id: 'masonry-4',
    url: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=1000&auto=format&fit=crop',
    alt: 'Wedding table and candles aesthetic',
    span: 'row-span-1',
  },
  {
    id: 'masonry-5',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop',
    alt: 'Bride lace dress detail',
    span: 'row-span-1',
  },
  {
    id: 'masonry-6',
    url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1000&auto=format&fit=crop',
    alt: 'Joyful moment of bride and groom laughing',
    span: 'row-span-2',
  },
  {
    id: 'masonry-7',
    url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=1000&auto=format&fit=crop',
    alt: 'Bouquet of peonies and roses',
    span: 'row-span-1',
  },
  {
    id: 'masonry-8',
    url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1000&auto=format&fit=crop',
    alt: 'Bride and groom silhouette at evening',
    span: 'row-span-1',
  },
];

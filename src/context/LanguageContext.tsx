import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'hy' | 'en' | 'ru' | 'ka' | 'ar';

export interface Translations {
  nav: {
    envelope: string;
    story: string;
    calendar: string;
    secrets: string;
    photos: string;
    timeline: string;
    rsvp: string;
  };
  envelope: {
    badge: string;
    titleClosed: string;
    titleOpened: string;
    subtitleClosed: string;
    subtitleOpened: string;
    btnOpen: string;
    btnViewSchedule: string;
    btnReplay: string;
    tapSeal: string;
    weddingInvitation: string;
    churchAndHall: string;
    openingStep1: string;
    openingStep2: string;
    openingStep3: string;
  };
  hero: {
    saveTheDate: string;
    and: string;
    weAreGettingMarried: string;
    daysLeft: string;
    hoursLeft: string;
    minutesLeft: string;
    secondsLeft: string;
    btnRsvp: string;
    btnDetails: string;
  };
  story: {
    badge: string;
    title: string;
    quote: string;
    p1: string;
    p2: string;
    groomRole: string;
    brideRole: string;
  };
  calendar: {
    badge: string;
    title: string;
    subtitle: string;
    monthYear: string;
    addToCalendar: string;
    days: string[];
    daysShort: string[];
    countdownTitle: string;
    daysLabel: string;
    hoursLabel: string;
    minutesLabel: string;
    secondsLabel: string;
  };
  scratch: {
    badge: string;
    title: string;
    subtitle: string;
    scratchToReveal: string;
    revealedBadge: string;
    resetCards: string;
    cards: {
      id: string;
      title: string;
      subtitle: string;
      badge: string;
      revealedTitle: string;
      revealedMessage: string;
    }[];
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    uploadBtn: string;
    uploadTooltip: string;
    resetPhotos: string;
    next: string;
    prev: string;
    close: string;
    dropText: string;
  };
  timeline: {
    badge: string;
    title: string;
    subtitle: string;
    viewOnMap: string;
    items: {
      id: string;
      time: string;
      title: string;
      locationName: string;
      address: string;
      description: string;
      mapUrl: string;
    }[];
  };
  rsvp: {
    badge: string;
    title: string;
    subtitle: string;
    attendanceLabel: string;
    attendingYes: string;
    attendingYesSub: string;
    attendingNo: string;
    attendingNoSub: string;
    guestNameLabel: string;
    guestNamePlaceholder: string;
    guestCountLabel: string;
    guestCountPlaceholder: string;
    guestCountHelp: string;
    dietaryLabel: string;
    dietaryPlaceholder: string;
    musicLabel: string;
    musicPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    thankYouTitle: string;
    thankYouAttending: string;
    thankYouNotAttending: string;
    editRsvp: string;
    nameRequired: string;
    countRequired: string;
    maxCountError: string;
  };
  music: {
    play: string;
    pause: string;
    melody: string;
  };
}

const translationsData: Record<Language, Translations> = {
  hy: {
    nav: {
      envelope: 'Ծրար',
      story: 'Պատմություն',
      calendar: 'Օրացույց',
      secrets: 'Անակնկալներ',
      photos: 'Ֆոտոշարք',
      timeline: 'Ծրագիր',
      rsvp: 'RSVP',
    },
    envelope: {
      badge: 'Հարսանեկան Բացառիկ Հրավեր',
      titleClosed: 'Սեղմեք Կնիքին՝ Ծրարը Բացելու Համար',
      titleOpened: 'Հրավիրատոմսը Բացված Է',
      subtitleClosed: 'Մայիս & Գոհար • Շաբաթ, 03 Հոկտեմբերի 2026',
      subtitleOpened: 'Սիրով հրավիրում ենք Ձեզ կիսելու մեր կյանքի լուսավոր և անմոռանալի օրը',
      btnOpen: 'Բացել Հրավիրատոմսը',
      btnViewSchedule: 'Դիտել Օրվա Ծրագիրը',
      btnReplay: 'Կրկին Ծրարել',
      tapSeal: 'Սեղմեք Կնիքին',
      weddingInvitation: 'Հարսանյաց Հրավեր',
      churchAndHall: 'Սուրբ Գայանե Եկեղեցի • Florence Restaurant',
      openingStep1: 'Կնիքի հալեցում և բացում...',
      openingStep2: 'Ծրարի շքեղ բացում...',
      openingStep3: 'Հրավիրատոմսի մատուցում...',
    },
    hero: {
      saveTheDate: 'Պահպանեք Օրը • 03.10.2026',
      and: 'և',
      weAreGettingMarried: 'Մենք ամուսնանում ենք',
      daysLeft: 'Օր',
      hoursLeft: 'Ժամ',
      minutesLeft: 'Ռոպե',
      secondsLeft: 'Վայրկյան',
      btnRsvp: 'Հաստատել (RSVP)',
      btnDetails: 'Իմանալ Ավելին',
    },
    story: {
      badge: 'Մեր Սիրո Պատմությունը',
      title: 'Երկու Սիրտ, Մեկ Ճանապարհ',
      quote: '«Սերը կյանքի ամենագեղեցիկ ճամփորդությունն է: Սիրով և մեծ ուրախությամբ հրավիրում ենք Ձեզ կիսելու մեզ հետ մեր կյանքի ամենահիշարժան և լուսավոր օրը»',
      p1: 'Մեր պատմությունը սկսվեց մի գեղեցիկ աշնանային օր, երբ մեր ճանապարհները հատվեցին: Այդ օրվանից սկսած՝ յուրաքանչյուր ակնթարթ լցվեց անսահման ջերմությամբ, ժպիտներով և փոխադարձ հոգատարությամբ:',
      p2: 'Եվ այսօր, Աստծո օրհնությամբ ու մեր հարազատների սիրով շրջապատված, մենք կատարում ենք մեր կյանքի ամենակարևոր քայլը՝ միավորելով մեր սրտերը հավերժության մեջ:',
      groomRole: 'Փեսա • Մայիս',
      brideRole: 'Հարս • Գոհար',
    },
    calendar: {
      badge: 'Օրացույց',
      title: 'Հոկտեմբեր 2026',
      subtitle: 'Հիշարժան օր՝ շաբաթ, 3 հոկտեմբերի',
      monthYear: 'Հոկտեմբեր 2026',
      addToCalendar: 'Ավելացնել Google Calendar-ում',
      days: ['Կիրակի', 'Երկուշաբթի', 'Երեքշաբթի', 'Չորեքշաբթի', 'Հինգշաբթի', 'Ուրբաթ', 'Շաբաթ'],
      daysShort: ['Կիր', 'Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուրբ', 'Շաբ'],
      countdownTitle: 'Մինչ Մեր Հարսանիքը Մնացել Է',
      daysLabel: 'Օր',
      hoursLabel: 'Ժամ',
      minutesLabel: 'Ռոպե',
      secondsLabel: 'Վրկ',
    },
    scratch: {
      badge: 'Ինտերակտիվ Անակնկալներ',
      title: 'Քերեք և Բացահայտեք',
      subtitle: 'Մատով կամ մկնիկով քերեք ոսկեզօծ շերտը՝ հարսանիքի գաղտնիքները իմանալու համար',
      scratchToReveal: 'Քերեք՝ իմանալու համար',
      revealedBadge: 'Բացահայտված է',
      resetCards: 'Վերականգնել բոլորը',
      cards: [
        {
          id: 'scratch-1',
          title: 'Գաղտնի Վայր',
          subtitle: 'Քերեք՝ իմանալու համար',
          badge: 'Հանդիսություն',
          revealedTitle: 'Բացօթյա Լյուքս Տարածք',
          revealedMessage: 'Հարսանեկան սրահում Ձեզ սպասում է ծաղկազարդ բացօթյա կոկտեյլ գոտի և ռոմանտիկ լուսավորություն:',
        },
        {
          id: 'scratch-2',
          title: 'Երաժշտական Անակնկալ',
          subtitle: 'Քերեք՝ իմանալու համար',
          badge: 'Live Band',
          revealedTitle: 'Կենդանի Ջազ & Ժամանակակից Հիթեր',
          revealedMessage: 'Երեկոն կուղեկցվի սիրված երգիչների և կենդանի նվագախմբի կատարումներով:',
        },
        {
          id: 'scratch-3',
          title: 'Դրես-կոդի Գաղտնիքը',
          subtitle: 'Քերեք՝ իմանալու համար',
          badge: 'Dress Code',
          revealedTitle: 'Black Tie & Royal Armenian Chic',
          revealedMessage: 'Նախընտրելի երանգներ՝ Շամպայն, Փղոսկր (Ivory), Շքեղ Արծաթափայլ, Տեռակոտա և Դասական Սև:',
        },
        {
          id: 'scratch-4',
          title: 'Զույգի Խոսքը',
          subtitle: 'Քերեք՝ իմանալու համար',
          badge: 'Մեծ Սիրով',
          revealedTitle: 'Մեր Մեծագույն Ուրախությունը',
          revealedMessage: '«Դուք մեր ամենասիրելի մարդիկ եք: Ձեր ժպիտներն ու ներկայությունը մեր օրվա ամենաթանկ նվերն են»:',
        },
      ],
    },
    gallery: {
      badge: 'Լուսանկարներ',
      title: 'Մեր Գեղեցիկ Ակնթարթները',
      subtitle: 'Մեր ռոմանտիկ ֆոտոշարքը Հայաստանի գողտրիկ վայրերում',
      uploadBtn: 'Վերբեռնել Ձեր Լուսանկարները',
      uploadTooltip: 'Ընտրեք Ձեր սեփական հարսանեկան նկարները համակարգչից կամ հեռախոսից',
      resetPhotos: 'Վերադարձնել նախնականները',
      next: 'Հաջորդ',
      prev: 'Նախորդ',
      close: 'Փակել',
      dropText: 'Քաշեք նկարներն այստեղ կամ սեղմեք՝ ընտրելու համար',
    },
    timeline: {
      badge: 'Օրվա Ծրագիր',
      title: 'Հանդիսության Ժամանակացույց',
      subtitle: 'Շաբաթ, 03 Հոկտեմբերի 2026',
      viewOnMap: 'Բացել Քարտեզում',
      items: [
        {
          id: 'groom-home',
          time: '13:00',
          title: 'Փեսայի տուն',
          locationName: 'Փեսայի հայրական տուն',
          address: 'ք. Երևան, Դավթաշեն 4-րդ թաղ., տուն 12',
          description: 'Ավանդական հայկական հյուրասիրություն, ուրախ երաժշտություն և ճանապարհում:',
          mapUrl: 'https://maps.google.com/?q=Davtashen,+Yerevan,+Armenia',
        },
        {
          id: 'bride-home',
          time: '14:30',
          title: 'Հարսի տուն',
          locationName: 'Հարսի տուն',
          address: 'ք. Երևան, Արաբկիր, Կոմիտասի պողոտա',
          description: 'Հարսի տաշեղ-տաշեղ, օրհնության խոսքեր, շքեղ տորթ և քաղցրավենիքի սեղան:',
          mapUrl: 'https://maps.google.com/?q=Komitas+Ave,+Yerevan,+Armenia',
        },
        {
          id: 'church',
          time: '16:30',
          title: 'Եկեղեցի',
          locationName: 'Սուրբ Գայանե Եկեղեցի',
          address: 'ք. Վաղարշապատ (Էջմիածին)',
          description: 'Սուրբ Պսակադրության հանդիսավոր արարողություն և մոմավառություն:',
          mapUrl: 'https://maps.google.com/?q=Saint+Gayane+Church,+Vagharshapat',
        },
        {
          id: 'hall',
          time: '18:30',
          title: 'Հարսանյաց սրահ',
          locationName: '«Florence» Ռեստորանային Համալիր',
          address: 'ք. Երևան, Բարբյուսի փողոց 64/1',
          description: 'Տոնական ընթրիք, կենդանի երաժշտություն, հարսանեկան վալս և անմոռանալի պարեր մինչ ուշ գիշեր:',
          mapUrl: 'https://maps.google.com/?q=Florence+Restaurant+Complex,+Yerevan',
        },
      ],
    },
    rsvp: {
      badge: 'Հաստատում (RSVP)',
      title: 'Կիսվեք Ձեր Ներկայությամբ',
      subtitle: 'Խնդրում ենք հաստատել Ձեր մասնակցությունը մինչև 2026թ. Սեպտեմբերի 15-ը:',
      attendanceLabel: 'Մասնակցության Կարգավիճակ *',
      attendingYes: 'Մասնակցելու եմ սիրով',
      attendingYesSub: 'Անհամբեր կսպասենք հանդիպմանը ✨',
      attendingNo: 'Ցավոք չեմ կարող',
      attendingNoSub: 'Մտովի կլինեմ Ձեզ հետ',
      guestNameLabel: 'Անուն, Ազգանուն *',
      guestNamePlaceholder: 'օր.՝ Արամ և Անահիտ Պետրոսյաններ',
      guestCountLabel: 'Հյուրերի Քանակը (առավելագույնը 10)',
      guestCountPlaceholder: 'Մուտքագրեք հյուրերի թիվը (օր.՝ 2)',
      guestCountHelp: 'Նշեք թիվ 1-ից մինչև 10',
      dietaryLabel: 'Նախընտրություններ կամ Մաղթանք (Ընտրովի)',
      dietaryPlaceholder: 'Գրեք Ձեր ջերմ մաղթանքը կամ սննդային նախընտրությունները...',
      musicLabel: 'Սիրված Երգի Պատվեր (Ընտրովի)',
      musicPlaceholder: 'օր.՝ Ձեր նախընտրած երգը, որի ներքո կցանկանայիք պարել',
      submitBtn: 'Հաստատել Մասնակցությունը',
      submittingBtn: 'Ուղարկվում է...',
      thankYouTitle: 'Շնորհակալություն Հաստատման Համար',
      thankYouAttending: 'Ձեր պատասխանը հաջողությամբ գրանցվել է: Մեծ անհամբերությամբ սպասում ենք Ձեզ մեր սիրո տոնին:',
      thankYouNotAttending: 'Ձեր պատասխանը գրանցվել է: Շնորհակալ ենք ջերմ վերաբերմունքի համար, մտովի միասին կլինենք:',
      editRsvp: 'Փոփոխել Պատասխանը',
      nameRequired: 'Խնդրում ենք լրացնել Ձեր անունը',
      countRequired: 'Խնդրում ենք նշել հյուրերի քանակը (1-10)',
      maxCountError: 'Հյուրերի քանակը չի կարող գերազանցել 10-ը',
    },
    music: {
      play: 'Միացնել',
      pause: 'Անջատել',
      melody: 'Երաժշտություն',
    },
  },

  en: {
    nav: {
      envelope: 'Envelope',
      story: 'Story',
      calendar: 'Calendar',
      secrets: 'Surprises',
      photos: 'Gallery',
      timeline: 'Schedule',
      rsvp: 'RSVP',
    },
    envelope: {
      badge: 'Exclusive Wedding Invitation',
      titleClosed: 'Click the Wax Seal to Open',
      titleOpened: 'Invitation Unfolded',
      subtitleClosed: 'Mayis & Gohar • Saturday, October 3, 2026',
      subtitleOpened: 'We cordially invite you to celebrate our union and joyful journey together',
      btnOpen: 'Open Invitation',
      btnViewSchedule: 'View Schedule',
      btnReplay: 'Re-fold Envelope',
      tapSeal: 'Press Wax Seal',
      weddingInvitation: 'Wedding Invitation',
      churchAndHall: 'Saint Gayane Church • Florence Restaurant',
      openingStep1: 'Melting seal...',
      openingStep2: 'Unfolding flap...',
      openingStep3: 'Revealing invitation...',
    },
    hero: {
      saveTheDate: 'Save The Date • 03.10.2026',
      and: 'and',
      weAreGettingMarried: 'We are getting married',
      daysLeft: 'Days',
      hoursLeft: 'Hours',
      minutesLeft: 'Mins',
      secondsLeft: 'Secs',
      btnRsvp: 'Confirm (RSVP)',
      btnDetails: 'Learn More',
    },
    story: {
      badge: 'Our Love Story',
      title: 'Two Hearts, One Journey',
      quote: '“Love is life’s most breathtaking voyage. With boundless joy and love, we invite you to share the most memorable day of our lives with us.”',
      p1: 'Our story began on a golden autumn afternoon when our paths crossed. From that fateful moment, every passing day has been illuminated with tenderness, laughter, and deep companionship.',
      p2: 'Today, blessed by grace and enveloped in the warmth of our dearest family and friends, we take this monumental step to unite our lives and hearts forever.',
      groomRole: 'Groom • Mayis',
      brideRole: 'Bride • Gohar',
    },
    calendar: {
      badge: 'Calendar',
      title: 'October 2026',
      subtitle: 'A memorable day: Saturday, October 3',
      monthYear: 'October 2026',
      addToCalendar: 'Add to Google Calendar',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      countdownTitle: 'Countdown to Our Wedding',
      daysLabel: 'Days',
      hoursLabel: 'Hours',
      minutesLabel: 'Minutes',
      secondsLabel: 'Secs',
    },
    scratch: {
      badge: 'Interactive Surprises',
      title: 'Scratch & Reveal',
      subtitle: 'Scratch off the metallic coating to uncover our wedding secrets',
      scratchToReveal: 'Scratch to reveal',
      revealedBadge: 'Revealed',
      resetCards: 'Reset all cards',
      cards: [
        {
          id: 'scratch-1',
          title: 'Secret Venue',
          subtitle: 'Scratch to reveal',
          badge: 'Celebration',
          revealedTitle: 'Open-Air Luxury Lounge',
          revealedMessage: 'A blooming outdoor cocktail terrace with fairy tale lights awaits your arrival.',
        },
        {
          id: 'scratch-2',
          title: 'Musical Surprise',
          subtitle: 'Scratch to reveal',
          badge: 'Live Band',
          revealedTitle: 'Live Jazz & Modern Hits',
          revealedMessage: 'The evening will feature live performances from renowned vocalists and an orchestra.',
        },
        {
          id: 'scratch-3',
          title: 'Dress Code Secret',
          subtitle: 'Scratch to reveal',
          badge: 'Dress Code',
          revealedTitle: 'Black Tie & Royal Armenian Chic',
          revealedMessage: 'Preferred shades: Champagne, Ivory, Antique Silver, Terracotta, and Classic Black.',
        },
        {
          id: 'scratch-4',
          title: 'A Word from the Couple',
          subtitle: 'Scratch to reveal',
          badge: 'With Love',
          revealedTitle: 'Our Greatest Joy',
          revealedMessage: '“You are our dearest people. Your presence and joyful smiles are the greatest gift to us.”',
        },
      ],
    },
    gallery: {
      badge: 'Moments & Memories',
      title: 'Our Beautiful Moments',
      subtitle: 'Pre-wedding photoshoot across the picturesque landscapes of Armenia',
      uploadBtn: 'Upload Your Photos',
      uploadTooltip: 'Choose your wedding photos from your phone or computer',
      resetPhotos: 'Reset to default',
      next: 'Next',
      prev: 'Previous',
      close: 'Close',
      dropText: 'Drag photos here or click to select',
    },
    timeline: {
      badge: 'Daily Timeline',
      title: 'Order of Events',
      subtitle: 'Saturday, October 3, 2026',
      viewOnMap: 'Open in Maps',
      items: [
        {
          id: 'groom-home',
          time: '13:00',
          title: "Groom's Home",
          locationName: "Groom's Family Residence",
          address: 'Davtashen 4th District, House 12, Yerevan',
          description: 'Traditional Armenian reception, festive music, and procession send-off.',
          mapUrl: 'https://maps.google.com/?q=Davtashen,+Yerevan,+Armenia',
        },
        {
          id: 'bride-home',
          time: '14:30',
          title: "Bride's Home",
          locationName: "Bride's Residence",
          address: 'Komitas Avenue, Arabkir, Yerevan',
          description: 'Traditional celebration, blessings, luxury cake, and festive confectionery table.',
          mapUrl: 'https://maps.google.com/?q=Komitas+Ave,+Yerevan,+Armenia',
        },
        {
          id: 'church',
          time: '16:30',
          title: 'Holy Matrimony Church',
          locationName: 'Saint Gayane Church',
          address: 'Vagharshapat (Echmiadzin)',
          description: 'Sacred wedding sacrament, vows, and candle-lighting ceremony.',
          mapUrl: 'https://maps.google.com/?q=Saint+Gayane+Church,+Vagharshapat',
        },
        {
          id: 'hall',
          time: '18:30',
          title: 'Banquet Celebration',
          locationName: 'Florence Restaurant Complex',
          address: '64/1 Barbusse St, Yerevan',
          description: 'Gala dinner, live band, couple waltz, and joyous dancing through the night.',
          mapUrl: 'https://maps.google.com/?q=Florence+Restaurant+Complex,+Yerevan',
        },
      ],
    },
    rsvp: {
      badge: 'RSVP Confirmation',
      title: 'Grace Us with Your Presence',
      subtitle: 'Please confirm your attendance by September 15, 2026.',
      attendanceLabel: 'Attendance Status *',
      attendingYes: 'Joyfully Attending',
      attendingYesSub: 'We can’t wait to celebrate together ✨',
      attendingNo: 'Regretfully Cannot Attend',
      attendingNoSub: 'Celebrating with you in spirit',
      guestNameLabel: 'Full Name *',
      guestNamePlaceholder: 'e.g. Aram & Anahit Petrosyan',
      guestCountLabel: 'Number of Guests (Max 10)',
      guestCountPlaceholder: 'Enter number of guests (e.g. 2)',
      guestCountHelp: 'Please enter a number between 1 and 10',
      dietaryLabel: 'Wishes or Dietary Notes (Optional)',
      dietaryPlaceholder: 'Write your heartfelt wishes or special dietary notes...',
      musicLabel: 'Song Request (Optional)',
      musicPlaceholder: 'e.g. Your favorite song you would love to dance to',
      submitBtn: 'Submit RSVP',
      submittingBtn: 'Submitting...',
      thankYouTitle: 'Thank You for Confirming',
      thankYouAttending: 'Your response has been saved. We eagerly look forward to seeing you on our special day!',
      thankYouNotAttending: 'Your response has been received. Thank you for your warm regards; we will be together in spirit!',
      editRsvp: 'Edit Response',
      nameRequired: 'Please enter your full name',
      countRequired: 'Please enter the number of guests (1-10)',
      maxCountError: 'Guest count cannot exceed 10',
    },
    music: {
      play: 'Play',
      pause: 'Mute',
      melody: 'Melody',
    },
  },

  ru: {
    nav: {
      envelope: 'Конверт',
      story: 'История',
      calendar: 'Календарь',
      secrets: 'Сюрпризы',
      photos: 'Галерея',
      timeline: 'Программа',
      rsvp: 'RSVP',
    },
    envelope: {
      badge: 'Эксклюзивное Свадебное Приглашение',
      titleClosed: 'Нажмите на Печать, чтобы Открыть',
      titleOpened: 'Приглашение Открыто',
      subtitleClosed: 'Маис & Гоар • Суббота, 03 Октября 2026',
      subtitleOpened: 'С любовью приглашаем вас разделить этот счастливый и незабываемый день нашей жизни',
      btnOpen: 'Открыть Приглашение',
      btnViewSchedule: 'Смотреть Программу',
      btnReplay: 'Сложить Конверт',
      tapSeal: 'Нажмите на печать',
      weddingInvitation: 'Свадебное Приглашение',
      churchAndHall: 'Церковь Св. Гаянэ • Ресторан Florence',
      openingStep1: 'Таяние печати...',
      openingStep2: 'Открытие клапана...',
      openingStep3: 'Подача приглашения...',
    },
    hero: {
      saveTheDate: 'Запомните Дату • 03.10.2026',
      and: 'и',
      weAreGettingMarried: 'Мы женимся',
      daysLeft: 'Дней',
      hoursLeft: 'Часов',
      minutesLeft: 'Минут',
      secondsLeft: 'Секунд',
      btnRsvp: 'Подтвердить (RSVP)',
      btnDetails: 'Узнать Больше',
    },
    story: {
      badge: 'Наша История Любви',
      title: 'Два Сердца, Один Путь',
      quote: '«Любовь — это самое прекрасное путешествие в жизни. С радостью и любовью приглашаем вас разделить с нами наш самый заветный день»',
      p1: 'Наша история началась прекрасным осенним днем, когда пересеклись наши пути. С тех пор каждый миг наполнен заботой, светом и гармонией.',
      p2: 'И сегодня, с благословения небес и в окружении дорогих людей, мы делаем главный шаг — соединяем наши судьбы навсегда.',
      groomRole: 'Жених • Маис',
      brideRole: 'Невеста • Гоар',
    },
    calendar: {
      badge: 'Календарь',
      title: 'Октябрь 2026',
      subtitle: 'Незабываемый день: суббота, 3 октября',
      monthYear: 'Октябрь 2026',
      addToCalendar: 'Добавить в Google Calendar',
      days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      countdownTitle: 'До Свадьбы Осталось',
      daysLabel: 'Дней',
      hoursLabel: 'Часов',
      minutesLabel: 'Минут',
      secondsLabel: 'Сек',
    },
    scratch: {
      badge: 'Интерактивные Сюрпризы',
      title: 'Сотрите и Узнайте',
      subtitle: 'Сотрите металлическое напыление, чтобы открыть секреты торжества',
      scratchToReveal: 'Сотрите, чтобы открыть',
      revealedBadge: 'Открыто',
      resetCards: 'Восстановить карточки',
      cards: [
        {
          id: 'scratch-1',
          title: 'Секретная Локация',
          subtitle: 'Сотрите, чтобы открыть',
          badge: 'Торжество',
          revealedTitle: 'Открытая Лаунж-Зона',
          revealedMessage: 'В банкетном комплексе вас ждет цветущая терраса для приветственных коктейлей под огнями.',
        },
        {
          id: 'scratch-2',
          title: 'Музыкальный Сюрприз',
          subtitle: 'Сотрите, чтобы открыть',
          badge: 'Live Band',
          revealedTitle: 'Живой Джаз и Хиты',
          revealedMessage: 'Вечер украсят выступления любимых артистов и живого оркестра.',
        },
        {
          id: 'scratch-3',
          title: 'Секрет Дресс-кода',
          subtitle: 'Сотрите, чтобы открыть',
          badge: 'Dress Code',
          revealedTitle: 'Black Tie & Royal Armenian Chic',
          revealedMessage: 'Предпочтительные оттенки: Шампань, Слоновая кость, Серебро, Терракота и Классический черный.',
        },
        {
          id: 'scratch-4',
          title: 'Слово Молодоженов',
          subtitle: 'Сотрите, чтобы открыть',
          badge: 'С Любовью',
          revealedTitle: 'Наша Самая Большая Радость',
          revealedMessage: '«Вы — наши самые близкие и любимые. Ваше присутствие — самый драгоценный подарок для нас»',
        },
      ],
    },
    gallery: {
      badge: 'Фотографии',
      title: 'Наши Счастливые Мгновения',
      subtitle: 'Романтическая предсвадебная фотосессия в живописных уголках Армении',
      uploadBtn: 'Загрузить Ваши Фотографии',
      uploadTooltip: 'Выберите ваши фотографии с телефона или компьютера',
      resetPhotos: 'Сбросить к начальным',
      next: 'Вперед',
      prev: 'Назад',
      close: 'Закрыть',
      dropText: 'Перетащите фото сюда или нажмите для выбора',
    },
    timeline: {
      badge: 'Программа Дня',
      title: 'Расписание Торжества',
      subtitle: 'Суббота, 03 Октября 2026',
      viewOnMap: 'Открыть на Карте',
      items: [
        {
          id: 'groom-home',
          time: '13:00',
          title: 'Дом жениха',
          locationName: 'Отчий дом жениха',
          address: 'г. Ереван, Давташен 4-й кв., дом 12',
          description: 'Традиционное армянское угощение, зажигательная музыка и проводы жениха.',
          mapUrl: 'https://maps.google.com/?q=Davtashen,+Yerevan,+Armenia',
        },
        {
          id: 'bride-home',
          time: '14:30',
          title: 'Дом невесты',
          locationName: 'Дом невесты',
          address: 'г. Ереван, Арабкир, пр. Комитаса',
          description: 'Обрядовые поздравления, благословение, праздничный стол и сладости.',
          mapUrl: 'https://maps.google.com/?q=Komitas+Ave,+Yerevan,+Armenia',
        },
        {
          id: 'church',
          time: '16:30',
          title: 'Таинство Венчания',
          locationName: 'Церковь Святой Гаянэ',
          address: 'г. Вагаршапат (Эчмиадзин)',
          description: 'Торжественное таинство священного бракосочетания и зажжение свечей.',
          mapUrl: 'https://maps.google.com/?q=Saint+Gayane+Church,+Vagharshapat',
        },
        {
          id: 'hall',
          time: '18:30',
          title: 'Свадебный Банкет',
          locationName: 'Ресторанный комплекс «Florence»',
          address: 'г. Ереван, ул. Барбюса 64/1',
          description: 'Праздничный ужин, живая музыка, свадебный вальс и зажигательные танцы до ночи.',
          mapUrl: 'https://maps.google.com/?q=Florence+Restaurant+Complex,+Yerevan',
        },
      ],
    },
    rsvp: {
      badge: 'Подтверждение (RSVP)',
      title: 'Поделитесь Своим Присутствием',
      subtitle: 'Пожалуйста, подтвердите ваше участие до 15 сентября 2026 года.',
      attendanceLabel: 'Статус Участия *',
      attendingYes: 'С радостью буду присутствовать',
      attendingYesSub: 'С нетерпением ждем встречи ✨',
      attendingNo: 'К сожалению, не смогу',
      attendingNoSub: 'Мысленно буду с вами',
      guestNameLabel: 'Имя и Фамилия *',
      guestNamePlaceholder: 'напр. Арам и Анаит Петросян',
      guestCountLabel: 'Количество Гостей (максимум 10)',
      guestCountPlaceholder: 'Введите число гостей (напр. 2)',
      guestCountHelp: 'Укажите число от 1 до 10',
      dietaryLabel: 'Пожелания или Предпочтения (Необязательно)',
      dietaryPlaceholder: 'Напишите ваши добрые пожелания или диетические предпочтения...',
      musicLabel: 'Заказ Любимой Песни (Необязательно)',
      musicPlaceholder: 'напр. Песня, под которую вы бы хотели станцевать',
      submitBtn: 'Подтвердить Участие',
      submittingBtn: 'Отправка...',
      thankYouTitle: 'Спасибо за Подтверждение',
      thankYouAttending: 'Ваш ответ успешно сохранен. Мы с нетерпением ждем встречи на празднике!',
      thankYouNotAttending: 'Ваш ответ получен. Спасибо за теплые слова, будем мысленно вместе!',
      editRsvp: 'Изменить Ответ',
      nameRequired: 'Пожалуйста, укажите ваше имя',
      countRequired: 'Пожалуйста, укажите количество гостей (1-10)',
      maxCountError: 'Количество гостей не может превышать 10',
    },
    music: {
      play: 'Включить',
      pause: 'Выключить',
      melody: 'Музыка',
    },
  },

  ka: {
    nav: {
      envelope: 'კონვერტი',
      story: 'ისტორია',
      calendar: 'კალენდარი',
      secrets: 'სიურპრიზები',
      photos: 'გალერეა',
      timeline: 'პროგრამა',
      rsvp: 'RSVP',
    },
    envelope: {
      badge: 'ექსკლუზიური საქორწილო მოწვევა',
      titleClosed: 'დააჭირეთ ბეჭედს გასახსნელად',
      titleOpened: 'მოწვევა გახსნილია',
      subtitleClosed: 'მაისი & გოჰარი • შაბათი, 03 ოქტომბერი 2026',
      subtitleOpened: 'სიყვარულით გეპატიჟებით ჩვენი ცხოვრების ყველაზე ბედნიერ დღეს',
      btnOpen: 'მოწვევის გახსნა',
      btnViewSchedule: 'პროგრამის ნახვა',
      btnReplay: 'კონვერტის დაკეცვა',
      tapSeal: 'დააჭირეთ ბეჭედს',
      weddingInvitation: 'საქორწილო მოწვევა',
      churchAndHall: 'წმინდა გაიანეს ეკლესია • Florence Restaurant',
      openingStep1: 'ბეჭდის დნობა...',
      openingStep2: 'კონვერტის გახსნა...',
      openingStep3: 'მოწვევის გამოჩენა...',
    },
    hero: {
      saveTheDate: 'დაიმახსოვრეთ თარიღი • 03.10.2026',
      and: 'და',
      weAreGettingMarried: 'ჩვენ ვქორწინდებით',
      daysLeft: 'დღე',
      hoursLeft: 'საათი',
      minutesLeft: 'წუთი',
      secondsLeft: 'წამი',
      btnRsvp: 'დადასტურება (RSVP)',
      btnDetails: 'გაიგეთ მეტი',
    },
    story: {
      badge: 'ჩვენი სიყვარულის ისტორია',
      title: 'ორი გული, ერთი გზა',
      quote: '„სიყვარული ცხოვრების ულამაზესი მოგზაურობაა. დიდი სიხარულით გიწვევთ ჩვენთან ერთად ამ დაუვიწყარი დღის აღსანიშნავად.“',
      p1: 'ჩვენი ისტორია დაიწყო შემოდგომის მშვენიერ დღეს, როდესაც ჩვენი გზები გადაიკვეთა. იმ დღიდან ყოველი წამი სავსეა სითბოთი და სიხარულით.',
      p2: 'დღეს, უფლის კურთხევით და საყვარელი ადამიანების გარემოცვაში, ჩვენ ვდგამთ უმნიშვნელოვანეს ნაბიჯს — ვაერთიანებთ ჩვენს გულებს სამუდამოდ.',
      groomRole: 'ნეფე • მაისი',
      brideRole: 'პატარძალი • გოჰარი',
    },
    calendar: {
      badge: 'კალენდარი',
      title: 'ოქტომბერი 2026',
      subtitle: 'დაუვიწყარი დღე: შაბათი, 3 ოქტომბერი',
      monthYear: 'ოქტომბერი 2026',
      addToCalendar: 'Google Calendar-ში დამატება',
      days: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
      daysShort: ['კვ', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
      countdownTitle: 'ქორწილამდე დარჩა',
      daysLabel: 'დღე',
      hoursLabel: 'საათი',
      minutesLabel: 'წუთი',
      secondsLabel: 'წამი',
    },
    scratch: {
      badge: 'ინტერაქტიული სიურპრიზები',
      title: 'გაფხიკეთ და აღმოაჩინეთ',
      subtitle: 'გაფხიკეთ მოოქროვილი საფარი ქორწილის დეტალების გასაგებად',
      scratchToReveal: 'გაფხიკეთ სანახავად',
      revealedBadge: 'გამოჩენილია',
      resetCards: 'ბარათების განახლება',
      cards: [
        {
          id: 'scratch-1',
          title: 'საიდუმლო ლოკაცია',
          subtitle: 'გაფხიკეთ სანახავად',
          badge: 'დღესასწაული',
          revealedTitle: 'ღია ცის ქვეშ ლაუნჯი',
          revealedMessage: 'რესტორანში გელოდებათ აყვავებული გარე კოქტეილ-ზონა და რომანტიკული განათება.',
        },
        {
          id: 'scratch-2',
          title: 'მუსიკალური სიურპრიზი',
          subtitle: 'გაფხიკეთ სანახავად',
          badge: 'Live Band',
          revealedTitle: 'ცოცხალი ჯაზი & ჰიტები',
          revealedMessage: 'საღამოს გააფორმებენ ცნობილი მომღერლები და ცოცხალი ორკესტრი.',
        },
        {
          id: 'scratch-3',
          title: 'დრეს-კოდის საიდუმლო',
          subtitle: 'გაფხიკეთ სანახავად',
          badge: 'Dress Code',
          revealedTitle: 'Black Tie & Royal Armenian Chic',
          revealedMessage: 'სასურველი ფერები: შამპანური, სპილოსძვლისფერი, ვერცხლისფერი, ტერაკოტა და შავი.',
        },
        {
          id: 'scratch-4',
          title: 'წყვილის სიტყვა',
          subtitle: 'გაფხიკეთ სანახავად',
          badge: 'სიყვარულით',
          revealedTitle: 'ჩვენი უდიდესი სიხარული',
          revealedMessage: '„თქვენ ხართ ჩვენი უსაყვარლესი ადამიანები. თქვენი ღიმილი ჩვენთვის საუკეთესო საჩუქარია.“',
        },
      ],
    },
    gallery: {
      badge: 'ფოტოები',
      title: 'ჩვენი ბედნიერი წუთები',
      subtitle: 'წინასაქორწინო ფოტოსესია სომხეთის ულამაზეს კუთხეებში',
      uploadBtn: 'ატვირთეთ თქვენი ფოტოები',
      uploadTooltip: 'აირჩიეთ ფოტოები თქვენი ტელეფონიდან ან კომპიუტერიდან',
      resetPhotos: 'საწყისზე დაბრუნება',
      next: 'შემდეგი',
      prev: 'წინა',
      close: 'დახურვა',
      dropText: 'ჩააგდეთ ფოტოები აქ ან დააჭირეთ ასარჩევად',
    },
    timeline: {
      badge: 'დღის გეგმა',
      title: 'დღის განრიგი',
      subtitle: 'შაბათი, 03 ოქტომბერი 2026',
      viewOnMap: 'რუკაზე ნახვა',
      items: [
        {
          id: 'groom-home',
          time: '13:00',
          title: 'ნეფის სახლი',
          locationName: 'ნეფის მშობლიური სახლი',
          address: 'ერევანი, დავთაშენი მე-4 უბანი, სახლი 12',
          description: 'ტრადიციული სომხური სტუმართმოყვარეობა, მხიარული მუსიკა და გაცილება.',
          mapUrl: 'https://maps.google.com/?q=Davtashen,+Yerevan,+Armenia',
        },
        {
          id: 'bride-home',
          time: '14:30',
          title: 'პატარძლის სახლი',
          locationName: 'პატარძლის სახლი',
          address: 'ერევანი, არაბკირი, კომიტასის გამზირი',
          description: 'ტრადიციული მილოცვები, დალოცვა, სადღესასწაულო ტორტი და ტკბილეულის სუფრა.',
          mapUrl: 'https://maps.google.com/?q=Komitas+Ave,+Yerevan,+Armenia',
        },
        {
          id: 'church',
          time: '16:30',
          title: 'ჯვრისწერა ეკლესიაში',
          locationName: 'წმინდა გაიანეს ეკლესია',
          address: 'ვაღარშაპატი (ეჩმიაძინი)',
          description: 'ჯვრისწერის საზეიმო წმინდა რიტუალი და სანთლების ანთება.',
          mapUrl: 'https://maps.google.com/?q=Saint+Gayane+Church,+Vagharshapat',
        },
        {
          id: 'hall',
          time: '18:30',
          title: 'საქორწილო ბანკეტი',
          locationName: 'სარესტორნო კომპლექსი „Florence“',
          address: 'ერევანი, ბარბიუსის ქ. 64/1',
          description: 'სადღესასწაულო ვახშამი, ცოცხალი მუსიკა, საქორწილო ვალსი და ცეკვები გვიან ღამემდე.',
          mapUrl: 'https://maps.google.com/?q=Florence+Restaurant+Complex,+Yerevan',
        },
      ],
    },
    rsvp: {
      badge: 'დადასტურება (RSVP)',
      title: 'გაგვიზიარეთ თქვენი მობრძანება',
      subtitle: 'გთხოვთ დაადასტუროთ დასწრება 2026 წლის 15 სექტემბრამდე.',
      attendanceLabel: 'მონაწილეობის სტატუსი *',
      attendingYes: 'სიამოვნებით დავესწრები',
      attendingYesSub: 'მოუთმენლად ველით შეხვედრას ✨',
      attendingNo: 'სამწუხაროდ ვერ მოვდივარ',
      attendingNoSub: 'გონებით თქვენთან ვიქნები',
      guestNameLabel: 'სახელი და გვარი *',
      guestNamePlaceholder: 'მაგ. არამ და ანაჰიტ პეტროსიანები',
      guestCountLabel: 'სტუმრების რაოდენობა (მაქსიმუმ 10)',
      guestCountPlaceholder: 'ჩაწერეთ სტუმართა რიცხვი (მაგ. 2)',
      guestCountHelp: 'მიუთითეთ ციფრი 1-დან 10-მდე',
      dietaryLabel: 'სურვილები ან მილოცვა (სურვილისამებრ)',
      dietaryPlaceholder: 'დაწერეთ თქვენი გულწრფელი სურვილები...',
      musicLabel: 'საყვარელი სიმღერა (სურვილისამებრ)',
      musicPlaceholder: 'მაგ. სიმღერა, რომელზეც სიამოვნებით იცეკვებდით',
      submitBtn: 'დასწრების დადასტურება',
      submittingBtn: 'იგზავნება...',
      thankYouTitle: 'მადლობა დადასტურებისთვის',
      thankYouAttending: 'თქვენი პასუხი წარმატებით შეინახა. მოუთმენლად გელით ქორწილში!',
      thankYouNotAttending: 'თქვენი პასუხი მიღებულია. მადლობა თბილი სიტყვებისთვის!',
      editRsvp: 'პასუხის შეცვლა',
      nameRequired: 'გთხოვთ შეიყვანოთ თქვენი სახელი',
      countRequired: 'გთხოვთ მიუთითოთ სტუმართა რაოდენობა (1-10)',
      maxCountError: 'სტუმრების რაოდენობა არ უნდა აღემატებოდეს 10-ს',
    },
    music: {
      play: 'ჩართვა',
      pause: 'გამორთვა',
      melody: 'მუსიკა',
    },
  },

  ar: {
    nav: {
      envelope: 'المغلف',
      story: 'قصتنا',
      calendar: 'التقويم',
      secrets: 'المفاجآت',
      photos: 'الصور',
      timeline: 'البرنامج',
      rsvp: 'تأكيد الحضور',
    },
    envelope: {
      badge: 'دعوة زفاف حصرية ومميزة',
      titleClosed: 'اضغط على الختم الشمعي لفتح الدعوة',
      titleOpened: 'تم فتح بطاقة الدعوة',
      subtitleClosed: 'ماييس & غوهار • السبت، 03 أكتوبر 2026',
      subtitleOpened: 'يسرنا ويسعدنا دعوتكم لمشاركتنا أجمل وأسعد لحظات حياتنا',
      btnOpen: 'فتح بطاقة الدعوة',
      btnViewSchedule: 'عرض برنامج الحفل',
      btnReplay: 'إعادة إغلاق المغلف',
      tapSeal: 'اضغط على الختم',
      weddingInvitation: 'دعوة زفاف',
      churchAndHall: 'كنيسة القديسة غايانه • مطعم فلورنسا',
      openingStep1: 'فك الختم الشمعي...',
      openingStep2: 'فتح المغلف الملكي...',
      openingStep3: 'خروج بطاقة الدعوة...',
    },
    hero: {
      saveTheDate: 'احفظوا التاريخ • 03.10.2026',
      and: 'و',
      weAreGettingMarried: 'نحتفل بزفافنا المبارك',
      daysLeft: 'يوم',
      hoursLeft: 'ساعة',
      minutesLeft: 'دقيقة',
      secondsLeft: 'ثانية',
      btnRsvp: 'تأكيد الحضور (RSVP)',
      btnDetails: 'المزيد من التفاصيل',
    },
    story: {
      badge: 'قصة حبنا',
      title: 'قلبان، ومسيرة واحدة',
      quote: '«الحب هو أبهى رحلات العمر. بكل سرور ومحبة، ندعوكم لمشاركتنا أثمن وأسعد أيام حياتنا»',
      p1: 'بدأت حكايتنا في يوم خريفي بديع حين التقت دروبنا. ومنذ تلك اللحظة امتلأت أيامنا بالدفء والبهجة والانسجام الصادق.',
      p2: 'واليوم، بتوفيق من الله ومحبة الأهل والأصدقاء، نخطو معاً نحو بداية جديدة ونجمع قلبينا للأبد.',
      groomRole: 'العريس • ماييس',
      brideRole: 'العروس • غوهار',
    },
    calendar: {
      badge: 'التقويم',
      title: 'أكتوبر 2026',
      subtitle: 'يوم استثنائي: السبت، 3 أكتوبر',
      monthYear: 'أكتوبر 2026',
      addToCalendar: 'إضافة إلى Google Calendar',
      days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
      daysShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
      countdownTitle: 'العد التنازلي لحفل زفافنا',
      daysLabel: 'يوم',
      hoursLabel: 'ساعة',
      minutesLabel: 'دقيقة',
      secondsLabel: 'ثانية',
    },
    scratch: {
      badge: 'مفاجآت تفاعلية',
      title: 'امسح واكتشف',
      subtitle: 'امسح الطبقة الذهبية لتكتشف أسرار الحفل وتفاصيله',
      scratchToReveal: 'امسح لمعرفة التفاصيل',
      revealedBadge: 'تم الكشف',
      resetCards: 'إعادة البطاقات',
      cards: [
        {
          id: 'scratch-1',
          title: 'الموقع السري',
          subtitle: 'امسح لمعرفة التفاصيل',
          badge: 'الحفل',
          revealedTitle: 'صالة الاستقبال المفتوحة',
          revealedMessage: 'تنتظركم حديقة مزهرة ساحرة لجلسات الكوكتيل تحت أضواء رومانسية.',
        },
        {
          id: 'scratch-2',
          title: 'المفاجأة الموسيقية',
          subtitle: 'امسح لمعرفة التفاصيل',
          badge: 'فرقة حية',
          revealedTitle: 'جاز حي وأغاني عصرية',
          revealedMessage: 'سيتألق الحفل بأجمل الأغاني وأداء أوركسترا حية مميزة.',
        },
        {
          id: 'scratch-3',
          title: 'قواعد اللباس (Dress Code)',
          subtitle: 'امسح لمعرفة التفاصيل',
          badge: 'الزي الرسمي',
          revealedTitle: 'Black Tie & Royal Armenian Chic',
          revealedMessage: 'الألوان المحبذة: الشامبانيا، العاجي، الفضي الملكي، التراكوتا والأسود الكلاسيكي.',
        },
        {
          id: 'scratch-4',
          title: 'كلمة العروسين',
          subtitle: 'امسح لمعرفة التفاصيل',
          badge: 'مع كل الحب',
          revealedTitle: 'فرحتنا الكبرى',
          revealedMessage: '«أنتم أغلى الناس في قلوبنا. حضوركم وابتساماتكم هي أثمن وأجمل هدية لنا في هذا اليوم»',
        },
      ],
    },
    gallery: {
      badge: 'لحظات وذكريات',
      title: 'أجمل لقطاتنا',
      subtitle: 'جلسة تصوير رومانسية بين أروع معالم وطبيعة أرمينيا',
      uploadBtn: 'تحميل صوركم الخاصة',
      uploadTooltip: 'اختر صور الزفاف من هاتفك أو حاسوبك',
      resetPhotos: 'استعادة الصور الأصلية',
      next: 'التالي',
      prev: 'السابق',
      close: 'إغلاق',
      dropText: 'اسحب الصور هنا أو انقر للاختيار',
    },
    timeline: {
      badge: 'برنامج اليوم',
      title: 'جدول مراسم الحفل',
      subtitle: 'السبت، 03 أكتوبر 2026',
      viewOnMap: 'فتح الموقع على الخريطة',
      items: [
        {
          id: 'groom-home',
          time: '13:00',
          title: 'بيت العريس',
          locationName: 'بيت عائلة العريس',
          address: 'يريفان، دافتاشين الحي الرابع، منزل 12',
          description: 'ضيافة أرمينية تقليدية، موسيقى بهيجة وانطلاق موكب العريس.',
          mapUrl: 'https://maps.google.com/?q=Davtashen,+Yerevan,+Armenia',
        },
        {
          id: 'bride-home',
          time: '14:30',
          title: 'بيت العروس',
          locationName: 'بيت العروس',
          address: 'يريفان، أرابكير، شارع كوميتاس',
          description: 'مراسم التبريكات التقليدية، كعكة الاحتفال والحلويات الفاخرة.',
          mapUrl: 'https://maps.google.com/?q=Komitas+Ave,+Yerevan,+Armenia',
        },
        {
          id: 'church',
          time: '16:30',
          title: 'مراسم الإكليل المقدس',
          locationName: 'كنيسة القديسة غايانه',
          address: 'فاغارشابات (إتشميادزين)',
          description: 'مراسم الإكليل الكنسي المبارك وإشعال الشموع.',
          mapUrl: 'https://maps.google.com/?q=Saint+Gayane+Church,+Vagharshapat',
        },
        {
          id: 'hall',
          time: '18:30',
          title: 'حفل العشاء والزفاف',
          locationName: 'مجمع مطاعم «Florence»',
          address: 'يريفان، شارع باربوس 64/1',
          description: 'عشاء فاخر، فرقة موسيقية حية، رقصة العروسين وأجواء احتفالية حتى المساء.',
          mapUrl: 'https://maps.google.com/?q=Florence+Restaurant+Complex,+Yerevan',
        },
      ],
    },
    rsvp: {
      badge: 'تأكيد الحضور (RSVP)',
      title: 'شرفونا بحضوركم الكريم',
      subtitle: 'يرجى تأكيد الحضور قبل 15 سبتمبر 2026.',
      attendanceLabel: 'حالة الحضور *',
      attendingYes: 'سأحضر بكل سرور',
      attendingYesSub: 'نتطلع بشوق للقائكم ✨',
      attendingNo: 'للأسف لن أتمكن من الحضور',
      attendingNoSub: 'قلوبنا معكم في هذا اليوم',
      guestNameLabel: 'الاسم الكامل *',
      guestNamePlaceholder: 'مثال: آرام وأناهيت بتروسيان',
      guestCountLabel: 'عدد الضيوف (الحد الأقصى 10)',
      guestCountPlaceholder: 'أدخل عدد الضيوف (مثال: 2)',
      guestCountHelp: 'الرجاء إدخال رقم بين 1 و 10',
      dietaryLabel: 'التهاني أو الملاحظات (اختياري)',
      dietaryPlaceholder: 'اكتبوا كلماتكم الطيبة أو أي ملاحظات غذائية...',
      musicLabel: 'طلب أغنية مفضلة (اختياري)',
      musicPlaceholder: 'مثال: أغنيتكم المفضلة التي تودون الرقص على أنغامها',
      submitBtn: 'تأكيد الحضور',
      submittingBtn: 'جاري الإرسال...',
      thankYouTitle: 'شكراً لتأكيد حضوركم',
      thankYouAttending: 'تم حفظ ردكم بنجاح. نحن في غاية الشوق والسرور لرؤيتكم في يومنا المميز!',
      thankYouNotAttending: 'تم استلام ردكم. شكراً لمشاعركم الطيبة وستكونون في قلوبنا دائماً!',
      editRsvp: 'تعديل الرد',
      nameRequired: 'يرجى كتابة الاسم الكامل',
      countRequired: 'يرجى تحديد عدد الضيوف (1-10)',
      maxCountError: 'لا يمكن أن يتجاوز عدد الضيوف 10',
    },
    music: {
      play: 'تشغيل',
      pause: 'كتم',
      melody: 'موسيقى',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('mayis_gohar_lang') as Language;
      if (saved && ['hy', 'en', 'ru', 'ka', 'ar'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'hy';
  });

  const isRtl = language === 'ar';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('mayis_gohar_lang', lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRtl]);

  const value = {
    language,
    setLanguage,
    t: translationsData[language],
    isRtl,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

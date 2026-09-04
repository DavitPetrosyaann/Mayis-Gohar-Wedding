import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'hy' | 'en' | 'ru';

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
    invitationNote: string;
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
      secrets: 'Loto',
      photos: 'Ֆոտոշարք',
      timeline: 'Ծրագիր',
      rsvp: 'RSVP',
    },
    envelope: {
      badge: 'Հարսանեկան Բացառիկ Հրավեր',
      titleClosed: 'Սեղմեք Կնիքին՝ Ծրարը Բացելու Համար',
      titleOpened: 'Հրավիրատոմսը Բացված Է',
      subtitleClosed: '',
      subtitleOpened: 'Սիրով հրավիրում ենք Ձեզ կիսելու մեր կյանքի լուսավոր և անմոռանալի օրը',
      invitationNote: 'Սիրով հրավիրում ենք Ձեզ մեր հարսանեկան տոնակատարությանը',
      btnOpen: 'Բացել Հրավիրատոմսը',
      btnViewSchedule: 'Դիտել Օրվա Ծրագիրը',
      btnReplay: 'Կրկին Ծրարել',
      tapSeal: 'Սեղմեք Կնիքին',
      weddingInvitation: 'Հարսանյաց Հրավեր',
      churchAndHall: 'Սուրբ Հովհաննես Մկրտիչ եկեղեցի • Աղաբաբյանս Մեծ Դահլիճ',
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
      minutesLeft: 'Րոպե',
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
      subtitle: '',
      monthYear: 'Հոկտեմբեր 2026',
      addToCalendar: 'Ավելացնել Google Calendar-ում',
      days: ['Կիրակի', 'Երկուշաբթի', 'Երեքշաբթի', 'Չորեքշաբթի', 'Հինգշաբթի', 'Ուրբաթ', 'Շաբաթ'],
      daysShort: ['Կիր', 'Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուրբ', 'Շաբ'],
      countdownTitle: 'Մինչ Մեր Հարսանիքը Մնացել Է',
      daysLabel: 'Օր',
      hoursLabel: 'Ժամ',
      minutesLabel: 'Րոպե',
      secondsLabel: 'Վրկ',
    },
    scratch: {
      badge: 'Ինտերակտիվ Loto',
      title: 'Քերեք և Բացահայտեք',
      subtitle: 'Մատով կամ մկնիկով քերեք ոսկեզօծ շերտը՝ հարսանիքի գաղտնիքները իմանալու համար',
      scratchToReveal: '',
      revealedBadge: 'Բացահայտված է',
      resetCards: 'Վերականգնել բոլորը',
      cards: [
        {
          id: 'scratch-1',
          title: 'Գաղտնի Վայր',
          subtitle: '',
          badge: 'Հանդիսություն',
          revealedTitle: 'Բացօթյա Լյուքս Տարածք',
          revealedMessage: 'Հարսանեկան սրահում Ձեզ սպասում է ծաղկազարդ բացօթյա կոկտեյլ գոտի և ռոմանտիկ լուսավորություն:',
        },
        {
          id: 'scratch-2',
          title: 'Երաժշտական Անակնկալ',
          subtitle: '',
          badge: 'Live Band',
          revealedTitle: 'Կենդանի Ջազ & Ժամանակակից Հիթեր',
          revealedMessage: 'Երեկոն կուղեկցվի սիրված երգիչների և կենդանի նվագախմբի կատարումներով:',
        },
        {
          id: 'scratch-3',
          title: 'Դրես-կոդի Գաղտնիքը',
          subtitle: '',
          badge: 'Dress Code',
          revealedTitle: 'Black Tie & Royal Armenian Chic',
          revealedMessage: 'Նախընտրելի երանգներ՝ Շամպայն, Փղոսկր (Ivory), Շքեղ Արծաթափայլ, Տեռակոտա և Դասական Սև:',
        },
        {
          id: 'scratch-4',
          title: 'Զույգի Խոսքը',
          subtitle: '',
          badge: 'Մեծ Սիրով',
          revealedTitle: 'Մեր Մեծագույն Ուրախությունը',
          revealedMessage: '«Դուք մեր ամենասիրելի մարդիկ եք: Ձեր ժպիտներն ու ներկայությունը մեր օրվա ամենաթանկ նվերն են»:',
        },
      ],
    },
    gallery: {
      badge: 'Լուսանկարներ',
      title: '',
      subtitle: '',
      uploadBtn: '',
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
      subtitle: '',
      viewOnMap: 'Բացել Քարտեզում',
      items: [
        {
          id: 'groom-home',
          time: '11:00',
          title: 'Փեսայի տուն',
          locationName: 'Փեսայի հայրական տուն',
          address: 'ք. Երևան Շերամի 3/1 տուն',
          description: '',
          mapUrl: 'https://maps.google.com/?q=Sherami+St+3/1,+Yerevan,+Armenia',
        },
        {
          id: 'bride-home',
          time: '13:00',
          title: 'Հարսի տուն',
          locationName: 'Հարսի տուն',
          address: 'ք.Աբովյան 3-րդ միկրոշրջան 19 շենք',
          description: '',
          mapUrl: 'https://maps.google.com/?q=3rd+Microdistrict+19,+Abovyan,+Armenia',
        },
        {
          id: 'church',
          time: '15:00',
          title: 'Եկեղեցի',
          locationName: 'Սուրբ Հովհաննես Մկրտիչ եկեղեցի(Աբովյան)',
          address: '',
          description: '',
          mapUrl: 'https://maps.google.com/?q=Saint+John+the+Baptist+Church,+Abovyan,+Armenia',
        },
        {
          id: 'hall',
          time: '17:30',
          title: 'Հարսանյաց սրահ',
          locationName: 'Աղաբաբյանս Մեծ Դահլիճ',
          address: '',
          description: '',
          mapUrl: 'https://maps.google.com/?q=Aghababyans+Restaurant,+Nazarbekyan+St+25/5,+Yerevan',
        },
      ],
    },
    rsvp: {
      badge: 'Հաստատում (RSVP)',
      title: 'Հաստատեք Ձեր Ներկայությունը',
      subtitle: '',
      attendanceLabel: 'Մասնակցության Կարգավիճակ *',
      attendingYes: 'Մասնակցելու եմ սիրով',
      attendingYesSub: 'Անհամբեր կսպասենք հանդիպմանը ✨',
      attendingNo: 'Ցավոք չեմ կարող',
      attendingNoSub: '',
      guestNameLabel: 'Անուն, Ազգանուն *',
      guestNamePlaceholder: 'օր.՝ Արամ և Անահիտ Պետրոսյաններ',
      guestCountLabel: 'Հյուրերի Քանակը',
      guestCountPlaceholder: 'Մուտքագրեք հյուրերի թիվը (օր.՝ 2)',
      guestCountHelp: '',
      dietaryLabel: 'Նախընտրություններ կամ Մաղթանք (Ընտրովի)',
      dietaryPlaceholder: 'Գրեք Ձեր ջերմ մաղթանքը կամ սննդային նախընտրությունները...',
      musicLabel: 'Սիրված Երգի Պատվեր (Ընտրովի)',
      musicPlaceholder: 'օր.՝ Ձեր նախընտրած երգը, որի ներքո կցանկանայիք պարել',
      submitBtn: 'Հաստատել Մասնակցությունը',
      submittingBtn: 'Ուղարկվում է...',
      thankYouTitle: 'Շնորհակալություն Հաստատման Համար',
      thankYouAttending: 'Ձեր պատասխանը հաջողությամբ գրանցվել է: Մեծ անհամբերությամբ սպասում ենք Ձեզ մեր սիրո տոնին:',
      thankYouNotAttending: 'Ձեր պատասխանը գրանցվել է: Շնորհակալ ենք ջերմ վերաբերմունքի համար, մտովի միասին կլինենք:',
      editRsvp: 'Նոր Հայտ',
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
      secrets: 'Loto',
      photos: 'Gallery',
      timeline: 'Schedule',
      rsvp: 'RSVP',
    },
    envelope: {
      badge: 'Exclusive Wedding Invitation',
      titleClosed: 'Click the Wax Seal to Open',
      titleOpened: 'Invitation Unfolded',
      subtitleClosed: '',
      subtitleOpened: 'We cordially invite you to celebrate our union and joyful journey together',
      invitationNote: 'We cordially invite you to our wedding celebration',
      btnOpen: 'Open Invitation',
      btnViewSchedule: 'View Schedule',
      btnReplay: 'Re-fold Envelope',
      tapSeal: 'Press Wax Seal',
      weddingInvitation: 'Wedding Invitation',
      churchAndHall: 'Saint John the Baptist Church • Aghababyan Grand Hall',
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
      subtitle: '',
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
      subtitle: '',
      uploadBtn: '',
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
      subtitle: '',
      viewOnMap: 'Open in Maps',
      items: [
        {
          id: 'groom-home',
          time: '11:00',
          title: "Groom's Home",
          locationName: "Groom's Family Residence",
          address: '3/1 Sheram St, Yerevan',
          description: '',
          mapUrl: 'https://maps.google.com/?q=Sherami+St+3/1,+Yerevan,+Armenia',
        },
        {
          id: 'bride-home',
          time: '13:00',
          title: "Bride's Home",
          locationName: "Bride's Residence",
          address: '19, 3rd Microdistrict, Abovyan',
          description: '',
          mapUrl: 'https://maps.google.com/?q=3rd+Microdistrict+19,+Abovyan,+Armenia',
        },
        {
          id: 'church',
          time: '15:00',
          title: 'Church',
          locationName: 'Saint John the Baptist Church (Abovyan)',
          address: '',
          description: '',
          mapUrl: 'https://maps.google.com/?q=Saint+John+the+Baptist+Church,+Abovyan,+Armenia',
        },
        {
          id: 'hall',
          time: '17:30',
          title: 'Banquet Celebration',
          locationName: "Aghababyan's Grand Hall",
          address: '',
          description: '',
          mapUrl: 'https://maps.google.com/?q=Aghababyans+Restaurant,+Nazarbekyan+St+25/5,+Yerevan',
        },
      ],
    },
    rsvp: {
      badge: 'RSVP Confirmation',
      title: 'Grace Us with Your Presence',
      subtitle: '',
      attendanceLabel: 'Attendance Status *',
      attendingYes: 'Joyfully Attending',
      attendingYesSub: 'We can’t wait to celebrate together ✨',
      attendingNo: 'Regretfully Cannot Attend',
      attendingNoSub: 'Celebrating with you in spirit',
      guestNameLabel: 'Full Name *',
      guestNamePlaceholder: 'e.g. Aram & Anahit Petrosyan',
      guestCountLabel: 'Number of Guests',
      guestCountPlaceholder: 'Enter number of guests (e.g. 2)',
      guestCountHelp: '',
      dietaryLabel: 'Wishes or Dietary Notes (Optional)',
      dietaryPlaceholder: 'Write your heartfelt wishes or special dietary notes...',
      musicLabel: 'Song Request (Optional)',
      musicPlaceholder: 'e.g. Your favorite song you would love to dance to',
      submitBtn: 'Submit RSVP',
      submittingBtn: 'Submitting...',
      thankYouTitle: 'Thank You for Confirming',
      thankYouAttending: 'Your response has been saved. We eagerly look forward to seeing you on our special day!',
      thankYouNotAttending: 'Your response has been received. Thank you for your warm regards; we will be together in spirit!',
      editRsvp: 'New Request',
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
      secrets: 'Лото',
      photos: 'Галерея',
      timeline: 'Программа',
      rsvp: 'RSVP',
    },
    envelope: {
      badge: 'Эксклюзивное Свадебное Приглашение',
      titleClosed: 'Нажмите на Печать, чтобы Открыть',
      titleOpened: 'Приглашение Открыто',
      subtitleClosed: '',
      subtitleOpened: 'С любовью приглашаем вас разделить этот счастливый и незабываемый день нашей жизни',
      invitationNote: 'Сердечно приглашаем Вас на наше свадебное торжество',
      btnOpen: 'Открыть Приглашение',
      btnViewSchedule: 'Смотреть Программу',
      btnReplay: 'Сложить Конверт',
      tapSeal: 'Нажмите на печать',
      weddingInvitation: 'Свадебное Приглашение',
      churchAndHall: 'Церковь Св. Иоанна Крестителя • Большой Зал Агабабянс',
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
      subtitle: '',
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
      subtitle: '',
      uploadBtn: '',
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
      subtitle: '',
      viewOnMap: 'Открыть на Карте',
      items: [
        {
          id: 'groom-home',
          time: '11:00',
          title: 'Дом жениха',
          locationName: 'Отчий дом жениха',
          address: 'г. Ереван, ул. Шерами 3/1',
          description: 'Традиционное армянское угощение, зажигательная музыка и проводы жениха.',
          mapUrl: 'https://maps.google.com/?q=Sherami+St+3/1,+Yerevan,+Armenia',
        },
        {
          id: 'bride-home',
          time: '13:00',
          title: 'Дом невесты',
          locationName: 'Дом невесты',
          address: 'г. Абовян, 3-й микрорайон, д. 19',
          description: 'Обрядовые поздравления, благословение, праздничный стол и сладости.',
          mapUrl: 'https://maps.google.com/?q=3rd+Microdistrict+19,+Abovyan,+Armenia',
        },
        {
          id: 'church',
          time: '15:00',
          title: 'Таинство Венчания',
          locationName: 'Церковь Святого Иоанна Крестителя (Абовян)',
          address: '',
          description: 'Торжественное таинство священного бракосочетания и зажжение свечей.',
          mapUrl: 'https://maps.google.com/?q=Saint+John+the+Baptist+Church,+Abovyan,+Armenia',
        },
        {
          id: 'hall',
          time: '17:30',
          title: 'Свадебный Банкет',
          locationName: 'Большой Зал Агабабянс',
          address: '',
          description: 'Праздничный ужин, живая музыка, свадебный вальс и зажигательные танцы до ночи.',
          mapUrl: 'https://maps.google.com/?q=Aghababyans+Restaurant,+Nazarbekyan+St+25/5,+Yerevan',
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
      editRsvp: 'Новая Заявка',
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
      if (saved && ['hy', 'en', 'ru'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'hy';
  });

  const isRtl = false;

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

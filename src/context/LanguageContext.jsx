import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const translations = {
  ru: {
    meta: {
      title: 'VOID VISUAL — дизайн-студия',
      description: 'VOID VISUAL — дизайн-студия для соцсетей, YouTube-превью, инфографики маркетплейсов и визуального оформления брендов.',
      keywords: 'VOID VISUAL, дизайн, оформление соцсетей, YouTube превью, инфографика, дизайн маркетплейсов, визуал бренда',
      ogTitle: 'VOID VISUAL — дизайн-студия',
      ogDescription: 'Дизайн, который цепляет взгляд: соцсети, каналы, превью, инфографика и визуал для маркетплейсов.',
      twitterTitle: 'VOID VISUAL — дизайн-студия',
      twitterDescription: 'Оформление соцсетей, YouTube-превью, инфографика и визуальная упаковка бренда.',
    },
    header: {
      nav: [
        { label: 'Оформление', href: '#channels' },
        { label: 'Превью', href: '#previews' },
        { label: 'Инфографика', href: '#creatives' },
        { label: 'Прочее', href: '#other' },
      ],
      discuss: 'ОБСУДИТЬ ПРОЕКТ',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      languageLabel: 'Язык',
    },
    hero: {
      lines: ['ДОМИНИРУЙ', 'НА РЫНКЕ', 'ЧЕРЕЗ', 'ВИЗУАЛ'],
      copy: 'Дизайн, который цепляет взгляд — на любой платформе',
      primaryCta: 'Заказать дизайн',
      secondaryCta: 'Посмотреть работы',
    },
    stats: [
      { value: 150, suffix: '+', label: 'проектов' },
      { value: 50, suffix: '+', label: 'клиентов' },
      { value: 98, suffix: '%', label: 'довольных' },
      { value: 3, suffix: '', label: 'года опыта' },
    ],
    portfolio: [
      {
        id: 'channels',
        title: 'ОФОРМЛЕНИЕ СОЦСЕТЕЙ И КАНАЛОВ',
        description: 'Разработаем целостную визуальную экосистему для вашего бренда. Мы создаем упаковку, которая превращает трафик в лояльное комьюнити и обеспечивает мгновенную узнаваемость на любой платформе.',
        accentWord: 'оформление',
      },
      {
        id: 'previews',
        title: 'YOUTUBE ПРЕВЬЮ (CTR+)',
        description: 'Спроектируем кликабельные обложки, используя глубокие знания психологии внимания. Мы не просто рисуем картинку — мы работаем с триггерами и композицией, чтобы кратно увеличить количество просмотров на вашем канале.',
        accentWord: 'превью',
      },
      {
        id: 'creatives',
        title: 'ИНФОГРАФИКА ДЛЯ МАРКЕТПЛЕЙСОВ',
        description: 'Сделаем ваши карточки на Wildberries и Ozon лидерами категории. Мы выделяем продукт среди конкурентов, закрываем боли покупателей через смыслы и внедряем визуальные воронки, которые ведут прямиком к покупке.',
        accentWord: 'инфографика',
      },
      {
        id: 'other',
        title: 'ДИЗАЙН НА ЛЮБУЮ ТЕМАТИКУ',
        description: 'Реализуем нестандартные цифровые решения любой сложности: от оформления рекламных креативов до разработки фирменного сайта.',
        accentWord: 'дизайн',
      },
    ],
    carousel: {
      goToSlide: 'Перейти к слайду',
      prevSlide: 'Предыдущий слайд',
      nextSlide: 'Следующий слайд',
      imageAlt: 'Изображение',
      slideAlt: 'Слайд',
    },
    process: {
      label: 'Наш метод',
      title: 'КАК МЫ РАБОТАЕМ',
      ctaTitle: 'ГОТОВЫ ОБСУДИТЬ ПРОЕКТ?',
      ctaButton: 'Начать проект',
      steps: [
        {
          number: '01',
          title: 'АНАЛИТИКА',
          description: 'Погружение в нишу, аудит конкурентов и выявление триггеров целевой аудитории.',
          color: '#8B5CF6',
        },
        {
          number: '02',
          title: 'КОНЦЕПЦИЯ',
          description: 'Разрабатываем визуальную стратегию и композиционный скелет. Подбираем акцентную типографику, цветовую палитру и создаем эскизы, задающие вектор будущей воронки продаж.',
          color: '#22D3EE',
        },
        {
          number: '03',
          title: 'ПРОДАКШН',
          description: 'Финальная реализация графики. Используем ИИ для апскейла и улучшения качества исходников. Работаем с глубокой ретушью и докруткой визуала, доводя макет до абсолюта.',
          color: '#FB923C',
        },
        {
          number: '04',
          title: 'ФИНАЛИЗАЦИЯ',
          description: 'Подготовка и передача материалов. Контролируем полное соответствие графики техническим регламентам и стандартам качества целевых платформ.',
          color: '#34D399',
        },
      ],
    },
    footer: {
      titleTop: 'ГОТОВЫ',
      titleAccent: 'ОБСУДИТЬ',
      titleBottom: 'ПРОЕКТ?',
      telegramLabel: 'Написать в Telegram',
      funpayLabel: 'Написать в FunPay',
      whyTitle: 'Почему выбирают нас',
      whyItems: [
        'Делаем визуал, который продаёт',
        'Знаем каждую платформу изнутри',
        'Один подрядчик для всех площадок',
        'Срок от 24 часов',
      ],
      form: {
        nameLabel: 'Ваше имя',
        namePlaceholder: 'Как к вам обращаться',
        telegramLabel: 'Telegram username',
        telegramPlaceholder: '@username',
        messageLabel: 'Сообщение',
        messageOptional: '(необязательно)',
        messagePlaceholder: 'Расскажите о задаче...',
        submit: 'Отправить заявку',
      },
      telegramMessage: 'Здравствуйте! Хочу обсудить проект.\n\n',
      copyright: '© VOID VISUAL — 2026',
    },
  },
  en: {
    meta: {
      title: 'VOID VISUAL — design studio',
      description: 'VOID VISUAL is a design studio for social media branding, YouTube thumbnails, marketplace infographics, and high-converting brand visuals.',
      keywords: 'VOID VISUAL, design studio, social media branding, YouTube thumbnails, marketplace infographics, brand visuals',
      ogTitle: 'VOID VISUAL — design studio',
      ogDescription: 'Design that grabs attention: social media packaging, YouTube thumbnails, infographics, and conversion-focused visuals.',
      twitterTitle: 'VOID VISUAL — design studio',
      twitterDescription: 'Social media branding, YouTube thumbnails, marketplace infographics, and visual brand packaging.',
    },
    header: {
      nav: [
        { label: 'Branding', href: '#channels' },
        { label: 'Thumbnails', href: '#previews' },
        { label: 'Infographics', href: '#creatives' },
        { label: 'More', href: '#other' },
      ],
      discuss: 'DISCUSS YOUR PROJECT',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      languageLabel: 'Language',
    },
    hero: {
      lines: ['DOMINATE', 'THE MARKET', 'THROUGH', 'VISUALS'],
      copy: 'Design that grabs attention on any platform.',
      primaryCta: 'Order Design',
      secondaryCta: 'View Work',
    },
    stats: [
      { value: 150, suffix: '+', label: 'projects' },
      { value: 50, suffix: '+', label: 'clients' },
      { value: 98, suffix: '%', label: 'satisfied' },
      { value: 3, suffix: '', label: 'years experience' },
    ],
    portfolio: [
      {
        id: 'channels',
        title: 'SOCIAL MEDIA BRANDING AND CHANNEL DESIGN',
        description: 'We build a complete visual ecosystem for your brand. Our design turns traffic into a loyal audience and creates instant recognition across every platform.',
        accentWord: 'branding',
      },
      {
        id: 'previews',
        title: 'YOUTUBE THUMBNAILS (CTR+)',
        description: 'We craft clickable thumbnails using a deep understanding of attention psychology. This is not just decoration — it is trigger-driven composition designed to multiply your views.',
        accentWord: 'thumbnails',
      },
      {
        id: 'creatives',
        title: 'MARKETPLACE INFOGRAPHICS',
        description: 'We make your Wildberries and Ozon product cards stand out in competitive categories. We highlight the product, address customer pain points, and build visual funnels that move people toward the purchase.',
        accentWord: 'infographics',
      },
      {
        id: 'other',
        title: 'DESIGN FOR ANY NICHE',
        description: 'We create custom digital design solutions for any industry — from ad creatives and campaign visuals to full-scale branded websites.',
        accentWord: 'design',
      },
    ],
    carousel: {
      goToSlide: 'Go to slide',
      prevSlide: 'Previous slide',
      nextSlide: 'Next slide',
      imageAlt: 'Image',
      slideAlt: 'Slide',
    },
    process: {
      label: 'Our method',
      title: 'HOW WE WORK',
      ctaTitle: 'READY TO DISCUSS YOUR PROJECT?',
      ctaButton: 'Start a Project',
      steps: [
        {
          number: '01',
          title: 'RESEARCH',
          description: 'We dive into your niche, audit competitors, and identify the triggers that matter most to your target audience.',
          color: '#8B5CF6',
        },
        {
          number: '02',
          title: 'CONCEPT',
          description: 'We shape the visual strategy and composition system, choose strong typography and colors, and build sketches that set the direction for your future conversion funnel.',
          color: '#22D3EE',
        },
        {
          number: '03',
          title: 'PRODUCTION',
          description: 'We produce the final graphics, use AI to upscale and improve source materials, and refine every visual detail until the design feels premium and complete.',
          color: '#FB923C',
        },
        {
          number: '04',
          title: 'DELIVERY',
          description: 'We prepare and deliver final assets, making sure everything matches the technical requirements and quality standards of each target platform.',
          color: '#34D399',
        },
      ],
    },
    footer: {
      titleTop: 'READY TO',
      titleAccent: 'DISCUSS',
      titleBottom: 'YOUR PROJECT?',
      telegramLabel: 'Message on Telegram',
      funpayLabel: 'Message on FunPay',
      whyTitle: 'Why clients choose us',
      whyItems: [
        'We create visuals that sell',
        'We know each platform inside out',
        'One creative partner for every channel',
        'Turnaround from 24 hours',
      ],
      form: {
        nameLabel: 'Your name',
        namePlaceholder: 'How should we address you?',
        telegramLabel: 'Telegram username',
        telegramPlaceholder: '@username',
        messageLabel: 'Message',
        messageOptional: '(optional)',
        messagePlaceholder: 'Tell us about your project...',
        submit: 'Send Request',
      },
      telegramMessage: 'Hi! I would like to discuss a project.\n\n',
      copyright: '© VOID VISUAL — 2026',
    },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'ru'
    return window.localStorage.getItem('void-visual-language') || 'ru'
  })

  useEffect(() => {
    window.localStorage.setItem('void-visual-language', language)
  }, [language])

  const copy = translations[language]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = copy.meta.title

    const setMeta = (selector, content) => {
      const element = document.head.querySelector(selector)
      if (element) element.setAttribute('content', content)
    }

    setMeta('meta[name="description"]', copy.meta.description)
    setMeta('meta[name="keywords"]', copy.meta.keywords)
    setMeta('meta[property="og:title"]', copy.meta.ogTitle)
    setMeta('meta[property="og:description"]', copy.meta.ogDescription)
    setMeta('meta[name="twitter:title"]', copy.meta.twitterTitle)
    setMeta('meta[name="twitter:description"]', copy.meta.twitterDescription)
  }, [language, copy])

  const value = useMemo(() => ({
    language,
    setLanguage,
    copy,
  }), [language, copy])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

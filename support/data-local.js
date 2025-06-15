export const staticData = [
  'staticData',
  {
    title: 'castle',
    owner: 'valaxin',
    links: {
     github: 'https://github.com/valaxin' 
    },
    pages: [
      { title: 'index', href: '/index.html' },
    ],
    index: {
      content: {
        about: [
          'Hey, Im @valaxin and I work with technology to commuicate with other humans.',
          '1. something about me here',
          '2. something else about me here',
          '3. a third thing',
          'closing statement'
        ],
      },
    },
  },
]

export const manifest = {
  short_name: 'castle',
  name: 'castle ',
  icons: [
    {
      src: '/favicon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/favicon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
  start_url: '.',
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#ffffff',
}


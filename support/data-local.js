export const site = {
  title: 'castle',
  description: 'a personal webspace',
  owner: 'valaxin',
  links: {
    github: 'https://github.com/valaxin',
    codepen: 'https://codepen.io/valaxin',
    bluesky: '',
    contact: '',
  },
  pages: [
    { name: 'index', uri: '/index.html' },
    { name: 'guestbook', uri: '/guestbook.html' },
    { name: 'catalog', uri: '/catalog.html' },
  ],
  content: {
    about: [],
    projects: [],
  },
}

export const manifest = {
  short_name: site.title,
  name: site.title,
  icons: [],
  start_url: '.',
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#000000',
}

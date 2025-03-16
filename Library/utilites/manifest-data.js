import 'dotenv/config'

export default function WebManifest() {
  return {
    name: `${process.env.PKGNAME}`,
    short_name: `${process.env.PKGNAME}`,
    start_url: '.',
    display: 'minimal-ui',
    background_color: '#E2E2E2',
    description: '~',
    authors: [{ name: `${process.env.USERNAME}`, url: `https://github.com/${process.env.USERNAME}` }],
    icons: [
      {
        src: '/favicon.png',
        type: 'img/png',
        size: '256x256',
      },
    ],
    related_applications: [
      {
        platform: 'github',
        url: `https://github.com/${process.env.USERNAME}/${process.env.PKGNAME}`,
      },
    ],
  }
}

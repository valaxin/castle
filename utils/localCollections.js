/* -- local data given to the pug compiler -- */

export const about = {
  eyebrow: 'About Us',
  heading: 'Who We Are',
  lead: 'We build tools and spaces that help small teams do focused, durable work.',
  paragraphs: [
    'Founded in 2014, we started as a two-person shop solving a narrow problem for a handful of local clients.',
    "Today we work with teams across the country, but the approach hasn't changed: listen closely, ship carefully, and stand behind what we make.",
    "We're not interested in growth for its own sake. We're interested in doing the work well.",
  ],
  image: {
    src: '@images/static/elephants.jpg',
    alt: 'Team members reviewing a project layout',
  },
  stats: [
    { value: '10+', label: 'Years running' },
    { value: '500+', label: 'Projects shipped' },
    { value: '98%', label: 'Client retention' },
    { value: '24/7', label: 'Support coverage' },
  ],
}

export const slider = {
  images: [
    {
      src: '@images/static/castle.jpg',
      alt: 'A castle on a mountain side',
      caption: 'the caption',
      subtext: 'a small sentence about this thing here'
    },
    {
      src: '@images/static/cityscape.jpg',
      alt: 'A castle on a mountain side',
      caption: 'another caption',
      subtext: 'a small sentence about this thing here'
    },
    {
      src: '@images/static/through-trees.jpg',
      alt: 'A castle on a mountain side',
      caption: 'the caption',
      subtext: 'a small sentence about this thing here'
    },
    {
      src: '@images/static/elephants.jpg',
      alt: 'A castle on a mountain side',
      caption: 'another caption',
      subtext: 'a small sentence about this thing here'
    },
  ],
}

export default { about, slider }
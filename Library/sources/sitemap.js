import 'dotenv/config'

export default function (indexed) {
  return /*html*/ `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.${process.env.DOMAIN}.${process.env.TLD}/</loc>
    </url>
    <url>
      <loc>https://www.${process.env.DOMAIN}.${process.env.TLD}/now</loc>
    </url>
    <url>
      <loc>https://www.${process.env.DOMAIN}.${process.env.TLD}/repair</loc>
    </url>
  </urlset>
  `
}

import 'dotenv/config'

export default async function GumRoadProducts() {
  try {
    const url = `https://api.gumroad.com/v2/products?access_token=${process.env.GUMROAD}`
    const response = await fetch(url, { method: 'GET' })
    const json = await response.json()
    return json
  } catch (ex) {
    console.error(ex)
    return ex
  }
}

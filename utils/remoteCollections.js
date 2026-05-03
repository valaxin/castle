import 'dotenv/config'
import moment from 'moment'

async function repositories(username, token) {
  const apiEndpoint = `https://api.github.com/users/${username}/repos`

  try {
    const response = await fetch(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error fetching repositories: ${response.status}`)
    }

    const repos = await response.json()

    // modify any data before giving to client (e.g. dates)
    const parsed = repos.map((repo) => {
      if (repo.name == 'scrambled' || repo.name == 'castle') {
        return {
          name: repo.name,
          description: repo.description,
          owner: repo.owner,
          created_at: moment(repo.created_at).fromNow(),
          updated_at: moment(repo.updated_at).fromNow(),
          visibility: repo.visibility,
          size: repo.size,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          open_issues_count: repo.open_issues_count,
        }
      }
    }).filter(n => n)

    return parsed
  } catch (error) {
    console.error('Error:', error)
  }
}

async function products(token) {
  const apiEndpoint = `https://api.gumroad.com/v2/products?access_token=${token}`

  try {
    const response = await fetch(apiEndpoint, { headers: {} })

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.status}`)
    }

    const products = await response.json()
    if (products.success === true) {
      return products.products
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

async function weather({ token, lat, lon }) {
  try {
    console.log(token, lat, lon)
  } catch (error) {
    return error
  }
}

export const gumroad = await products(process.env.GUMROAD)
export const github = await repositories(process.env.USERNAME, process.env.GITHUB)
export const conditions = await weather({ token: process.env.WEATHER, lat: process.env.LAT, lon: process.env.LON })

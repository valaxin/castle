import 'dotenv/config'

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
    return repos
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

export const gumroad = await products(process.env.GUMROAD)
export const github = await repositories(process.env.USERNAME, process.env.GITHUB)

export async function repositories (username, token) {
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

export async function products (token) {
  const apiEndpoint = `https://api.gumroad.com/v2/products?access_token=${token}`

  try {
    const response = await fetch(apiEndpoint, {
      headers: {},
    })

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.status}`)
    }

    const products = await response.json()
    return products
  } catch (error) {
    console.error('Error:', error)
  }
}
import 'dotenv/config'
import moment from 'moment'
import { writeFile, readFile } from 'fs'
import { resolve } from 'path'

/* -- remote data obtained on build given to pug complier --  */

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
    const parsed = repos
      .map((repo) => {
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
      })
      .filter((n) => n)
    
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

/**
 *
 * @param {*} url
 * @param {*} options
 * @returns JSON of public lastest commit to this project
 */
async function _latestCommit(url, options) {
  // try {

  //   if (!url) {
  //     return false
  //   }

  //   const sfc = await readFile(resolve('.commit'))

  //   const request = await fetch(url, { ...options })

  //   console.log(`remaining requests commit ${request.headers.get('x-ratelimit-remaining')}`)

  //   const data = await request.json()

  //   console.log(data)

  //   return { sha: data.sha.split('').splice(0, 8).join('') }
  // } catch (error) {
  //   console.error(error)
  //   return error
  // }
  return { sha: 'xxxxxxxx' }
}

// not cached fetched new every build
// todo: cacheing solutions

// boolean check on off

export const gumroad = await products(process.env.GUMROAD)
export const github = await repositories(process.env.USERNAME, process.env.GITHUB)
export const castle = await _latestCommit(process.env.LAST_COMMIT, {})

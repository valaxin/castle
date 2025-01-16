import 'dotenv/config'

export default async function GitHubRepositories() {
  try {
    const url = `https://api.github.com/users/${process.env.USERNAME}/repos`
    console.log("!!!!", url)
    const response = await fetch(url, { method: 'GET' })
    const resp = await response.text()
    const json = JSON.parse(resp)
    return json
  } catch (ex) {
    console.error(ex)
    return ex
  }
}

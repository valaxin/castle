import 'dotenv/config'
import moment from 'moment'

export default async function RepoCollector () {
  try {
    const url = `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`
    const response = await fetch(url, { method: 'GET' })
    const resp = await response.text()
    const json = JSON.parse(resp)
    return json
  } catch (ex) {
    console.error('uh-oh!', ex)
  }
}

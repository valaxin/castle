// responsible for managing the remote static data sources used in this app
// 
// since this app intends to be my personal webspace, let's get a couple
// things in.

export async function githubRepositoryData(username, token) {
  const apiEndpoint = `https://api.github.com/users/${username}/repos`;

  try {
    const response = await fetch(apiEndpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        // console.log('err!')
        // console.log(response)
        throw new Error(`Error fetching repositories: ${response.status}`);
    }
    
    const repos = await response.json();
    
    repos.forEach(repo => { })// console.log(repo)});
    
    return repos
  
  } catch (error) {
    console.error("Error:", error);
  }
  
}
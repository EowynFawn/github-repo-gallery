const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const username = "EowynFawn";

const gitUserInfo = async () => {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  fetchedUserInfo(data);
  console.log(userInfo);
};

gitUserInfo();


const fetchedUserInfo = (data) => {
  const div = document.createElement("user-info");
  div.classList.add("user-info");
  div.innerHTML = `
  <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `;

    overview.append(div);
    fetchRepoList();
};

const fetchRepoList = async () => {
  const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated%20per_paget=100`);
  const repoData = await fetchRepos.json();
  displayRepoInfo(repoData);
}; 

//QUESTION: Are there security issues with putting HTML in your JS?
const displayRepoInfo = (repos) => {
  for(const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("li");
    repoItem.innerHTML = `<h3>${repo.name}`;
    repoList.append(repoItem);
  }
};


repoList.addEventListener("click", (e) => {
  if(e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async (repoName) => {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url)
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  const languages = [];
  for(const language in languageData) {
    languages.push(language)
  }
  displaySpecificRepoData(repoInfo, languages);
 
};

const displaySpecificRepoData = (repoInfo, languages) => {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repos.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
      `;
  repoData.append(div);
};









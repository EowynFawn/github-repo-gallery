const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");

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
};

/*

const fetchRepoList = async () => {
  const fetchRepos = await fetch (`https://api.github.com/users/${username}repos?sort=updated%20per_page&limit=100`);
  const repoData = await fetchRepos.json();
  console.log(fetchRepoList);
  fetchRepoList(repoData);
}; 

*/


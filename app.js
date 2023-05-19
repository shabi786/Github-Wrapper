const userNameInput = document.getElementById('search');
const porfileshowArea = document.querySelector('.profileInfo');
const mainContainer = document.querySelector('.main');
const repoContainer = document.querySelector('.reposInfo');
const repoShowArea = document.querySelector('.repo-main');




function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function handleSearch() {

    mainContainer.style.display = 'none';

    const userName = userNameInput.value;
    fetch(`https://api.github.com/users/${userName}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            porfileshowArea.innerHTML = ` <div class="user-card">
                <div class="photo">
                    <img src="${data.avatar_url}" alt="github profile image">
                </div>
                <p class="profile-name">${data.name}</p>
                <p class="user-name">@${data.login}</p>
                <div class="joining">
                    <img src="./assets/calender.svg" alt="calender logo">
                    <p>Joined ${formatDate(data.created_at)}</p>
                </div>
                <div class="detail">
                    <div class="small-card">
                        <p>${data.public_repos}</p>
                        <p class="grey">REPOSITORIES</p>
                    </div>
                    <div class="small-card">
                        <p>${data.followers}</p>
                        <p class="grey">FOLLOWERS</p>
                    </div>
                    <div class="small-card">
                        <p>${data.following}</p>
                        <p class="grey">FOLLOWING</p>
                    </div>
                </div>
            </div>`
            repoContainer.classList.add("active");
            showRepos();

        });
}



function showRepos() {
    const userName = userNameInput.value;
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const final = data.map((element) => {
                return `
                <a href=${element.html_url} target="blank">
                <div class="repo-card">
                    <div class="card-head">
                        <img class="col" src="./assets/repo.svg" alt="repo logo">
                        <h3>${element.name}</h3>
                    </div>
                    <div class="card-main">
                    <div class="left">
                        <span>${element.language}</span>
                        <div>
                            <img class="col" src="./assets/star.svg" alt="star logo">
                            <span>${element.stargazers_count}</span>
                        </div>
                        <div>
                            <img class="col" src="./assets/fork.svg" alt="fork logo">
                            <span>${element.forks_count}</span>
                        </div>
                        </div>
                        <span>${element.size} KB</span>
                    </div>
                </div>
                </a>`

            }).join("");
            repoShowArea.innerHTML += final

        });
}

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleSearch();
    }
})


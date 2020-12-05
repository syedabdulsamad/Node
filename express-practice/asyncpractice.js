console.log("First");



// function showUser(user) {
//     console.log(`User is :${JSON.stringify(user)}`);
//     getGitHubRepos(user.name, displayReposAndFindCommits);
// }

// function displayReposAndFindCommits(repos) {
//     console.log(`Repos are ${JSON.stringify(repos)}`);
//     getCommits(repos, displayCommits)
// }



getUser(1)
    .then(user => {
        console.log("User : ", user)
        return getGitHubRepos(user.userName)
    })
    .then(repos => {
        console.log("Repos : ", JSON.stringify(repos))
        return getCommits(repos)
    })
    .then(commits => displayCommits(commits));


function displayCommits(commits) {
    console.log("Commits: ", commits);
}

function getUser(id) {
    console.log("Getting user");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                "id": id,
                "name": "sam"
            })
        }, 2000);
    })
}

function getGitHubRepos(userName) {
    console.log("Getting repos for user");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["Node", "NodeJs", "Angular"]);
        }, 2000);
    })
}

function getCommits(repos) {
    console.log("Getting commits for repos");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                "id",
                "name",
                "sam"
            ])
        }, 2000);
    })
}
console.log("Second");
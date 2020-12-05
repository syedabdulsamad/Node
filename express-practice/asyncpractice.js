console.log("First");

getUser(1, showUser);

function showUser(user) {
    console.log(`User is :${JSON.stringify(user)}`);
    getGitHubRepos(user.name, displayReposAndFindCommits);
}

function displayReposAndFindCommits(repos) {
    console.log(`Repos are ${JSON.stringify(repos)}`);
    getCommits(repos, displayCommits)
}

function displayCommits() {
    console.log("Commits");
}

function getUser(id, callback) {
    setTimeout(() => {
        callback({
            "id": id,
            "name": "sam"
        })
    }, 2000);

}

function getGitHubRepos(userName, callback) {
    setTimeout(() => {
        callback(["Node", "NodeJs", "Angular"]);
    }, 2000);
}

function getCommits(repos, callback) {
    setTimeout(() => {
        callback([
            "id",
            "name",
            "sam"
        ])
    }, 2000);

}



console.log("Second");
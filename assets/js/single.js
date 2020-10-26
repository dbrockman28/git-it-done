let issueContainerEl = document.querySelector("#issues-container");

let getRepoIssues = function(repo) {
  //GitHub api issues url
  let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  //make the request
  fetch(apiUrl).then(function(response) {
    //request was successful
    if (response.ok) {
      response.json().then(function(data) {
        //pass response data into dom function
        displayIssues(data);
      });
    } else {
      alert("There was a problem with your request.");
    }
  });
};

let displayIssues = function(issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repository has no open issues.";
    return;
  }
  //loop through issues
  for (i = 0; i < issues.length; i++) {
    //create a link element to take users to the issue on GitHub
    let issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    //create span to hold issue title
    let titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;
    //append to container
    issueEl.appendChild(titleEl);
    //create a type element
    let typeEl = document.createElement("span");
    //check is issue is an actual issue or pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull Request)";
    } else {
      typeEl.textContent = "(Issue)";
    }
    //append to container
    issueEl.appendChild(typeEl);
    //append container to page
    issueContainerEl.appendChild(issueEl);
  }
};

getRepoIssues("dbrockman28/calendar-app");
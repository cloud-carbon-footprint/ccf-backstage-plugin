# Contributing to ccf-backstage-plugin

## Adopters

Thanks for contributing! If you've started using the Cloud Carbon Footprint Backstage Plugin, please add your name and organization to our [list of adopters](https://github.com/cloud-carbon-footprint/ccf-backstage-plugin/blob/trunk/ADOPTERS.md). Doing so helps our project!

## Issues ​⛔

Issues are created [here](https://github.com/cloud-carbon-footprint/ccf-backstage-plugin/issues).

Issues will be closed if they have been inactive and the latest affected version no longer receives support.

_If an issue has been closed and you still feel it's relevant, feel free to ping a maintainer or add a comment!_

## Picking Up an Issue
Once you get to the point of working on the issue, please [submit a PR with your changes and link it to the issue.](#pull_requests)

### How to Contribute in Issues

There are fundamentally three ways an individual can contribute:

1. **Open an issue:** If you believe that you have found a new bug or have a feature addition or request, you should report it by creating a new issue in the `cloud-carbon-footprint/ccf-backstage-plugin` issue tracker.
1. **Help triage an open issue:** You can do this either by providing assistive details (a reproducible test case that demonstrates a bug) or by providing suggestions to address the issue.
1. **Resolve an open issue:** This can be done by demonstrating that the issue is not a bug or is fixed; but more often, by opening a pull request that changes the source in `cloud-carbon-footprint/ccf-backstage-plugin` in a concrete and reviewable manner. We ask that as you do so, you consider tests you can write at various levels to help us ensure quality.

### Asking for General Help

- Please join our [Google Group](https://groups.google.com/g/cloud-carbon-footprint) and post a message with your question.

### Submitting a Bug Report

To submit a bug report:

When opening a new issue in the `cloud-carbon-footprint/ccf-backstage-plugin` issue tracker, users will be presented with a [bug report template](https://github.com/cloud-carbon-footprint/ccf-backstage-plugin/blob/trunk/.github/ISSUE_TEMPLATE/BUG_REPORT.md) that should be filled in.

If you believe that you have found a bug in the plugin, please fill out the given template to the best of your ability.

### Triaging a Bug Report

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain why you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

### Resolving a Bug Report

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the cloud-carbon-footprint project.


---
## <a id="pull_requests"></a>Pull Requests 📥

Pull Requests are the way concrete changes are made to the code, documentation, dependencies, and tools contained in the `cloud-carbon-footprint/ccf-backstage-plugin` repository. Please [link your PR](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue) to an issue so we can more easily track the work being done

## Setting up your local environment

### Fork & Clone

Fork the project on GitHub and clone your fork locally.

```
$ git clone git@github.com:[your-username-here]/ccf-backstage-plugin.git
$ cd ccf-backstage-plugin
$ git remote add upstream https://github.com/cloud-carbon-footprint/ccf-backstage-plugin
$ git fetch upstream
```

### Branch

The Thoughtworks Cloud Carbon Footprint team uses [Trunk-Based Development](https://www.thoughtworks.com/insights/blog/enabling-trunk-based-development-deployment-pipelines).
You're welcome to keep your local development environment organized as you like, however when submitting pull requests to the base repository, be sure to submit them against the `trunk` branch. In order to avoid merge conflicts in your pull request, you'll need to successfully rebase ahead of your pull request:

```
$ git fetch upstream
$ git rebase upstream/trunk
$ git push origin/trunk
```

### Forks

If you are a core contributor, you may want to fetch changes from a forked repository. To make that easier, we have a script that will add the new remote and checkout the fork's branch. It can be invoked with:

```
$ ./scripts/remote-branch.sh remote-name remote-branch-name
```

### Code

Most pull requests opened against the `cloud-carbon-footprint/ccf-backstage-plugin` repository include changes to either the Typescript/React code in the frontend/ folder, the Typescript code in the backend/ folder or the documentation.

#### Linting

- We are using `eslint` and `prettier` in the project
- To avoid the hassle of manually linting the file, you can configure your IDE to automatically run the
  linter.
- If you are using Webstorm, check out [this](https://prettier.io/docs/en/webstorm.html) guide on how to
  set it up
- The prettier rules set up for the project are in `.prettierrc.json` file in the root DIR.
- The client and the server have their own ESLint rules in the respective `.eslintrc.js` files.
- Following the above rules is a pre-requisite for committing any code.

#### Testing

We strongly encourage you to cover any code added with the appropriate tests.

##### Unit Testing

- Run `yarn test` from the root directory.
- If you are missing a test file in the coverage report, you may need to clear the test cache by running
  `yarn test:clean`

### Commit

It is recommended to keep your changes grouped logically within individual commits. Many contributors find it easier to review changes that are split across multiple commits. There is no limit to the number of commits in a pull request. Please be sure to include your issue number in brackets and use easy to understand commit messages that summarize the work that you've done. A good commit message should describe what changed and why. See example below as reference.

```
$ git commit -m "[issue-number] Adds support for estimating Azure Anomoly Detector carbon emissions"
```

_Please Note_ We have configured the repository to run secrets scanning (Talisman), dependency version check, tests and linting with a pre-commit hook. It is recommended you ensure this pre-commit hook is properly set up in your local environment, and to only commit from the command line to ensure that it runs.

### Rebase

Once you have committed your changes, it is a good idea to use git rebase (not git merge) to synchronize your work with the main repository.

```
$ git fetch upstream
$ git rebase upstream/trunk
```

This ensures that your working branch has the latest changes from `cloud-carbon-footprint/cloud-carbon-footprint` trunk.

### Test

While our tests run every time you commit thanks to the pre-commit hook described above, if you would like to run the tests independent of a commit, use the following:

```
$ yarn test
```

### Changeset Version Update

Once you have committed your changes. run `yarn changeset` from the root directory. You will be prompted to choose which packages that need to be updated using the arrow keys and space bar. You will need to choose the appropriate update for each package that you have contributed to using the guidelines set with [Semantic Versioning](https://semver.org/). You will also be prompted to leave a detailed description of your changes. This process will create a markdown file in the .changesets directory to be included in your commit and pushed. Changesets are only requested if you made an update to any of the packages.

### Push

Once your commits are ready to go -- with passing tests and linting -- begin the process of opening a pull request by pushing your working branch to your fork on GitHub.

```
$ git push origin my-branch
```

### Opening the Pull Request

From within GitHub, opening a new pull request will present you with a [template](https://github.com/cloud-carbon-footprint/ccf-backstage-plugin/blob/trunk/.github/PULL_REQUEST_TEMPLATE.md) that should be filled out:

### Discuss and Update

You will probably get feedback or requests for changes to your pull request. This is a big part of the submission process so don't be discouraged! Some contributors may sign off on the pull request right away. Others may have detailed comments or feedback. This is a necessary part of the process in order to evaluate whether the changes are correct and necessary.

To make changes to an existing pull request, make the changes to your local branch, add a new commit with those changes, and push those to your fork. GitHub will automatically update the pull request.

```
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

There are a number of more advanced mechanisms for managing commits using git rebase that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the pull request to ping reviewers if you are awaiting an answer on something.

---

---

## Continuous Integration Pipeline 🔁

We use GitHub Actions for our CI pipeline. [Link to pipeline](https://github.com/cloud-carbon-footprint/ccf-backstage-plugin/actions/workflows/ci.yml).

You can learn more about GitHub Actions in the [Github Actions Documentation](https://docs.github.com/en/actions)

---

### Updating Packages

- To update a package to the patch or minor version, use the command `yarn update <package-name>`
- To update a package to the latest major version, use `yarn upgrade --latest <package-name>`

---

## Talisman 💍

- Used to check for potential secrets or sensitive information
- This will run along every pre-commit hook
- You can learn more about Talisman [here](https://github.com/thoughtworks/talisman)

---

## Webstorm IDE Development Configurations ⛈️

- Open the TypeScript tool window (View | Tool Windows | TypeScript) and switch to the Errors tab.
  The tab lists the discrepancies in the code detected by the TypeScript Language Service. The list is updated dynamically as you change your code for easier and faster debugging.

- You can also monitor compilation errors by going to the TypeScript tool window (View | Tool Windows | TypeScript),
  and switching to the Compile errors tab which shows up only after first manual compilation, when you click the :hammer: button and select the compilation scope.

## VSCode IDE Development Configurations 🖥️

- To run test on IDE, install the extension, `Jest Runner`, from marketplace

---

## Troubleshoot ⚠️

### Cloud Provider

#### GCP

If GCP credentials are not linked properly, there may be an error regarding AWS credentials not being set properly. This
has been caused by either out of date credentials on GCP, or the GCP credentials not being set properly on the local environment

### Talisman

#### Installing

- If you are receiving the following error, you may have installed Talisman wrong
  `sh: /talisman_hook_script: No such file or directory error.`
- To resolve check your env var by `echo $TALISMAN_HOME`, if it is installed correctly it will echo out a
  path `/Users/username/.talisman/bin`. If not, please refer to the README.md for instructions to install talisman
- If this variable is set, check to make sure you have the /talisman_hook_script within that directory

#### Overwritting Checks

- If there is an invalid check from Talisman, the failed commit will contain a checksum that you can add to
  the .talismanrc, which will allow it to pass for that commit.
- However this checksum is only valid for that specific commit, if the file changed, and it has a talisman check, it
  will run a new checksum for the .talismanrc that will have to be updated

---

© 2022 Thoughtworks, Inc.

# kvjson Contributing Guide


## Pull Request Guidelines

- The `master` branch is just a snapshot of the latest staged release. All development should be done in dedicated branches. **Submit PRs against the `master` branch when your contribution is ready to be staged.**
- Checkout a topic branch from the relevant branch, e.g. (`feature-x`, `bugfix-x`), and merge back against that branch.
- It's OK to have multiple small commits as you work on the PR - Will automatically squash it before merging if necessary.
- If adding a new feature:
  - Add accompanying test case.
  - Provide a convincing reason to add this feature. Ideally, there should be open issue which should be approved before staring your work on it.
- If fixing bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #10)`.
  - Provide a detailed description of the bug in the PR.
  - Add appropriate test coverage if applicable.

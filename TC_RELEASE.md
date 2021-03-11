# Release Terra-Components

Run the following commands in your IDE's console:

## 1. `npm run prepare-release`

-   runs: `npm ci && npm run build && npm run test-headless && npm start`
-   tests and builds code

If this command fails (the reason could be unit test..), errors should be corrected.

## 2. `gulp changeVersion --increment (major || minor || patch) --preid (e.g. beta | alpha | rc)`

-   we use [Semver's Versioning](https://semver.org/).

-   `increment` just means you finished an increment.
-   `minor` the update brings new features, therefore it’s a _minor_ release!
    -   example: `gulp changeVersion --increment minor`
        -   Result: v6.**1**.0
-   `preid` sets a **subversion**.
    -   example: `gulp changeVersion --increment minor --preid rc`
        -   Result: v6.1.0-rc.0
-   all parameters can be found in the [gulpfile](https://github.com/plentymarkets/terra-components/blob/6.X.X/gulpfile.js#L129).

## Then update the date in the [Changelog](https://github.com/plentymarkets/terra-components/blob/6.X.X/CHANGELOG.md) on which to be released!

-   example: `# 6.1.0-rc.0 (04.03.2021)`

... and push your changes directly to the Branch you would like to release!

-   For pushing directly to a default branch you need **admin rights**.
    -   If you haven’t, you have to create a new pull request and merge it with your changes: (**version update + changelog**).

## 3. `npm publish dist`

-   Creates a new release on [npm](https://www.npmjs.com/package/@plentymarkets/terra-components).
-   **Important**: To run this command you **need an account on npm**.
    -   If you haven't:
        -   create an account.
        -   get an invite from a member of Terra.
        -   Log in to npm in your IDEA’s console: `npm login`

### Last but not least, please create a new release-tag on [Github](https://github.com/plentymarkets/terra-components/releases)!

You're done! 🥳

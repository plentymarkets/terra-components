# Release Terra-Components

A guide that takes you step by step to a release of the Terra-Components.

_**Important**_: This guide only applies to plentysystems employees.

## 1. Prepare the release

-   run `npm run prepare-release` in your IDE's console.
    -   the command runs the alias: `npm ci && npm run build && npm run test-headless && npm start`
-   the command tests and builds code.

If this command fails (for example due to a unit test), errors should be corrected!

## 2. Change the Version of Terra-Components

-   we use [Semver's Versioning](https://semver.org/).

-   run `gulp changeVersion --increment <increment> --preid <preid>` in your IDE's console.

-   `increment` : depends on the changes that have been made. Either 'major', 'minor' or 'patch' or any pre-release.
    -   example: `gulp changeVersion --increment minor`
        -   before: v6.**0**.0 ... after: v6.**1**.0
-   `preid` : is only necessary for a **pre-release** and sets a **subversion**.
    -   example: `gulp changeVersion --increment preminor --preid rc`
        -   before: v6.0.0 ... after: v6.1.0-rc.0
-   all parameters can be found in the [gulpfile](./gulpfile.js) (Line 129).

## 3. Changelog update

-   Update the date in the [Changelog](./CHANGELOG.md) on which to be released!

    -   example: `# 6.1.0-rc.0 (04.03.2021)`

-   Push your changes directly to the Branch you would like to release!
    -   For pushing directly to a default branch you need **admin rights**.
        -   If you haven’t, you have to create a new pull request and merge it with your changes: (**version update + changelog**).

## 4. Publish the new created version

-   run `npm publish dist` in your IDE's console.
-   This command creates a new release on [npm](https://www.npmjs.com/package/@plentymarkets/terra-components).
-   **Important**: To run this command you **need an account on npm**.

    -   If you haven't:
        -   create an account.
        -   get an invite from a member of Terra.
        -   Log in to npm in your IDEA’s console: `npm login`

-   Please create a new release-tag on [Github](https://github.com/plentymarkets/terra-components/releases)!

You're done! 🥳

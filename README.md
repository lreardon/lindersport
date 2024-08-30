# Linder Sport

This repository is the source of truth for Linder Sport's Shopify themes. The repository is linked to Shopify through Shopify's GitHub integration. Branches here correspond to Shopify themes. It is possible to add a new branch for themes in Shopify's Theme Manager area by clicking "Add Theme", clicking the "Github" option, and selecting the appropriate branch.

## How to use this repository

There are 2 main branches, `main` and `release`.

`release` is tied to the published theme, and should never be edited directly.

To contribute, starting on the `main` branch, checkout a new branch with `gcb <BRANCH_NAME>`. Then link the branch to a shopify theme, develop on the new branch, and test it by previewing that theme in Shopify (`lindersport/<BRANCH_NAME>`). When the feature is deemed stable, merge the branch into `main` with `gco main && gm <BRANCH_NAME> && gp`. Preview `lindersport/main` again to ensure stability, then merge main into release with `gco release && gm main && gp`. After release, be sure to delete the feature branch, with `gbd <BRANCH_NAME>`.
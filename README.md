# Linder Sport

This repository is the source of truth for Linder Sport's Shopify themes. The repository is linked to Shopify through Shopify's GitHub integration. Branches here correspond to Shopify themes. It is possible to add a new branch for themes in Shopify's Theme Manager area by clicking "Add Theme", clicking the "Github" option, and selecting the appropriate branch.

## How to use this repository

There are 3 main branches, `main`, `stag`, and `release`. Additionally, every developer should have a `dev-<DEVELOPER_NAME>` branch.

`release` is tied to the published theme, and should never be edited directly.

To contribute, starting on the `main` branch, checkout a new development branch with `gcb dev-<BRANCH_NAME>` (preferably with that `dev-` prefix). At some point, merge it into your `dev-<DEVELOPER_NAME>` branch. These branches are linked to a Shopify theme, so you can view how your changes effect the site there.

When the code is ready to merge, push it to `main`. After that merge process is done, when the code is ready to ship, merge `main` into `stag`. Do an idiot check against this preview to ensure nothing will be broken. Then you can merge `stag` into `release`. Manage your own development brnaches as you see fit. Don't delete `dev-<DEVELOPER_NAME>`, `main`, `stag` or `release`.
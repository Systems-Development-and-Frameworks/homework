# Systems Development and Frameworks - Group Assignments - Winter Term 2019/20

| Github Alias                                       | Name          |
| -------------------------------------------------- | ------------- |
| [@Veake](https://github.com/Veake)                 | Maximilian R. |
| [@martinneumann](https://github.com/martinneumann) | Martin N.     |
| [@rico-stucke](https://github.com/rico-stucke)     | Rico S.       |

## Installation

1. Clone the repository
2. run `npm run setup` inside this directory

### Commands

- `npm run setup` - setups all packages and links `core` to `backend` & `frontend`
- `npm run build` - builds all packages
- `npm run lint` - lints all packages
- `npm run lint:fix` - lints all packages and fixes errors if possible
- `npm run format:check` - checks if all packages are properly formatted
- `npm run format:fix` - fixes the formatting errors of all packages
- `npm run test` - runs the tests in `backend` & `frontend`

Each command is available in each package, therefore it can be called for a single package only.

> The only exception is `core` which does not have tests because it only provides type-definitions and no logic

Additionally every package has a `watch` command which automatically restarts the application after changes were saved.

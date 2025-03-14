# Front-End Setup
- [Home guide](../README.md)
- [Authentication guide](./authentication/README.md)
## Setup
- `cd template-tool-ui`
- `yarn`

### To Run localhost
- Create `.env.development` file and follow `.env.example` configurations using localhost
- `yarn dev`

## Stack

| Technology   | Description                                                              | Version |
|--------------|--------------------------------------------------------------------------|---------|
| React        | JavaScript library for building user interfaces                          | ^18.2.0 |
| TypeScript   | A typed superset of JavaScript                                           | ^5.2.2  |
| Vite         | Fast build tool and development server for modern web projects           | ^5.1.6  |
| Tailwind CSS | Utility-first CSS framework for rapid UI development                     | 3       |
| Electron     | Framework for building cross-platform desktop apps with web technologies | ^30.0.1 |
| Yarn         | Package manager for managing project dependencies                        | ^1.22.19|

## Dependencies

- **React**: ^18.2.0
  - **@types/react**: ^18.2.64
  - **react-dom**: ^18.2.0
  - **@types/react-dom**: ^18.2.21
- **TypeScript**: ^5.2.2
  - **@typescript-eslint/eslint-plugin**: ^7.1.1
  - **@typescript-eslint/parser**: ^7.1.1
- **Vite**: ^5.1.6
  - **@vitejs/plugin-react**: ^4.2.1
  - **vite-plugin-electron**: ^0.28.6
  - **vite-plugin-electron-renderer**: ^0.14.5
- **Tailwind CSS**: 3
  - **postcss**: ^8.5.2
  - **autoprefixer**: ^10.4.20
- **Electron**: ^30.0.1
  - **electron-builder**: ^24.13.3
- **ESLint**: ^8.57.0 - Linting utility (checks for syntax issues)
  - **eslint-plugin-react-hooks**: ^4.6.0
  - **eslint-plugin-react-refresh**: ^0.4.5
- **Axios**: ^1.8.1 - HTTP request library
- **MSW**: ^2.7.3 - Mocking API calls when turned on (auto generated `mockServiceWorker.js`)
# UI Setup
- [Home guide](../README.md)
- [Front-end guide](../README.md)
  
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

- **React**: ^18.2.0 - Library for building user interfaces
  - **@types/react**: ^18.2.64 - TypeScript definitions for React
  - **react-dom**: ^18.2.0 - React package for working with the DOM
  - **@types/react-dom**: ^18.2.21 - TypeScript definitions for React DOM
  - **react-router**: "^7.5.0" - Library for routing in React applications
- **TypeScript**: ^5.2.2 - Adds static typing to JavaScript
  - **@typescript-eslint/eslint-plugin**: ^7.1.1 - ESLint plugin for TypeScript-specific linting rules
  - **@typescript-eslint/parser**: ^7.1.1 - Parser for TypeScript code in ESLint
- **Vite**: ^5.1.6 - Development server and build tool for modern web projects
  - **@vitejs/plugin-react**: ^4.2.1 - Vite plugin for React support
  - **vite-plugin-electron**: ^0.28.6 - Plugin for integrating Electron with Vite
  - **vite-plugin-electron-renderer**: ^0.14.5 - Renderer process support for Electron in Vite
- **Tailwind CSS**: 3 - CSS framework for building modern UIs
  - **postcss**: ^8.5.2 - Tool for transforming CSS with JavaScript
  - **autoprefixer**: ^10.4.20 - PostCSS plugin to add vendor prefixes automatically
- **Electron**: ^30.0.1 - Framework for building desktop apps with web technologies
  - **electron-builder**: ^24.13.3 - Tool for packaging and distributing Electron apps
- **ESLint**: ^8.57.0 - Linting utility for identifying and fixing code issues
  - **eslint-plugin-react-hooks**: ^4.6.0 - ESLint rules for React hooks
  - **eslint-plugin-react-refresh**: ^0.4.5 - ESLint plugin for React Fast Refresh
- **Axios**: ^1.8.1 - HTTP client for making API requests
- **Crypto-JS**: ^4.2.0 - Library for cryptographic algorithms
  - **@types/crypto-js**: ^4.2.2 - TypeScript definitions for Crypto-JS
- **MSW**: ^2.7.3 - Mock Service Worker for API mocking during development (auto generated `mockServiceWorker.js`)
- **Remirror**: ^3.0.1 - Toolkit for building rich-text editors
  - **@remirror/pm**: ^3.0.0 - ProseMirror utilities for Remirror
  - **Keycloak-JS**: ^26.1.5 - JavaScript adapter for integrating Keycloak authentication
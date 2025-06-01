# Autocomplete Component Project - Part 1

The goal of this project is to implement a responsive autocomplete React component.

## Expected behaviour

- User is supposed to be able to search for a specific country by typing a country name in the search field,
- When user starts typing, a dropdown menu opens with a list of country suggestions based on the user input,
- While the user is typing, the matching part of the text entered by the user should be highlighted,
- User is supposed to be able to scrolldown/up over the country suggestions list with either the keyboard and the mouse,
- Clicking outside the dropdown menu should close it,
- If no country is found, "No results found" should show on the UI,
- User is only able to enter latin letters. An error will be shown on the UI in case any other character is entered in the search input field,
- An error is also shown on the UI in case the API call fails.

## Tech stack

- React 18 + TypeScript
- Vite (dev / build)
- **Vanilla CSS (CSS Modules)**
- Jest + React Testing Library
- ESLint / Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm 9 (comes with Node) – or pnpm / yarn if you prefer (substitute commands accordingly)

### Installation

1. Unzip and enter the project

`unzip autocomplete-deel.zip`

`cd autocomplete-deel`

2. Install dependencies

`npm install` or `pnpm install / yarn install`

3. Start the development server

`npm run dev` or `yarn dev`

The application will be available at `http://localhost:5173`

## Switching Between Mock Data and Real API

The project supports both mock data (local JSON array) and real-time API fetching via REST Countries API.

You can switch between modes by changing the `USE_MOCK` constant in:

`src/helpers/getSuggestions.ts`

<!-- Toggle between mock and real API -->

`const USE_MOCK = true` Use `true` for offline/demo usage

`const USE_MOCK = false` Use `false` for real data via REST Countries

## Running tests

This project uses **Jest** and **React Testing Library** for unit and integration tests.

Make sure dependencies are installed:

`npm install` or `yarn install` or `pnpm install`

Then

`npm test` `yarn test` or `pnpm test`

# Questions - Part 2

You'll find the answers to the questions in the `questions.md` file located at the root of this project.

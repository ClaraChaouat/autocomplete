 Autocomplete Component Project

A React TypeScript implementation of an autocomplete component with async search functionality.

This is an autocomplete React component. 

When the user starts typing in the search input country names should show on a dropdowm menu.

all the following edge cases are implemented:

| Edge Case                         | Status                                           |
| --------------------------------- | ------------------------------------------------ |
| Empty input                       | ✔️ handled (returns early)                       |
| No results match                  | ✔️ shows “No results found”                      |
| Click outside                     | ✔️ handled via `useOnClickOutside`               |
| Escape key pressed                | ✔️ closes dropdown                               |
| Enter key                         | ✔️ selects highlighted item + updates input      |
| Tab key                           | ✔️ selects if highlighted + closes dropdown      |
| User types fast                   | ✔️ debounced + cached + `AbortController`        |
| Dropdown keyboard nav (↑/↓/Enter) | ✔️ handled with `activeIndex`                    |
| Short queries                     | ✔️ length check in fetcher                       |
| Case insensitivity                | ✔️ via `.toLowerCase().trim()`                   |
| Mouse click on suggestion         | ✔️ updates input + closes dropdown               |
| Item hover (keyboard highlight)   | ✔️ using `activeIndex`                           |
| Prevent re-render of same results | ✔️ compares new vs previous suggestions          |
| Component unmounted during fetch  | ✔️ cleanup + cancel logic in effect              |
| Rapid typing / stale results      | ✔️ uses `AbortController` to discard old fetches |
| Mobile tap outside input          | ✔️ handled by `useOnClickOutside`                |
| Non-Latin characters / accents    | ✔️ accepted by regex (Latin-1), normalized       |
| Loading state clarity             | ✔️ loading slot rendered                         |
| Selected item validation          | ✔️ only known suggestions can be selected        |


## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/ClaraChaouat/autocomplete.git
cd autocomplete-deel
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:5173`

### Switching Between Mock Data and Real API

The project supports both mock data (local JSON array) and real-time API fetching via REST Countries API.

You can switch between modes by changing the `USE_MOCK` constant in:

`src/features/Autocomplete/utils/getSuggestions.ts`

<!-- Toggle between mock and real API -->

```const USE_MOCK = true```  <!--  ← use mockData from /data/mockData.ts -->

```const USE_MOCK = false```  <!-- ← use REST API for country search -->

Use true for offline/demo usage

Use false for real data via REST Countries






PS: no tests are implemented yet
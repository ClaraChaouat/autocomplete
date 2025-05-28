 Autocomplete Component Project

A React TypeScript implementation of an autocomplete component with async search functionality.

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

### Environment Variables

The project uses environment variables to toggle between real API calls and mock data for development/testing purposes.

#### Variable Description
Variable	Description
VITE_USE_MOCK=true	Forces the component to use local mock data instead of calling the API
VITE_USE_MOCK=false	Enables live API requests (default for real usage)
VITE_REST_COUNTRIES_API	The base URL used to fetch country suggestions from REST Countries

After modifying the .env file, restart the dev server:

```npm run dev ```

PS: no tests are implemented yet
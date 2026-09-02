# User Dashboard - Sources & Network Panel Practice

Vite + React demo application for practicing Chrome DevTools Sources and Network panels.

## Features

- User management dashboard with data from JSONPlaceholder API
- Multiple API endpoints for interesting Network panel waterfalls
- Extensive console logging for Sources panel practice
- Debounced search with cleanup functions
- Modal dialogs with parallel data loading
- Performance statistics tracking
- Dark professional theme

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Learning Goals

### Network Panel Practice
- Watch sequential and parallel API requests
- Observe request timing and waterfall visualization
- See the effect of artificial delays
- Track performance statistics

### Sources Panel Practice
- Set breakpoints in API service functions
- Step through debounced search logic
- Debug useEffect cleanup functions
- Inspect async/await flow
- Use console.log statements for debugging

## Project Structure

```
demo-sources-network/
├── src/
│   ├── api/
│   │   └── apiService.js      # API calls with logging & timing
│   ├── components/
│   │   ├── UserList.jsx        # User grid
│   │   ├── UserCard.jsx        # Individual user card
│   │   ├── UserDetail.jsx      # Modal with posts & todos
│   │   ├── SearchBar.jsx       # Debounced search
│   │   └── LoadingSpinner.jsx  # Loading state
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Styles
│   └── main.jsx                # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## API Endpoints Used

- `GET /users` - All users
- `GET /posts?userId=X` - User's posts
- `GET /todos?userId=X` - User's todos
- Client-side search filtering

All requests are logged to console with timing information.

# KeenKeeper

KeenKeeper is a friendship tracking web app to help users stay connected with people who matter. It provides reminders, quick interaction logging, timeline history, and analytics in a clean responsive interface.

## Description

This project was built as a multi-page React application using modern routing, charting, and UI styling tools. Users can browse friend cards, open detailed profiles, log check-ins using Call/Text/Video actions, and monitor activity trends.

## Technologies Used

- React
- Vite
- React Router DOM
- Tailwind CSS
- DaisyUI
- Recharts

## Features

- Responsive Navbar with active route styling
- Dashboard banner with summary cards
- Friend list from JSON data source
- Friend details page with:
  - profile information
  - stats cards
  - relationship goal section
  - quick check-in actions (Call, Text, Video)
- Timeline page with:
  - type filter (Call/Text/Video)
  - sort (Newest/Oldest)
  - search by friend name
- Friendship Analytics page with Pie Chart for Call/Text/Video interactions
- Toast notification after each quick check-in action
- 404 page for invalid routes
- Loading animation while friends data is loading
- SPA deployment fallback support for route reload safety

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Create production build:

```bash
npm run build
```


## Links

- Live Link: https://keenkeeper-web.netlify.app/ 

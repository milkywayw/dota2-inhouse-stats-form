# Dota 2 Inhouse Match Entry

A simple, silly form for recording Dota 2 inhouse match statistics. Built to streamline the process of maintaining stats for private/custom games that aren't accessible via the regular Dota 2 API.

## Why This Exists

Our Dota 2 friend group regularly plays inhouse matches, and we like keeping track of stats. Previously, this was done manually in spreadsheets - a tedious process that took away from the fun of playing. While there are tools that automate stats collection from replay files, they often become outdated or require complex setup.

This web app provides a middle ground: manual data entry through a clean, efficient interface that makes the process quick and maybe even enjoyable.

## Features

- 🎮 Complete draft capture (bans and picks)
- 👥 Player selection per role
- 👑 Track team captains/drafters
- 🏆 Record match winners
- 📊 K/D/A stats entry
- 🌙 Multiple theme options (Light, Dark, Solarized, Melange, Vaporwave, Tokyo Night)
- ⌨️ Keyboard-friendly input

## Setup for Development

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Deployment

The app is deployed to GitHub Pages. To deploy your own version:

1. Update `vite.config.js` with your repository name
2. Push changes to the main branch
3. GitHub Actions will automatically build and deploy

## Future Plans

- Integration with Google Sheets for data storage
- Stats visualization
- More themes
- Custom player database

## Tech Stack

- React
- Vite
- Tailwind CSS
- Headless UI Components
- GitHub Pages

## Contributing

This is primarily a personal project for our friend group, but feel free to fork it for your own use or submit PRs if you have improvements in mind.

## License

MIT

# Planet Explorer

An interactive guide to the Solar System. Search for a planet to view its profile, or browse the planetary facts table.

[Open the live site] (https://planetexplorer-72d942.netlify.app/)

## Features

- Search for planets by name
- View planet details loaded from `Searchplanet.JSON`
- Browse a planetary facts table
- Switch between light and dark themes; the preference is saved

## Run locally

This project has no build step or package dependencies. Because the site loads JSON data, run it through a local web server rather than opening `index.html` directly.

In VS Code, open the project folder and use the Live Server extension to serve `index.html`.

## Project files

- `index.html` — page structure and facts table
- `style.css` — page styles
- `script.js` — search, planet display, and theme behavior
- `Searchplanet.JSON` — planet profile data
- `Images/` — image assets

## Data and credits

Planet profile data and images are stored in this repository. Add links to their original sources here.

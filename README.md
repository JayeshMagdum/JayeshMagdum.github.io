# Jayesh Magdum - Portfolio

Personal portfolio website: a multi-tab single page site (Home, About, Skills, Experience, Projects, Contact) built with plain HTML, CSS and JavaScript. No frameworks, no build step.
https://jayeshmagdum.github.io/

## Features

- Tabbed navigation (each section is its own view, driven by the URL hash such as `#about`)
- Dark theme by default with a light theme toggle (remembered in the browser)
- Animated particles background, custom cursor and cursor-follow card spotlight
- Scroll story on the Home tab: sentences slide in one at a time as you scroll
- Interactive terminal on the About tab
- Responsive layout, reduced-motion support, resume available as a PDF

## Project structure

```
jayesh-portfolio/
├── index.html                 # All page content (the six tabs)
├── css/
│   └── style.css              # Styles, colours and both themes
├── js/
│   ├── utils.js               # Shared helpers
│   ├── background.js          # Particles canvas background
│   ├── cursor.js              # Custom cursor
│   ├── ui.js                  # Theme, tabs, typing text, reveal, counters, tilt
│   ├── story.js               # Home tab scroll story
│   └── terminal.js            # About tab terminal
├── assets/
│   ├── favicon.svg
│   ├── images/jayesh.jpg      # Hero photo
│   └── resume/Jayesh_Magdum_Resume.pdf
└── README.md
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a new repository on GitHub (for a personal site, name it `JayeshMagdum.github.io`).
2. Upload everything inside this folder to the repository root (`index.html` must be at the top level).
3. Go to **Settings > Pages**, set **Source** to *Deploy from a branch*, choose **main** and **/ (root)**, then save.
4. After a minute the site is live at `https://JayeshMagdum.github.io` (or `https://JayeshMagdum.github.io/<repo-name>/` for other repo names).

Or from the command line:

```bash
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin https://github.com/JayeshMagdum/JayeshMagdum.github.io.git
git push -u origin main
```

## Customize

- **Text and projects:** edit `index.html`. Each project is a `<div class="g rv">` card in the `#projects` section; add a link inside it once a repository or demo is public.
- **Colours:** change the variables at the top of `css/style.css` (`--a` and `--b` are the accent colours).
- **Resume:** replace `assets/resume/Jayesh_Magdum_Resume.pdf` with the new PDF, keeping the same file name.
- **Photo:** replace `assets/images/jayesh.jpg`.
- **Terminal answers:** edit the `commands` object in `js/terminal.js`.
- **Typing role line:** edit the `roles` array in `js/ui.js`.

## Tech

HTML5, CSS3 (custom properties, grid, backdrop-filter), vanilla JavaScript (canvas, IntersectionObserver). Fonts: Sora and Inter from Google Fonts.

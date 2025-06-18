# Pappu-A-Mole

A simple whack‑a‑mole style game that cycles through images in the `images/` directory. Click (or tap) the faces as they pop out of the holes to score points.

## Playing

Open `index.html` in your browser or host these files on a static server (such as GitHub Pages). Press **Start Game** and begin tapping the faces. Each round lasts 30 seconds. A countdown shows the time remaining and the faces appear for shorter and shorter times, speeding up as the round progresses. As the timer ticks down, more than one face may pop up at once. When time runs out a "Game over" message appears and you can start again.

The layout is responsive and works well on mobile devices.
The graphics are bright and cartoonish so the faces look like they are popping
out of the ground, making the game fun for little kids.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In the repository settings on GitHub, locate the **Pages** section.
3. Select `main` (or your default branch) as the source and choose the root folder.
4. Save. After a few minutes your site will be available at `https://<your-user>.github.io/<repository-name>/`.
5. Share that link to play the game online.

When adding new images, place them in the `images/` folder and update the `images` array in `main.js` so the game will include them.

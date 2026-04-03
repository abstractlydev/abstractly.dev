# abstractly.dev

Premium, static landing page for Jake Rysiński Brown's contracting services and professional portfolio. Built with a zero-framework approach using HTML, SCSS, and Vanilla JavaScript, optimized for fast performance and automated deployment via GitHub Pages.

## Core Technologies

- **HTML5**: Semantic and accessible structure.
- **SCSS**: Modern nested architecture mapped to variables and scalable layout components.
- **Vanilla JavaScript**: Lightweight interactive elements.
- **GitHub Actions**: Automated SCSS build and artifact deployment to GitHub Pages.

## Prerequisites

To work on this project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Version 20 or higher recommended)
- `npm` (Comes bundled with Node.js)

## Local Development Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/abstractlydev/abstractly.dev.git
    cd abstractly.dev
    ```

2. **Install dependencies:**
   This will install the Sass compiler used for local development.

    ```bash
    npm install
    ```

3. **Watch for SCSS changes:**
   Run the following command to automatically compile your SCSS into CSS whenever you make a change:

    ```bash
    npm run watch
    ```

4. **View the site:**
   Since this is a static site without a required build server, you can simply open the `index.html` file in your preferred web browser. Alternatively, to serve the directory locally, you can use:
    ```bash
    npx serve .
    ```
    _(This gives you a localhost URL to view your site.)_

## Deployment

This website is automatically deployed using **GitHub Pages**.

When you push a commit to the `main` or `master` branch, the `.github/workflows/deploy.yml` action will trigger. It automatically:

1. Provisions a Node 20 environment.
2. Installs dependencies (`npm ci`).
3. Builds the SCSS into production CSS (`npm run build`).
4. Deploys the static artifacts to the abstractly.dev GitHub Pages URL.

To ensure your GitHub repository settings are configured correctly for this:

- Go to your repository settings on GitHub.
- Navigate to **Pages** on the left sidebar.
- Change the **Source** under Build and deployment to **GitHub Actions**.

## Project Structure

- `index.html` - The main entrypoint.
- `scss/` - Contains all of the styling. Edit files here instead of the raw CSS files.
    - `_variables.scss` - Colors, spacing, and font constants.
    - `_base.scss` - CSS resets.
    - `_layout.scss` - Main block layouts (Hero, About, etc.).
    - `_components.scss` - Reusable UI elements like buttons and cards.
    - `main.scss` - The entrypoint that ties the partials together.
- `css/` - Do not manually edit. Contains the output of the compiled SCSS.
- `js/` - Logic for smooth scrolling and lightweight DOM interactions.
- `assets/images/` - Brand logos and graphical additions.

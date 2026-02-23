# React Starter

A modern, high-performance React application starter built with the latest technologies. This template is designed for scale, maintainability, and a premium developer experience.

## Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Internationalization**: [i18next](https://www.i18next.com/) (EN/ES support)
- **Icons**: [Lucide React](https://lucide.dev/)

## Architecture

The project follows a **Feature-Based Architecture**, ensuring high modularity and clear separation of concerns:

```text
src/
├── components/     # Shared UI components (Shadcn + Custom)
├── features/       # Feature-specific logic, pages, and components
│   ├── auth/       # Authentication flow
│   └── errors/     # Specialized error pages
├── locales/        # Translation files (JSON)
├── routes/         # TanStack Router type-safe route definitions
├── stores/         # State management with Zustand
└── styles/         # Global styles and Tailwind configuration
```

## Localization

Full support for English and Spanish is built-in. Translations are managed in `src/locales/` and configured in `src/config/i18n.ts`.

To add a new language:

1. Create a new folder in `src/locales/`.
2. Update the `i18n.ts` configuration.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (highly recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Available Scripts

Below is a list of scripts you can run using `pnpm <script-name>`:

| Script         | Command                | Description                                                                                |
| :------------- | :--------------------- | :----------------------------------------------------------------------------------------- |
| `dev`          | `vite`                 | Starts the development server with Hot Module Replacement (HMR).                           |
| `build`        | `tsc -b && vite build` | Compiles TypeScript and builds the production bundle in the `dist/` directory.             |
| `test`         | `vitest`               | Runs the test suite using [Vitest](https://vitest.dev/).                                   |
| `lint`         | `eslint .`             | Analyzes code for potential errors and styling issues using [ESLint](https://eslint.org/). |
| `preview`      | `vite preview`         | Previews the production build locally.                                                     |
| `format`       | `prettier --write .`   | Automatically formats the entire codebase using [Prettier](https://prettier.io/).          |
| `format:check` | `prettier --check .`   | Checks if the codebase follows the Prettier formatting rules.                              |
| `knip`         | `knip`                 | Finds unused files, dependencies, and exports to keep the bundle lean.                     |
| `prepare`      | `husky`                | Automatically sets up Git hooks for local development.                                     |

## Deployment

The project includes a GitHub Actions workflow for automated deployment to AWS S3 and CloudFront.

### GitHub Actions Workflow

The workflow is located at `.github/workflows/build-and-deploy.yml`. It triggers on every push to the `main` branch.

#### Prerequisites

To use the automated deployment, you must configure the following **GitHub Action Secrets**:

| Secret Key               | Description                                                   |
| :----------------------- | :------------------------------------------------------------ |
| `AWS_ROLE_ARN`           | The ARN of the IAM Role created for GitHub Actions.           |
| `S3_BUCKET_NAME`         | The name of the S3 bucket where the app will be hosted.       |
| `AWS_CLOUDFRONT_DIST_ID` | The ID of the CloudFront distribution to invalidate.          |
| `VITE_API_BASE_URL`      | The base URL for your API, injected during the build process. |

> [!NOTE]
> The deployment uses **OIDC** for authentication, which is more secure than using IAM User Access Keys. Ensure you have an IAM Role configured with a trust relationship for GitHub Actions before setting up the secrets.

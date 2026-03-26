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
- **Testing**: [Vitest](https://vitest.dev/) & [Testing Library](https://testing-library.com/)
- **Mocking**: [MSW](https://mswjs.io/)

## Architecture

The project follows a **Feature-Based Architecture**, ensuring high modularity and clear separation of concerns. Additionally, it implements an **Adapter Pattern** for all API communication, allowing the UI to remain ignorant of the backend implementation (e.g., easily switching between a local mock environment and a production REST API).

```text
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Shared UI components (Shadcn + Custom)
├── configs/         # Global configuration files
├── constants/       # Global constants and enums
├── features/       # Feature-specific logic, pages, and components
│   ├── auth/       # Authentication flow
│   └── errors/     # Specialized error pages
├── lib/            # Utility libraries and wrappers
│   ├── api/        # API configuration and adapter registry
│   └── ...
├── locales/        # Translation files (EN/ES)
├── mocks/          # MSW mock handlers and configuration
├── routes/         # TanStack Router type-safe route definitions
├── stores/         # State management with Zustand
├── styles/         # Global styles and Tailwind configuration
└── test/           # Test setup and generic utilities
```

> [!IMPORTANT]
> **Security Note**: By default, this starter persists the `accessToken` in `localStorage` for a seamless developer experience. For production applications with high security requirements, consider implementing a secure, HttpOnly cookie-based approach or short-lived tokens with refresh logic.

### Component & Route Generators

This starter uses tools that provide CLI generation out of the box:

- **Routing**: Simply create a file in `src/routes/` and TanStack router will automatically generate the types and route tree.
- **UI Components**: To add a new UI component, run `npx shadcn-ui@latest add [component]` and it will be placed in `src/components/ui`.

## Guides

### Adding a New Feature

Features live under `src/features/`. Each feature is a self-contained module with its own components, pages, adapters, hooks, stores, schemas, and constants.

1. Create the feature directory with the needed subfolders:

   ```text
   src/features/billing/
   ├── adapters/          # API adapters (base interface + implementations)
   ├── api/               # TanStack Query hooks (queries & mutations)
   ├── components/        # Feature-specific UI components
   ├── constants/         # Feature-scoped constants
   ├── hooks/             # Feature-scoped hooks
   ├── interfaces/        # TypeScript types and Zod-inferred types
   ├── pages/             # Full page components rendered by routes
   ├── schemas/           # Zod validation schemas (use factory functions)
   ├── store/             # Zustand stores (if the feature needs client state)
   └── utils/             # Feature-scoped utilities
   ```

2. Create a route file in `src/routes/` — TanStack Router auto-generates the route tree.

3. If the feature calls an API, follow the **Adding a New Adapter** guide below.

4. Add translation keys for the feature in every language folder under `src/locales/`.

### Adding a New Adapter

The adapter pattern decouples UI logic from API implementation. Each adapter implements a base interface, so the app can swap backends (mock, REST, GraphQL) without changing component code.

1. **Define the interface** in `src/features/<feature>/adapters/<feature>-base.adapter.ts`:

   ```ts
   export interface IBillingAdapter {
     getInvoices(): Promise<Invoice[]>
     pay(invoiceId: string): Promise<void>
   }
   ```

2. **Create the mock implementation** in `src/features/<feature>/adapters/<feature>-mock.adapter.ts`:

   ```ts
   import { apiClient } from '@/lib/api/axios-instance'
   import type { IBillingAdapter } from './billing-base.adapter'

   export class BillingAdapterMock implements IBillingAdapter {
     private baseUrl: string
     constructor(baseUrl: string) {
       this.baseUrl = baseUrl
     }

     async getInvoices() {
       const response = await apiClient.get(`${this.baseUrl}/invoices`)
       return response.data
     }

     async pay(invoiceId: string) {
       await apiClient.post(`${this.baseUrl}/invoices/${invoiceId}/pay`)
     }
   }
   ```

3. **Register the adapter** in `src/lib/api/config.ts`:

   ```ts
   import type { IBillingAdapter } from '@/features/billing/adapters/billing-base.adapter'
   import { BillingAdapterMock } from '@/features/billing/adapters/billing-mock.adapter'

   const ADAPTERS = {
     mock: { auth: AuthAdapterMock, billing: BillingAdapterMock },
     development: { auth: AuthAdapterMock, billing: BillingAdapterMock },
     production: { auth: AuthAdapterMock, billing: BillingAdapterMock },
   } as const

   function createBillingAdapter(): IBillingAdapter {
     const config = getAdapterConfig()
     const AdapterClass = config.billing
     return new AdapterClass(API_BASE_URL)
   }

   export const billingAdapter = createBillingAdapter()
   ```

4. When building the production adapter, create `<feature>-rest.adapter.ts` that implements the same interface and swap it into the `production` (and `development`) entries in `ADAPTERS`.

### Adding a New Language

Translations are managed in `src/locales/` and configured in `src/configs/i18n.ts`.

1. Create a new folder under `src/locales/` (e.g., `src/locales/fr/`) and add a JSON file for each namespace (`auth.json`, `error.json`, `general.json`). Copy an existing language as a starting point and translate the values.

2. Import the new files in `src/configs/i18n.ts` and add them to the `resources` object:

   ```ts
   import authFr from '../locales/fr/auth.json'
   import errorFr from '../locales/fr/error.json'
   import generalFr from '../locales/fr/general.json'

   const resources = {
     en: { error: errorEn, auth: authEn, general: generalEn },
     es: { error: errorEs, auth: authEs, general: generalEs },
     fr: { error: errorFr, auth: authFr, general: generalFr },
   }
   ```

3. Add the new locale to the language switcher component so users can select it.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (highly recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/frodo-cs/react-starter.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Available Scripts

Below is a list of scripts you can run using `pnpm <script-name>`:

| Script    | Command                | Description                                                                       |
| :-------- | :--------------------- | :-------------------------------------------------------------------------------- |
| `dev`     | `vite`                 | Starts the development server with HMR.                                           |
| `mock`    | `vite --mode mock`     | Starts the development server with MSW enabled for local API mocking.             |
| `build`   | `tsc -b && vite build` | Compiles TypeScript and builds the production bundle in the `dist/` directory.    |
| `test`    | `vitest`               | Runs the test suite using [Vitest](https://vitest.dev/).                          |
| `lint`    | `eslint .`             | Analyzes code for potential errors and styling issues.                            |
| `preview` | `vite preview`         | Previews the production build locally.                                            |
| `format`  | `prettier --write .`   | Automatically formats the entire codebase using [Prettier](https://prettier.io/). |
| `knip`    | `knip`                 | Finds unused files and dependencies.                                              |
| `cz`      | `cz`                   | Launches an interactive prompt for conventional commits.                          |

> **Note on Committing**: This project uses **Husky** to enforce code quality. Before any `git commit`, Husky runs Prettier and ESLint via `lint-staged`. Commit messages are also enforced using **commitlint**.

## Environment Variables

Environment variables are managed per Vite's standard implementation. All variables exposed to the client must be prefixed with `VITE_`.

### Base Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update the values in `.env` based on your local setup.

### Environment-Specific Files

Vite allows you to override variables based on the execution "mode" using `.env.[mode]` files:

- **`.env`**: Loaded in all cases (lowest priority).
- **`.env.local`**: Loaded in all cases, ignored by git (always overrides).
- **`.env.mock`**: Specifically loaded when running `pnpm mock`. It empties the `VITE_API_BASE_URL` to ensure MSW intercepts requests.

**Available Variables:**
| Variable | Description |
| :--- | :--- |
| `VITE_API_BASE_URL` | The fully qualified URL to your backend REST API. |

## Mocking

The project uses [MSW (Mock Service Worker)](https://mswjs.io/) to mock API requests during local development. This allows you to work on the UI without relying on a live backend.

### Running with Mocks

To start the development server with MSW enabled, run:

```bash
pnpm mock
```

### Adding New Mocks

1. **Handlers**: Add new MSW interceptors in `src/mocks/handlers.ts`.
2. **Adapters**: Ensure your mock adapter in `src/features/[feature]/adapters/[name]-mock.adapter.ts` is registered in `src/lib/api/config.ts`.

## Infrastructure & Deployment

The project is designed to be hosted as a static site on **AWS S3** and distributed through **Amazon CloudFront**.

### Infrastructure

The underlying infrastructure is defined using **AWS CloudFormation (SAM)**. It includes:

- **S3 Bucket**: Optimized for static web hosting.
- **CloudFront Distribution**: For global content delivery with SSL/TLS.
- **CloudFront Function**: Handles URL rewrites for single-page application (SPA) routing.
- **IAM Roles**: Secure OIDC-based roles for GitHub Actions.

For detailed setup and deployment instructions, see the Infrastructure README inside the infra/ location.

### GitHub Actions Workflow

The workflow is located at `.github/workflows/build-and-deploy.yml`. It triggers on every push to the `main` branch.

#### Prerequisites

To use the automated deployment, you must create an IAM Role via OIDC and configure the following **GitHub Action Secrets**:

| Secret Key               | Description                                                   |
| :----------------------- | :------------------------------------------------------------ |
| `AWS_ROLE_ARN`           | The ARN of the IAM Role created for GitHub Actions.           |
| `S3_BUCKET_NAME`         | The name of the S3 bucket where the app will be hosted.       |
| `AWS_CLOUDFRONT_DIST_ID` | The ID of the CloudFront distribution to invalidate.          |
| `VITE_API_BASE_URL`      | The base URL for your API, injected during the build process. |

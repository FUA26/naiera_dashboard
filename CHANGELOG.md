# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-12

### Added

#### Developer Experience & Foundation

- ✅ Configured absolute imports using `@/` prefix
- ✅ Added VSCode workspace configuration (settings, extensions, debug)
- ✅ Integrated Prettier for code formatting with Tailwind CSS plugin
- ✅ Enhanced ESLint configuration with strict TypeScript rules
- ✅ Added Knip for unused files and dependencies detection
- ✅ Integrated Lefthook for Git hooks (replacing Husky)
- ✅ Added Commitlint for enforcing conventional commits
- ✅ Added Commitizen for interactive commit message creation
- ✅ Configured lint-staged for running linters on staged files
- ✅ Created `.env.example` for environment variable documentation

### Configuration Files Added

- `.vscode/settings.json` - VSCode workspace settings
- `.vscode/extensions.json` - Recommended extensions
- `.vscode/launch.json` - Debug configurations
- `.prettierrc` - Prettier configuration
- `.prettierignore` - Prettier ignore patterns
- `knip.json` - Knip configuration
- `lefthook.yml` - Git hooks configuration
- `commitlint.config.js` - Commit message linting rules

### Scripts Added

- `lint:fix` - Auto-fix linting errors
- `format` - Format code with Prettier
- `format:check` - Check code formatting
- `type-check` - TypeScript type checking
- `knip` - Detect unused files and dependencies
- `commit` - Interactive commit with Commitizen

## [0.2.0] - 2025-12-12

### Added

#### UI Development Environment

- ✅ Verified Tailwind CSS 4 configuration (PostCSS, custom theme, dark mode)
- ✅ Installed and configured Storybook 10.1.7 with Next.js + Vite
- ✅ Integrated Tailwind CSS into Storybook preview
- ✅ Created Button component (`components/ui/button.tsx`) with CVA variants
- ✅ Created comprehensive Button stories with all variants and sizes
- ✅ Added Storybook addons: a11y, docs, vitest, chromatic, onboarding

### Scripts Added

- `storybook` - Start Storybook dev server on port 6006
- `build-storybook` - Build static Storybook site

### Configuration Files Added

- `.storybook/main.ts` - Storybook configuration
- `.storybook/preview.ts` - Global preview settings
- `components/ui/button.tsx` - Button component
- `components/ui/button.stories.tsx` - Button stories

## [Unreleased]

### Planned for v0.3.0 - Core Architecture & Type Safety

- Implement T3 Env for type-safe environment variables
- Setup i18n with next-intl and Crowdin integration

### Planned for v0.4.0 - Features & Optimization

- Setup React Hook Form with Zod validation
- Integrate LogTape and Better Stack for logging
- Add SEO metadata, sitemap, and robots.txt generation

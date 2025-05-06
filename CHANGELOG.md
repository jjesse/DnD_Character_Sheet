# Changelog

## [1.1.18] - 2024-01-18

### Fixed
- Updated Paper component props to use 'p' instead of 'padding' for Mantine compatibility
- Fixed TypeScript type errors in Paper component props

## [1.1.17] - 2024-01-18

### Fixed
- Pinned @mantine/core and @mantine/hooks to version 6.0.21
- Updated TypeScript configuration for better type checking
- Added specific type declarations for dev dependencies
- Fixed Mantine Paper component prop types
- Added proper environment variables for TypeScript compilation

## [1.1.16] - 2024-01-18

### Fixed
- Updated FileInput components to use proper Mantine props
- Fixed type errors in CharacterPortrait and BackupManager components
- Removed invalid placeholder prop from FileInput
- Added proper label and description props to FileInput

## [1.1.15] - 2024-01-18

### Fixed
- Updated Docker configuration for proper TypeScript support
- Added explicit Mantine Core dependency installation in Dockerfile
- Fixed TypeScript type resolution in development environment
- Added proper volume mounts for node_modules and TypeScript compilation
- Improved build process with explicit dependency installation

## [1.1.14] - 2024-01-18

### Fixed

- Updated jspdf-autotable to compatible version 3.5.31
- Updated jspdf to version 2.5.1
- Fixed npm version requirements in package.json
- Added proper version resolutions for PDF generation dependencies

## [1.1.13] - 2024-01-18

### Fixed

- Resolved TypeScript version conflict with react-scripts
- Fixed dependency resolution by pinning TypeScript to 4.9.5
- Updated package.json resolutions for better dependency management

## [1.1.12] - 2024-01-18

### Fixed

- Updated docker-compose.yml with proper npm and certificate configurations
- Added npm cache volume for better build performance
- Fixed user permissions in development container
- Added security options and read-only configuration
- Improved development environment stability

## [1.1.11] - 2024-01-18

### Fixed

- Fixed npm ci installation issues in Docker build
- Added proper package-lock.json generation
- Updated npm installation process to handle dependencies correctly
- Fixed npm production build configuration

## [1.1.10] - 2024-01-18

### Fixed

- Fixed Alpine Linux certificate verification errors
- Added wget for secure package downloads
- Updated package installation order for better dependency resolution
- Fixed SSL certificate chain issues in Docker build

## [1.1.9] - 2024-01-18

### Fixed

- Fixed Alpine Linux package installation failures
- Added proper CA certificates handling in Dockerfile
- Updated Alpine package repository configuration
- Added libc6-compat for better compatibility
- Fixed certificate verification issues in Docker build

## [1.1.8] - 2024-01-18

### Fixed

- Added proper JSX runtime configuration in TypeScript
- Updated package.json with correct React runtime dependencies
- Fixed JSX import source configuration
- Added TypeScript module resolution for JSX runtime

## [1.1.7] - 2024-01-18

### Fixed

- Added missing Mantine UI dependencies and types
- Fixed module resolution for @mantine/core and related packages
- Added required Emotion dependencies for Mantine
- Updated package.json with proper dependency versions

## [1.1.6] - 2024-01-18

### Fixed

- Added proper React type declarations to resolve module resolution issues
- Updated TypeScript configuration for better React support
- Added missing devDependencies for TypeScript type definitions
- Fixed module resolution in tsconfig.json

## [1.1.5] - 2024-01-18

### Fixed

- Added missing React imports to all TSX files to resolve JSX scope issues
- Fixed TypeScript React component declarations
- Improved type safety in component imports

## [1.1.4] - 2024-01-18

### Fixed

- Resolved npm certificate issues in Docker build
- Added proper CA certificates handling
- Updated npm configuration for better security
- Added npm cache volume for improved build performance
- Fixed strict SSL settings for npm registry

## [1.1.3] - 2024-01-18

### Fixed

- Updated nginx image to nginx:1.25.3-alpine to resolve image resolution failures
- Simplified nginx configuration for better compatibility
- Updated Docker base images to ensure availability

## [1.1.2] - 2024-01-18

### Security & Dependencies

- Fixed npm audit vulnerabilities:
  - Updated dompurify to ^3.2.4 to fix XSS vulnerability
  - Updated nth-check to ^2.0.1 to fix RegExp complexity issue
  - Updated postcss to ^8.4.31
  - Updated svgo to ^2.8.0
- Addressed deprecated Babel plugins by updating to transform versions
- Fixed npm installation process in Docker build
- Added resolutions in package.json to enforce secure dependency versions
- Improved npm configuration with audit-level and security settings
- Added memory and CPU constraints for containers

## [1.1.1] - 2024-01-18

### Fixed

- Updated Docker image digests to latest available versions
  - node:20.11-alpine3.19 (sha256:b63c41b8

## Setup

### Development

```bash
# Enable improved build performance (optional)
export COMPOSE_BAKE=true

# Start development environment
docker compose up app_dev
)
  - nginx:1.25.3-alpine-slim (sha256:566aa8b6)

## [1.1.0] - 2024-01-18

### Troubleshooting

- Fixed issue with Docker image resolution failures:
  - Issue: Failed to resolve nginx:1.25.3-alpine-slim image
  - Error: `failed to solve: nginx:1.25.3-alpine-slim@sha256:31bad00311cb5eeb8a6648beadcf67277a2134dc3ac8a38b068570379a48a961: not found`
  - Resolution: Docker image digest needs to be updated due to image being removed from registry

- Fixed Docker image loading issues with nginx:1.25.3-alpine-slim and node:20.11-alpine3.19
- Added error handling for failed container image pulls
- Updated container image references to ensure compatibility

## [1.0.9] - 2024-01-18

### Security

- Updated Node.js image to use recommended tag format (20.11-alpine3.19)

## [1.0.8] - 2024-01-18

### Security & Performance

- Added memory and CPU limits to containers
- Configured logging rotation and size limits
- Added secure tmpfs mounts
- Enhanced nginx configuration validation in healthcheck
- Improved resource constraints for development and production

## [1.0.7] - 2024-01-18

### Security

- Updated nginx image to latest secure digest (1.25.3-alpine-slim)

## [1.0.6] - 2024-01-18

### Security

- Enhanced docker-compose.yml with improved security settings
- Added process and file limits for containers
- Updated user mappings to match Dockerfile changes
- Restricted container capabilities
- Added container health checks

## [1.0.5] - 2024-01-18

### Security

- Updated Node.js image to latest secure digest (20.11.0-alpine3.19)

## [1.0.4] - 2024-01-18

### Security

- Updated nginx image to latest secure digest (1.25.3-alpine-slim)

## [1.0.3] - 2024-01-18

### Security

- Updated to Node 20.11.0-alpine3.19 with latest secure digest
- Enhanced file system permissions and read-only configuration
- Added npm audit checks during build
- Improved nginx security headers
- Implemented strict Content Security Policy
- Added server_tokens off directive
- Enhanced user permissions and ownership

## [1.0.2] - 2024-01-18

### Security

- Updated Node.js image digest to latest secure version (18.19.0-alpine3.19)

## [1.0.1] - 2024-01-18

### Security

- Updated to Node 18.19.0-alpine3.19 with fixed digest
- Updated to nginx 1.25.3-alpine-slim with fixed digest
- Added security headers in nginx configuration
- Implemented non-root user for both build and runtime
- Added proper file ownership and permissions
- Improved Content Security Policy

## [1.0.0] - 2024-01-18

### Added

- User authentication and profile management
- Multi-character support per user
- Character sheet creation and management
- Spell management system
- Equipment tracking with weight calculation
- Dice rolling functionality
- PDF export capability
- Character sharing via codes
- Backup and restore system
- Dark/Light theme toggle
- Docker development and production environments
- Nginx configuration for production deployment

### Security

- User data isolation
- Secure password handling
- HTTP security headers
- Docker security best practices

### Technical

- React 18 with TypeScript
- Mantine UI components
- Local storage with user segregation
- Docker multi-stage builds
- Development and production Docker configurations

## [0.5.1] - UNRELEASED

### Added

- User profile management interface
- Account settings with password change
- Account deletion functionality
- User dropdown menu in header
- Improved navigation between character sheets and account settings

## [0.5.0] - UNRELEASED

### Added

- User authentication system
- Multi-character support per user
- Private character management
- User-specific storage
- Login/Logout functionality
- Authentication state management

## [0.4.0] - UNRELEASED

### Enhanced

- Form validation with error checking
- Class selection with detailed features and starting equipment
- Ability score system with Standard Array and Point Buy options
- Character saving system with timestamps and auto-save
- Character loading with sorted list by last modified

## [0.3.5] - UNRELEASED

### Added

- Dark/Light theme toggle with persistent storage
- Global theme provider with consistent styling
- Theme-aware components and layouts
- Responsive header with theme toggle

## [0.3.4] - UNRELEASED

### Added

- Character backup system with JSON export
- Backup restoration functionality
- Multi-character backup support
- Automatic backup file naming with timestamps

## [0.3.3] - UNRELEASED

### Added

- Character sharing functionality with share codes
- Import/Export system for character data
- Copy to clipboard functionality for share codes

## [0.3.2] - UNRELEASED

### Added

- PDF export functionality with character details
- Formatted PDF output including ability scores, skills, equipment, and spells
- Auto-generated character sheet filename

## [0.3.1] - UNRELEASED

### Added

- Interactive dice roller with support for all D&D dice types
- Multi-dice rolling capability
- Roll results history and sum calculation

## [0.3.0] - UNRELEASED

### Added

- Character portrait upload and display
- Experience points and level progression tracking
- Skill proficiencies with ability score modifiers
- Progress bar for level advancement
- Automatic proficiency bonus calculation

## [0.2.0] - UNRELEASED

### Added

- Spell management system with spell schools and levels
- Equipment tracking with weight calculation
- Tabbed interface for better organization

## [0.1.0] - Initial Release - UNRELEASED

### Added

- Basic project structure
- Docker configuration
- README documentation
- Initial web application setup
- Basic character sheet form implementation
- Ability scores calculation with modifiers
- Character class selection with D&D 5e classes
- Local storage integration for character saving
- Character loading functionality with selection interface

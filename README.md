# D&D Character Sheet Manager

Version 1.0.0

A web application for creating, managing, and storing Dungeons & Dragons character sheets.

## Features

### User Management

- User authentication and profile management
- Multiple character sheets per user
- Private character management
- Account settings and preferences

### Character Features

- Interactive character sheet creation
- Class selection with features and equipment
- Ability scores (Manual, Standard Array, Point Buy)
- Spell management
- Equipment tracking
- Character portraits
- Level progression tracking

### Tools & Utilities

- Dice roller
- PDF export
- Character sharing
- Data backup/restore
- Dark/Light theme


### Development

```bash
# Enable improved build performance (optional)
export COMPOSE_BAKE=true

# Start development environment
docker compose up app_dev

# Access the application at http://localhost:3000
```

### Production

```bash
# Start production environment
docker compose up app_prod

# Access the application at http://localhost
```

### Environment Variables

- `NODE_ENV`: Set to 'development' or 'production'
- Default ports: 3000 (dev), 80 (prod)

## Security

- User data isolation
- Secure password handling
- HTTP security headers
- Docker security best practices

## Project Structure

```
dnd_character/
├── src/
│   ├── components/         # React components
│   │   ├── CharacterSheet/
│   │   ├── UserProfile/
│   │   └── ThemeProvider/
│   ├── services/          # Business logic services
│   │   ├── AuthService.ts
│   │   ├── CharacterService.ts
│   │   └── ValidationService.ts
│   └── types/            # TypeScript type definitions
├── public/              # Static files and assets
├── docker/             # Docker configuration files
│   └── nginx.conf
├── Dockerfile          # Multi-stage build configuration
├── docker-compose.yml  # Development and production setups
├── package.json       # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── CHANGELOG.md      # Version history
├── SECURITY.md       # Security policies
└── README.md        # Documentation
```

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

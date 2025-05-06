# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please submit an issue marked with the "security" label. We take all security vulnerabilities seriously and will respond within 48 hours.

## Security Measures

### Application Security

- User data isolation
- Secure password handling
- Content Security Policy (CSP)
- XSS protection headers
- CSRF protection

### Docker Security

- Non-root users
- Read-only file systems
- Limited container capabilities
- Resource constraints
- Regular security updates
- Secure base images with fixed digests

### Development Practices

- npm audit during builds
- Dependency scanning
- Regular security patches
- Access control
- Input validation

## Security Headers

All responses include:

- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Content-Security-Policy
- Cache-Control

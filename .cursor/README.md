# Cursor AI Configuration for Agentic Todo List

This folder contains Cursor AI-specific configuration files that help maintain consistency and best practices across the project.

## Files Overview

### 📋 `rules`
The main rules file that Cursor AI uses to understand project structure, coding standards, and best practices. This file contains:

- **Project Overview**: Architecture and tech stack information
- **Architecture Rules**: Monorepo, backend, frontend, and shared package guidelines
- **Coding Standards**: TypeScript, naming conventions, file organization
- **Design Patterns**: Backend, frontend, and shared patterns
- **API Design**: RESTful endpoints and validation
- **Error Handling**: Backend and frontend error handling strategies
- **Testing**: Testing guidelines and frameworks
- **Performance**: Optimization strategies
- **Security**: Security best practices
- **Environment & Configuration**: Environment variables and Docker setup
- **Deployment**: Deployment strategies
- **Monitoring & Logging**: Logging and monitoring guidelines
- **Documentation**: Code and API documentation standards
- **Git Workflow**: Commit messages and branch strategy
- **Specific Project Rules**: Todo feature and database schema guidelines
- **Common Pitfalls**: Things to avoid
- **Tools & Configuration**: Development and build tools
- **Emergency Procedures**: Troubleshooting steps
- **Contribution Guidelines**: Code review and submission process

### ⚙️ `settings.json`
JSON configuration file that provides structured metadata about the project:

- **Project Information**: Name, description, architecture type
- **Tech Stack**: Detailed breakdown of backend, frontend, and shared technologies
- **Conventions**: Naming conventions and import rules
- **Patterns**: Design patterns used in each package
- **File Structure**: Expected file organization
- **Development**: Common commands and workflows
- **Quality**: Tools and standards for code quality

### 📝 `templates.md`
Code templates for common patterns in the project:

- **Backend Templates**: NestJS modules, controllers, services, DTOs, entities
- **Frontend Templates**: React components, custom hooks, context providers
- **Shared Templates**: Type definitions, utility functions, constants
- **Usage Instructions**: How to use the templates effectively

### 🚀 `commands.md`
Quick reference guide for common commands and workflows:

- **Development Commands**: Start, build, test, lint, format
- **Docker Commands**: Container management and orchestration
- **Database Commands**: PostgreSQL operations
- **Package Management**: Adding/removing dependencies
- **Git Commands**: Common Git workflows and conventional commits
- **NestJS CLI Commands**: Code generation commands
- **NextJS Commands**: Frontend development commands
- **Environment Setup**: Environment variables and database setup
- **Troubleshooting**: Common issues and solutions
- **Performance**: Bundle analysis and monitoring
- **Deployment**: Production build and health checks

## How to Use

### For Cursor AI
1. **Automatic Recognition**: Cursor AI automatically reads these files when working in the project
2. **Context Awareness**: The AI will follow the rules and use the templates when generating code
3. **Consistency**: Ensures all generated code follows project standards

### For Developers
1. **Reference**: Use these files as quick references for project standards
2. **Templates**: Copy and modify templates when creating new features
3. **Commands**: Use the commands reference for common operations
4. **Onboarding**: New team members can use these files to understand the project

## Customization

### Adding New Rules
1. Edit the `rules` file to add project-specific guidelines
2. Update `settings.json` to reflect new technologies or patterns
3. Add new templates to `templates.md` for common patterns
4. Update `commands.md` with new workflows

### Project-Specific Modifications
- **Backend**: Add new NestJS patterns or database configurations
- **Frontend**: Add new React patterns or styling guidelines
- **Shared**: Add new utility patterns or type definitions
- **DevOps**: Add new deployment or monitoring commands

## Best Practices

### When Using Cursor AI
1. **Reference the Rules**: Always check the rules before making architectural decisions
2. **Use Templates**: Leverage the provided templates for consistency
3. **Follow Conventions**: Stick to the established naming and organization conventions
4. **Update Documentation**: Keep these files updated as the project evolves

### When Contributing
1. **Read the Rules**: Understand the project standards before contributing
2. **Use Templates**: Use the provided templates for new features
3. **Follow Commands**: Use the documented commands for common operations
4. **Update Files**: Update these configuration files when adding new patterns

## Maintenance

### Regular Updates
- **Monthly Reviews**: Review and update rules based on project evolution
- **Template Updates**: Add new templates as common patterns emerge
- **Command Updates**: Update commands as new tools or workflows are added
- **Rule Refinement**: Refine rules based on team feedback and best practices

### Version Control
- **Track Changes**: All changes to these files should be committed to version control
- **Document Changes**: Include explanations for significant rule or template changes
- **Team Review**: Have team members review changes to ensure consensus

## Integration with Other Tools

### ESLint and Prettier
- Rules align with ESLint configuration
- Templates follow Prettier formatting standards
- Commands include linting and formatting operations

### TypeScript
- Rules enforce TypeScript best practices
- Templates include proper type definitions
- Settings include TypeScript configuration details

### Docker
- Commands include Docker operations
- Rules cover containerization best practices
- Templates consider Docker deployment scenarios

## Troubleshooting

### Common Issues
1. **Cursor AI Not Following Rules**: Ensure files are in the correct location and format
2. **Templates Not Working**: Check that templates follow current project patterns
3. **Commands Failing**: Verify that all dependencies are installed and configured

### Getting Help
1. **Check Documentation**: Review the rules and templates for guidance
2. **Team Discussion**: Discuss with team members for project-specific questions
3. **Update Files**: Update these files based on lessons learned

## Future Enhancements

### Planned Improvements
- **Automated Validation**: Scripts to validate code against rules
- **Interactive Templates**: CLI tools for generating code from templates
- **Rule Testing**: Automated tests to ensure rules are followed
- **Integration**: Better integration with other development tools

### Feedback and Suggestions
- **Team Input**: Regular team feedback on rule effectiveness
- **Industry Standards**: Updates based on evolving industry best practices
- **Tool Integration**: Better integration with IDEs and development tools

---

**Note**: These files are living documents that should evolve with the project. Regular updates ensure they remain relevant and useful for the development team.

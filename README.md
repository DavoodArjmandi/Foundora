
# Foundora

Foundora is a microservices-based solution built with .NET Core 8, Entity Framework Core, Duende IdentityServer, and Docker. It follows Domain-Driven Design (DDD) principles and is intended to provide a robust, scalable platform for managing user authentication and authorization with role-based access control.

## Table of Contents

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Services](#services)
  - [IdentityService](#identityservice)
  - [FoundoraUI](#foundora-ui)
- [Setup](#setup)
- [Development](#development)
- [Testing](#testing)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Overview

This solution consists of multiple services that work together to provide the following functionalities:
- **Authentication**: Implemented using Duende IdentityServer.
- **User and Role Management**: Including CRUD operations and user-role assignments.
- **Microservices Architecture**: Built using .NET Core and Entity Framework Core.
- **UI**: Angular-based user interface with features for managing users and roles.
- **Docker**: The application is containerized for easy deployment.

## Folder Structure

The project is organized into several key components:

- `Foundora.sln`: Main solution file.
- `docker-compose.yml`: Defines the multi-container Docker setup.
- `FoundoraUI`: Frontend application built with Angular and NX Monorepo.
- `IdentityService`: Backend API for authentication, roles, and user management.
- `Test`: Unit and integration tests for the IdentityService.

### Key Folders:
- **FoundoraUI**: Contains Angular code for the UI, including user and role management features.
  - `apps/Admin`: Admin interface for managing users and roles.
  - `libs/data-access`: Shared data access logic, including user and role management services.
  - `libs/ui`: UI components and pages.
- **IdentityService**: A microservice for managing authentication, roles, and user management.
  - `IdentityService.Api`: Contains the API controllers and configuration.
  - `IdentityService.Application`: Contains business logic and CQRS implementations for commands and handlers.
  - `IdentityService.Infrastructure`: Contains the persistence layer, including repositories and migrations.
  - `IdentityService.Domain`: Contains the core domain models and entities for the IdentityService.
  - `IdentityService.Tests`: Unit tests for the IdentityService.

## Services

### IdentityService
The **IdentityService** manages user authentication and role-based access control using Duende IdentityServer. It consists of several components:
- **API**: Exposes endpoints for user authentication, registration, and role management.
- **Application Layer**: Contains commands and handlers for user and role management.
- **Infrastructure Layer**: Manages database interactions with Entity Framework Core.

### FoundoraUI
The **FoundoraUI** provides a user interface for managing users and roles. Built using Angular, it supports functionalities such as:
- User login and registration.
- Admin management for users and roles.

## Setup

### Prerequisites
- .NET 8 SDK
- Node.js and npm (for Angular)
- Docker (optional for containerized setup)

### Installation
Clone this repository to your local machine:

```bash
git clone [https://github.com/your-username/foundora.git](https://github.com/DavoodArjmandi/Foundora.git)
```

### Setup IdentityService
1. Navigate to the `IdentityService` folder.
2. Build and run the service:

```bash
dotnet build
dotnet run
```

### Setup FoundoraUI
1. Navigate to the `FoundoraUI` folder.
2. Install dependencies:

```bash
npm install
```

3. Start the frontend application:

```bash
npm nx serve admin
```

## Docker

The project uses Docker for easy deployment and testing in isolated environments. Ensure you have Docker installed and run:

```bash
docker-compose up
```

This command will build and start all services in containers.
Note: The FoundoraUI is not added to the ducker yet


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

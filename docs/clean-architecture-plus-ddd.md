# Clean Architecture with Domain-Driven Design (DDD) in NestJS

This document outlines the structure and principles of a NestJS application that follows Clean Architecture and Domain-Driven Design (DDD) principles. The application is organized into several modules, each representing a bounded context or domain.

## Project Structure

```plaintext
/src
├── api-gateway/
│   ├── controllers/
│   ├── interceptors/
│   ├── middleware/
│   └── api-gateway.module.ts
│
├── auth/
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── login.use-case.ts
│   │   │   ├── refresh-token.use-case.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── token.dto.ts
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── auth-token.entity.ts
│   │   ├── value-objects/
│   │   │   └── token.vo.ts
│   │   ├── services/
│   │   │   └── jwt.service.ts
│   │   └── interfaces/
│   │       └── auth.repository.ts
│   │
│   ├── infrastructure/
│   │   ├── repositories/
│   │   │   └── auth.repository.impl.ts
│   │   └── services/
│   │       └── jwt.service.impl.ts
│   │
│   ├── interface/
│   │   ├── controllers/
│   │   │   └── auth.controller.ts
│   │   └── auth.module.ts
│
├── user/
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── create-user.use-case.ts
│   │   │   └── update-profile.use-case.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   └── mappers/
│   │       └── user.mapper.ts
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── value-objects/
│   │   │   ├── email.vo.ts
│   │   │   └── address.vo.ts
│   │   ├── services/
│   │   │   └── password.service.ts
│   │   └── interfaces/
│   │       └── user.repository.ts
│   │
│   ├── infrastructure/
│   │   ├── repositories/
│   │   │   └── user.repository.prisma.ts
│   │   └── services/
│   │       └── password.service.bcrypt.ts
│   │
│   ├── interface/
│   │   ├── controllers/
│   │   │   └── user.controller.ts
│   │   └── user.module.ts
│
├── shared/
│   ├── domain/
│   │   └── exceptions/
│   │       └── domain-exception.ts
│   ├── infrastructure/
│   │   ├── prisma/
│   │   │   └── prisma.service.ts
│   │   └── logger/
│   │       └── logger.service.ts
│   └── constants.ts
│
├── main.ts
└── app.module.ts
```

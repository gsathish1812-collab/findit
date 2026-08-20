# FindIt — Campus Lost & Found Board

A fullstack web app that helps students report and recover lost items on campus. Instead of relying on messy WhatsApp groups or a physical lost-and-found box, FindIt gives users a searchable, filterable board where they can post lost/found items and message the poster directly.

## Features

- **JWT Authentication** — secure register/login with BCrypt password hashing
- **Post & Browse Items** — create lost/found reports with category, location, and status
- **Ownership Protection** — only the original poster can edit or delete their item
- **In-App Messaging** — comment on an item to contact the poster directly
- **Search & Filter** — filter by Lost / Found / Resolved, search by title/category/location
- **Mark as Resolved** — close the loop once an item is returned
- **Responsive Dashboard UI** — sidebar navigation, stat overview, works on mobile and desktop

## Tech Stack

**Backend:** Java, Spring Boot, Spring Security, Spring Data JPA, MySQL, JWT (jjwt)
**Frontend:** React (Vite), Axios
**Tools:** Postman (API testing), GitHub Desktop

## Architecture

- RESTful API with layered architecture (Controller → Service → Repository)
- JWT-based stateless authentication with a custom filter chain
- Relational data model: `User → Item → Comment`, with `@OneToMany` / `@ManyToOne` mappings
- DTOs used throughout to prevent sensitive data (e.g. password hashes) from leaking in API responses
- Centralized exception handling (`@RestControllerAdvice`) for clean, consistent error responses
- CORS configured for local frontend-backend communication

## Getting Started

### Prerequisites
- Java 17+
- Node.js
- MySQL Server

### Backend Setup
1. Create a MySQL database: `CREATE DATABASE findit_db;`
2. In `backend/src/main/resources/`, create a file called `application-local.properties`:
```properties
   spring.datasource.password=YOUR_MYSQL_PASSWORD
```
3. Run the app from `backend/` (via IntelliJ or `./mvnw spring-boot:run`)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173`

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login, returns JWT |
| GET | `/api/items` | List all items |
| POST | `/api/items` | Create an item (auth required) |
| PUT | `/api/items/{id}` | Update an item (owner only) |
| PATCH | `/api/items/{id}/resolve` | Mark item as resolved (owner only) |
| DELETE | `/api/items/{id}` | Delete an item (owner only) |
| GET/POST | `/api/items/{id}/comments` | View/add messages on an item |

## Author

Built by [Sathish](https://github.com/gsathish1812-collab) as a fullstack portfolio project.
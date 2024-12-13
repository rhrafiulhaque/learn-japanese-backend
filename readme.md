# Learn Japanese Language API

This repository provides the backend for an educational platform that allows users to manage lessons, tutorials, vocabulary, and users. Below is the API documentation, describing the routes and their functionalities for each feature of the application.

## API Overview

The application exposes RESTful APIs to manage lessons, tutorials, vocabulary, and user information. It uses Express for routing, MongoDB with Mongoose for data storage, and implements JWT authentication for secure access.

## Base URL

```
https:learn-japanese-backeend.vercel.app/api/v1

```

## Authentication

Most of the routes require authentication. Use JWT tokens for authentication. You can obtain a token by logging in with your user credentials.

- Login

```
POST /auth/login
```

-Register:

```
POST /auth/register
```

-Refresh Token:

```
 POST /auth/refresh-token
```

1. **Lessons**

Manage lessons (add, update, delete, retrieve).

```
POST /lessons/add
```

- **Description:** Add a new lesson.

- **Required Body:**

```json
{
  "lessonName": "Lesson Name",
  "lessonNumber": 1
}
```

- Authentication: Admin only
- Response:

```json
{
  "lessonName": "Lesson Name",
  "lessonNumber": 1,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

```
PATCH /lessons/:lessonId
```

- **Description:** Update a lesson by its ID.

- Required Body:

```
{
  "lessonName": "Updated Lesson Name",
  "lessonNumber": 2
}

```

- Authentication: Admin only

```
DELETE /lessons/:lessonId
```

- **Description**: Delete a lesson by its ID.
- **Authentication**: Admin only

```
GET /lessons
```

- **Description:** Get all lessons.
- **Authentication:** Admin and User

2. **Tutorials Manage tutorials (add, update, delete, retrieve).**

```
POST /tutorials/add
```

- **Description**: Add a new tutorial.
- Required Body:

```
{
  "tutorialTitle": "Tutorial Title",
  "tutorialLink": "https://example.com/tutorial"
}

```

- Authentication: Admin only

```
PATCH /tutorials/:tutorialId
```

- Description: Update a tutorial by its ID.
- Required Body:

```
{
  "tutorialTitle": "Updated Tutorial Title",
  "tutorialLink": "https://example.com/updated-tutorial"
}

```

- Authentication: Admin only

#### **DELETE /tutorials/:tutorialId**

- **Description**: Delete a tutorial by its ID.
- **Authentication**: Admin only

#### **GET /tutorials**

- **Description**: Get all tutorials.
- **Authentication**: Admin and User

---

### 2. Vocabulary

Manage vocabulary items (add, update, delete, retrieve).

#### **POST /vocabulary/add**

- **Description**: Add a new vocabulary item.
- **Required Body**:

```json
{
  "word": "Example",
  "pronunciation": "Example pronunciation",
  "meaning": "Meaning of the word",
  "whenToSay": "When to say this word",
  "lessonNumber": 1,
  "adminEmail": "admin@example.com"
}
```

- Authentication: Admin only

#### **PATCH /vocabulary/:vocId**

- **Description**: Update a vocabulary item by its ID.
- **Required Body**:

```json
{
  "word": "Updated Word",
  "pronunciation": "Updated Pronunciation",
  "meaning": "Updated Meaning",
  "whenToSay": "Updated Context",
  "lessonNumber": 2
}
```

- Authentication: Admin only

```
DELETE /vocabulary/:vocId
```

- Description: Delete a vocabulary item by its ID.
- Authentication: Admin only

```
GET /vocabulary
```

- Description: Get all vocabulary items.
- Authentication: Admin and User

```
GET /vocabulary/:lessonNo
```

- Description: Get vocabulary items by lesson number.
- Authentication: Admin and User

4. Users

### Manage user accounts (registration, login, role update, etc.).

```
POST /auth/register
```

- Description: Register a new user.
- Required Body:

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password",
  "profilePhoto": "file",
  "role": "user" // Optional (default: "user")
}
```

# Response:

```json
{
  "message": "User registered successfully"
}
```

```
POST /auth/login
```

- Description: Login a user and get JWT tokens.
- Required Body:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

# Response:

```json
{
  "user": {
    "name": "User Name",
    "email": "user@example.com",
    "role": "user",
    "profilePhoto": "url"
  },
  "tokens": {
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

```
GET /users/allusers
```

- Description: Get all users.
- Authentication: Admin only

```
PATCH /users/update-user-role/:userId
```

- Description: Update a user's role (admin/user).
- Required Body:

  ```json
  {
    "role": "admin"
  }
  ```

- Authentication: Admin only

```
POST /auth/refresh-token
```

- Description: Refresh the JWT token using a valid refresh token.
- Required Body:

  ```json
  {
    "refreshToken": "valid-refresh-token"
  }
  ```

## Middlewares

# verifyAuth

Verifies if the user is authenticated using JWT tokens.

- verifyAdmin

  Ensures the authenticated user is an admin.

- upload

  Handles file uploads for user profile photos.

- Error Handling

Errors are handled through AppError. Common error responses include:

```
    400 Bad Request: Missing or invalid data.
    401 Unauthorized: Authentication failed (e.g., invalid JWT token).
    403 Forbidden: Access denied for users without the required role.
    404 Not Found: Resource not found (e.g., tutorial, lesson, user).
    500 Internal Server Error: Server-side error.
```

# Example Error Response

```json
{
  "status": "error",
  "message": "Lesson name already exists"
}
```

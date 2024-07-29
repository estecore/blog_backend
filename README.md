# Estecore Blog Backend

**EN**

## Description

This is the backend part of the blog project developed by Estecore. This server project is based on Node.js and Express and manages users, posts and authentication. The web server connects to a MongoDB database for storing data.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/estecore/blog_backend.git
cd blog_backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file in the root directory and add the necessary environment variables:**

```dotenv
MONGO_CONNECT=<your_MongoDB_connection_string>
JWT_SECRET=<your_JWT_secret_key>
PORT=1234
```

4. **Start the server:**

```bash
npm run dev
```

The server will be started on `http://localhost:1234`.

## API

### Registration

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**

```json
{
"fullName": "First Name Last Name",
"email": "email@example.com",
"password": "password",
"avatarUrl": "avatar_URL" (optional)
}
```

### Login

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Logs in and returns a JWT token.
- **Request Body:**

```json
{
  "email": "email@example.com",
  "password": "password"
}
```

### Get user information

- **URL:** `/auth/me`
- **Method:** `GET`
- **Description:** Gets information about the current user.
- **Headers:** `Authorization: Bearer <token>`

### Posts

- **URL:** `/posts`

- **Method:** `GET` — Get all posts
- **Method:** `POST` — Create a new post (requires authorization)

- **URL:** `/posts/:id`
- **Method:** `GET` — Get a post by ID
- **Method:** `DELETE` — Delete a post by ID (requires authorization)
- **Method:** `PATCH` — Update a post by ID (requires authorization)

## Testing

For testing the API, use Postman or another tool for working with HTTP requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**Estecore**

---

**RU**

## Описание

Это бэкенд часть проекта блога, разрабатываемого Estecore. Этот серверный проект на основе Node.js и Express управляет пользователями, постами и аутентификацией. Веб-сервер подключается к базе данных MongoDB для хранения данных.

## Установка

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/estecore/blog_backend.git
   cd blog_backend
   ```

2. **Установите зависимости:**

   ```bash
   npm install
   ```

3. **Создайте файл `.env` в корневом каталоге и добавьте необходимые переменные окружения:**

   ```dotenv
   MONGO_CONNECT=<ваш_строка_подключения_к_MongoDB>
   JWT_SECRET=<ваш_секретный_ключ_для_JWT>
   PORT=1234
   ```

4. **Запустите сервер:**

   ```bash
   npm run dev
   ```

   Сервер будет запущен на `http://localhost:1234`.

## API

### Регистрация

- **URL:** `/auth/register`
- **Метод:** `POST`
- **Описание:** Регистрирует нового пользователя.
- **Тело запроса:**

  ```json
  {
    "fullName": "Имя Фамилия",
    "email": "email@example.com",
    "password": "пароль",
    "avatarUrl": "URL_аватара" (необязательно)
  }
  ```

### Вход

- **URL:** `/auth/login`
- **Метод:** `POST`
- **Описание:** Входит в систему и возвращает JWT токен.
- **Тело запроса:**

  ```json
  {
    "email": "email@example.com",
    "password": "пароль"
  }
  ```

### Получить информацию о пользователе

- **URL:** `/auth/me`
- **Метод:** `GET`
- **Описание:** Получает информацию о текущем пользователе.
- **Заголовки:** `Authorization: Bearer <токен>`

### Посты

- **URL:** `/posts`

  - **Метод:** `GET` — Получить все посты
  - **Метод:** `POST` — Создать новый пост (требует авторизации)

- **URL:** `/posts/:id`
  - **Метод:** `GET` — Получить пост по ID
  - **Метод:** `DELETE` — Удалить пост по ID (требует авторизации)
  - **Метод:** `PATCH` — Обновить пост по ID (требует авторизации)

## Тестирование

Для тестирования API используйте Postman или другой инструмент для работы с HTTP-запросами.

## Лицензия

Этот проект лицензирован под [MIT License](LICENSE).

## Автор

**Estecore**

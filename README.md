
# 🧠 Roadmap & Architecture: Як це працює

Цей файл — твоя інструкція, куди "тикати" код, щоб система працювала як єдине ціле.



## 🏗 Логіка взаємодії (Flow)

Коли ти (користувач) створюєш задачу на фронтенді, відбувається такий ланцюжок:
1.  **Frontend** → `POST /api/tasks` → **Backend**.
2.  **Backend** → Зберігає в **PostgreSQL** → Кидає подію `TaskCreated` в **Kafka** (topic: `task-events`).
3.  **Email-Sender** → Слухає Kafka → Бачить `TaskCreated` → Шле тобі лист "Задачу створено".
4.  **Scheduler** → Раз на годину перевіряє базу → Бачить, що дедлайн близько → Кидає в **Kafka** подію `DeadlineApproaching`.
5.  **Email-Sender** → Бачить подію → Шле нагадування.

---

## 🛠 Детальний розріз класів та полів

### 1. `task-tracker-backend` (Центр прийняття рішень)
Тут лежить основна логіка.
*   **Entity `Task`**:
    *   `Long id`, `String title`, `String description`.
    *   `LocalDateTime deadline`.
    *   `Status status` (Enum: `BACKLOG`, `IN_PROGRESS`, `DONE`).
    *   `Long userId` (зв'язок із таблицею користувачів).
*   **Service**: Має метод `createTask()`, який не тільки зберігає в базу, а й викликає `KafkaTemplate.send()`.

### 2. `common-dto` (Спільна мова)
Це JAR-бібліотека, яку імпортують інші сервіси.
*   **`TaskEvent`**: Клас-контейнер, який літає через Kafka.
    *   Поля: `taskId`, `type` (CREATE/UPDATE/DELETE), `userEmail`, `taskTitle`.

### 3. `task-tracker-scheduler` (Будильник)
Це "легкий" сервіс, він не має контролерів.
*   **Job**: Метод із анотацією `@Scheduled(cron = "0 0 * * * *")`.
*   **Логіка**: Робить `SELECT * FROM tasks WHERE deadline < NOW + 24h`. Для кожної знайденої задачі створює `TaskEvent` і пуляє в Kafka.

### 4. `task-tracker-email-sender` (Поштар)
*   **Listener**: Клас із анотацією `@KafkaListener`.
*   **Логіка**: Отримує JSON, перетворює його назад у `TaskEvent`. Використовує `JavaMailSender`, щоб відправити текст на пошту через SMTP (наприклад, Mailjet).

---

## 🚩 План дій: Куди йти далі?

Тобі зараз треба рухатися за цим списком:

1.  **Налаштувати БД** (ми вже почали):
    *   Дописати `application.properties` у бекенді.
    *   Створити перший `Entity` (Task).
2.  **Запустити Kafka в Docker**:
    *   Додати блоки `zookeeper` та `kafka` у твій `docker-compose.yml`.
3.  **Створити `common-dto`**:
    *   Описати там класи подій, щоб `backend` та `email-sender` бачили один і той самий об'єкт.
4.  **Зв'язати сервіси**:
    *   Написати перший `Producer` у бекенді та `Consumer` в імейл-сендері.

---

## 💾 Таблиця зв'язків (Ports)

| Сервіс | Порт | База / Шина |
| :--- | :--- | :--- |
| **Backend** | `8080` | PostgreSQL (`5432`) |
| **Frontend** | `80` | Proxy to `8080` |
| **Kafka** | `9092` | — |
| **Scheduler** | — | Read-only access to DB |


Структура папок фронтенд
src/
├── assets/              # Картинки, логотипи, шрифти, глобальні стилі (index.css)
├── components/          # Спільні компоненти (цеглинки)
│   ├── ui/              # Базові елементи: Button.jsx, Input.jsx, Card.jsx
│   ├── layout/          # Каркас: Sidebar.jsx, Header.jsx, Footer.jsx
├── features/            # Бізнес-логіка розбита по фічах (найважливіша частина)
│   ├── auth/            # Все для логіну/реєстрації
│   │   ├── components/  # LoginForm.jsx
│   │   ├── services/    # authService.js (запити до API)
│   │   └── store/       # authSlice.js (якщо буде Redux)
│   ├── tasks/           # Все для завдань
│   │   ├── components/  # TaskList.jsx, TaskItem.jsx
│   │   └── hooks/       # useTasks.js (логіка отримання завдань)
├── pages/               # Сторінки (збирають фічі в купу)
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   └── NotFoundPage.jsx
├── api/                 # Конфігурація axios або fetch (базовий URL, інтерцептори)
├── hooks/               # Спільні кастомні хуки (наприклад, useAuth)
├── utils/               # Допоміжні функції (форматування дати, валідація)
├── App.jsx              # Головний файл з роутингом
└── main.jsx             # Точка входу

# Alpha Bank Hackathon - Front-End ![Alpha Bank Logo](https://github.com/Sh1iba/Sh1iba/blob/main/alfa.png)

Проект является фронтенд-частью для хакатона от Альфа-Банка. Цель задания — создать React-приложение, которое взаимодействует с API, отправляет данные через POST-запросы и отображает ответы сервера в пользовательском интерфейсе.

### 🛠️ Что включено

- **Фронтенд на React**: Приложение построено на React для создания динамического и отзывчивого пользовательского интерфейса.
- **Функциональность POST-запросов**: Приложение отправляет данные на сервер и отображает ответ, с обработкой ошибок.
- **Компоненты интерфейса**: Для отображения данных и отправки запросов используются модальное окно и кнопки.

## 👨🏻‍💻 Начало работы

Этот проект был создан с использованием [Create React App](https://reactjs.org/docs/create-a-new-react-app.html).

### 📂 Структура проекта
```
.
├── public/                     
│   └── index.html              # Основная HTML-страница
│   └── favicon.ico             # Иконка для браузера 
│
├── src/                       
│   ├── components/             
│   │   ├── App.jsx             # Главный компонент, управляющий состоянием и UI
│   │   ├── Header.js           # Компонент заголовка
│   │   └── ModalContext.js     # Контекст для управления модальным состоянием
│   ├── data.js                 # Данные о пользователе которые отправляются на бэк
│   ├── index.js                # Точка входа React-приложения
│   └── style.css               # Стили приложения
│
├── .gitignore                 
├── Dockerfile                  # Конфигурация Docker для создания контейнера
├── nginx.conf                  # Конфигурация Nginx для проксирования запросов
├── package-lock.json           # Автоматически сгенерированный файл зависимостей npm
├── package.json                # Настройки npm, скрипты и зависимости
└── README.md                   # Документация проекта
```

### ⚡ Как использовать

1. **Склонируйте репозиторий:**:
  ```bash
   git clone https://github.com/your_project.git
   cd your_project
   ```
2. **Установите зависимости:**:

  ```bash
   npm install
```
3. **Запустите приложение:**:

 ```bash
   npm start
```
Это запустит локальный сервер разработки и откроет приложение в браузере по адресу
 http://localhost:3000.
 
### 💼 Проект
Полная версия проекта - это клиент-серверное приложение, разработанное для рекомендаций клиентам оптимального способа подписания документов на основе их данных и контекста использования. Проект создан в рамках хакатона и включает в себя три ключевых компонента: фронтенд, бэкенд и ML-модель.
link https://github.com/Rodi-1/AlphaBank_Hakaton


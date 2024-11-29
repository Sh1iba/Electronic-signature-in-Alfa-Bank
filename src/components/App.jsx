import React, { useState, useEffect } from 'react';
import { Button } from 'your-component-library';
import Header from './Header';
import requestData from '../data';  // Импортируем данные для отправки из data.js
import '../style.css';  // Импортируем стили

const App = () => {
    const [modalAnatomy, setModalAnatomy] = useState(false);
    const [apiData, setApiData] = useState(null); // Для хранения данных от API
    const [responseMessage, setResponseMessage] = useState(''); // Для хранения ответа от сервера

    const handleModalAnatomy = () => {
        setModalAnatomy(!modalAnatomy);
    };

    // Функция для получения данных с API с использованием async/await
    const fetchRecommendation = async () => {
        console.log('Начало запроса к API');
        try {
            // Используем рабочий API (JSONPlaceholder)
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1'); // Пример API
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const data = await response.json();
            setApiData(data); // Сохраняем весь объект данных
            console.log('Успешный ответ от API', data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    // Используем useEffect для выполнения запроса при монтировании компонента
    useEffect(() => {
        fetchRecommendation(); // Запускаем функцию получения данных
    }, []); // Эффект выполнится один раз при монтировании компонента

    const sendData = () => {
        // Отправляем данные с помощью POST-запроса
        fetch('https://jsonplaceholder.typicode.com/posts', { // Замените на нужный URL API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData), // Используем данные из data.js
        })
            .then((response) => response.json())
            .then((data) => {
                setResponseMessage('Данные успешно отправлены!');
                console.log('Ответ от сервера:', data); // Выводим данные ответа от сервера
            })
            .catch((error) => {
                setResponseMessage('Произошла ошибка при отправке данных');
                console.error('Ошибка при отправке данных:', error);
            });
    };

    return (
        <div>
            {/* Добавляем иконку и текст в левом верхнем углу */}
            {modalAnatomy && (
                <div className="modal-header">
                    <i className="fas fa-building"></i> {/* Иконка Альфа-Банка */}
                    <span className="logo-text">Альфа Бизнес</span>
                </div>
            )}

            <Button
                className="modal-button"
                type="button"
                size="s"
                onClick={handleModalAnatomy}
            >
                Показать анатомию
            </Button>

            {modalAnatomy && (
                <div className="modal">
                    <Header />
                    <div className="modal-content">
                        {/* Проверяем, есть ли данные и выводим весь объект */}
                        {apiData ? (
                            <div>
                                <h2>Ответ от API:</h2>
                                {/* Преобразуем весь объект в строку с помощью JSON.stringify */}
                                <pre>{JSON.stringify(apiData, null, 2)}</pre>
                            </div>
                        ) : (
                            <p>Загрузка данных...</p> // Если данные еще не загружены
                        )}
                    </div>
                    <div className="modal-footer"></div>
                </div>
            )}

            {/* Кнопка для отправки данных */}
            <Button
                className="send-button"
                type="button"
                size="s"
                onClick={sendData}
            >
                Отправить данные
            </Button>

            {/* Сообщение о результате отправки */}
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default App;

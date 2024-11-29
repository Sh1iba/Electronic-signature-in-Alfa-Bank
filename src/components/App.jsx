import React, { useState, useEffect } from 'react';
import { Button } from 'your-component-library';
import Header from './Header';
import axios from 'axios'; // Импортируем axios для запросов
import '../style.css';  // Импортируем стили

const App = () => {
    const [modalAnatomy, setModalAnatomy] = useState(false);
    const [apiData, setApiData] = useState(null); // Для хранения данных от API

    const handleModalAnatomy = () => {
        setModalAnatomy(!modalAnatomy);
    };

    // Используем useEffect для получения данных с API
    useEffect(() => {
        // Пример API-запроса (замените URL на нужный)
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => {
                setApiData(response.data); // Сохраняем данные в состояние
            })
            .catch((error) => {
                console.error("Ошибка при загрузке данных: ", error);
            });
    }, []); // Эффект выполнится один раз при монтировании компонента

    return (
        <div>
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
                        {/* Проверяем, есть ли данные */}
                        {apiData ? (
                            <div>
                                <h2>Данные с API:</h2>
                                <pre>{JSON.stringify(apiData, null, 2)}</pre>
                            </div>
                        ) : (
                            <p>Загрузка данных...</p> // Если данные еще не загружены
                        )}
                    </div>
                    <div className="modal-footer">
                        {/* Можете добавить дополнительные действия или кнопки */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;

import React, { useState } from "react";
import { userData as initialUserData } from "../data"; // Импорт начальных данных с переименованием
import "../style.css";

function App() {
    const [userData, setUserData] = useState(initialUserData); // Используем данные из data.js
    const [isModalOpen, setModalOpen] = useState(false);

    const handleDeviceToggle = (device) => {
        setUserData({
            ...userData,
            currentDevice: device,
        });
    };

    const handleToggle = (field) => {
        setUserData({ ...userData, [field]: !userData[field] });
    };

    const handleAvailableMethodsChange = (method) => {
        setUserData({
            ...userData,
            availableMethods: userData.availableMethods.includes(method)
                ? userData.availableMethods.filter((m) => m !== method)
                : [...userData.availableMethods, method],
        });
    };

    const handleInputChange = (field, value) => {
        const parsedValue = isNaN(value) ? value : parseInt(value, 10);
        setUserData({ ...userData, [field]: parsedValue });
    };

    const handleNestedInputChange = (field, value) => {
        const keys = field.split(".");
        setUserData({
            ...userData,
            [keys[0]]: {
                ...userData[keys[0]],
                [keys[1]]: {
                    ...userData[keys[0]][keys[1]],
                    [keys[2]]: parseInt(value, 10),
                },
            },
        });
    };

    const handleMobileAppChange = () => {
        setUserData({
            ...userData,
            mobileApp: !userData.mobileApp,
            signatures: {
                ...userData.signatures,
                common: {
                    ...userData.signatures.common,
                    mobile: !userData.mobileApp ? 0 : userData.signatures.common.mobile,
                },
                special: {
                    ...userData.signatures.special,
                    mobile: !userData.mobileApp ? 0 : userData.signatures.special.mobile,
                },
            },
        });
    };

    const handleApply = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/recommend/get", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch recommendations");
            }

            const result = await response.json();
            console.log("Ответ от сервера:", result);
            setModalOpen(true);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className="app">
            {/* Иконка Альфа-Банка */}
            <div className="logo">
                <img src="/alpha-bank-logo.png" alt="Alpha Bank" className="logo-img" />
            </div>

            <h1 className="title">Контекст</h1>

            <div className="toggle-group">
                <button
                    className={`toggle-button ${
                        userData.currentDevice === "web" ? "active" : ""
                    }`}
                    onClick={() => handleDeviceToggle("web")}
                >
                    Web
                </button>
                <button
                    className={`toggle-button ${
                        userData.currentDevice === "mobile" ? "active" : ""
                    }`}
                    onClick={() => handleDeviceToggle("mobile")}
                >
                    Mobile
                </button>
                <button
                    className={`toggle-button ${userData.isFirstLogIn ? "active" : ""}`}
                    onClick={() => handleToggle("isFirstLogIn")}
                >
                    Первый вход
                </button>
            </div>

            <div className="form">
                <h2 className="form-title">Данные о пользователе</h2>

                <label>
                    ИД пользователя:
                    <input
                        type="number"
                        value={userData.clientId}
                        onChange={(e) => handleInputChange("clientId", e.target.value)}
                    />
                </label>
                <label>
                    ИД организации:
                    <input
                        type="number"
                        value={userData.organizationId}
                        onChange={(e) => handleInputChange("organizationId", e.target.value)}
                    />
                </label>
                <label>
                    Сегмент:
                    <select
                        value={userData.segment}
                        onChange={(e) => handleInputChange("segment", e.target.value)}
                    >
                        <option value="Малый бизнес">Малый бизнес</option>
                        <option value="Средний бизнес">Средний бизнес</option>
                        <option value="Крупный бизнес">Крупный бизнес</option>
                    </select>
                </label>
                <label>
                    Роль:
                    <select
                        value={userData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                    >
                        <option value="ЕИО">ЕИО</option>
                        <option value="Сотрудник">Сотрудник</option>
                    </select>
                </label>
                <label>
                    Количество организаций:
                    <input
                        type="number"
                        value={userData.organizations}
                        onChange={(e) => handleInputChange("organizations", e.target.value)}
                    />
                </label>

                <label>
                    Уже подключенные способы подписания:
                    <div className="methods">
                        {["SMS", "PayControl", "КЭП на токене", "КЭП в приложении"].map((method) => (
                            <button
                                key={method}
                                className={`toggle-button ${
                                    userData.availableMethods.includes(method) ? "active" : ""
                                }`}
                                onClick={() => handleAvailableMethodsChange(method)}
                            >
                                {method}
                            </button>
                        ))}
                    </div>
                </label>

                <label>
                    Количество подписанных базовых документов (Mobile):
                    <input
                        type="number"
                        value={userData.signatures.common.mobile}
                        onChange={(e) =>
                            handleNestedInputChange("signatures.common.mobile", e.target.value)
                        }
                        disabled={!userData.mobileApp}
                    />
                </label>
                <label>
                    Количество подписанных базовых документов (Web):
                    <input
                        type="number"
                        value={userData.signatures.common.web}
                        onChange={(e) =>
                            handleNestedInputChange("signatures.common.web", e.target.value)
                        }
                    />
                </label>
                <label>
                    Количество подписанных документов особой важности (Mobile):
                    <input
                        type="number"
                        value={userData.signatures.special.mobile}
                        onChange={(e) =>
                            handleNestedInputChange("signatures.special.mobile", e.target.value)
                        }
                        disabled={!userData.mobileApp}
                    />
                </label>
                <label>
                    Количество подписанных документов особой важности (Web):
                    <input
                        type="number"
                        value={userData.signatures.special.web}
                        onChange={(e) =>
                            handleNestedInputChange("signatures.special.web", e.target.value)
                        }
                    />
                </label>
                <label>
                    Наличие обращений в банк:
                    <input
                        type="number"
                        value={userData.claims}
                        onChange={(e) => handleInputChange("claims", e.target.value)}
                    />
                </label>
            </div>

            <label>
                Наличие мобильного приложения:
                <button
                    className={`toggle-button ${userData.mobileApp ? "active" : ""}`}
                    onClick={handleMobileAppChange}
                >
                    {userData.mobileApp ? "Активировано" : "Не активировано"}
                </button>
            </label>

            <button className="apply-button" onClick={handleApply}>
                Применить
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Рекомендации</h2>
                        <p>
                            {userData.currentDevice === "mobile"
                                ? "Рекомендуется использовать мобильное приложение."
                                : "Рекомендуется использовать веб-версию."}
                        </p>
                        <button className="close-button" onClick={handleModalClose}>
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

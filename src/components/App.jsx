import React, { useState } from 'react';
import { Button } from 'your-component-library';
import Header from './Header';
import '../style.css';  // Импортируем стили

const App = () => {
    const [modalAnatomy, setModalAnatomy] = useState(false);

    const handleModalAnatomy = () => {
        setModalAnatomy(!modalAnatomy);
    };

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
                    <div className="modal-content"></div>
                    <div className="modal-footer"></div>
                </div>
            )}
        </div>
    );
};

export default App;

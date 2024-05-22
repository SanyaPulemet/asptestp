import React, { useState } from 'react';
import './tabbuttons.css';

const TabButtons = ({ activeTab, onChangeTab }) => {
    const tabs = ['Основная информация', 'Отпуск', 'Оборудование'];
    return (
        <div>
            <div className="my-tab-buttons">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => onChangeTab(tab)}
                        className={`font-semibold, my-tab-button ${activeTab === tab ? 'my-active' : ''}`}
                    >
                        {tab}
                        <span className="underline" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabButtons;
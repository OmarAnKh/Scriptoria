import React, { useState } from 'react';
import './DiscoverTable.css';
import TabItem from './TabItem';

const DiscoverTable = () => {
    const [activeTab, setActiveTab] = useState('All Genre');

    const TabItems = [
        { genre: "Action" },
        { genre: "Horror" },
        { genre: "Romance" }
    ];

    const handleTabClick = (genre) => {
        setActiveTab(genre);
    };

    return (
        <section className="tab-home">
            <ul className="nav nav-tabs">
                <div className="first-tab title-tabs">
                    <TabItem isActive={activeTab === 'All Genre'} onClick={() => handleTabClick('All Genre')}>
                        All Genres
                    </TabItem>
                </div>
                <div className="tabs">
                    {TabItems.map((item, index) => (
                        <TabItem
                            key={index}
                            isActive={activeTab === item.genre}
                            onClick={() => handleTabClick(item.genre)}>
                            {item.genre}
                        </TabItem>
                    ))}
                </div>
            </ul>
        </section>
    );
};

export default DiscoverTable;

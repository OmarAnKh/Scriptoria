import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            applyDarkTheme();
            setIsDarkTheme(true);
        }
    }, []); // Run once on component mount to check if a theme is stored

    const applyLightTheme = () => {
        document.documentElement.style.setProperty('--accent-Color', '#E1D8D1');
        document.documentElement.style.setProperty('--text-Color', '#000000');
        document.documentElement.style.setProperty('--primary-Color', '#AC967F');
        document.documentElement.style.setProperty('--background-Color', '#ECECEC');
        localStorage.setItem('theme', 'light');
        setIsDarkTheme(false);
    };

    const applyDarkTheme = () => {
        document.documentElement.style.setProperty('--accent-Color', '#2F3438');
        document.documentElement.style.setProperty('--text-Color', '#ffffff');
        document.documentElement.style.setProperty('--primary-Color', '#3F4448');
        document.documentElement.style.setProperty('--background-Color', '#3F4448');
        localStorage.setItem('theme', 'dark');
        setIsDarkTheme(true);
    };

    const toggleTheme = () => {
        if (isDarkTheme) {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    };

    return (
        <div className="App">
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

export default ThemeToggle;

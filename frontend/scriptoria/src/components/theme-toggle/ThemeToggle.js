import { useState, useEffect } from 'react';
import lightLogo from './../../img/scriptoria-logo-white.png'
import darkLogo from './../../img/scriptoria-logo-black.png'

const useThemeToggle = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            applyDarkTheme();
            setIsDarkTheme(true);
        }
    }, []);

    const applyLightTheme = () => {
        document.documentElement.style.setProperty('--accent-Color', '#E1D8D1');
        document.documentElement.style.setProperty('--text-Color', '#000000');
        document.documentElement.style.setProperty('--primary-Color', '#AC967F');
        document.documentElement.style.setProperty('--background-Color', '#ECECEC');
        document.documentElement.style.setProperty('--darker--primary-Color', '#564B40');
        document.documentElement.style.setProperty('--logo', `url(${darkLogo})`);
        localStorage.setItem('theme', 'light');
        setIsDarkTheme(false);
    };

    const applyDarkTheme = () => {
        document.documentElement.style.setProperty('--accent-Color', '#2F3438');
        document.documentElement.style.setProperty('--text-Color', '#ffffff');
        document.documentElement.style.setProperty('--primary-Color', '#3F4448');
        document.documentElement.style.setProperty('--background-Color', '#3F4448');
        document.documentElement.style.setProperty('--darker--primary-Color', '#b3b2b2');
        document.documentElement.style.setProperty('--logo', `url(${lightLogo})`);
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

    return toggleTheme;
};

export default useThemeToggle;

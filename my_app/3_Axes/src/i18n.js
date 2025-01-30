import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationPL from './locales/pl/translation.json';
import translationEN from './locales/en/translation.json';

// Pobranie języka z localStorage lub ustawienie domyślnego
const savedLanguage = localStorage.getItem('language') || 'pl';

i18n.use(initReactI18next).init({
    resources: {
        pl: { translation: translationPL },
        en: { translation: translationEN },
    },
    lng: savedLanguage, // Ustawienie języka z localStorage
    fallbackLng: 'pl',
    interpolation: { escapeValue: false },
});

// Funkcja do zmiany języka i zapisania go w localStorage
export const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
};

export default i18n;

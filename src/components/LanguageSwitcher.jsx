import { useState } from 'react';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('pt-br');

  const languages = [
    {
      code: 'pt-br',
      label: 'por',
      flag: (
        <svg width="24" height="24" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_brazil" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="54" height="54">
            <circle cx="27" cy="27" r="27" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_brazil)">
            <rect width="54" height="54" fill="#008557"/>
            <path d="M27 10.5L49.5 27L27 43.5L4.5 27L27 10.5Z" fill="#FFC600"/>
            <path d="M27.375 37.5C32.9669 37.5 37.5 32.799 37.5 27C37.5 21.201 32.9669 16.5 27.375 16.5C21.7831 16.5 17.25 21.201 17.25 27C17.25 32.799 21.7831 37.5 27.375 37.5Z" fill="#003758"/>
            <path d="M17.4023 25.1819C18.6868 24.8987 20.0164 24.75 21.3761 24.75C27.3271 24.75 32.7029 27.5988 36.2284 32.1004C36.916 30.8198 37.3527 29.3744 37.4695 27.8357C33.3366 23.6097 27.6514 21 21.3761 21C20.5673 21 19.7683 21.0434 18.9812 21.1279C18.2003 22.3262 17.6517 23.7007 17.4023 25.1819Z" fill="white"/>
          </g>
        </svg>
      )
    }
  ];

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  return (
    <div className="language-switcher">
      {languages.map((language) => (
        <button
          key={language.code}
          className={`language-switcher__option ${selectedLanguage === language.code ? 'language-switcher__option--active' : ''}`}
          onClick={() => handleLanguageChange(language.code)}
          aria-label={`Switch to ${language.label}`}
        >
          <div className="language-switcher__flag">
            {language.flag}
          </div>
          <span className="language-switcher__text">
            {language.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;

import { useState } from 'react';
import './Timeline.css';
import LanguageSwitcher from './LanguageSwitcher';

const Timeline = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('0.5x');

  const years = [
    'PR�� 2013',
    '2013',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025'
  ];

  const speeds = ['0.5x', '1x', '2x'];

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleSpeedClick = () => {
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  return (
    <div className="timeline">
      <div className="timeline__controls">
        <button
          className="timeline__play-button"
          onClick={handlePlayToggle}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32 68.7001V27.3C32 26.1667 32.4 25.2167 33.2 24.45C34 23.6834 34.9333 23.3 36 23.3C36.3333 23.3 36.6833 23.35 37.05 23.45C37.4167 23.55 37.7667 23.7 38.1 23.9L70.7 44.6C71.3 45.0001 71.75 45.5001 72.05 46.1C72.35 46.7001 72.5 47.3334 72.5 48.0001C72.5 48.6667 72.35 49.3001 72.05 49.9001C71.75 50.5001 71.3 51.0001 70.7 51.4001L38.1 72.1001C37.7667 72.3001 37.4167 72.4501 37.05 72.5501C36.6833 72.6501 36.3333 72.7001 36 72.7001C34.9333 72.7001 34 72.3167 33.2 71.5501C32.4 70.7834 32 69.8334 32 68.7001Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="timeline__years">
        {years.map((year) => (
          <button
            key={year}
            className={`timeline__year ${selectedYear === year ? 'timeline__year--active' : ''}`}
            onClick={() => handleYearClick(year)}
          >
            <span>{year}</span>
          </button>
        ))}
      </div>

      <div className="timeline__speed">
        <button
          className="timeline__speed-button"
          onClick={handleSpeedClick}
        >
          {speed}
        </button>
      </div>

      <LanguageSwitcher />
    </div>
  );
};

export default Timeline;

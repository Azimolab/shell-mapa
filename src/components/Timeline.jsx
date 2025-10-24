import React, { useState, useEffect } from 'react';

function Timeline({
  years = ['PRÉ 2013', '2013', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
  selectedYear = '2025',
  onYearSelect,
  onPlay,
  isPlaying = false,
  onSpeedChange,
  speed = '0.5x',
  language = 'POR',
  onLanguageChange
}) {
  const [currentSelected, setCurrentSelected] = useState(selectedYear);

  // Update local state when selectedYear prop changes
  useEffect(() => {
    setCurrentSelected(selectedYear);
  }, [selectedYear]);

  const handleYearClick = (year) => {
    setCurrentSelected(year);
    onYearSelect?.(year);
  };

  const handlePlayClick = () => {
    onPlay?.();
  };

  const handleSpeedClick = () => {
    onSpeedChange?.();
  };

  const handleLanguageClick = () => {
    onLanguageChange?.(language);
  };

  return (
    <div className="inline-flex items-center gap-5 relative scale-[0.8] origin-bottom md:flex-col md:items-stretch md:gap-4">
      <div className="flex items-start relative w-full max-w-full bg-transparent md:flex-col md:items-stretch">
        <div className="flex py-6 px-9 items-center gap-2 rounded-l-xl border border-(--grey-100) bg-white relative shrink-0 md:rounded-t-2xl md:rounded-b-none md:border-b-0 md:py-5 md:px-5 md:justify-center max-[480px]:py-4 max-[480px]:px-4">
          <button 
            className="bg-transparent border-none p-0 cursor-pointer transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95" 
            onClick={handlePlayClick}
          >
            <svg 
              className="w-16 h-16 aspect-square md:w-14 md:h-14 max-[480px]:w-12 max-[480px]:h-12 max-[1200px]:w-[72px] max-[1200px]:h-[72px]" 
              width="96" 
              height="96" 
              viewBox="0 0 96 96" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isPlaying ? (
                // Pause icon
                <>
                  <rect x="32" y="24" width="12" height="48" rx="2" fill="var(--grey-400)" />
                  <rect x="52" y="24" width="12" height="48" rx="2" fill="var(--grey-400)" />
                </>
              ) : (
                // Play icon
                <path 
                  d="M32 68.6998V27.2998C32 26.1665 32.4 25.2165 33.2 24.4498C34 23.6831 34.9333 23.2998 36 23.2998C36.3333 23.2998 36.6833 23.3498 37.05 23.4498C37.4167 23.5498 37.7667 23.6998 38.1 23.8998L70.7 44.5998C71.3 44.9998 71.75 45.4998 72.05 46.0998C72.35 46.6998 72.5 47.3331 72.5 47.9998C72.5 48.6665 72.35 49.2998 72.05 49.8998C71.75 50.4998 71.3 50.9998 70.7 51.3998L38.1 72.0998C37.7667 72.2998 37.4167 72.4498 37.05 72.5498C36.6833 72.6498 36.3333 72.6998 36 72.6998C34.9333 72.6998 34 72.3165 33.2 71.5498C32.4 70.7831 32 69.8331 32 68.6998Z" 
                  fill="var(--grey-400)"
                />
              )}
            </svg>
          </button>
        </div>

        <div className="flex py-6 px-5 items-center gap-1.5 border-y border-(--grey-100) bg-white relative flex-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:rounded-none md:border md:border-y-0 md:border-t-0 md:border-b-0 md:py-5 md:px-4 md:justify-start max-[1200px]:py-6 max-[1200px]:px-6 max-[480px]:py-4 max-[480px]:px-3">
          <div className="flex items-center gap-1.5 min-w-max">
            {years.map((year) => (
              <button
                key={year}
                className={`flex h-16 py-3 justify-center items-center gap-2 rounded-[50px] border-none cursor-pointer transition-all duration-200 font-[Inter,-apple-system,Roboto,Helvetica,sans-serif] text-[28px] font-normal leading-normal whitespace-nowrap shrink-0 ${
                  currentSelected === year 
                    ? 'px-[30px] bg-(--sky-500) text-white font-medium max-[1200px]:h-[72px] max-[1200px]:px-8 md:h-14 md:text-2xl md:px-6 max-[480px]:h-12 max-[480px]:px-5 max-[480px]:text-xl' 
                    : 'px-6 bg-transparent text-(--grey-400) hover:bg-[rgba(145,145,145,0.1)] hover:scale-[1.02] active:scale-[0.98] max-[1200px]:h-[72px] max-[1200px]:text-[32px] md:h-14 md:text-2xl md:px-5 max-[480px]:h-12 max-[480px]:px-4 max-[480px]:text-xl'
                }`}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="flex py-6 px-6 items-center gap-[60px] rounded-r-xl border border-(--grey-100) bg-white relative shrink-0 md:rounded-b-2xl md:rounded-t-none md:border-t-0 md:py-5 md:px-5 md:justify-center md:gap-6 max-[1200px]:py-6 max-[1200px]:px-6 max-[1200px]:gap-12 max-[480px]:py-4 max-[480px]:px-4">
          <button 
            className="flex h-16 py-3 px-6 justify-center items-center gap-2 rounded-[50px] border-none bg-transparent cursor-pointer transition-all duration-200 font-[Inter,-apple-system,Roboto,Helvetica,sans-serif] text-[28px] font-normal leading-normal text-(--sky-500) hover:bg-[rgba(2,127,162,0.1)] hover:scale-[1.02] active:scale-[0.98] md:h-14 md:py-2 md:px-5 md:text-2xl max-[1200px]:h-[72px] max-[1200px]:text-[32px] max-[480px]:h-12 max-[480px]:py-1.5 max-[480px]:px-4 max-[480px]:text-xl" 
            onClick={handleSpeedClick}
          >
            {speed}
          </button>
        </div>
      </div>

      <div className="flex w-[210px] py-6 px-9 items-center gap-2 rounded-xl border border-(--grey-100) bg-white relative shrink-0 md:w-full md:rounded-2xl md:py-5 md:px-5 max-[1400px]:w-[280px] max-[1400px]:py-6 max-[1400px]:px-9 max-[480px]:py-4 max-[480px]:px-4">
        <button 
          className="flex items-center gap-2.5 border-none bg-transparent cursor-pointer transition-all duration-200 w-full justify-center hover:scale-[1.02] active:scale-[0.98]" 
          onClick={handleLanguageClick}
        >
          <div className="flex w-16 h-16 p-[14px] justify-center items-center shrink-0 aspect-square relative md:w-14 md:h-14 md:p-3 max-[1400px]:w-[72px] max-[1400px]:h-[72px] max-[1400px]:p-4 max-[480px]:w-12 max-[480px]:h-12 max-[480px]:p-2.5">
            <svg
              className="w-9 h-9 shrink-0 aspect-square md:w-8 md:h-8 max-[1400px]:w-10 max-[1400px]:h-10 max-[480px]:w-7 max-[480px]:h-7"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="mask0_68_10647" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="54" height="54">
                <circle cx="27" cy="27" r="27" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_68_10647)">
                <rect width="54" height="54" fill="#008557"/>
                <path d="M27 10.5L49.5 27L27 43.5L4.5 27L27 10.5Z" fill="#FFC600"/>
                <path d="M27.375 37.5C32.9669 37.5 37.5 32.799 37.5 27C37.5 21.201 32.9669 16.5 27.375 16.5C21.7831 16.5 17.25 21.201 17.25 27C17.25 32.799 21.7831 37.5 27.375 37.5Z" fill="#003758"/>
                <path d="M17.4004 25.1819C18.6848 24.8987 20.0145 24.75 21.3742 24.75C27.3252 24.75 32.7009 27.5988 36.2265 32.1004C36.9141 30.8198 37.3507 29.3744 37.4676 27.8357C33.3346 23.6097 27.6495 21 21.3742 21C20.5654 21 19.7664 21.0434 18.9793 21.1279C18.1983 22.3262 17.6497 23.7007 17.4004 25.1819Z" fill="white"/>
              </g>
            </svg>
          </div>
          <div className="text-(--grey-400) text-center font-[Inter,-apple-system,Roboto,Helvetica,sans-serif] text-[28px] font-normal leading-normal uppercase md:text-2xl max-[1400px]:text-[32px] max-[480px]:text-xl">
            {language}
          </div>
        </button>
      </div>
    </div>
  );
}

export default Timeline;

import './RioHeadquarter.css';

const RioHeadquarter = () => {
  return (
    <div className="rio-headquarter">
      <div className="rio-headquarter__pin">
        <div className="rio-headquarter__icon">
          <svg width="92" height="99" viewBox="0 0 92 99" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="92" height="99" rx="12" fill="#E0E0E0"/>
            <path d="M67.3803 40.6683C64.7775 29.1746 54.7876 24 46.0124 24C46.0124 24 46.0124 24 45.9876 24C37.2372 24 27.2225 29.1498 24.6197 40.6434C21.7194 53.4805 29.5526 64.3522 36.6422 71.1937C39.2698 73.7312 42.6411 75 46.0124 75C49.3837 75 52.7549 73.7312 55.3578 71.1937C62.4474 64.3522 70.2806 53.5054 67.3803 40.6683ZM46.0124 53.1322C41.6991 53.1322 38.2039 49.6244 38.2039 45.2956C38.2039 40.9668 41.6991 37.459 46.0124 37.459C50.3256 37.459 53.8209 40.9668 53.8209 45.2956C53.8209 49.6244 50.3256 53.1322 46.0124 53.1322Z" fill="#343434"/>
          </svg>
        </div>
        <div className="rio-headquarter__content">
          <h3 className="rio-headquarter__title">Rio de Janeiro</h3>
          <p className="rio-headquarter__subtitle">HEADQUARTER</p>
        </div>
      </div>
      <div className="rio-headquarter__arrow">
        <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.3164 -2.16358e-05L18.6231 -2.20022e-05C22.4488 -2.28525e-05 24.0917 4.85492 21.0521 7.17804L13.7454 12.7625C12.3115 13.8585 10.3213 13.8585 8.88742 12.7625L1.5807 7.17804C-1.45885 4.85492 0.18401 -2.34537e-05 4.00968 -2.19437e-05L11.3164 -2.16358e-05Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
};

export default RioHeadquarter;

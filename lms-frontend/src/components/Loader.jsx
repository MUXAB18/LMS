const Loader = ({ text = 'Loading...' }) => (
  <div className="loader-wrapper">
    <div className="loader-spinner">
      <div className="spinner-ring"></div>
    </div>
    <p className="loader-text">{text}</p>
  </div>
);

export default Loader;

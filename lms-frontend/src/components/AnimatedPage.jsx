import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AnimatedPage = ({ children }) => {
  const location = useLocation();
  const [animationKey, setAnimationKey] = useState(location.pathname);

  useEffect(() => {
    // When the route changes, update the key to completely re-mount the animation hook
    setAnimationKey(location.pathname);
  }, [location.pathname]);

  return (
    <div key={animationKey} className="animate-page w-100 h-100 flex-grow-1">
      {children}
    </div>
  );
};

export default AnimatedPage;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useKeyNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case '1':
          navigate('/');
          break;
        case '2':
          navigate('/today');
          break;
        case '3':
          navigate('/calendar');
          break;
        case '4':
          navigate('/about');
          break;
        case '5':
          navigate('/background');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);
}

export default useKeyNavigation;
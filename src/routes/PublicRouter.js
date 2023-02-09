import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PublicRouter({ children }) {
  const auth = useSelector(state => state.auth.value);
  const role = useSelector(state => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && role === 'USER') {
      navigate('/mainpage');
    } else if (auth && role === 'ADMIN') {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  return <>{children}</>;
}

export default PublicRouter;

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
  const auth = useSelector(state => state.auth.value);
  const role = useSelector(state => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth && !role) {
      navigate('/login');
    } else if (auth && role === 'ADMIN') {
      navigate('/dashboard');
    }
  });

  return <>{children}</>;
};

export default PrivateRouter;

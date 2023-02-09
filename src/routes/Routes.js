import { Route, Routes } from 'react-router-dom';
import routesData from './routesData';
import NotFound from '../pages/NotFound';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import AdminRouter from './AdminRouter';

const AppRoutes = () => {
  return (
    <Routes>
      {routesData.publicRoutes.map((elem, index) => (
        <Route
          key={index}
          path={elem.path}
          element={<PublicRouter>{elem.element}</PublicRouter>}
        />
      ))}

      {routesData.privateRoutes.map((elem, index) => (
        <Route
          key={index}
          path={elem.path}
          element={<PrivateRouter>{elem.element}</PrivateRouter>}
        />
      ))}

      {routesData.AdminRoutes.map((elem, index) => (
        <Route
          key={index}
          path={elem.path}
          element={<AdminRouter>{elem.element}</AdminRouter>}
        />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

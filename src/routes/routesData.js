import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Mainpage from '../pages/Mainpage';
import Incomes from '../pages/Incomes';
import VerifyAccount from '../pages/VerifyAccount';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import IncomesCreate from '../pages/IncomesCreate';
import IncomesEdit from '../pages/IncomesEdit';
import Outcomes from '../pages/Outcomes';
import OutcomesCreate from '../pages/OutcomesCreate';
import OutcomesEdit from '../pages/OutcomesEdit';
import Savings from '../pages/Savings';
import SavingsCreate from '../pages/SavingsCreate';
import SavingsEdit from '../pages/SavingsEdit';
import Funds from '../pages/Funds';
import FundsCreate from '../pages/FundsCreate';
import FundsEdit from '../pages/FundsEdit';
import FundsUpdateValue from '../pages/FundsUpdateValue';
import Dashboard from '../pages/Dashboard/Users';
import UsersCreate from '../pages/Dashboard/UsersCreate';
import UsersEdit from '../pages/Dashboard/UsersEdit';

const routesData = {
  publicRoutes: [
    //Authentication
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/verify-account',
      element: <VerifyAccount />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
  ],
  privateRoutes: [
    //MainPage
    {
      path: '/mainpage',
      element: <Mainpage />,
    },
    //Incomes
    {
      path: '/incomes',
      element: <Incomes />,
    },
    {
      path: '/incomes/create',
      element: <IncomesCreate />,
    },
    {
      path: '/incomes/edit/:id',
      element: <IncomesEdit />,
    },
    //Outcomes
    {
      path: '/outcomes',
      element: <Outcomes />,
    },
    {
      path: '/outcomes/create',
      element: <OutcomesCreate />,
    },
    {
      path: '/outcomes/edit/:id',
      element: <OutcomesEdit />,
    },
    //Savings
    {
      path: '/savings',
      element: <Savings />,
    },
    {
      path: '/savings/create',
      element: <SavingsCreate />,
    },
    {
      path: '/savings/edit/:id',
      element: <SavingsEdit />,
    },
    //Funds
    {
      path: '/funds',
      element: <Funds />,
    },
    {
      path: '/funds/create',
      element: <FundsCreate />,
    },
    {
      path: '/funds/edit/:id',
      element: <FundsEdit />,
    },
    {
      path: '/funds/updateValue/:id',
      element: <FundsUpdateValue />,
    },
  ],
  AdminRoutes: [
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/user/create',
      element: <UsersCreate />,
    },
    {
      path: '/user/edit/:id',
      element: <UsersEdit />,
    },
  ],
};

export default routesData;

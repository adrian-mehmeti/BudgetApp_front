import withLayout from '../../../hoc/withLayout';
import CreateUser from '../../../components/DashboardUser/CreateUser';
function UsersCreate() {
  return (
    <>
      <CreateUser />
    </>
  );
}

export default withLayout(UsersCreate);

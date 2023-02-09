import withLayout from '../../../hoc/withLayout';
import EditUser from '../../../components/DashboardUser/EditUser';

function UsersEdit() {
  return (
    <>
      <EditUser />
    </>
  );
}

export default withLayout(UsersEdit);

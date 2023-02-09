import CreateForm from '../../components/Forms/CreateIncomes';
import withLayout from '../../hoc/withLayout';

function IncomesCreate() {
  return (
    <>
      <CreateForm />
    </>
  );
}

export default withLayout(IncomesCreate);

import { Alert } from 'react-bootstrap';
function MessageErrors({ errors }) {
  return (
    <>
      {errors.map((elem, index) => (
        <Alert key={index} variant="danger">
          {elem}
        </Alert>
      ))}
    </>
  );
}
export default MessageErrors;

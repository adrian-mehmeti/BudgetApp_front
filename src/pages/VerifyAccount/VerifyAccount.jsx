import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import api, { endpoints } from '../../lib/api';
import { Link } from 'react-router-dom';
function VerifiedSuccess() {
  return (
    <div className="main">
      <Row className="text-center mt-5">
        <h4 className="mb-5">Account Verified Successfully</h4>
        <Link to="/login">Go to login</Link>
      </Row>
    </div>
  );
}

function VerifyAccount() {
  const { search } = useLocation();
  const [query] = useState(new URLSearchParams(search));
  const [verfied, setVerified] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const token = query.get('token');
      endpoints.verifyAccount.url += `?token=${token}`;
      const response = await api.call(endpoints.verifyAccount);
      if (!response.confirm) {
        setVerified(false);
        return;
      }
      setVerified(true);
    };
    getData();
  }, [query]);

  return (
    <>
      {verfied !== null ? (
        verfied ? (
          <VerifiedSuccess />
        ) : (
          <h4 className="text-center mt-5">Something went wrong ...</h4>
        )
      ) : null}
    </>
  );
}

export default VerifyAccount;

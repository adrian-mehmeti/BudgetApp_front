import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import api, { endpoints } from '../../../lib/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MessageErrors from '../../ErrorHandlers';
import ModalDeleted from '../../ModalDeleted';

function DisplayUser() {
  const token = useSelector(state => state.auth.value);
  const [data, setData] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  //For Delete Confirmation Modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [idUser, setIdUser] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await api.call(endpoints.getUsers, {}, token);

      setData(response.results);
    };
    getData();
  }, [token]);

  const deleteUser = async id => {
    const response = await api.call(
      {
        url: endpoints.deleteUser.url + `/${id}`,
        method: endpoints.deleteUser.method,
      },
      {},
      token
    );

    if (!response.confirm) {
      setErrorMessages(['Something went wrong']);
      return;
    }
    navigate(0);
  };

  const showDeleteModal = async id => {
    setIdUser(id);
    setShowConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Telephone Number</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) => (
            <tr key={index}>
              <td>{elem.firstName}</td>
              <td>{elem.lastName}</td>
              <td>{elem.email}</td>
              <td>{elem.telNumber}</td>
              <td>
                <Link to={`/user/edit/${elem._id}`}>
                  <Button variant="secondary">Edit </Button>
                </Link>
              </td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => showDeleteModal(elem._id)}
                >
                  Delete{' '}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* -------------------- */}

      <ModalDeleted
        showModal={showConfirmationModal}
        confirmModal={deleteUser}
        hidenModal={hideConfirmationModal}
        id={idUser}
      />

      {/* --------------------- */}
    </>
  );
}
export default DisplayUser;

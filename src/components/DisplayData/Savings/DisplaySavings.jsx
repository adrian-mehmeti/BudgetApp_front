import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import api, { endpoints } from '../../../lib/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MessageErrors from '../../ErrorHandlers';
import ModalDeleted from '../../ModalDeleted';

function DisplaySavings() {
  const token = useSelector(state => state.auth.value);
  const [data, setData] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  //For Delete Confirmation Modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [idSavings, setIdSavings] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await api.call(endpoints.getSavings, {}, token);

      setData(response.results);
    };
    getData();
  }, [token]);

  const deleteSavings = async id => {
    const response = await api.call(
      {
        url: endpoints.deleteSavings.url + `/${id}`,
        method: endpoints.deleteSavings.method,
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
    setIdSavings(id);
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
            <th>Name of savings</th>
            <th>Value</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) => (
            <tr key={index}>
              <td>{elem.nameOfSavings}</td>
              <td>{elem.value} €</td>
              <td>
                <Link to={`/savings/edit/${elem._id}`}>
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
        confirmModal={deleteSavings}
        hidenModal={hideConfirmationModal}
        id={idSavings}
      />

      {/* --------------------- */}
    </>
  );
}
export default DisplaySavings;

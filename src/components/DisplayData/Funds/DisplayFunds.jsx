import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import api, { endpoints } from '../../../lib/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MessageErrors from '../../ErrorHandlers';
import ModalDeleted from '../../ModalDeleted';

function DisplayFunds() {
  const token = useSelector(state => state.auth.value);
  const [data, setData] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  //For Delete Confirmation Modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [idFunds, setIdFunds] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await api.call(endpoints.getFunds, {}, token);
      setData(response.results);
    };
    getData();
  }, [token]);

  const deleteFunds = async id => {
    const response = await api.call(
      {
        url: endpoints.deleteFunds.url + `/${id}`,
        method: endpoints.deleteFunds.method,
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
    setIdFunds(id);
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
            <th>Name of funds</th>
            <th>Max to value to earn</th>
            <th>Current Value</th>
            <th>Persent Monthly</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) => (
            <tr key={index}>
              <td>{elem.nameOfFunds}</td>
              <td>{elem.maxValueToEarn} €</td>
              <td>{elem.currentValue} €</td>
              <td>{elem.persentMonthly} %</td>

              <td>
                <Link to={`/funds/edit/${elem._id}`}>
                  <Button variant="secondary">Edit </Button>
                </Link>
              </td>
              <td>
                <Link to={`/funds/updateValue/${elem._id}`}>
                  <Button variant="secondary">Set new value funds</Button>
                </Link>
              </td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => showDeleteModal(elem._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* -------------------- */}

      <ModalDeleted
        showModal={showConfirmationModal}
        confirmModal={deleteFunds}
        hidenModal={hideConfirmationModal}
        id={idFunds}
      />

      {/* --------------------- */}
    </>
  );
}

export default DisplayFunds;

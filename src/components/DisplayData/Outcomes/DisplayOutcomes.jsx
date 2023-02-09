import { Row, Col, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import api, { endpoints } from '../../../lib/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MessageErrors from '../../ErrorHandlers';
import ModalDeleted from '../../ModalDeleted';

function DisplayOutcomes() {
  const token = useSelector(state => state.auth.value);
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());
  const [outTotal, setOutTotal] = useState(0);
  const [errorMessages, setErrorMessages] = useState([]);

  //For Delete Confirmation Modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [idOutcomes, setIdOutcomes] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await api.call(
        {
          url: endpoints.getOutcomes.url + `/${month}/${year}`,
          method: endpoints.getOutcomes.method,
        },
        {},
        token
      );

      setData(response.results);
    };
    getData();
    // eslint-disable-next-line
  }, [token, month]);

  useEffect(() => {
    const getTotalOutcomes = () => {
      let sum = 0;
      data.forEach(el => {
        sum += el.value;
      });
      setOutTotal(sum);
    };
    getTotalOutcomes();
  }, [data, month]);

  const deleteOutcomes = async id => {
    const response = await api.call(
      {
        url: endpoints.deleteOutcomes.url + `/${id}`,
        method: endpoints.deleteOutcomes.method,
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
    setIdOutcomes(id);
    setShowConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}
      <Row className="row justify-content-end mb-3">
        <Col className="col-md-2">
          <Form.Select
            className="selectForm"
            onChange={e => {
              setMonth(e.target.value);
            }}
            defaultValue={month}
          >
            <option value="1">Januar</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Form.Select>
        </Col>
      </Row>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Outcomes</th>
            <th>Value</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) => (
            <tr key={index}>
              <td>{elem.nameOfOutcomes}</td>
              <td>{'-' + elem.value} €</td>
              <td>
                <Link to={`/outcomes/edit/${elem._id}`}>
                  <Button variant="secondary">Edit </Button>
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

          <tr>
            <td style={{ color: 'rgb(174, 44, 44)' }}>OUT TOTAL</td>
            <td style={{ color: 'rgb(174, 44, 44)' }}>{outTotal} €</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      {/* -------------------- */}

      <ModalDeleted
        showModal={showConfirmationModal}
        confirmModal={deleteOutcomes}
        hidenModal={hideConfirmationModal}
        id={idOutcomes}
      />

      {/* --------------------- */}
    </>
  );
}

export default DisplayOutcomes;

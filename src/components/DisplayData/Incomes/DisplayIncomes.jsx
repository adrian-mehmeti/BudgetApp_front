import { Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import api, { endpoints } from '../../../lib/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setIncomesTotal } from '../../../lib/store/slices/authSlice';
import MessageErrors from '../../ErrorHandlers';
import ModalDeleted from '../../ModalDeleted';

function DisplayIncomes() {
  const token = useSelector(state => state.auth.value);
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());
  const [inTotal, setInTotal] = useState(0);
  const [errorMessages, setErrorMessages] = useState([]);

  //For Delete Confirmation Modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [idIncomes, setIdIncomes] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const response = await api.call(
        {
          url: endpoints.getIncomes.url + `/${month}/${year}`,
          method: endpoints.getIncomes.method,
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
    const getTotalIncomes = () => {
      let sum = 0;
      data.forEach(el => {
        sum += el.value;
      });
      setInTotal(sum);
    };
    getTotalIncomes();
  }, [data, month]);

  useEffect(() => {
    dispatch(setIncomesTotal(inTotal));
  });

  const deleteIncomes = async id => {
    const response = await api.call(
      {
        url: endpoints.deleteIncomes.url + `/${id}`,
        method: endpoints.deleteIncomes.method,
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
    setIdIncomes(id);
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
            <th>Incomes</th>
            <th>Value</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) => (
            <tr key={index}>
              <td>{elem.incomesMonthly}</td>
              <td>{elem.value} €</td>
              <td>
                <Link to={`/incomes/edit/${elem._id}`}>
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

          <tr>
            <td style={{ color: 'rgb(31, 122, 31)' }}>IN TOTAL</td>
            <td style={{ color: 'rgb(31, 122, 31)' }}>{inTotal} €</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      {/* -------------------- */}

      <ModalDeleted
        showModal={showConfirmationModal}
        confirmModal={deleteIncomes}
        hidenModal={hideConfirmationModal}
        id={idIncomes}
      />

      {/* --------------------- */}
    </>
  );
}

export default DisplayIncomes;

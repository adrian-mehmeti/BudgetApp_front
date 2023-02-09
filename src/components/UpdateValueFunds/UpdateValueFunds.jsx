import { Link, useNavigate } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api, { endpoints } from '../../lib/api';
import { useParams } from 'react-router-dom';
import MessageErrors from '../../components/ErrorHandlers';

function UpdateValueFunds() {
  const [nameOfFunds, setNameOfFunds] = useState('');
  const [maxValueToEarn, setMaxValueToEarn] = useState('');
  const [value, setValue] = useState(0);
  const [persentMonthly, setPersentMonthly] = useState(0);
  const [errorMessages, setErrorMessages] = useState([]);

  const [currentValue, setCurrentValue] = useState();

  let { id } = useParams();
  const token = useSelector(state => state.auth.value);
  const inTotal = useSelector(state => state.auth.inTotal);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await api.call(
        {
          url: endpoints.getFunds.url + `/${id}`,
          method: endpoints.getFunds.method,
        },
        {},
        token
      );
      setNameOfFunds(response.results.nameOfFunds);
      setMaxValueToEarn(response.results.maxValueToEarn);
      setValue(response.results.currentValue);
      setPersentMonthly(response.results.persentMonthly);
    };
    getData();
  }, [token, id]);

  useEffect(() => {
    setCurrentValue(value + (inTotal / 100) * persentMonthly);
  }, [value, inTotal, persentMonthly]);

  const updateFunds = async () => {
    if (currentValue < maxValueToEarn) {
      const response = await api.call(
        {
          url: endpoints.updateFunds.url + `/${id}`,
          method: endpoints.updateFunds.method,
        },
        { currentValue },
        token
      );

      if (!response.confirm) {
        setErrorMessages(['Something went wrong']);
        return;
      }

      const val = (inTotal / 100) * persentMonthly;

      const reponseOutcomes = await api.call(
        endpoints.createOutcomes,
        { nameOfOutcomes: nameOfFunds + '(Funds)', value: val },
        token
      );
      if (!reponseOutcomes.confirm) {
        setErrorMessages(['Something went wrong']);
        return;
      }

      navigate('/funds');
    } else {
      setErrorMessages(['You have earn max value for funds']);
      return;
    }
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{nameOfFunds}</td>
            <td>{maxValueToEarn} €</td>
            <td>{value} €</td>
            <td>{persentMonthly} %</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Incomes Total</th>
            <th>Monthly Persent value</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{nameOfFunds}</td>
            <td>{(inTotal / 100) * persentMonthly} €</td>
            <td>{currentValue} €</td>
          </tr>
        </tbody>
      </table>
      <Row className="mt-4 d-flex justify-content-center mb-5">
        <div className="col-lg-4">
          <Link to="/funds">
            <Button variant="dark" className="w-100 mb-1">
              Cancel
            </Button>
          </Link>
        </div>
        <div className="col-lg-4">
          <Button
            className="w-100"
            variant="dark"
            onClick={() => {
              updateFunds();
            }}
          >
            Update
          </Button>
        </div>
      </Row>
    </>
  );
}

export default UpdateValueFunds;

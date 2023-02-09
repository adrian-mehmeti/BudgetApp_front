import api, { endpoints } from '../../../lib/api';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function DisplayInOut({ setBalance }) {
  const token = useSelector(state => state.auth.value);
  const [data, setData] = useState([]);
  const [month] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());

  //Get data from backend
  useEffect(() => {
    const getData = async () => {
      const responseIncomes = await api.call(
        {
          url: endpoints.getIncomes.url + `/${month}/${year}`,
          method: endpoints.getIncomes.method,
        },
        {},
        token
      );

      const responseOutcomes = await api.call(
        {
          url: endpoints.getOutcomes.url + `/${month}/${year}`,
          method: endpoints.getOutcomes.method,
        },
        {},
        token
      );

      setData(
        [...responseIncomes.results, ...responseOutcomes.results].sort(
          function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
        )
      );
    };
    getData();

    // eslint-disable-next-line
  }, [token, month]);

  //Get Total Balance from data
  useEffect(() => {
    const getTotalBalance = () => {
      let sum = 0;
      data.forEach(el => {
        if (el.incomesMonthly) {
          sum += el.value;
        } else {
          sum -= el.value;
        }
      });
      setBalance(sum);
    };
    getTotalBalance();
    // eslint-disable-next-line
  }, [data, month]);

  return (
    <>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) => (
            <tr key={index}>
              <td>{elem.incomesMonthly ? 'deposit' : 'withDraw'}</td>
              <td>{format(new Date(elem.createdAt), 'dd-MM-yyyy')}</td>
              <td>
                {elem.incomesMonthly
                  ? elem.value + ' €'
                  : '-' + elem.value + ' €'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DisplayInOut;

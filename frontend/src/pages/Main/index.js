import React, { useState, useEffect, useContext } from 'react';
import Select from "react-select";
import { FaStoreAlt, FaUpload, FaSpinner } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { Context } from "../../store/appContext";
import api from '../../services/api';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import Container from '../../components/Container';

const Main = (props) => {
  const history = useHistory();

  const { store, actions } = useContext(Context);
  const [shops, setShops] = useState([]);
  const [shop, setShop] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    (async () => {
      const resp = await api.get("/stores")

      setShops(resp.data.response.map(e => ({ "label": e.name, "value": e.id })))
    })();
  }, []);

  const changeTransactions = async(e) => {
    setShop(e)
    const resp = await api.get(`/transactions/store/${e.value}`)
    setTransactions(resp.data.response)
    setSum(resp.data.value_sum)
  }

    return (
      <>
      <Container>
        <h1>
          <FaStoreAlt />
          Stores
        </h1>
        <br/>
        {(!store.token) ? 
        ( <>
          <h3>You are not logged in. Please log in now.</h3>
          <Button style={{ marginTop:'30px', textAlign:'center', justifyContent: 'center'}}
              onClick={async () => {
                  history.push('/login')
              }}
              variant="primary"
              size="lg"
              round="true"
              icon="true"
              className='btn-round-acoes mr-3'
              title="Upload"
              > 
              Log in
          </Button>
        </>
        )
        :
        (
          <>
        <Select style={{marginTop:'30px'}}
        value={shop}
        closeMenuOnSelect={true}
        options={shops}
        placeholder="Select the shop"
        onChange={e => changeTransactions(e)} />

        <Table responsive style={{marginTop:'30px'}}>
        <thead>
          <tr>
            <th>Transaction Type</th>
            <th>CPF</th>
            <th>Card</th>
            <th>Date/Hour</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (transactions.map(t =>(
            <tr key={t.id}>
              <td>{t.transaction_type}</td>
              <td>{t.cpf}</td>
              <td>{t.card}</td>
              <td>{t.hour}</td>
              <td>{ t.transaction_type.includes('Entrada') ? '+' : '-' }  R${t.value}</td>
            </tr>
          )) ): (<FaSpinner/>)
          }
        </tbody>
        </Table>
        <h4 style={{ float: 'right'}}>TOTAL: R${sum.toFixed(2)}</h4>
        <Button style={{ marginTop:'30px', marginLeft:'20px', textAlign:'center', justifyContent: 'center'}}
            onClick={async () => {
                history.push('/upload')
            }}
            variant="warning"
            size="lg"
            round="true"
            icon="true"
            className='btn-round-acoes mr-3'
            title="Upload"
            > 
            <FaUpload/>
              Upload CNAB files
        </Button>
        <Button style={{ marginTop:'30px', float:'left', justifyContent: 'right'}}
            onClick={() => actions.logout()}
            variant="danger"
            size="lg"
            round="true"
            icon="true"
            className='btn-round-acoes mr-3'
            title="Logout"
            > 
              Log out
        </Button>
        </>
        )}
      </Container>
      
      </>
    );
  
}

export default Main;

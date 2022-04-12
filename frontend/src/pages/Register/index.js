import React, { useState, useContext } from 'react';
import { Context } from "../../store/appContext";
import Select from "react-select";
import { useHistory } from 'react-router-dom';
import { InputGroup, FormControl } from 'react-bootstrap';
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Container from '../../components/Container';

const Register = (props) => {
  const history = useHistory();

  const { store, actions } = useContext(Context)
  const [user, setUser] = useState({ "email": "", "password": "", "is_active": true });

  const handleClick = async() => {
    try {
      const resp = await api.post(`/users`, {
        email: user.email,
        password: user.password,
        }, { headers: { 'Content-Type': 'application/json' }});

        if(resp.status == 200) {
          alert("User created.")
      }
    } catch (err) {
      console.error(err);
    }


  }

  return (
    <>
    <Container style={{ textAlign: 'center' }}>
      <h3>
        Register (Under Maintenance**Not Working)
      </h3>
      <br/>
      {(store.token && store.token != undefined && store.token !="") ? (<h3>You are logged in.</h3>) :(
      <div>
        <InputGroup className="mb-3" style={{ width: '40%', margin: 'auto', padding: '10px'}}>
          <FormControl
            value={user.email} 
            onChange={(e) => setUser({...user, "email": e.target.value })}
            placeholder="E-mail"
            aria-label="E-mail"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
        <InputGroup className="mb-3" style={{ width: '30%', margin: 'auto', padding: '10px'}}>
          <FormControl
            value={user.password} 
            type="password"
            onChange={(e) => setUser({...user, "password": e.target.value })}
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
        <Button style={{ marginTop:'15px', textAlign:'center', justifyContent: 'center'}}
            onClick={handleClick}
            variant="primary"
            size="lg"
            round="true"
            icon="true"
            className='btn-round-acoes mr-3'
            title="Upload"
            type="submit"
            > 
            Register
        </Button>
      </div>
      )}
    </Container>
    </>
  );

}

export default Register;

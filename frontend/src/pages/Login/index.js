import React, { useState, useContext } from 'react';
import { Context } from "../../store/appContext";
import Select from "react-select";
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Container from '../../components/Container';

const Login = (props) => {
  const history = useHistory();

  const { store, actions } = useContext(Context)
  const [email, setEmail] = useState("");
  const [wrongUserPass, setWrongUserPass] = useState("")
  const [password, setPassword] = useState("");

  const handleClick = async() => {
    actions.login(email, password)
    
    if(store.token && store.token != undefined && store.token !="") {
      history.push('/');
    } else {
      setWrongUserPass("E-mail ou senha inválido.");
    }

  }

    return (
      <>
      <Container style={{ textAlign: 'center' }}>
        <h3>
          Login
        </h3>
        <h4 style={{ color: 'red' }}>{wrongUserPass}</h4>
        <br/>
        {(store.token && store.token != undefined && store.token !="") ? (<h3>You are logged in.</h3>) :(
        <div>
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" onClick={handleClick}>Login</button>
        </div>
        )}
      </Container>
      </>
    );

}

export default Login;

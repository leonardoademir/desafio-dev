import React, { useState, useContext } from 'react';
import { Context } from "../../store/appContext";
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { InputGroup, FormControl } from 'react-bootstrap';
import Container from '../../components/Container';

const Login = (props) => {
  const history = useHistory();

  const { store, actions } = useContext(Context)
  const [email, setEmail] = useState("");
  const [wrongUserPass, setWrongUserPass] = useState("")
  const [password, setPassword] = useState("");

  const handleClick = async() => {
    actions.login(email, password).then(() => {
      if(store.token && store.token != undefined && store.token !="") {
        history.push('/')
      } else {
        setWrongUserPass("E-mail ou senha inválido.");
      }    })
    
    

  }

    return (
      <>
      <Container style={{ textAlign: 'center' }}>
        <h3>
          Login - (test/test)
        </h3>
        <h4 style={{ color: 'red' }}>{wrongUserPass}</h4>
        <br/>
        {(store.token && store.token != undefined && store.token !="") ? (<h3>You are logged in.</h3>) :(
        <div>
          <InputGroup className="mb-3" style={{ width: '40%', margin: 'auto', padding: '10px'}}>
            <FormControl
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              aria-label="E-mail"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <InputGroup className="mb-3" style={{ width: '30%', margin: 'auto', padding: '10px'}}>
            <FormControl
              value={password} 
              type="password"
              onChange={(e) => setPassword(e.target.value)}
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
              Log in
          </Button>
          <Button style={{ marginTop:'15px', marginLeft:'10px', textAlign:'center', justifyContent: 'center'}}
                onClick={async () => {
                    history.push('/register')
                }}
                variant="warning"
                size="lg"
                round="true"
                icon="true"
                className='btn-round-acoes mr-3'
                title="If you don't have an account, register here"
                > 
                  Register
            </Button>
        </div>
        )}
      </Container>
      </>
    );

}

export default Login;

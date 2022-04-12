import React, { useContext } from 'react';
import { FaUpload } from 'react-icons/fa';
import { Context } from "../../store/appContext";
import Container from '../../components/Container';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { Form, SubmitButton, List } from './styles';

const Upload = (props) => {
  const history = useHistory();

  const { store, actions } = useContext(Context);

    return (
      <>
        <Container>
        <h1>
          <FaUpload />
          Upload
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
        ) : 
        (
          <>
            <Form style={{ paddingTop:'20px', textAlign:'center' }} action = "http://localhost:5000/transactions/upload" method = "POST" 
              encType = "multipart/form-data">
              <input type = "file" name = "file" />
              <input type = "submit"/>
            </Form>
            <br/>
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
            <Button style={{ marginTop:'30px', marginLeft:'20px', textAlign:'center', justifyContent: 'center'}}
              onClick={async () => {
                  history.push('/')
              }}
              variant="primary"
              size="lg"
              round="true"S
              icon="true"
              className='btn-round-acoes mr-3'
              title="Stores"
              > 
              Stores
          </Button>
          </>
        )}
      </Container>
    </>
    );
  
}

export default Upload;

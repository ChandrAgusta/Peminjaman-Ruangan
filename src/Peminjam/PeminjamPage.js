import React from 'react';
import Layout from '../layouts';
import ListPage from '../ListPage';
import { Container } from 'react-bootstrap';
import FormPinjam from './FormPinjam';
import Dashboard from '../dashboard';

function PeminjamPage() {
  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url('../bg.jpg')`,
    backgroundSize: 'cover',
    filter: 'blur(5px)',
  };

  return (
    <div>
      {/* <Dashboard/> */}
      <Layout/>
      <Container className='content'>
        {/* <div style={backgroundStyle}></div> */}
        <FormPinjam/>
      </Container>
    </div>
  );
}

export default PeminjamPage;

import React from 'react';
import Layout from '../layouts';
import ListPage from '../ListPage';
import { Container } from 'react-bootstrap';

function PeminjamPage() {
  return (
    <div>
      <Layout/>
      <Container className='content'>
        <ListPage/>
      </Container>
    </div>
  );
}

export default PeminjamPage;

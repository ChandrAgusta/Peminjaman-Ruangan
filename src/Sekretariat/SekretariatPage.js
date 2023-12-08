import React from 'react'
import Layout from '../layouts'
import ListPage from '../ListPage'
import { Container } from 'react-bootstrap'
import CreateForm from './createForm'
import { useUserRole } from '../userRole'

const SekretariatPage = () => {
const { userRole } = useUserRole();
  return (
    <div>
        <Layout/>
        <Container className='content'>
            { userRole==='sekretariat' && (
            <Container className='mb-3'>
                <CreateForm/>
            </Container>
            )}
            <ListPage/>
        </Container>
    </div>
  )
}

export default SekretariatPage

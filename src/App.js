import React from 'react'
import ProductListing from './components/ProductListing'
import ZipCode from './components/ZipCode'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
	return (
		<Container>
			<Row>
				<Col className='col-md-6 offset-md-3'>
					<ProductListing fluid={false} />
				</Col>
			</Row>
			<Row>
				<Col className='col-md-6 offset-md-3'>
					<ZipCode />
				</Col>
			</Row>
		</Container>
	)
}

export default App

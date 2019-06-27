import React from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class ZipCode extends React.Component {
	state = {
		zip: '',
		location: 'Enter ZIP to populate City and State',
		stateCode: '',
		loading: false
	}
	handleChange = e => {
		const { value } = e.target
		if (value.length === 5) {
			this.setState({ zip: value, loading: true })
			return axios
				.get(`https://www.wsjwine.com/api/address/zipcode/${value}`)
				.then(res => {
					let { city, stateCode } = res.data.response
					this.setState({
						location: `${city},${stateCode}`,
						stateCode,
						loading: false
					})
				})
				.catch(err => {
					this.setState({
						loading: false,
						location: 'Enter ZIP to populate City and State',
						stateCode: ''
					})
				})
		} else if (value.length < 6 && !isNaN(value)) {
			return this.setState({ zip: value })
		}
	}
	render() {
		const { location, loading, zip, stateCode } = this.state
		return (
			<Card style={{ border: 'none' }}>
				<Card.Header>
					<h1>Challenge2</h1>
				</Card.Header>
				<Form>
					<Form.Label>Zip</Form.Label>
					<Row>
						<Col>
							<Form.Control
								type='text'
								value={zip}
								onChange={e => this.handleChange(e)}
							/>
						</Col>
						<Col>
							<Form.Label>
								{loading === true ? (
									<Spinner animation='border' variant='info' />
								) : (
									location
								)}
							</Form.Label>
						</Col>
					</Row>
				</Form>
				<Alert
					variant='warning'
					show={stateCode === 'CT' || stateCode === 'NY'}
				>
					{stateCode === 'CT'
						? ' Upon completion of this form, your order will be forwarded to The Wine Cellar, located in Wallingford, CT for processing and shipping.'
						: 'New York law does not allow for free goods in conjunction with the sale of alcohol beverages. The cost of all advertised items in this offer are included in the advertised price. The invoice in your shipment will itemize the cost of each item included in your shipment.'}
				</Alert>
			</Card>
		)
	}
}

export default ZipCode

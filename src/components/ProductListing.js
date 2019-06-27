import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'

class ProductListing extends React.Component {
	state = {
		products: []
	}
	componentDidMount() {
		axios
			.get('https://www.wsjwine.com/api/offer/0033008')
			.then(res => this.setState({ products: res.data.response.mainItems }))
	}

	formatProductName = prod => {
		let name = prod.product.name.replace('Collection', '')
		return (
			<div>
				<b>{name}</b>+ 2 BONUS Bottles & Glasses
				<b> JUST ${prod.listPrice}</b>
				<Button variant='link'> view wines</Button>
			</div>
		)
	}
	renderProducts = () => {
		const { products } = this.state
		return products.map(product => {
			let productName = this.formatProductName(product)
			return (
				<Form.Check
					key={product.itemCode}
					name='productType'
					id={product.itemCode}
					type='radio'
					label={productName}
				/>
			)
		})
		return <Form.Check type='radio' label='second radio' id='' />
	}

	render() {
		return (
			<Card style={{ border: 'none' }} size='sm'>
				<Card.Header>
					<h1>Challenge 1</h1>
				</Card.Header>
				<Card.Title style={{ color: 'red' }}>
					<Badge pill variant='danger'>
						Step 1
					</Badge>
					Which Case Would You Like?
				</Card.Title>
				<Card.Text>
					Whatever you choose, we’ll add in two bonus Cabs and two crystal
					glasses and you’ll have the complete package – worth over $250 – for
					ONLY $69.99 (plus $19.99 shipping & applicable tax; please allow 5-10
					days for delivery, depending on shipping state).
				</Card.Text>
				<Form>{this.renderProducts()}</Form>
			</Card>
		)
	}
}

export default ProductListing

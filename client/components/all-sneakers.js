import React, {Component} from 'react'
import {fetchSneakers} from '../store'
import {connect} from 'react-redux'

class AllSneakers extends Component {
  constructor(props) {
    super(props)
    this.state = {sneakers: []}
  }
  async componentDidMount() {
    await this.props.getSneakers()
    this.setState({sneakers: this.props.sneakers})
  }

  render() {
    console.log('state sneakers>>> ', this.state.sneakers)
    return (
      <div className="allSneakers row">
        {this.state.sneakers.map(sneaker => (
          <div
            key={sneaker.id}
            className="allPageSingleSneaker col-4 col-sm justify-content-center"
          >
            <img src={sneaker.photos} className=" img-thumbnail" />
            <h3>{sneaker.name}</h3>
            <div>
              Manufacture: {sneaker.manufacturer} <p />
              Style: {sneaker.style} <p />
              Price: {sneaker.price} <p />
              Units in Stock: {sneaker.inventory}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {getSneakers: () => dispatch(fetchSneakers())}
}

const mapState = state => {
  return {
    sneakers: state.sneakers
  }
}

export default connect(mapState, mapDispatch)(AllSneakers)

// console.log(this.props)
// // let {sneakers} = this.props
// let sneakers = [{
//   "id": 1,
//   "name": "jordan",
//   "style": "basketball ",
//   "manufacturer": "nike",
//   "description": "big shoe",
//   "price": 300,
//   "photos": [
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1HxWQOh9mReyDMKCCSFRfQHaFh%26pid%3DApi&f=1"
//   ],
//   "inventory": 3,
//   "createdAt": "1991-11-08T05:00:00.000Z",
//   "updatedAt": "1991-11-08T05:00:00.000Z"
// },
// {
//   "id": 2,
//   "name": "lebron",
//   "style": "basketball",
//   "manufacturer": "adidas",
//   "description": "also big shoe",
//   "price": 200,
//   "photos": [
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1HxWQOh9mReyDMKCCSFRfQHaFh%26pid%3DApi&f=1"
//   ],
//   "inventory": 2,
//   "createdAt": "1991-11-08T05:00:00.000Z",
//   "updatedAt": "1991-11-08T05:00:00.000Z"
// }]

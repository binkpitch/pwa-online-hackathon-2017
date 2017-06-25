import React, { Component } from 'react'
import Firebase from 'firebase'
import Graph from '../components/graphComponent'

class graphContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillMount () {
    Firebase.database().ref('candidates').on('value', snapshot => {
      let data = []
      Object.values(snapshot.val()).map((value) => {
        return data.push({Number: `No.${value.no}`, Votes: value.score})
      })
      this.setState({data})
    })
  }

  render () {
    return (
      <Graph data={this.state.data} />
    )
  }
}
export default graphContainer

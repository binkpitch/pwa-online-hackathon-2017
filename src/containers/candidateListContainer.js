import React, { Component } from 'react'
import { connect } from 'react-redux'
import CandidateListComponent from '../components/candidateListComponent'
import { Dimmer, Loader } from 'semantic-ui-react'
import Firebase from 'firebase'

class CandidateListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      candidates: []
    }
  }

  componentWillMount () {
    Firebase.database().ref('candidates').on('value', (snapshot) => {
      const candidates = Object.values(snapshot.val())
      this.setState({candidates})
    })
    console.log('!!Firebase.auth().currentUser', !!Firebase.auth().currentUser)
  }

  onVoteClick (candidateKey) {
    if (Firebase.auth().currentUser) {
      Firebase.database().ref(`candidates/${candidateKey}`).transaction(candidate => {
        if (candidate) {
          if (candidate.score) {
            candidate.score++
          } else {
            candidate.score = 1
          }
        }
        return candidate
      })
    }
  }

  render () {
    return (
      <div>
        <Dimmer active={this.state.candidates.length === 0} inverted>
          <Loader content='Loading' />
        </Dimmer>
        <CandidateListComponent items={this.state.candidates} onVoteClick={this.onVoteClick} disabled={!Firebase.auth().currentUser} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(CandidateListContainer)

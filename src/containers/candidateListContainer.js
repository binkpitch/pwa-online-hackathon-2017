import React, { Component } from 'react'
import CandidateListComponent from '../components/candidateListComponent'
import { Dimmer, Loader } from 'semantic-ui-react'
import Firebase from 'firebase'

class CandidateListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      candidates: [],
      currentUser: null
    }
  }

  componentDidMount () {
    Firebase.database().ref('candidates').on('value', (snapshot) => {
      const candidates = Object.values(snapshot.val())
      this.setState({candidates})
    })

    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({currentUser: user})
      } else {
        this.setState({currentUser: null})
      }
    })
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
          return candidate
        }
      }).then(() => {
        // update voters
      })
    }
  }

  render () {
    return (
      <div>
        <Dimmer active={this.state.candidates.length === 0} inverted>
          <Loader content='Loading' />
        </Dimmer>
        <CandidateListComponent items={this.state.candidates} onVoteClick={this.onVoteClick} disabled={!this.state.currentUser} />
      </div>
    )
  }
}

export default CandidateListContainer

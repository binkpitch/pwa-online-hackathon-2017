import React, { Component } from 'react'
import CandidateListComponent from '../components/candidateListComponent'
import { Dimmer, Loader, Modal, Header, Icon, Button, Segment, List } from 'semantic-ui-react'
import Firebase from 'firebase'
import Moment from 'moment'

class CandidateListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      candidates: [],
      currentUser: null
    }
    this.onVoteClick = this.onVoteClick.bind(this)
    this.addVoteToFirebase = this.addVoteToFirebase.bind(this)
    this.checkIfDuplicateVote = this.checkIfDuplicateVote.bind(this)
    this.handleCloseDuplicateVoteError = this.handleCloseDuplicateVoteError.bind(this)
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

  onVoteClick (candidateKey, candidateName, candidateNo, candidateParty) {
    this.setState({
      showVotingModal: true,
      candidateKey,
      candidateName,
      candidateNo,
      candidateParty
    })
  }

  checkIfDuplicateVote (candidateKey) {
    const currentUser = Firebase.auth().currentUser
    if (currentUser) {
      Firebase.database().ref('voters').orderByKey().equalTo(currentUser.uid).once('value', snapshot => {
        if (snapshot.val()) {
          this.setState({ showDuplicateVoteError: true })
        } else {
          this.setState({ showNestedVotingModal: true })
          this.addVoteToFirebase(candidateKey, currentUser)
        }
      })
    }
  }

  addVoteToFirebase (candidateKey, currentUser) {
    const database = Firebase.database()
    database.ref(`candidates/${candidateKey}`).transaction(candidate => {
      if (candidate) {
        if (candidate.score) {
          candidate.score++
        } else {
          candidate.score = 1
        }
        return candidate
      }
    }).then(() => {
      const { uid, displayName, email } = currentUser
      database.ref(`voters/${uid}`).set({
        uid,
        isVote: true,
        dateTime: Moment().format('Do MMMM YYYY, h:mm:ss a'),
        name: displayName,
        email: email
      })
    })
  }

  handleCloseDuplicateVoteError () {
    this.setState({ showDuplicateVoteError: false, showVotingModal: false })
  }

  renderDuplicateVoteErrorModal () {
    return (
      <Modal
        open={this.state.showDuplicateVoteError}
        onClose={this.handleCloseDuplicateVoteError}
        basic
        size='small'
        >
        <Header icon='warning circle' content='You already voted.' />
        <Modal.Content>
          <h3>You can vote only one time</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleCloseDuplicateVoteError} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  renderLoader () {
    return (
      <Dimmer active={this.state.candidates.length === 0} inverted>
        <Loader content='Loading' />
      </Dimmer>
    )
  }

  renderVotingModal () {
    return (
      <Modal
        open={this.state.showVotingModal}
        dimmer
      >
        <Modal.Header>Are you sure you want to vote for "{this.state.candidateName}" ?</Modal.Header>
        <Modal.Content image>
          <div className='image'>
            <Icon name='right arrow' />
          </div>
          <Modal.Description>
            <Segment.Group horizontal>
              <Segment>
                <Header>Name</Header>
                <span>{this.state.candidateName}</span>
              </Segment>
              <Segment>
                <Header>Number</Header>
                <span>{this.state.candidateNo}</span>
              </Segment>
              <Segment>
                <Header>Party</Header>
                <span>{this.state.candidateParty}</span>
              </Segment>
            </Segment.Group>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button icon onClick={() => this.setState({showVotingModal: false})} color='red'><Icon name='left chevron' /> Cancel</Button>
          <Button primary icon onClick={() => this.checkIfDuplicateVote(this.state.candidateKey)}>Proceed <Icon name='right chevron' /></Button>
          <Modal
            dimmer={false}
            open={this.state.showNestedVotingModal}
            size='small'
            >
            <Modal.Header>All Done</Modal.Header>
            <Modal.Content>
              <p>Thank you for your vote!</p>
            </Modal.Content>
            <Modal.Actions>
              <Button icon='check' content='Finish' onClick={() => this.setState({ showNestedVotingModal: false, showVotingModal: false })} />
            </Modal.Actions>
          </Modal>
        </Modal.Actions>
      </Modal>
    )
  }

  render () {
    return (
      <div>
        {this.renderLoader()}
        {this.renderDuplicateVoteErrorModal()}
        {this.renderVotingModal()}

        <CandidateListComponent items={this.state.candidates} onVoteClick={this.onVoteClick} disabled={!this.state.currentUser} />
      </div>
    )
  }
}

export default CandidateListContainer

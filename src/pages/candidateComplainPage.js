import React from 'react'
import CandidateComplainContainer from '../containers/candidateComplainContainer'
import injectSheet from 'react-jss'

const styles = {
  mainContainer: {
    marginLeft: 16,
    marginRight: 16
  }
}

const CandidatesPage = (props) => {
  return (
    <div style={styles.mainContainer}>
      <CandidateComplainContainer candidateId={props.match.params.id} />
    </div>
  )
}

export default injectSheet(styles)(CandidatesPage)

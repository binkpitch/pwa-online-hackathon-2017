import React from 'react'
import CandidateComplaintContainer from '../containers/candidateComplaintContainer'
import injectSheet from 'react-jss'

const styles = {
  mainContainer: {
    marginLeft: 16,
    marginRight: 16
  }
}

const CandidatesPage = () => {
  return (
    <div style={styles.mainContainer}>
      <CandidateComplaintContainer />
    </div>
  )
}

export default injectSheet(styles)(CandidatesPage)

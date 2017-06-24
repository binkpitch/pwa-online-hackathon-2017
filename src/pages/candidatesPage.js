import React from 'react'
import CandidateListContainer from '../containers/candidateListContainer'
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
      <CandidateListContainer />
    </div>
  )
}

export default injectSheet(styles)(CandidatesPage)

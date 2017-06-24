import React from 'react'
import CandidateListContainer from '../containers/candidateListContainer'
import { Header, Icon } from 'semantic-ui-react'
import injectSheet from 'react-jss'

const styles = {
  mainContainer: {
    marginLeft: 16,
    marginRight: 16
  }
}

const votePage = () => {
  return (
    <div style={styles.mainContainer}>
      <Header as='h2'>
        <Icon name='hand pointer' />
        <Header.Content>
      Press to vote
      <Header.Subheader>
        แตะคนที่ใช่
      </Header.Subheader>
        </Header.Content>
      </Header>
      <CandidateListContainer />
    </div>
  )
}

export default injectSheet(styles)(votePage)

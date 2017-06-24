import React from 'react'
import CandidateListContainer from '../containers/candidateListContainer'
import { Header, Icon } from 'semantic-ui-react'
import injectSheet from 'react-jss'
import icon from './icon.png';

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
          Vote the right one
          <img src={icon} alt="icon"/>
          <Header.Subheader>
            โหวตคนที่ใช่
          </Header.Subheader>
        </Header.Content>
      </Header>
      <CandidateListContainer />
    </div>
  )
}

export default injectSheet(styles)(votePage)

import React from 'react'
import { Header, Icon, Message, Segment } from 'semantic-ui-react'
import injectSheet from 'react-jss'

const styles = {
  container: {
    marginTop: 64,
    marginLeft: 64,
    marginRight: 64
  }
}

const HomePage = () => {
  return (
    <div style={styles.container}>
      <Header as='h2' icon textAlign='center'>
        <Icon name='cubes' style={{marginBottom: 16}} />
        A React boilerplate with Redux
        <Header.Subheader>
          <a href='https://github.com/binkpitch/reactor'>https://github.com/binkpitch/reactor</a>
        </Header.Subheader>
      </Header>
      <Message positive style={{marginTop: 56}}>
        <Message.Header>To install</Message.Header>
        <p>Run "<b>git clone https://github.com/binkpitch/reactor.git your-project-name && cd your-project-name && rm -rf .git && yarn install</b>"</p>
      </Message>
      <Message info>
        <Message.Header>To see redux in action</Message.Header>
        <p>Install <a href='https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en'>Redux DevTools</a> (Chrome Extension)</p>
      </Message>
      <Segment style={{ alignSelf: 'flex-end' }} attached='bottom'>
        <div style={{textAlign: 'center', marginTop: 8, marginBottom: 8}}>
          This project was bootstrapped with <a href='https://github.com/facebookincubator/create-react-app'>Create React App</a>
        </div>
      </Segment>
    </div>
  )
}

export default injectSheet(styles)(HomePage)

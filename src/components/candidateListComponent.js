import React from 'react'

import { Card, Icon, Image, Button, List } from 'semantic-ui-react'

const CandidateListComponent = (props) => {
  return (
    <Card.Group>
      {
        props.items.map((item, key) => {
          console.log('item.policy', item.policy)
          return (
            <Card key={key}>
              <Image src={item.image} height={300} />
              <Card.Content>
                <Card.Header>
                  {item.name}
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    {item.party}
                  </span>
                </Card.Meta>
                <Card.Description>
                  "{item.vow}"
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <List bulleted>
                  {
                    item.policy.map((item1, key2) => (
                      <List.Item key={key2}>{item1}</List.Item>
                    ))
                  }
                </List>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  {item.score || 0} votes
                </a>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button color='green'>Vote</Button>
                  <Button color='red'>Report</Button>
                </div>
              </Card.Content>
            </Card>
          )
        })
      }
    </Card.Group>
  )
}

export default CandidateListComponent

import React from 'react'
import { Card, Icon, Image, Button, List, Popup } from 'semantic-ui-react'

const CandidateListComponent = (props) => {
  return (
    <Card.Group className="card-center">
      {
        props.items.map((item, key) => {
          return (
            <Card key={'candidates_'+key}>
              <Image src={item.image} height={300} />
              <Card.Content>
                <Card.Header>
                  {item.name}
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    No.{item.no}-{item.party}
                  </span>
                </Card.Meta>
                <Card.Description>
                  "{item.vow}"
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <List bulleted>
                  {
                    item.policy.map((policyItem, policyKey) => (
                      <List.Item key={policyKey}>{policyItem}</List.Item>
                    ))
                  }
                </List>
              </Card.Content>
              <Card.Content extra>
                <Icon name='user' />
                {item.score || 0} votes
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  {
                    props.disabled
                    ? <Popup
                      trigger={<Button basic color='grey' content='Vote' />}
                      header={props.disabledHeader}
                      content={props.disabledContent}
                      />
                    : <Button color='green' onClick={() => props.onVoteClick(item.key, item.name, item.no, item.party)}>Vote</Button>
                  }
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

import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const CandidateListComponent = (props) => {
  return (
    <Card.Group>
      {
        props.items.map((item) => {
          return (
            <Card>
              <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/H.E._General_Prayut_Chan-o-cha%2C_Prime_Minister%2C_Kingdom_of_Thailand_%2834148528741%29_cropped.jpg/800px-H.E._General_Prayut_Chan-o-cha%2C_Prime_Minister%2C_Kingdom_of_Thailand_%2834148528741%29_cropped.jpg' />
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
                  {item.vow}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  {item.votes}
                </a>
              </Card.Content>
            </Card>
          )
        })
      }
    </Card.Group>
  )
}

export default CandidateListComponent

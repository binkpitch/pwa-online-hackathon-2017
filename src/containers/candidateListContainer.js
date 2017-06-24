import React from 'react'
import CandidateListComponent from '../components/candidateListComponent'

const CandidateListContainer = () => {
  const candidateList = [
    {
      name: 'Prayut Chan-o-cha',
      party: 'Millitary Party',
      vow: 'Returning happiness to the people',
      votes: 22
    }
  ]

  return (
    <CandidateListComponent items={candidateList} />
  )
}

export default CandidateListContainer

// Tell Standard JS that there is a global variable created by Jest so
// e.g. describe, it, expect, ...
/* eslint-env jest */

import React from 'react'
import App from './App'
import { shallow } from 'enzyme'

describe('<App />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.length).toEqual(1)
  })
})

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Login from '../LoginSignup/Login.vue'


describe('DashBoard', () => {
  it('renders properly', () => {
    const wrapper = mount(Login)
  })
})

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DashBoard from '@/views/DashBoard.vue'


describe('DashBoard', () => {
  it('renders properly', () => {
    const wrapper = mount(DashBoard, { props: { msg: 'Hello Dashboard' } })
    expect(wrapper.text()).toContain(' Book')
  })
})

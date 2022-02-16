import Vue from 'vue'
require('~/plugins/theme.client.ts')

describe('Theme switcher', () => {
  test('is set to light mode', () => {
    expect(Vue.prototype.$theme).toBe('light-mode')
  })

  test('is a function', () => {
    expect(typeof Vue.prototype.$changeTheme).toBe('function')
  })

  test('switch to dark mode', () => {
    document.body.classList.add = jest.fn()

    Vue.prototype.$changeTheme('dark-mode')
    expect(Vue.prototype.$theme).toBe('dark-mode')
    expect(document.body.classList.add).toHaveBeenCalledWith('dark-mode')
  })

  test('switch to light mode', () => {
    document.body.classList.remove = jest.fn()

    Vue.prototype.$changeTheme('light-mode')
    expect(Vue.prototype.$theme).toBe('light-mode')
    expect(document.body.classList.remove).toHaveBeenCalledWith('dark-mode')
  })
})

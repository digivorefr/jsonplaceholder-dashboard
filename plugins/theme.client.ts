import Vue from 'vue'

Vue.prototype.$theme = 'light-mode'

Vue.prototype.$changeTheme = (theme: string) => {
  if (theme === 'dark-mode') {
    document.body.classList.add('dark-mode')
    Vue.prototype.$theme = 'dark-mode'
  } else {
    document.body.classList.remove('dark-mode')
    Vue.prototype.$theme = theme
  }
}

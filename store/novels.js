export const state = () => ({
    auther:'',
    title:'',
    body:'',
    currentRead: '',
    like: false,
  })
  
  export const mutations = {
    add (state, text) {
      state.list.push({
        text: text,
        reading: '',
        done: false
      })
    },
    remove (state, { todo }) {
      state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle (state, todo) {
      todo.done = !todo.done
    }
  }
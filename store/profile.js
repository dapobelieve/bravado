import Vue from "vue"

export const state = () => ({
  profiles: [],
  suitableList: []
})

export const mutations = {
  SET_PROFILE (state, data) {
    state.profiles = Object.freeze(data)
  },
  MARK_PROFILE(state, data) {
   if(state.suitableList.indexOf(data.email) === -1) {
     state.suitableList.push(data.email)
   }else {
     state.suitableList.splice(state.suitableList.indexOf(data.email), 1)
   }
  },
}

export const actions = {
  async getProfiles({commit}) {
    let res = await this.$axios.$get('data.json', {
      baseURL: '/'
    })
    commit('SET_PROFILE', res)
  }
}

export const getters = {
  profiles: state => state.profiles,
  isProfileSuitable: state => email => {
    return state.suitableList.indexOf(email) !== -1
  }
}


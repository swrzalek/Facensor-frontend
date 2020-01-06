import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUploading: false,
    isProcessing: false,
    isReceiving: false,
    isDone: false,
    errorDialog: false,
    errorMessage: '',
    locked: false,
  },
  mutations: {
    reset(state){
      state.isUploading = false;
      state.isProcessing = false;
      state.isReceiving = false;
      state.isDone = false;
      state.locked = false;
      state.errorDialog = false;
      state.errorMessage = '';
    },
    uploadPhase(state){
      state.isUploading = true;
      state.locked = true;
    },
    processPhase(state){
      state.isUploading = false;
      state.isProcessing = true;
    },
    receivePhase(state){
      state.isProcessing = false;
      state.isReceiving = true;
    },
    success(state) {
      state.isDone = true;
      state.isReceiving = false;
    },
    error(state, respond) {
      state.errorDialog = true;
      state.errorMessage = respond;
    }

  },
  actions: {
    error(context, data){
      context.commit('error', data)
    },
    sent(context){
      context.commit('uploadPhase')
    },
    process(context){
      context.commit('processPhase')
    },
    received(context){
      context.commit('receivePhase')
    },
    done(context){
      context.commit('success')
    },
    reset(context){
      context.commit('reset')
    }

  },

  modules: {
  },
});

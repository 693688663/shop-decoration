const d_action = function () {
   return {
      baby_set_data_ac: function ({ commit, state }, payload) {
         console.log(payload)
      }
   }
}

export default d_action
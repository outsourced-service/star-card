export default {
	state: {
		data: {}
	},
	getters: {

	},
	mutations: {
		setData: (state, data) => {
			state.data = data;
		},
	},
	actions: {
		// wx静默登录
		wxSilentLogin(){
			
		}
	}
}
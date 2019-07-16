export const state = () => ({
    userInfo: {
        user: {},
        token: ''
    }
})
export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data;
    },
    clearUserInfo(state) {
        if (process.browser) {
            localStorage.removeItem('userInfo')
        }
        state.userInfo = {}
    }


}
export const actions = {
    LoginCheck(state, data) {
        return this.$axios({
            url: '/accounts/login',
            method: 'post',
            data
        }).then(res => {
            state.commit('setUserInfo', res.data)
        })
    },
    sendCode(state, phoneNumber) {
        return this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                tel: phoneNumber
            }
        }).then(res => {
            const { code } = res.data;

            return code;
        });
    },
    regist(state, data) {
        this.$axios({
            url: "/accounts/register",
            method: "post",
            data
        }).then(res => {
             state.commit('setUserInfo',res.data)
        })
    }
}
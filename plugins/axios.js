import { Message } from 'element-ui'
export default ({ $axios,redirect }) => {
    $axios.onError(err => {
        const { message, statusCode } = err.response.data;
        // 未授权
        if (statusCode === 401 || statusCode === 403) {
            // 跳转到登录页
            redirect("/user/login");
        }
        if (statusCode === 400) {
            Message.warning(message)
        }

    })
}
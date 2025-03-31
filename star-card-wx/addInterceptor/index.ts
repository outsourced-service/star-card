import login from "./login";

const addInterceptor: { options: any, overload: any }[] = []
addInterceptor.push(...login)
export default () => {
    addInterceptor.forEach(val => uni.addInterceptor(val?.options, val?.overload))
}
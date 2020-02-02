// uni-app请求封装
import { logError } from '@/utils/error'
import { HTTP_STATUS } from '@/constants/status';
import { eventBus } from '@/eventBus';

const baseUrl = 'http://rap2api.taobao.org/app/mock/238739';

export default class Request {
  get(router: string, data?: any): Promise<any> {
    // 基础地址
    // 返回promise
    uni.showLoading({ title: '加载中' })
    return new Promise((resolve, reject) => {
      // 请求
      uni.request({
        url: `${baseUrl}${router}`,
        data: data || {},
        method: 'GET',
        success: (res) => {
          if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
            logError('api', '请求资源不存在')
            uni.showToast({
              title: '请求资源不存在',
              icon: 'none',
              image:'/static/error-sign.png',
              duration: 2000
            })
            eventBus.$emit('serviceError')
            uni.hideLoading()
            reject('请求资源不存在')
          } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
            logError('api', '服务端异常')
            uni.showToast({
              title: '服务端异常',
              icon: 'none',
              image:'/static/error-sign.png',
              duration: 2000
            })
            eventBus.$emit('serviceError')
            uni.hideLoading()
            reject('服务端异常')
          } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
            logError('api', '没有权限访问')
            uni.showToast({
              title: '没有权限访问',
              icon: 'none',
              image:'/static/error-sign.png',
              duration: 2000
            })
            eventBus.$emit('serviceError')
            uni.hideLoading()
            reject('没有权限访问')
          } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
            uni.clearStorage()
            uni.navigateTo({
              url: '/pages/login/index'
            })
            logError('api', '请先登录')
            uni.showToast({
              title: '请先登录',
              icon: 'none',
              image:'/static/error-sign.png',
              duration: 2000
            })
            uni.hideLoading()
            reject('请先登录')
          } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
            uni.hideLoading()
            resolve(res.data)
          }
        },
        fail: (err) => {
          uni.showToast({ title: '请求异常', duration: 2000 })
          eventBus.$emit('serviceError')
          reject(err)
        }
      })
    })
  }
  post(router: string, data?: any): Promise<any> {
    // 基础地址
    // 返回promise
    uni.showLoading({ title: '加载中' })
    return new Promise((resolve, reject) => {
      // 请求
      uni.request({
        url: `${baseUrl}${router}`,
        data: data || {},
        method: 'POST',
        success: (res) => {
          if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
            logError('api', '请求资源不存在')
            uni.showToast({
              title: '请求资源不存在',
              icon: 'none',
              image:'/static/error-sign.png',
              duration: 2000
            })
            eventBus.$emit('serviceError')
            uni.hideLoading()
            reject('请求资源不存在')
          } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
            logError('api', '服务端异常')
            uni.showToast({
              title: '服务端异常',
              icon: 'none',
              image:'/static/error-sign.png',
              duration: 2000
            })
            eventBus.$emit('serviceError')
            uni.hideLoading()
            reject('服务端异常')
          } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
            logError('api', '没有权限访问')
            uni.showToast({
              title: '没有权限访问',
              icon: 'none',
              image:'/static/error-sign.png',
              duration: 2000
            })
            eventBus.$emit('serviceError')
            uni.hideLoading()
            reject('没有权限访问')
          } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
            uni.clearStorage()
            uni.navigateTo({
              url: '/pages/login/index'
            })
            logError('api', '请先登录')
            uni.showToast({
              title: '请先登录',
              icon: 'none',
              image:'/static/error-sign.png',
              duration: 2000
            })
            uni.hideLoading()
            reject('请先登录')
          } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
            uni.hideLoading()
            resolve(res.data)
          }
        },
        fail: (err) => {
          uni.showToast({ title: '请求异常', duration: 2000 })
          eventBus.$emit('serviceError')
          reject(err)
        }
      })
    })
  }
}
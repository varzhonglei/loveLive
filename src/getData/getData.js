import axios from 'axios'
import { baseUrl } from '../config/env.js'

// 获取广场动态数据
export const getSquareActive = () => axios.get('https://easy-mock.com/mock/5a699b8932767a35bdb7f62f/test/square')

export const signup = (data) => axios.post( baseUrl + 'signup', data)

export const login = (data) => axios.post( baseUrl + 'login', data)

export const fixInforReq = (data) => axios.post( baseUrl + 'fixInfoReq', data)

export const getUserInfo = () => axios.get( baseUrl + 'getUserInfo' )

export const test = (data) => axios.post( baseUrl + 'test', data)

import {TIME_STAMP, TOKEN_TIMEOUT_VALUE} from '@/constant'
import { getItem, setItem } from '@/utils/storeage'

// 获取时间戳
export function getTimeStamp(){
    return getItem(TIME_STAMP)
}

// 设置时间戳
export function setTimeStamp(){
    setItem(TIME_STAMP,Date.now())
}

// 判断是否超时
export function isCheckTimeout(){
    // 当前时间
    const currentTime = Date.now()
    // 缓存时间
    const timeStamp = getTimeStamp()
    // 超过了return true  否则 false
    return  currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}

/**
 * 
*/



import Mock from 'mockjs'
import { param2Obj  } from '../src/utils/transform'
import user from './user'

const mocks = [
    ...user
]

for (const i of mocks) {
    // url 路径 ， type路径  response 响应方法，传入，等待调用
    // XHR2ExpressReqWrap 会立刻被执行, 导出一个方法，options参数相当于mock函数第三个函数参数传入的参数，相当于使用闭包持久化了方法和options
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
}


function XHR2ExpressReqWrap(respond) {
    return function (options) {
        let result = null
        if (respond instanceof Function) {
            const { body, type, url } = options
            // https://expressjs.com/en/4x/api.html#req         
            result = respond({
                method: type,
                body: JSON.parse(body),
                query: param2Obj(url)
            })
            console.log('-----------------')
            console.log('响应数据',result)
            console.log('-----------------')

        } else {
            result = respond
        }
        return Mock.mock(result)
    }
}



export default Mock;
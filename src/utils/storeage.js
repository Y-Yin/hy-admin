/**
 * 存储数据
*/
export const setItem = (key,val)=>{
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    window.localStorage.setItem(key,val)
}


/**
 * 获取数据
*/
export const getItem = key =>{
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

/**
 * 删除指定数据
*/
export const removeItem = key =>{
    window.localStorage.removeItem(key)
}


/**
 * 删除所有数据
*/

export const removeAllItem = ()=>{
    window.localStorage.clear()
}
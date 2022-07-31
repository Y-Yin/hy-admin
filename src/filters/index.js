import moment from "moment";

const dateFilter = (val,format = 'YYYY-MM-DD') =>{
    // isNaN 非数字，非数字再取反  表示val可以被转成一个数字
    if(!isNaN(val)){
        val = parseInt(val)
    }

    return dayjs(val).format(format)
}

export default app=>{
    app.config.globalProperties.$filters = {
        dateFilter
    }   
}   
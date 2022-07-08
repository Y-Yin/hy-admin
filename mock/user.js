import Mock from 'mockjs'

const data = Mock.mock({
    'items|30': [{
        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        author: 'name',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
    }]
})

console.log('mock data',data)

let user = [
    // 登陆接口
    {
        url: '/sys/login',
        type: 'post',
        response: config => {
            // const items = data.items
            // return {
            //     code: 200,
            //     data: {
            //         total: items.length,
            //         items: items
            //     }
            // }
            if(config.body.username === 'admin' && config.body.password === 'admin'){
                return {
                    code:200,
                    data:{
                        token:'200-300-400-123-456-76245'
                    },
                    msg:'登陆成功'
                }
            }else{
                return {
                    code:300,
                    data:null,
                    msg:'账号密码错误'
                }
            }
        }
    }
]

export default user
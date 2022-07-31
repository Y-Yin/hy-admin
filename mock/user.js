import Mock from 'mockjs'
const Random = require('mockjs').Random;

// 扩展随机生成手机号

Mock.Random.extend({
    phone: function () {
        return '132' + Mock.mock(/\d{8}/) //Number()
    }
})

let roleList = [
    {
        id:'1',
        title:'超级管理员'
    },
    {
        id:'2',
        title:'管理员',
    },
    {
        id:'3',
        title:'员工'
    }
]



const data = Mock.mock({
    'items|10': [{
        id: '@id',
        name: "@cname",
        image: Random.image('200x100'),
        phone: '@phone', // '@phone'
        email: Random.email(),  // '@email'
        display_time: new Date().getTime(),
        pageviews: '@integer(300, 5000)',
        'role|1': roleList
    }]
})







// console.log('mock data',data)

let user = [
    // 登陆接口
    {
        url: '/sys/login',
        type: 'post',
        response: config => {
            if (config.body.username === 'admin' && config.body.password === 'admin') {
                return {
                    code: 200,
                    data: {
                        token: '200-300-400-123-456-76245'
                    },
                    msg: '登陆成功'
                }
            } else {
                return {
                    code: 300,
                    data: null,
                    msg: '账号密码错误'
                }
            }
        }
    },
    // 获取用户信息
    {
        url: '/sys/profile',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: {
                    role: [
                        {
                            id: 1,
                            title: '超级管理员'
                        }
                    ],
                    _id: '222223345222',
                    id: 0,
                    username: '小寅',
                    title: '超级管理员',
                    permission: {
                        menu: [],
                        points: []
                    }
                }
            }
        }
    },
    // 获取角色列表
    {
        url: '/user-manage/list',
        type: 'post',
        response: config => {
            const items = data.items
            return {
                code: 200,
                data: {
                    page:1,
                    size:10,
                    total: items.length,
                    list: items
                }
            }
        },
    }
]

export default user
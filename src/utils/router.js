
import path from 'path'
// 所有的子集路由
export const getChildrenRoutes = routes => {
    const reslut = []
    routes.forEach(route => {
        if (route.children && route.children.length > 0) {
            reslut.push(...route.children)
        }
    })
    return reslut
}

// 处理脱离层级的路由
export const filterRoutes = routes => {
    // 所有的子集路由   
    const childrenRoutes = getChildrenRoutes(routes)
    // 根据子集路由进行查重操作
    const filterRoutersList = routes.filter(route => {
        return !childrenRoutes.find(childrenRoute => {
            return childrenRoute.path === route.path
        })
    })
    return  filterRoutersList
}


// 根据routes 数据，返回对应的menu规则数据
export const generateMenus = (routes, basePath = '') => {
    const result = []
    // 不满足 meta && meta.title && meta.icon
    routes.forEach(item => {
        // 不存在 children && 不存在meta 直接return
        if (isNall(item.children) && isNall(item.meta)) return
        // 存在 children , 不存在meta ， 迭代 generateMenus
        if (isNall(item.meta) && !isNall(item.children)) {
            result.push(...generateMenus(item.children))
            return
        }
        // 不存在 children， 存在meta , 存在children并且也存在meta
        // 因为最终的menu 需要进行跳转，此时我们需要合并path
        const routePath = path.resolve(basePath, item.path)

        // 路由分离的时候，可能存在同名父路由的情况
        let route = result.find(item => item.path === routePath)
        // 当前路由尚未加入到result
        if (!route) {
            route = {
                ...item,
                path: routePath,
                children: []
            }
            // icon && title
            if (route.meta.icon && route.meta.title) {
                result.push(route)
            }
        } 
        // 存在meta , 存在children并且也存在meta
        if (!isNall(item.children)) {
            route.children.push(...generateMenus(item.children, route.path))
        }

    })
    return result
}


export const isNall = data => {
    if (!data) return true
    if (JSON.stringify(data) === '{}') return true
    if (JSON.stringify(data) === '[]') return true
    return false
}
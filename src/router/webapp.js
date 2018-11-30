//webapp模块路由
export default [{
    path: '/dypropaganda',
    name: 'dypropaganda',
    component: () =>
        import ('@/pages/dypropaganda/dypropaganda'), //路由懒加载
    meta: { webapp: true, } //路由元信息
}]
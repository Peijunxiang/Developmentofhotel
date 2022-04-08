/**
 * @Desc:   vue路由配置
 */
import Main from '../components/main/main.vue';

export default [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      icon: 'md-home',
    },
    component: Main,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'home-index',
        meta: {
          title: '房间管理',
          href: '/home/index',
          icon: 'md-pricetags',
        },
        component: () => import('../modules/home/pages/index.vue'),
      },
      {
        path: 'person',
        name: 'home-person',
        meta: {
          title: '人员管理',
          href: '/home/person',
          icon: 'md-person',
        },
        component: () => import('../modules/home/pages/person.vue'),
      },
    ],
  },
  
];

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from "../views/Login";
import Main from "../views/main/Main";
import List from "../views/main/List";
import Add from "../views/main/category/Add"
import Index from "../views/main/category/Index"
import Categoryedit from "../views/main/category/Categoryedit";
import Changepass from "../views/main/pass/Changepass";
import Stayhomeadd from "../views/main/stayhome/Stayhomeadd";
import Stayhomeindex from "../views/main/stayhome/Stayhomeindex";
import Stayhomeedit from "../views/main/stayhome/Stayhomeedit";
import Echartscom from "../views/main/echarts/Echarts";


let router=new VueRouter({
    routes:[
        {path:'/',component:Main,name:'index',
            redirect: '/echarts',
           meta:{
            auth:true,title:'首页'
           },
            children:[
                {path:'changepass',component:Changepass,name:'changepass',meta:{
                        title:'修改密码',
                        auth:'true'
                    }
                },
                {path:'/categoryadd',component:Add,name:'categoryadd',meta:{
                title:'分类添加',
                    auth:'true'
                }
                },
                {path:'/categoryindex',component:Index,name:'categoryindex',meta:{
                        title:'分类查看',
                        auth:'true'
                    }
                 },
                {path:'/categoryedit',component:Categoryedit,name:'categoryedit',meta:{
                        title:'分类编辑',
                        auth:'true'
                    }
                },
                {path:'/stayhomeadd',component:Stayhomeadd,name:'stayhomeadd',meta:{
                        title:'民宿添加',
                        auth:'true'
                    }
                },
                {path:'/stayhomeindex',component:Stayhomeindex,name:'stayhomeindex',meta:{
                        title:'民宿查看',
                        auth:'true'
                    }
                },
                {path:'/stayhomeedit/:id',component:Stayhomeedit,name:'stayhomeedit',meta:{
                        title:'民宿编辑',
                        auth:'true'
                    }
                },
                {path:'echarts',component:Echartscom,name:'echarts',meta:{
                        title:'数据可视化',
                        auth:'true'
                    }
                },
            ]
        },
        {path:'/login',component: Login,name:'login',
        meta:{
            auth: false,title:'登录'
        }
        },
        {path:'/list',component: List,name:'list',
            meta:{
            auth: true,title:'列表'
            }
            },
    ]
})
/*
* 导航守卫 /==>/login==>/list
*1 监听路由变化  前置守卫
*2 to 路由元信息
* */
router.beforeEach((to,from,next)=>{
   let title=to.meta.title||'首页';
   document.title=title;
   if (to.meta.auth){
       let token=sessionStorage.getItem('token');
       token=token&&token.trim();
       if (token){
           next();
       }else{
          next({name:'login',query:{redirect:to.name}})
       }
   }else{
       next();
   }
next()
})
export default router;

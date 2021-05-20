<template>
    <div >
      <h1 id="logo">
        <img v-if="collapsedFlag" :src ="logoUrl_min" alt=""> 
        <img v-else :src ="logoUrl" alt=""> 
      </h1>
          <!-- <div class="logo" /> -->
          <a-menu 
            theme="dark"
            v-model:selectedKeys="selectedKeys" 
            v-model:openKeys="openKeys" 
            mode="inline"
            @click = selectMenu
            @openChange = openMenu
            collapsible
           >
               <template v-for="(item,index) in routerArray">
                    <template v-if="!item.hidden">
                      <!-- 一级菜单显示 -->
                      <a-menu-item v-if="hasOnlyChildren(item)" :key="item.path" >

                        <router-link class='color-white'  :to="item.children[0].path">
                          <span class="anticon">
                            <svg-icon :iconName ='item.meta.icon' className ='aside-width-25'/>
                          </span>
                          <span>{{item.children[0].meta && item.children[0].meta.title}}</span>
                          <!-- <i class="icon  w-21 mb--5" :class="item.meta && item.meta.icon"></i> -->
                          
                        </router-link>
                        </a-menu-item>
                      <!-- 二级菜单 -->
                      <Meun v-else :menu ='item'  :key="item.path" />
                    </template>
            </template>
           
          </a-menu>
    </div>
</template>

<script>

import {reactive, onMounted,toRefs,ref} from 'vue'
import {useRouter} from 'vue-router'
import Meun from './menu'
export default {
    name:'Aside',
    components:{Meun},
    props:{
      collapsedFlag:{
        type:Boolean,
        default:false
      }
    },
    setup(props) {
      
      const {options} = useRouter()
      const routerArray = options.routes
      const data = reactive({
          logoUrl:require('@/assets/images/logo.png'),
          logoUrl_min:require('@/assets/images/logo_min.png'),
          selectedKeys: localStorage.getItem('selectedKeys') ? [localStorage.getItem('selectedKeys')] : [],
          openKeys: localStorage.getItem('openkey') ? [localStorage.getItem('openkey')] : [],
      })

      const AsideData = toRefs(data)

      onMounted(() => {})

      //选择菜单
      const selectMenu = ({ item, key, keyPath} )=>{
          data.selectedKeys = [key]
          localStorage.setItem('selectedKeys',[key])
      }
     
      //展开/关闭菜单
      const openMenu = ( openKeys )=>{
        data.openKeys = openKeys
        localStorage.setItem('openkey',openKeys)
      }

      //只有一个子集处理函数
      const hasOnlyChildren =(data)=>{
        if(data.hidden) return false;
        const routers = data.children.filter( item => item.hidden ? false:true)
        if(routers.length == 1) return true
        return false
      }

      

      return {
           ...AsideData,
           routerArray,
           openMenu,selectMenu,hasOnlyChildren
        }
    }
}
</script>
<style lang='scss'>
#logo{
  padding:24px 0 20px;
  text-align: center;
  border-bottom: 1px solid #000;
  img{
    display: inline-block;
  }
}
i.icon{
  margin-right: 5px;
  opacity: .6;
  }
  .ant-menu-item-selected{
    i.icon{
      opacity: 1;
    }
  }
  .ant-menu-submenu-open{
    >div{
        i.icon{
            opacity: 1;
        }
    }
  }

</style>
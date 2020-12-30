<template>
    <div >
      <h1 id="logo">
        <img :src ="logoUrl" alt="">
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
                      <a-menu-item v-if="!item.children" :key="item.path" >

                        <router-link class='color-white'  :to="item.path">
                          <span class="anticon">
                            <svg-icon :iconName ='item.meta.icon' className ='aside-width-25'/>
                          </span>
                          <span>{{item.meta && item.meta.title}}</span>
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
    setup(props) {
      const {options} = useRouter()

      const routerArray = options.routes
      const data = reactive({
          logoUrl:require('@/assets/images/logo.png'),
          collapsed: true,
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

      return {
           ...AsideData,
           routerArray,
           openMenu,selectMenu
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
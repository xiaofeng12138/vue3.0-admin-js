<template>
        <a-sub-menu key="/adminIndex">
            <template #title>
                <span>
                   <span class="anticon">
                       <svg-icon :iconName ='menu.meta.icon' className ='aside-width-30'/>
                   </span>
                     
                      <!-- <i class="icon  w-21 mb--5" :class="menu.meta && menu.meta.icon"></i> -->
                      <span>{{menu.meta && menu.meta.title}}</span>
                </span>
            </template>
            <template v-if ="menu.children.length > 0">
               <template v-for ="(item,index) in menu.children">
                        <!-- 一级菜单显示 -->
                        <a-menu-item v-if="!item.children" :key="item.path" >
                                <router-link :to="item.path">
                                   <span class="anticon">
                                        <svg-icon :iconName ='item.meta.icon' className ='aside-width-30'/>
                                    </span>
                                    <!-- <i class="icon  w-21 mb--5" :class="menu.meta && menu.meta.icon"></i> -->
                                     <span>{{menu.meta && menu.meta.title}}</span>
                                </router-link>
                        </a-menu-item>

                        <!-- 二级菜单 -->
                        <Menu v-else :menu ='item' :key="item.path" />
                  
              </template>
            </template>
           
       </a-sub-menu>
</template>

<script>

import {reactive, onMounted,toRefs,ref} from 'vue'
import {useRouter} from 'vue-router'
export default {
    name:'Menu',
    props:{
        menu:{
            type:Object,
            default:()=>{{}}
        }
    },
    setup(props) {
      
    }
}
</script>
<style lang='scss' scoped>
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
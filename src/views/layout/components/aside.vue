<template>
    <div>
         <a-layout-sider v-model:collapsed="collapsed" >
          <!-- <div class="logo" /> -->
          <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
         
               <template v-for="(item,index) in routerArray">
                    <template v-if="!item.hidden">
                      <!-- 一级菜单显示 -->
                      <a-menu-item v-if="!item.children" :key="item.path" ><span>{{item.meta && item.meta.title}}</span></a-menu-item>

                      <!-- 二级菜单 -->

                       <a-sub-menu v-else key="/adminIndex">
                        <template #title>
                          <span>{{item.meta && item.meta.title}}</span>
                        </template>
                        <a-menu-item v-for ="(ele,index) in item.children" :key="ele.path">{{ele.meta && ele.meta.title}}</a-menu-item>
                      </a-sub-menu>
                    </template>
            </template>
           
          </a-menu>
    </a-layout-sider>
    </div>
</template>

<script>

import {reactive, onMounted,toRefs,ref} from 'vue'
import {useRouter} from 'vue-router'
export default {
    name:'Aside',
    setup(props) {
      const {options} = useRouter()

      const routerArray = options.routes
      console.log(routerArray)
      const data = reactive({
          collapsed: false,
          selectedKeys: ['/'],
      })

      const AsideData = toRefs(data)

      onMounted(() => {})

      return {
           ...AsideData,
           routerArray
        }
    }
}
</script>
<style lang='scss' scoped>

</style>
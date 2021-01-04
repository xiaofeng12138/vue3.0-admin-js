<template>
    <a-layout id="components-layout-demo-custom-trigger">
        
        <a-layout-sider 
            v-model:collapsed="collapsed" 
            :trigger="null" 
            collapsible
            width= "255"
        >
        <Aside :collapsedFlag = "collapsed" />
        </a-layout-sider>
        <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
            
         <Header @xf = 'handerClick'  />
        </a-layout-header>
        <a-layout-content
            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
        
        <Content />
        </a-layout-content>
        </a-layout>
  </a-layout>
</template>

<script>

import {reactive, onMounted,toRefs,ref} from 'vue'
import Aside from './components/aside';
import Header from './components/header';
import Content from './components/content'
import { json } from 'body-parser';
export default {
    components:{Aside,Header,Content},
    setup(props) {
        const data = reactive({
           collapsed:JSON.parse(localStorage.getItem('menuFlag'))
        })
        const layoutData = toRefs(data)
        onMounted(() => {})
        const handerClick =(e)=>{
            const bool = !data.collapsed
            data.collapsed = bool
            localStorage.setItem('menuFlag', bool)
        }
        return {
            ...layoutData,handerClick
        }
     }
    }
</script>
<style lang='scss'>
    .ant-layout{height: 100vh;}
    
   
</style>
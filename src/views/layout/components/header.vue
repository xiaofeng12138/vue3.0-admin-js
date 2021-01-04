<template>
    <div class="header">
        <div class="meun"  @click="toggleMenu">
            <svg-icon iconName ='menu' className ='aside-width-30'/>
        </div>
        <div class="header_muen">
            <a-dropdown>
            <img src="@/assets/face.jpg" alt="">
            <template #overlay>
            <a-menu>
                <a-menu-item key="0">
                 <div class="wrap">
                    18130379657
                 </div>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="1">
                 <div class="wrap">
                     <span :class="currentLang == item.value?'current':''" v-for="(item,index) in langType" :key="index" @click="toggle(item)">{{item.label}}</span>
                 </div>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="2" >
                <div class="wrap">
                    {{ $t("header_meun.logout") }}
                 </div>
                </a-menu-item>
            </a-menu>
            </template>
        </a-dropdown>
        </div>
    </div>
</template>

<script>
//引入语言
import {useI18n} from 'vue-i18n'
import {reactive, onMounted,toRefs,ref, toRef,getCurrentInstance} from 'vue'
export default {
    name:'Header',
    setup(props) {
        const {locale} = useI18n({useScope:'global'})
        const {emit} = getCurrentInstance()
        const data = reactive({
            langType:[
                {value:'ch',label:'中文'},
                {value:'en',label:'英文'},
                {value:'jp',label:'日文'},
            ],
            currentLang:'ch',
        })
        const headerData = toRefs(data)

        const toggle = (item)=>{
           data.currentLang = item.value
           locale.value = item.value
        }
        onMounted(() => {})

        //点击伸缩按钮
      const toggleMenu = ()=>{
        console.log(33)
          emit('xf',{a:1})
      }


        return {
            ...headerData,toggle,toggleMenu
        }
    }
}
</script>
<style lang='scss' scoped>
.header{
    .meun{
        float: left;
        cursor: pointer;
        margin-left: 20px;
    }
    .header_muen{
        float: right;
        padding-top: 10px;
        padding-right: 30px;
        img{
            width: 40px;
            height: 40px;
            cursor: pointer;
        }
    }
    
    
}
.wrap{
        padding:0 20px;
        span{
            margin-right: 10px;
        }
        .current{
            color:#000;
            font-weight: bold;
        }
    }
</style>
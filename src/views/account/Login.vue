<template>
  <div class="account">
    <div class="form_wrap">
       <a-form
          ref="ruleForm"
          v-bind="FormConfig.layout"
        >
          <a-form-item >
            <label>用户名</label>
            <a-input type="text"  />
          </a-form-item>

           <a-form-item >
            <label>密码</label>
            <a-input type="password"  />
          </a-form-item>
          <a-form-item>
            <Captcha />
            
            <!--No-Captcha渲染的位置，其中 class 中必须包含 nc-container-->
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" block>
              登录
            </a-button>
          </a-form-item>
           <a-form-item>
            <div class="fs-12 text-center color-white" >
              <router-link to='/forget' class="color-white">忘记密码</router-link> |
              <router-link to='/register' class="color-white">注册</router-link>
            </div>
          </a-form-item>
          
        </a-form>
    </div>
  </div>
</template>

<script>
import {reactive, onMounted,toRefs,ref} from 'vue'
import Captcha from '@/components/captcha/index'
export default {
  name: "Login",
  components:{Captcha},
  setup(props) {

    // ref 定义基础数据类型
     const number = ref(10)
     const FormConfig = reactive({
       layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      }
     })
     const data = toRefs(FormConfig)
     console.log(number.value)
   

     return {
       FormConfig,
       ...data
     }
  }
};
</script>

<style lang="scss" scoped>
  .account{
    width: 100vw;
    height: 100vh;
    background-color: #282828;
    .form_wrap{
         width: 330px;
         margin: auto;
         padding-top:200px; 
         color: #fff;
         label{
           font-size: 14px;
           color: #fff;
         }
    }
  }
</style>

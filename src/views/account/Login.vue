<template>
  <div class="account">
    <div class="form_wrap">
       <a-form
          ref="ruleForm"
          v-bind="layout"
          :model="RegisterForm"
          :rules="rules"
          @finish="handleSubmit"
        >
          <a-form-item name = 'username'>
            <label>用户名</label>
            <a-input type="text" v-model:value="RegisterForm.username"  />
          </a-form-item>

           <a-form-item name = 'password'>
            <label>密码</label>
            <a-input type="password" v-model:value="RegisterForm.password"  />
          </a-form-item>
          <a-form-item>
            <Captcha />
            
            <!--No-Captcha渲染的位置，其中 class 中必须包含 nc-container-->
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" block>
              登录
            </a-button>
             <a-button type="primary"  block  @click="Test">
              测试按钮
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
import {reactive, onMounted,toRefs,ref,getCurrentInstance} from 'vue'
import Captcha from '@/components/captcha/index'
import {GetCode} from '@/api/account.js'
import {validate_Phone,validate_Password} from '@/utils/reg.js'
export default {
  name: "Login",
  components:{Captcha},
  setup(props) {

    //ctx 相当于vue2.0 中的this
    const {ctx } = getCurrentInstance()
    //自定义校验规则
    let checkUsername = async (rule, value, callback) => {
      if (!value) {
        return Promise.reject('请输入用户名');
      }else if (!validate_Phone(value)) {
        return Promise.reject('请输入11位手机号');
      } else{
        return Promise.resolve();
      }
    };
 
    let checkPassword = async (rule, value, callback) => {
      const psds = FormConfig.RegisterForm.passwords
      if (!value) {
        return Promise.reject('请输入密码');
      }else if (!validate_Password(value)) {
        return Promise.reject('请输入11位手机号');
      } else if(value && psds){
        if(value !== psds){
          return Promise.reject('两次输入密码不一致');
        }else{
          return Promise.resolve();
        }
      }
    };

    // ref 定义基础数据类型
     const number = ref(10)
     const FormConfig = reactive({
       layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },

      RegisterForm:{
        username:'',
        password:'',
        passwords:"",
        code:""
      },
      //表单校验规则
      rules:{
          username: [{ validator: checkUsername,  trigger: 'change' }],
          password: [{ validator: checkPassword,  trigger: 'change' }],
        }
     })
     const data = toRefs(FormConfig)
   
    //表单提交函数
    const handleSubmit =(values)=>{
      console.log(values)
    }

    //测试
    const Test = ()=>{
      GetCode().then(res=>{
        console.log(res)
      })
    }
     return {
       FormConfig,
       ...data,
       handleSubmit,
       Test
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

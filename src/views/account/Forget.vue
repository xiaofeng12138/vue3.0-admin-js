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
            <a-input type="text" v-model:value="RegisterForm.username" />
          </a-form-item>

           <a-form-item name = 'password'>
            <label>密码</label>
            <a-input type="password" v-model:value="RegisterForm.password"  />
          </a-form-item>
           <a-form-item  name = 'passwords'>
            <label>确认密码</label>
            <a-input type="password" v-model:value="RegisterForm.passwords"  />
          </a-form-item>

           <a-form-item name = 'code'>
            <label>验证码</label>
            <a-row :gutter='15'>
             <a-col :span="13">
                 <a-input v-model:value="RegisterForm.code" />
              </a-col>
              <a-col :span="11">
                <Code :userName = "RegisterForm.username" />
              </a-col>
             </a-row>
          </a-form-item>

          <a-form-item>
           
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" block>
              重置密码
            </a-button>
          </a-form-item>
           <a-form-item>
            <div class="fs-12 text-center color-white" >
              <router-link to='/' class="color-white">登录</router-link> |
              <router-link to='/register' class="color-white">注册</router-link>
            </div>
          </a-form-item>
          
        </a-form>
    </div>
  </div>
</template>

<script>
import {reactive, onMounted,toRefs,ref,provide } from 'vue'
import {validate_Phone,validate_Password} from '@/utils/reg.js'
import Code from '@/components/code/index'
export default {
  name: "Login",
  components:{Code},
  setup(props) {
   //自定义校验规则
    let checkUsername =  (rule, value, callback) => {
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
    let checkPasswords = async (rule, value, callback) => {
      const psd = FormConfig.RegisterForm.password
      if (!value) {
        return Promise.reject('请输入确认密码');
      }else if (!validate_Password(value)) {
        return Promise.reject('请输正确格式的确认密码');
      }  else if(value && psd){
        if(value !== psd){
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
          passwords: [{ validator: checkPasswords,  trigger: 'change' }],
          code: [{ required:true,  trigger: 'change',message:'验证码不能为空' }],
        }
     })

     const data = toRefs(FormConfig)
    
    //表单提交函数
    const handleSubmit =(values)=>{
      console.log(values)
    }

     return {
       ...data,
       handleSubmit
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

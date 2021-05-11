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
          <a-form-item name = 'username' ref="username">
            <label>用户名</label>
            <a-input type="text" v-model:value="RegisterForm.username" :disabled="input_disabled.username" @change="() => {$refs.username.onFieldChange()}" />
          </a-form-item>

           <a-form-item name = 'password' ref="psw">
            <label>密码</label>
            <a-input type="password" v-model:value="RegisterForm.password" placeholder="请输入密码"  @change="() => {$refs.psw.onFieldChange()}"  />
          </a-form-item>

           <a-form-item  name = 'passwords' ref="psws">
            <label>确认密码</label>
            <a-input type="password" v-model:value="RegisterForm.passwords" placeholder="请输入确认密码"  @change="() => {$refs.psws.onFieldChange()}"  />
          </a-form-item>

           <a-form-item name = 'code'>
            <label>验证码</label>
            <a-row :gutter='15'>
             <a-col :span="13">
                 <a-input v-model:value="RegisterForm.code" />
              </a-col>
              <a-col :span="11">
                <a-button type="primary" block @click="getCode" :loading="dataItem.button_loading" :disabled="dataItem.button_disabled"> {{dataItem.button_text}} </a-button>
                <!-- <Code :userName = "RegisterForm.username" /> -->
              </a-col>
             </a-row>
          </a-form-item>

          <a-form-item>
           
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" block>
              注 册
            </a-button>
          </a-form-item>
           <a-form-item>
            <div class="fs-12 text-center color-white" >
               <router-link to='/forget' class="color-white">忘记密码</router-link> |
              <router-link to='/' class="color-white">登录</router-link>
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

//UI组件
import { message } from 'ant-design-vue';

//API
import {checkUserName,Send,Register} from '@/api/account.js'

//Router
import {useRouter} from 'vue-router'

//引入md5加密
import md5 from 'js-md5';


export default {
  name: "Login",
  components:{Code},
  setup(props) {

    const { replace } = useRouter()
   //自定义校验规则
    let checkUsername = async (rule, value, callback) => {
      if (!value) {
        FormConfig.dataItem.button_disabled = true
        return Promise.reject('请输入用户名');
      }else if (!validate_Phone(value)) {
        FormConfig.dataItem.button_disabled = true
        return Promise.reject('请输入11位手机号');
      } else{
        //  checkUserNameFn()
        FormConfig.dataItem.button_disabled = false
        return Promise.resolve();
      }
    };
 
    let checkPassword = async (rule, value, callback) => {
      const psds = FormConfig.RegisterForm.passwords
      if (!value) {
        return Promise.reject('请输入密码');
      }else if (!validate_Password(value)) {
        return Promise.reject('请输入6-20位数字加字母');
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
        username:'18130379657',
        password:'123456a',
        passwords:"123456a",
        code:"1111"
      },
      input_disabled:{
        username:false
      },
      //获取验证码
      dataItem:{
        button_text:"获取验证码",
        button_loading:false,
        button_disabled:true,
        sec:5,
        timer:null
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
    

    //=====================事件处理函数===========================
    //表单提交函数
    const handleSubmit =(values)=>{
      let requestData ={
        username:FormConfig.RegisterForm.username,
        password:md5(FormConfig.RegisterForm.password),
        code:FormConfig.RegisterForm.code,
      }
      Register(requestData).then((res)=>{
        let code_status = res.content.code
        let msg = code_status ? '注册成功': res.msg
        if(!code_status){
           message.error(msg)
        }else{
           message.success(msg)
           replace({
             name:'Login'
           })
        }
      })
    }

    //用户检测函数
    const  checkUserNameFn =()=>{
       FormConfig.input_disabled.username = true
       return checkUserName({username:FormConfig.RegisterForm.username}).then(res=>{
         const userStatus =  res.content.user
          // let btnStatus =  res.content.user
          FormConfig.input_disabled.username = false
          FormConfig.dataItem.button_disabled = userStatus
          if(userStatus){
            message.error('用户名已存在')
          }
          return userStatus
        }).catch((error)=>{
          FormConfig.input_disabled.username = false
        })
    }

    //获取验证码函数
    const getCode = async ()=>{
     let usernameStatus = await checkUserNameFn()    //等待那个接口 await就给谁用
     if(usernameStatus){return false}
      let requestData={
        username:FormConfig.RegisterForm.username,
        type:'Register'
      }
       Send(requestData).then(res=>{
         console.log(res)
         if(res.error_code == 0){
            message.success('验证码发送成功：' + res.content)
         }
       })
       countDown()
    }

    //倒计时函数
    const countDown =()=>{
       if(FormConfig.dataItem.timer){  window.clearInterval(FormConfig.dataItem.timer)}
         FormConfig.dataItem.timer = setInterval(() => {
            const s =  FormConfig.dataItem.sec-- ;
            FormConfig.dataItem.button_text = `${s}秒`
            FormConfig.dataItem.button_loading = true
            FormConfig.dataItem.button_disabled = true
            if( s <= 0){
              window.clearInterval(FormConfig.dataItem.timer);
              FormConfig.dataItem.button_text = '重新获取'
              FormConfig.dataItem.button_loading = false
              FormConfig.dataItem.button_disabled = false
              FormConfig.dataItem.sec = 5
            }
        }, 1000);
    }

    
    //======================数据返回值================================

     return {
       ...data,
       handleSubmit,
       checkUserNameFn,
       getCode,
       countDown
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

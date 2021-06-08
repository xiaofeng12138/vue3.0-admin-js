<template>
    <a-modal
     v-model:visible="visible" 
     :title="rowId ? '编辑用户' : '新增用户' "
     @cancel='close' 
     :maskClosable = false
     :confirm-loading="confirmLoading"
     @ok="handleOk"
       >
        <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="手机号" name='phone'>
              <a-input v-model:value="formState.phone" />
            </a-form-item>
             <a-form-item label="密码" name='password'>
              <a-input  type="password"  v-model:value="formState.password" />
            </a-form-item>
            <a-form-item label="用户名" name='username'>
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="真实姓名" name='truename'>
              <a-input v-model:value="formState.truename" />
            </a-form-item>
            <a-form-item label="身份证" name='card_id'>
              <a-input v-model:value="formState.card_id" />
            </a-form-item>
            <a-form-item label="角色类型" name='role'>
              <a-radio-group :options="roleOptions" v-model:value="formState.role" />
            </a-form-item>
             <a-form-item label="禁启用" name='status'>
               <a-radio-group :options="statuaOptions" v-model:value="formState.status" />
            </a-form-item>

            
      </a-form>
    </a-modal>
</template>

<script>
//引入md5加密
import md5 from 'js-md5';
import { CreateUser,UserInfo,UserUpdate } from '@/api/user'
import {reactive, onMounted,toRefs,ref,watch} from 'vue'
import { message } from 'ant-design-vue';
import {requestDataFormat} from '@/utils/formatData.js'
export default {
    props:{
        showFlag:{
            type:Boolean,
            default:false
        },
        rowId:{
            type:[String,Number],
            default:''
        },
    },
    emits:["update:showFlag","update:rowId"],
    setup(props,{emit,parent}) {
        //弹框关闭Flag
        const visible = ref(false)
        
        //异步加载Flag
        const confirmLoading = ref(false)
        let formState = reactive({
            username: '',
            truename: '',
            phone: '',
            card_id: '',
            role: '',
            password:"",
            status: true,
        });
        const roleOptions = [
                { label: '超管', value: 'admin' },
                { label: '产品管理', value: 'product' },
                { label: '用户管理', value: 'user' },
        ];
        const statuaOptions = [
                { label: '启用', value: true },
                { label: '禁用', value: false },
        ];
        //定义表单对象
        const formRef = ref(null)

        //表单提交函数
        const handleOk = ()=>{
           props.rowId ? handEdit() : handCreate()
        }

        //用户编辑
         const handEdit = ()=>{
           console.log(333333);
           confirmLoading.value = true
           //两种对象浅拷贝的方式 
           let requestData = Object.assign({},formState)
           if(requestData.password ){
               requestData.password = md5(requestData.password)
           }else{
             delete requestData.password 
           }
           console.log(requestData);
           UserUpdate({...requestData,member_id:props.rowId}).then(res=>{
                   confirmLoading.value = false
                   close()
                   message.success(res.msg)
                   emit('aaa')
        
           }).catch((error)=>{
               confirmLoading.value = false
               message.error('接口响应失败 请重试')
           })
         }
        //用户提交
        const handCreate = ()=>{
          confirmLoading.value = true
           //两种对象浅拷贝的方式 
           let requestData = Object.assign({},formState)
           requestData.password = md5(requestData.password)
           CreateUser(requestData).then(res=>{
               if(!res.content.user){
                 confirmLoading.value = false
                 message.error(res.msg)
                 return false
               }else{
                   confirmLoading.value = false
                   close()
                   message.success(res.msg)
                   emit('aaa')
               } 
           }).catch((error)=>{
               confirmLoading.value = false
               message.error('接口响应失败 请重试')
           })
         }
     

        const resetForm =()=>{
           formRef.value.resetFields()
        }

        //单个监听
        watch(()=> props.showFlag,(newValue,oldValue)=>{
             visible.value = newValue
             if(props.rowId && newValue){
               getUserInfo()
             }
        })

        //获取用户详情

        const getUserInfo = ()=>{
          if(props.rowId){
            UserInfo({member_id:props.rowId}).then(res=>{
               requestDataFormat({
                 data:res.content,
                 form:formState,
                 match:['status']
               })
            })
          }
        }

        

        //多个监听

        const obj = reactive({
            name:'xiaofeng',
            age:18
        })

        watch([
            ()=> obj.name,
            ()=> obj.age
        ],([newName,oldName],[newAge,oldAge])=>{
            console.log(newName)
        })

        const close = ()=>{
            resetForm()
            emit('update:showFlag',false)
            emit('update:rowId','')
        }
        onMounted(() => {})
        return {
            visible,
            close,
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
            formState,
            roleOptions,
            statuaOptions,
            formRef,
            confirmLoading,
            handEdit,
            handCreate,



            resetForm,
            handleOk,
            getUserInfo
        }
    }
}
</script>
<style lang='scss' scoped>

</style>

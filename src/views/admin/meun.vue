<template>
   <a-row :gutter="30">
    <a-col :span="8">
        <div class="header-wrap">
            <h4>菜单列表</h4>
            <div class="button-group">
                <a-button  type="primary" @click="operateFn('add_parant')">添加菜单</a-button>
            </div>
        </div>
     <hr />
     <a-tree :tree-data="data.treeData" :defaultExpandAll = true >
                <template #title = "{key: treeKey, title}">
                        <div class="menu-item">
                            <span>{{title}}</span>
                            <div class="button-group">
                                <a-button class= "button-mini" type="primary" @click="operateFn('add_child')">添加子菜单</a-button>
                                <a-button class= "button-mini" @click="operateFn('edit')">编辑</a-button>
                                <a-button class= "button-mini" type="danger">删除</a-button>
                            </div>
                        </div>
                  
                    
                </template>
            </a-tree>
    </a-col>
    <a-col :span="16">
        <div class="header-wrap">
            <h4>菜单信息</h4>
        </div>
        <hr />
        <div class="Form-wrap">
            <a-form
             ref="formRef" 
            :label-col="labelCol" 
            :wrapper-col="wrapperCol"
            :model="form"
            :rules="rules"
            @finish="handleSubmit"
            >
            <!-- <a-form-item label="当前菜单" v-model.value="form.menu_name_cn">
              <a-input  />
            </a-form-item> -->
             <a-form-item label="菜单名称（中文）" name = 'menu_name_cn' >
              <a-input v-model:value="form.menu_name_cn"/>
            </a-form-item>
            <a-form-item label="菜单名称（英文）"  name= "menu_name_en">
              <a-input  v-model:value="form.menu_name_en"/>
            </a-form-item>
             <a-form-item label="路由名称" name= "router_name">
              <a-input  v-model:value="form.router_name"/>
            </a-form-item>
             <a-form-item label="Path路径" name= "router_path">
              <a-input  v-model:value="form.router_path"/>
            </a-form-item>
            <a-form-item label="页面组件" name= "component">
              <a-input  v-model:value="form.component" />
            </a-form-item>
            <a-form-item label="图标" >
              <a-upload
                    v-model.value:file-list="form.icon"
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
            </a-form-item>
            <a-form-item label="排序" name="sort" >
             <a-input-number v-model:value="form.sort" id="inputNumber" :min="1" :max="10" />
            </a-form-item>
             <a-form-item label="禁启用" name="disabled">
               <a-radio-group v-model:value="form.disabled"  :options="statuaOptions"  />
            </a-form-item>
            <a-form-item label="页面缓存" name="keep">
               <a-radio-group v-model:value="form.keep" :options="statuaOptions"  />
            </a-form-item>
             <a-form-item label="页面重定向" name="redirect" >
              <a-input v-model.value="form.redirect" />
            </a-form-item>
           
             <a-form-item :wrapper-col="{ span: 14, offset: 8 }" >
               <a-button type="primary" html-type="submit"  :disabled = "!(data.menuType)">添加菜单</a-button>
               <a-button @click="resetForm">重置</a-button>
            </a-form-item>
      </a-form>
        </div>
    </a-col>
  </a-row>
</template>

<script>

import {reactive, onMounted,toRefs,ref} from 'vue'
import {CreateMenu} from '@/api/menu.js'
import { message } from 'ant-design-vue';
export default {
setup(props) {
  const data = reactive({
      treeData :[{
        title: '系统设置',
        key: 'system',
        children: [
                {
                    title: '角色管理',
                    key: 'role',
                },
                {
                    title: '用户列表',
                    key: 'user',
                },
        ]}],

        menuType:""
  })

  const Form_data = reactive({
      form:{
          menu_name_cn:"",
          menu_name_en:"",
          router_path:"",
          router_name:"",
          component:"",
          icon:"",
          sort:"",
          disabled:"0",
          keep:"0",
          redirect:"",
          lang:"",
          router_path:"",
          hidden:"",
          parent_id:"",
      },

       rules:{
          menu_name_cn: [{ required:true,message:'请输入中文名称',  trigger: 'change' }],
          menu_name_en: [{  required:true,message:'请输入英文名称',  trigger: 'change' }],
          component: [{  required:true,message:'请输入组件名称',  trigger: 'change' }],
          router_name: [{  required:true,message:'请输入路由名称',  trigger: 'change' }],
          router_path: [{  required:true,message:'请输入Path路径',  trigger: 'change' }],
        }
  })

    const roleOptions = [
                { label: '超管', value: 'admin' },
                { label: '产品管理', value: 'product' },
                { label: '用户管理', value: 'user' },
        ];
    const statuaOptions = [
                { label: '启用', value: true },
                { label: '禁用', value: false },
    ];

    onMounted(() => {})

    //菜单操作函数
    const operateFn = (params)=>{
      data.menuType = params
      resetForm()

    }

      //表单提交函数
    const handleSubmit =(values)=>{
        
       data.menuType == 'add_parant' 
       if( data.menuType == 'add_parant' ){
               let requestData= {...Form_data.form}
            
                CreateMenu(requestData).then((res)=>{

                    console.log(res);
                //   if(res.error_code === 0){
                //     message.success('登陆成功')
                //     SetToken({token:res.content.token})
                //     SetUsername({username:res.content.username})
                //       push({
                //       name:'Index'
                //     })
                //   }else{
                //     message.error(res.msg)
                //   }
                })

       }
           
    }
    const formRef = ref(null)
    //重置表单
    const resetForm = ()=>{
        formRef.value.resetFields();
    }

    return {
        data,
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
        statuaOptions,
        roleOptions,
        ...(toRefs(Form_data)),
        handleSubmit,
        resetForm,
        formRef,
        operateFn
    }
}
}
</script>
<style lang='scss' scoped>
.header-wrap{
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    height: 32px;
    .button-group{
        margin-left: auto;
    }
}
.menu-item{
  display: flex;
  align-items: center;
   .button-group{
        margin-left: auto;
    }

}
:deep(.button-mini){
    height: auto;
    padding: 5px 8px;
    font-size: 12px;
};

v-on::deep(.ant-tree li .ant-tree-node-content-wrapper){
    height: auto;
    padding: 4px 5px;
};
:deep(.ant-tree li ){
  display: flex;
  flex-wrap:wrap;
}
:deep(.ant-tree li .ant-tree-node-content-wrapper){
    flex:1
};
:deep(.ant-tree li ul){
    width: 100%;
};
.Form-wrap{
    width: 500px
}
</style>
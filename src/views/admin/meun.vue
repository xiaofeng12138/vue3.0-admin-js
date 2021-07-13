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
                <template #title = "{menu_id, menu_name_cn}">
                        <div class="menu-item">
                            <span>{{menu_name_cn}}</span>
                            <div class="button-group">
                                <a-button class= "button-mini" type="primary" @click="operateFn('add_child',menu_id)">添加子菜单</a-button>
                                <a-button class= "button-mini" @click="operateFn('edit')">编辑</a-button>
                                <a-button class= "button-mini" type="danger" @click="delFn(menu_id)">删除</a-button>
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

     <a-modal v-model:visible="data.isModalVisible" title="提示" @ok="handleOk()" @cancel="data.isModalVisible == false ">
       <p>是否确认删除当前用户</p>
    </a-modal>
</template>

<script>

import {reactive, onMounted,toRefs,ref,onBeforeMount} from 'vue'
import {CreateMenu,MenuListTree,MenuList,MenuRemove} from '@/api/menu.js'
import { message } from 'ant-design-vue';
export default {
setup(props) {
  const data = reactive({
      treeData :[],
      menuType:"",
      //父菜单Id
      meun_Id:0,
      del_Id:'',
      isModalVisible:false
  })

  const Form_data = reactive({
      form:{
          menu_name_cn:"1",
          menu_name_en:"2",
          router_path:"3",
          router_name:"4",
          component:"5",
          icon:"",
          sort:"",
          disabled:0,
          keep:0,
          redirect:"",
          lang:"",
          router_path:"1",
          hidden:"",
          hidden:"0"
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
    onBeforeMount(() => {
       queryTreeList()
      queryNormalList()
    })

    //查询树状列表函数
    const queryTreeList = ()=>{
        MenuListTree().then(res=>{
                data.treeData = res.content
          })
    }

    const queryNormalList =()=>{
       MenuList().then(res=>{
              console.log(res);
              const data = res.content
              let newTree = formatTree(data,0)
          })
    }

    //递归处理方法
    const formatTree =(data,root)=>{
      const tree = []
      data.forEach(item =>{
        if(item.parent_id === root){
          const child = formatTree(data,item.menu_id)
          if(child){
            item["children"] = child
          }
          tree.push(item)
        }
      })
        return tree
    }

    //菜单操作函数
    const operateFn = (params,menu_id)=>{
      data.meun_Id = menu_id ? menu_id : 0
      data.menuType = params
      resetForm()
    }

      //表单提交函数
    const handleSubmit =(values)=>{
       let requestData ={}
       if( data.menuType == 'add_child'){ requestData.parent_id = data.meun_Id}
        requestData = {...Form_data.form,...requestData}
         CreateMenu(requestData).then((res)=>{
          if(res.error_code === 0){
                message.success('添加成功')
                resetForm()
                queryTreeList()
            }else{
                message.error(res.msg)
            }
          })  
    }


    const formRef = ref(null)
    //重置表单
    const resetForm = ()=>{
        formRef.value.resetFields();
    }

    //删除函数

    const delFn = (params)=>{
      data.del_Id = params
      data.isModalVisible = true
      
    }

    //确认删除函数
    const handleOk = ()=>{
       MenuRemove({menu_id:data.del_Id}).then(res=>{
         console.log(res);
         if(res.error_code === 0){
           message.success(res.msg)
           data.isModalVisible = false
           queryTreeList()
         }else{
           message.error('删除失败')
         }
       })
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
        operateFn,
        queryTreeList,queryNormalList,formatTree,delFn,handleOk
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
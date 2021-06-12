<template>
    <a-row type="flex" class="mb-20">
        <a-col flex="auto">
            <a-form ref="formRef" :model="formData"  layout="inline" >
                <a-form-item label="角色类型">
                  <a-select v-model:value="formData.role" style="width: 120px" ref="select" >
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                </a-form-item>
                 <a-form-item label="状态">
                  <a-select v-model:value="formData.status" style="width: 120px" ref="select">
                        <a-select-option value="">全部</a-select-option>
                        <a-select-option :value="true">启用</a-select-option>
                        <a-select-option :value="false">禁用</a-select-option>
                    </a-select>
                   
                </a-form-item>
                 <a-form-item label="关键字">
                  <a-select v-model:value="formData.key" style="width: 120px" ref="select">
                        <a-select-option value="username">用户名</a-select-option>
                        <a-select-option value="truename">真实姓名</a-select-option>
                        <a-select-option value="phone" >手机号</a-select-option>
                    </a-select>
                   <a-input v-model:value="formData.value" placeholder="请输入关键字"  class = "ml-10" style="width:200px" />
                </a-form-item>
                <a-form-item >
                    <a-button type="primary" @click="search" >搜索</a-button>
                    <a-button type="primary" class="ml-20" @click="resetFn">重置</a-button>
                    <a-button type="primary" class="ml-20">导出</a-button>
                </a-form-item>
                
            </a-form>
        </a-col>
        <a-col flex="100px">
              <a-button type="primary" @click="showUserModal = true">新增用户</a-button>
        </a-col>
    </a-row>


    <a-table :dataSource="dataSource" :columns="columns" bordered :row-selection="rowSelection" :pagination = false>
        <template #status ="{text,record}">
             <a-switch  :loading = record.loading  :checked="text == 1 ? true : false"  @change="updateStatus(record)" />
         
        </template>
         <template #operation = "{ record  }">
            <a-button type="primary" @click="handEdit(record)">编辑</a-button>
            <a-button>详情</a-button>
            <a-button type="danger" @click="openDelModal(record)">删除</a-button>
        </template>
    </a-table>

    <a-row>
    <a-col :span="4">
         <a-button class='mt-20 ' type="primary" @click="openDelModal(null)" :disabled ="delArray.length === 0">全部删除</a-button>
    </a-col>
    <a-col :span="20">
         <a-pagination @change="changePage" class='mt-20 fr' show-size-changer v-model:current="current_page" v-model:pageSize="pageSize" :total="total" @showSizeChange="onShowSizeChange" />

    </a-col>
  </a-row>

   
    <UserModal  v-model:showFlag = "showUserModal"  v-model:rowId="row_id" @loadData = getUserList />

    <a-modal v-model:visible="isModalVisible" title="提示" @ok="handleOk()" @cancel= 'closeModal'>
       <p>是否确认删除当前用户</p>
    </a-modal>
    
</template>

<script>
import { UserList,UserRemove,UserStatus } from '@/api/user'
import UserModal from '@c/modal/index'
import {reactive, onMounted,toRefs,ref} from 'vue'
import { message } from 'ant-design-vue';
export default {
    components:{
        UserModal
    },
    setup(props) {
    const FormConfig = reactive({
            dataSource: [],
            columns: [
                        {
                            title: '手机号',
                            dataIndex: 'phone',
                            align:'center',
                            key: 'phone',
                        },
                        {
                            title: '用户名',
                            dataIndex: 'username',
                            align:'center',
                            key: 'username',
                        },
                        {
                            title: '真实姓名',
                            dataIndex: 'truename',
                            align:'center',
                            key: 'truename',
                        },
                        
                        {
                            title: '状态栏(禁启用)',
                            dataIndex: 'status',
                            align:'center',
                            slots:{customRender:'status'}
                        },
                        {
                            title: '操作',
                            dataIndex: 'operation',
                            align:'center',
                            slots:{customRender:'operation'}
                        },
            ],
            formData:{
              status:"",
              key:"",
              value:"",
              role:""
            },
            showUserModal:false,
            row_id:'',
            isModalVisible:false,
            userDelId:'',
            checked:"",
            select_params:{},
            select_key:"",  //搜索条件的key
            sleect_value:"", //搜索条件的value

            //分页参数
            current_page:0,
            pageSize:10,
            pageNumber:1,
            total:0,
            delArray:[]

    })
     const data = toRefs(FormConfig)

    //定义表单元素
    const formRef = ref(null)


       //重置函数
    const resetFn = ()=>{
        formRef.value.resetFields();
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            FormConfig.delArray = selectedRows.map(item=>item.member_id)
        },
    };

    //用户分页操作
    const onShowSizeChange =(cur,size)=>{
        FormConfig.pageSize = size
        getUserList()
    }

    const changePage =(e)=>{
        FormConfig.current_page = e
        getUserList()
    }

    //打开删除用户弹窗
    const openDelModal = (params)=>{
        if(params){FormConfig.delArray = params.member_id}
        FormConfig.isModalVisible = true
    }

    //却认删除用户事件
    const handleOk = (params)=>{
       UserRemove({member_id:FormConfig.delArray}).then(res=>{
        message.success(res.msg)
        FormConfig.isModalVisible = false
        getUserList()
       })
    }

    const closeModal =()=>{
       FormConfig.delArray = [] 
    }

 

    

    //改变用户状态函数
    const updateStatus = (params)=>{
        params.status =  params.status == 1 ? false : true
        params.loading = true
        UserStatus({member_id:params.member_id,status:params.status}).then(res=>{
           message.success(res.msg)
           params.loading = false
        }).catch(
            params.loading = false
        )
    }

    const showOpenFn = ()=>{
         FormConfig.showUserModal = true
    }

    const handEdit = (params)=>{
        
       FormConfig.row_id = params.member_id
       FormConfig.showUserModal = true
       
    }

    //用户列表函数
    const getUserList = ()=>{
       let requestData ={
            pageSize:FormConfig.pageSize,
            pageNumber:FormConfig.pageNumber
        }
        UserList({...requestData,...FormConfig.select_params}).then(res=>{
            FormConfig.dataSource = res.content.data
            FormConfig.total = res.content.total
        })
    }

    //搜索事件
    const search = ()=>{
        let search_data_copy = Object.assign({},FormConfig.formData)

        if(search_data_copy.key && search_data_copy.value){
           search_data_copy[ search_data_copy.key  ]= search_data_copy.value
        }
        delete search_data_copy.key
        delete search_data_copy.value

        FormConfig.select_params = Object.assign({},search_data_copy)

        for(let item in FormConfig.select_params){
            if(FormConfig.select_params[item] === ""){
                delete FormConfig.select_params[item]
            }
        }
       
        getUserList()
    }

    onMounted(() => {
       getUserList()
    })
    return {
        ...data,
        formRef,
        rowSelection,
        showOpenFn,
        handEdit,
        getUserList,
        handleOk,
        openDelModal,updateStatus,search,onShowSizeChange,changePage,resetFn,closeModal
    }
}
}
</script>
<style lang='scss' scoped>

</style>



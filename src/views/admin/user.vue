<template>
    <a-row type="flex" class="mb-20">
        <a-col flex="auto">
            <a-form :model="formData"  layout="inline">
                <a-form-item label="角色类型">
                  <a-select v-model:value="formData.name" style="width: 120px" ref="select">
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                </a-form-item>
                 <a-form-item label="状态">
                  <a-select v-model:value="formData.name" style="width: 120px" ref="select">
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                   
                </a-form-item>
                 <a-form-item label="关键字">
                  <a-select v-model:value="formData.name" style="width: 120px" ref="select">
                        <a-select-option value="jack">用户名</a-select-option>
                        <a-select-option value="lucy">真实姓名</a-select-option>
                        <a-select-option value="disabled" >手机号</a-select-option>
                    </a-select>
                   <a-input v-model:value="formData.name" placeholder="请输入关键字"  class = "ml-10" style="width:200px" />
                </a-form-item>
                <a-form-item >
                    <a-button type="primary" >搜索</a-button>
                    <a-button type="primary" class="ml-20">重置</a-button>
                    <a-button type="primary" class="ml-20">导出</a-button>
                </a-form-item>
                
            </a-form>
        </a-col>
        <a-col flex="100px">
              <a-button type="primary" @click="showUserModal = true">新增用户</a-button>
        </a-col>
    </a-row>


    <a-table :dataSource="dataSource" :columns="columns" bordered :row-selection="rowSelection">
        <template #status ="{text,record}">
             <a-switch  :loading = record.loading  :checked="text == 1 ? true : false"  @change="updateStatus(record)" />
         
        </template>
         <template #operation = "{ record  }">
            <a-button type="primary" @click="handEdit(record)">编辑</a-button>
            <a-button>详情</a-button>
            <a-button type="danger" @click="openDelModal(record)">删除</a-button>
        </template>
    </a-table>

    <UserModal v-model:showFlag = "showUserModal"  v-model:rowId="row_id" @aaa = getUserList />

    <a-modal v-model:visible="isModalVisible" title="提示" @ok="handleOk()">
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
                            key: 'phone',
                        },
                        {
                            title: '用户名',
                            dataIndex: 'username',
                            key: 'username',
                        },
                        {
                            title: '真实姓名',
                            dataIndex: 'truename',
                            key: 'truename',
                        },
                        
                        {
                            title: '状态栏(禁启用)',
                            dataIndex: 'status',
                            slots:{customRender:'status'}
                        },
                        {
                            title: '操作',
                            dataIndex: 'operation',
                            slots:{customRender:'operation'}
                        },
            ],
            formData:{
              name:""
            },
            showUserModal:false,
            row_id:'',
            isModalVisible:false,
            userDelId:'',
            checked:""

    })

    const data = toRefs(FormConfig)
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    //打开删除用户弹窗
    const openDelModal = (params)=>{
      FormConfig.userDelId = params.member_id
      FormConfig.isModalVisible = true
    }

    //却认删除用户事件
    const handleOk = (params)=>{
       UserRemove({member_id:FormConfig.userDelId}).then(res=>{
        message.success(res.msg)
        FormConfig.isModalVisible = false
        getUserList()
       })
    }
    //取消删除事件
    const handleCancel = ()=>{

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
    const getUserList = ()=>{
       let requestData ={
            pageSize:10,
            pageNumber:1
        }
        UserList(requestData).then(res=>{
            FormConfig.dataSource = res.content.data
            
        })
    }

    onMounted(() => {
       getUserList()
    })
    return {
        ...data,
        rowSelection,
        showOpenFn,
        handEdit,
        getUserList,
        handleOk,
        handleCancel,openDelModal,updateStatus
    }
}
}
</script>
<style lang='scss' scoped>

</style>



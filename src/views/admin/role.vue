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
              <a-button type="primary">新增用户</a-button>
        </a-col>
    </a-row>


    <a-table :dataSource="dataSource" :columns="columns" bordered :row-selection="rowSelection">
        <template #status ="{text}">
             <a-switch v-model:checked="checked" />
        </template>
         <template #operation>
            <a-button type="primary">编辑</a-button>
            <a-button>详情</a-button>
            <a-button type="danger">删除</a-button>
        </template>
    </a-table>
    
</template>

<script>

import {reactive, onMounted,toRefs,ref} from 'vue'
export default {
    setup(props) {
    const FormConfig = reactive({
            dataSource: [
                    {
                        key: '1',
                        name: '胡彦斌',
                        age: 32,
                        address: '西湖区湖底公园1号',
                        status:false
                    },
                    {
                        key: '2',
                        name: '胡彦祖',
                        age: 42,
                        address: '西湖区湖底公园1号',
                        status:true
                    },
            ],
            columns: [
                        {
                            title: '姓名',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: '年龄',
                            dataIndex: 'age',
                            key: 'age',
                        },
                        {
                            title: '住址',
                            dataIndex: 'address',
                            key: 'address',
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
            }

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

    onMounted(() => {})
    return {
        ...data,
        rowSelection
    }
}
}
</script>
<style lang='scss' scoped>

</style>



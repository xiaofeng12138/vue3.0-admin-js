
import {Modal} from 'ant-design-vue'



const deleteModal = (params) =>{
    Modal.confirm({
        title: params.title || '温馨提示',
        content: params.content || '是否确认删除',
        okText: '确认',
        okType: params.okType|| 'primary',
        cancelText: '取消',
        onOk(){
             params.on_ok && Object.prototype.toString.call(params.on_ok) == "[object Function]"  && params.on_ok()
        },
        onCancel:()=>{}
      });
}

//定义全局组件

export default {
    install: (app, options) => {
      app.config.globalProperties.deleteModal = deleteModal
    }
  }
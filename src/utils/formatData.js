

//自定义的数据

const initData ={
    status:{
        0:false,
        1:true
    }
}


function matchKey(key,value){
    const data = initData[key] 
    if(!data){return false}
     return data[value]

}


//响应报文的数据转换
export function requestDataFormat(params){

        let requestData = params.data
              const keys = Object.keys(requestData)

              const formState = params.form
              for(let key in formState){
                if(keys.includes(key)){  //匹配响应报文和表单字段
                  if(params.match && params.match.includes(key)){  //匹配是否转换数据的字段
                       formState[key] = matchKey(key, requestData[key])
                   }else{
                     formState[key] = requestData[key]
                   }
                }
              }
}
// 使用 Mock
import Mock from 'mockjs'

let data = [
    {
        "id":1,
        "name": "张三1",
        "age":18
    },
    {
        "id":2,
        "name": "李四1",
        "age":28
    },
    {
        "id":3,
        "name": "王五1",
        "age":38
    },
    {
        "id":4,
        "name": "小黑1",
        "age":38
    },
    {
        "id":5,
        "name": "小方1",
        "age":48
    },
    {
        "id":6,
        "name": "张三2",
        "age":18
    },
    {
        "id":7,
        "name": "李四2",
        "age":28
    },
    {
        "id":8,
        "name": "王五2",
        "age":38
    },
    {
        "id":9,
        "name": "小黑2",
        "age":38
    },
    {
        "id":10,
        "name": "小方2",
        "age":48
    },
    {
        "id":11,
        "name": "张三3",
        "age":118
    },
    {
        "id":12,
        "name": "李四3",
        "age":128
    },
    {
        "id":13,
        "name": "王五3",
        "age":138
    },
    {
        "id":14,
        "name": "小黑3",
        "age":138
    },
    {
        "id":15,
        "name": "小方3",
        "age":148
    },
    {
        "id":16,
        "name": "张三4",
        "age":118
    },
    {
        "id":17,
        "name": "李四4",
        "age":128
    },
    {
        "id":18,
        "name": "王五4",
        "age":138
    },
    {
        "id":19,
        "name": "小黑4",
        "age":138
    },
    {
        "id":20,
        "name": "小方4",
        "age":148
    },
]

Mock.mock('/userdata','get',{
    success: true,
    "data": data
})

Mock.mock('/userdata','post',(options)=>{
    let params = JSON.parse(options.body)
    //判断操作类型并返回操作结果
    if(params.type==="delete"){
        console.log("进入删除了",params);
        data = data.filter(user => user.id!==params.user.id)
        return data;
    }
    else if(params.type==="add"){
        console.log("进入添加了");
        // console.log(params.user);
        data = data.concat(params.user)
        return data
    }
    else if(params.type==="edit"){
        console.log("进入修改了");
        // console.log(params.user);
        data = data.map(user=>
            (user.id===params.user.id ? params.user : user)
        )
        return data
    }
    else if(params.type==="find"){
        console.log("进入查找了");
        const newdata = data.filter(user =>{
                if(user.name.indexOf(params.name)!==-1){
                    return true
                }
                return false
            }
        )
        //判断输入长度大于0 则返回搜索结果 不然返回所有数据
        if(params.name.length>0){
            return newdata
        }
        return data;
    }
})
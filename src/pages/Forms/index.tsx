import {FC,ReactElement,useState} from 'react';
import {Button,Input,Form} from 'antd'
import {IUsers} from '../../common/types'

interface IProps{
    currentUser:IUsers;  // 打开Modal时候默认显示的用户  添加时为空
    editing:boolean;     //是否处于编辑状态
    addUser:(user:IUsers)=>void;  //添加用户方法
    editUser:(user:IUsers)=>void;  //修改用户方法
}
const Forms:FC<IProps> = (props):ReactElement => {

    const [user,setUser] = useState<IUsers>(props.currentUser)
    const handleInputChange = (event:any) =>{
        const {id,value} = event.target
        setUser({...user,[id]:value})      
    }    
    const handleSubmit = () =>{
        props.editing ? (props.editUser(user) ):
        (props.addUser(user))
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                label="姓名"
                name="name"
                initialValue={user.name}
                rules={[
                    {
                        required: true,
                        message: '请输入姓名！',
                    },
                ]}
            >
                <Input onChange={handleInputChange}/>
            </Form.Item>

            <Form.Item
                label="年龄"
                name="age"
                initialValue={user.age}
                rules={[
                    {
                        required: true,
                        message: '请输入年龄！',
                    },
                ]}
            >
                <Input onChange={handleInputChange}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
        </Form>
    );
}

export default Forms;

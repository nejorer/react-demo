import {FC, ReactElement} from 'react';
import { Table,Button,Modal } from 'antd'
import { ExclamationCircleOutlined} from '@ant-design/icons';
import {IUsers} from '../../types'
const { confirm } = Modal;


interface IProps{
    users:IUsers[];
    searchName:string;
    deleteUser:(record:any)=>void;
    editRow:(record:any)=>void;
}


const UserTable:FC<IProps> = (props):ReactElement => { 
    //Each child in a list should have a unique "key" 
    const {users,searchName} = props
    
    let newData:IUsers[]
    if(searchName===''){
        newData = users
    }else{
        newData = users.filter(user =>{
                if(user.name.indexOf(searchName)!==-1){
                    return true
                }
                return false
            }
        )
    }
    
    const dataSource  = newData.map(user=>{
        return Object.assign(user,{key:user.id})
    })
    
    const showDeleteConfirm = (record:IUsers)=>{
        return ()=>{         
            confirm({
                title: '确认删除吗？',
                icon: <ExclamationCircleOutlined />,
                // content: 'Some descriptions',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    props.deleteUser(record)
                },
                onCancel() {
                  console.log('Cancel');
                },
            }); 
        }
    }

    const columns = [
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
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (text:any, record:IUsers) => (
                <div>
                    <Button onClick={() => props.editRow(record)} style={{marginRight:'5px'}}>编辑</Button>
                    <Button onClick={showDeleteConfirm(record)}>删除</Button>
                </div>
            )
        },
    ];
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}

export default UserTable;


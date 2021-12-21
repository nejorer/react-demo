import {FC,useEffect} from 'react';
import { Modal,Button,Layout,Input } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import UserTable from './common/components/Tabel'
import Forms from './pages/Forms'
import useTabelData from './common/hooks/useTabelData'
import useQueryFilter from './common/hooks/useQueryFilter'
import useModalFilter from './common/hooks/useModalFilter'
import '@/common/mock/mock.js'
import '@/App.css'
import {nanoid} from 'nanoid'
const { Header, Content } = Layout;
const {Search} = Input;

// setState 会触发App组件重新渲染  

const App:FC = () => {
  //-----------------------增删改查以及显示部分-----------------------//
  const {
    queryFilter,
    searchName,//查关键词，因为不需要重新请求数据，所以额外起了一个变量
    addUser,  //增加方法
    deleteUser,//删除方法
    editUser,//改方法
    findUser,//查方法
  }=useQueryFilter()
  // 调用上述方法会触发queryFilter 或 searchName 改变
  const {userData} = useTabelData(queryFilter)
  //-----------------------增删改查以及显示部分-----------------------//

  //-----------------------对话框部分-----------------------//
  const {
      currentUser,
      editing,
      visible,
      closeModal,
      modalAdd,  //弹出添加用户页面
      modalEdit, //弹出修改用户页面
      resetCurrentUser
  } = useModalFilter()
  // 当完成addUser/editUser后，queryFilter会发生改变，然
  useEffect(()=>{
    closeModal()
  },[userData,closeModal])
  //当完成修改后 editing 会修改为false 此时对currentUser进行reset
  //就是判断editing 修改且变为false时候 进行关闭
  useEffect(()=>{
    if(editing===false){
      resetCurrentUser()
    }
  },[editing,resetCurrentUser])
  console.log("searchName",searchName);
  
  //-----------------------对话框部分-----------------------//
 
  return (
    <Layout>
      <Header className="header"><h1>用户列表</h1></Header>
      <Content className="content">
        <Search placeholder="输入姓名进行查找" onSearch={findUser} style={{ width: 200 } } />
        <Button className="addUser" onClick={modalAdd}> <PlusOutlined />添加用户</Button>
        <UserTable users={userData} searchName={searchName} deleteUser={deleteUser} editRow={modalEdit}/>
        <Modal 
          title={editing? "编辑用户":"添加用户"}
          visible={visible} 
          onCancel={closeModal}
          destroyOnClose={true}
          footer={null}
          >
            <Forms currentUser={currentUser.name==='' ? {...currentUser,id:nanoid()}:currentUser} 
            editing = {editing}
            addUser ={addUser} editUser={editUser}/>
        </Modal>
      </Content>
    </Layout>

  );
}

export default App;



import {useState,useCallback} from 'react'
import {IUsers} from '../types'

const initUser = {
    id: 0,
    name: '',
    age: ''
  }
export default function useModalFilter() {
    //用于编辑时候显示对应那一条数据
    const [currentUser, setCurrentUser] = useState<IUsers>(initUser)
    //用于判断是编辑还是创建用户
    const [editing,setEditing] = useState<boolean>(false)
    //用于打开Modal
    const [visible,setVisible] = useState<boolean>(false)

    //重置currentUser 使得使用添加功能时候不会出现有默认字符
    const resetCurrentUser = useCallback(
        () => {
            // if(editing===false){
            setCurrentUser(initUser)
            // }
        },
        [setCurrentUser],
    )
      
    // //关闭对话框
    const closeModal = useCallback(
        () => {
            setVisible(false);
            setEditing(false);
        },
        [setVisible,setEditing],
    )
    //触发Modal的增加
    const modalAdd = useCallback(
        () => {
            console.log("handleAdd");
            setVisible(true)
            setEditing(false)
        },
        [setVisible,setEditing],
    )
    //触发Modal的修改
    const modalEdit = useCallback(
        (user:IUsers) => {
            setCurrentUser(user)
            setVisible(true);
            setEditing(true)
        },
        [setCurrentUser,setVisible,setEditing],
    )
    return {
        currentUser,
        editing,
        visible,
        closeModal,
        modalAdd,
        modalEdit,
        resetCurrentUser
    }
}

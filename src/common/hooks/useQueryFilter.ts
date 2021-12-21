import {useState,useCallback } from 'react';
import {IUsers,QueryFilter} from '../types'

const initUser:IUsers = {
    id: 0,
    name: '',
    age: ''
}
const queryFilterInit = {
    type:"load",
    curUser:initUser,
    visible:false,
    searchName:''
}

//这些方法通过改变queryFilter来触发useTabelData
export  default function useQueryFilter(){
    const [queryFilter,setQueryFilter] = useState<QueryFilter>(queryFilterInit)
    const [searchName,setSearchName] = useState<string>('')
    const loadUser = useCallback(
        () => {
            setQueryFilter((preState)=>{
                return {
                    ...preState,
                    type:'load',
                }
            })
        },
        [setQueryFilter],
    )
    const addUser = useCallback(
        (user) => {
            console.log("useQueryFilterTest addUser");
            setQueryFilter((preState)=>{
                console.log("preState",preState,user);
                
                return {
                    ...preState,
                    type:'add',
                    curUser:user,
                    visible:false
                }
            })
            console.log("useQueryFilterTest addUser end");
        },
        [setQueryFilter],
    )
    const deleteUser = useCallback(
        (user) => {
            console.log("useQueryFilterTest deleteUser");
            setQueryFilter((preState)=>{
                return {
                    ...preState,
                    type:'delete',
                    curUser:user,
                    visible:false
                }
            })
            console.log("useQueryFilterTest deleteUser end");
        },
        [setQueryFilter],
    )
    const editUser = useCallback(
        (user) => {
            console.log("useQueryFilterTest deleteUser");
            setQueryFilter((preState)=>{
                return {
                    ...preState,
                    type:'edit',
                    curUser:user,
                    visible:false
                }
            })
            console.log("useQueryFilterTest deleteUser end");
        },
        [setQueryFilter],
    )
    const findUser = useCallback(
        (name) => {
            setSearchName(name)
        },
        [setSearchName],
    )
    return {
        queryFilter,
        searchName,
        addUser,
        deleteUser,
        editUser,
        findUser,
        loadUser
    }
}

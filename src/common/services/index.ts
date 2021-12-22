// import { useState,useCallback } from 'react';
import {QueryFilter} from '../types'
import axios from 'axios';
import '../mock/mock.js'
const url = "http://101.43.135.172:3001/"

export async function getStrategyTable(queryFilter: QueryFilter){
    // const result = await axios.get(url+'api/users')
    // console.log(result.data);
    // return []
    
    if(queryFilter.type==="load"){
        const result = await axios.get(
            url + 'api/users',
        );
        return result.data
    }
    else if(queryFilter.type==="add"){
        const result = await axios.post(
            url + 'api/add',
            {user:queryFilter.curUser,type:"add"}
        ); 
        return result.data
    }
    else if(queryFilter.type==="delete"){
        const result = await axios.post(
            url + 'api/delete',
            {user:queryFilter.curUser,type:"delete"}
        ); 
        return result.data
    }
    else if(queryFilter.type==="edit"){
        const result = await axios.post(
            url + 'api/edit',
            {user:queryFilter.curUser,type:"edit"}
        ); 
        return result.data
    }
    // else if(queryFilter.type==="query"){
    //     console.log("queryFilter.searchName",queryFilter.searchName);
        
    //     const result = await axios.post(
    //         url + 'api/query',
    //         {user:queryFilter.searchName,type:"query"}
    //     );
    //     return result.data
    //     // return result.data
    // }
}


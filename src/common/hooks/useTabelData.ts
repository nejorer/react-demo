import {useEffect,useState,useCallback} from 'react'
import {getStrategyTable} from '../services/index'
import '../mock/mock.js'
import {QueryFilter} from '../types'

export default function useTabelData(queryFilter: QueryFilter) {
  const [userData, setUserdata] = useState([])
  const queryTableData = useCallback(async () => {
    try {
      const returnData = await getStrategyTable(queryFilter)
      setUserdata(returnData)
    } catch (e) {
      console.log(e)
    }
  }, [queryFilter])
  useEffect(() => {
    queryTableData()
  }, [queryTableData])
  return {userData}
}


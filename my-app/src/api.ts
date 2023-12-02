import axios,{AxiosResponse} from "axios"
import { SearchResultItem } from "./constant"


export const  getTodo= async()=>{

let res:AxiosResponse<SearchResultItem[]>=await axios.get("http://localhost:8080/todos")
return res.data
}
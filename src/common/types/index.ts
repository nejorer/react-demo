export interface IUsers{
    id?:any;
    age:number | string;
    name:string;
}


export interface QueryFilter {
    type:string,
    curUser:IUsers,
    visible:boolean,
    searchName:string
}



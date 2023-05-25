import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机字符串，且每次执行不能发生改变，游客身份持久储存
export const getUUID=()=>{
    // 先从本地储存获取uuid(看看有没有)
    let uuid_token=localStorage.getItem('UUIDTOKEN');
    // 如果没有
    if(!uuid_token){
        // 浏览器生成游客临时身份
        uuid_token=uuidv4();
        // 本地储存一次
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token
}
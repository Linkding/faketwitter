import api from '../lib/api';

function exist(unique,password){
    return api('user/read',{
        where:{
            or:[
                ['username','=',unique],
                ['email','=',unique],
                ['phone','=',unique],
            ],
        }
    }).then(r=>{
        let row;
        if((row = r.data[0])&&row.password === password)
            return row;
        return false;
    })
}
function uinfo(){
    return JSON.parse(localStorage.getItem('uinfo'))||''
}

function logout(url){
    localStorage.removeItem('uinfo');
    location.href = url || '/'; //退出后默认跳转首页，或者自定义
}
function login(row){
    localStorage.setItem('uinfo',JSON.stringify(row))
}
function is_admin(){
    let info = this.uinfo();
    return info && this.uinfo().is_admin;
}
function is_login(){
    return (JSON.parse(localStorage.getItem('uinfo')))
}
function replace_uinfo(row){
    delete row.password;
    localStorage.setItem('uinfo',JSON.stringify(row))
}
export default {
    uinfo,
    logout,
    login,
    is_admin,
    is_login,
    replace_uinfo,
    exist,
}
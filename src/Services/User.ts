import axios from "axios";

export function userLogin(email : string, password : string){
    return axios.post('http://127.0.0.1:8000/api/login/', {
        email: email,
        password: password
    }).then(res => {
        return res.data;
    }).catch(err => { console.log(err.message);
    })
}

export function userRegister(data: Object){
    console.log(data);
    return axios.post('http://localhost:8000/register/', {
        data
    }).then(res => {
        return res.data;
    }).catch(err => { console.log(err.message);
    })
}

export function getUserDetail(token : string){
    return axios.get('http://127.0.0.1:8000/user/', {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(res => {
        return res.data;
    })
}
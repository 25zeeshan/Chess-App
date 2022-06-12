import axios from "axios";

export function userLogin(email : string, password : string){
    return axios.post('http://127.0.0.1:8000/api/login/', {
        email: email,
        password: password
    }).then(res => {
        return res.data;
    }).catch(err => { console.log(err.message); window.alert('Invalid Credentials');
    })
}

export function userRegister(data: any){
    return axios.post('http://localhost:8000/register/', {
        first_name : data.first_name,
        last_name: data.last_name,
        username : data.username,
        email: data.email,
        phone_no : data.phone_no,
        date_of_birth : data.date_of_birth,
        password : data.password
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
    }).catch(err => console.log(err.message))
}
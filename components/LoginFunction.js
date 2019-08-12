import axios from 'axios'

export const login = user =>{
    return axios
    .post('localhost/api/login', {
        email: user.email,
        password: user.password
    }, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res=>{
        localStorage.setItem('usertoken', res.data.token)
    })
    .catch(err => {
        console.log(err)
    })
}
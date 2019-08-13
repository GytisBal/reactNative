import axios from 'axios'

export const login = user => {
    return axios
    .post('http://10.0.2.2/api/login', {
        email:user.email,
        password: user.password,
    },{
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    })
}




// export const login = user => {
//     fetch('http://10.0.2.2/api/login', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: user.email,
//                 password: user.password,
//             })
//         })
//         .then((response)=>response.json())
//         .then((res)=>{
//             console.log(res)

//         }).done();
// }






// async function login  (user) {
//     console.log(user)
//         user = {
//             email: user.email,
//             password: user.password
//           }
    
//     await fetch('https://10.0.2.2/api/login', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             email: user.email,
//             password: user.password,
//         })
//     })
//     .then((response)=>response.json())
//     .then((res)=>{
//         if(res.success === true){
//             console.log(res)
//         }else{
//             console.log(res.message)
//         }
//     }).done();

// }

// export default login


// export const login = user =>{

//     console.log(user)
//         user = {
//             email: user.email,
//             password: user.password
//           }
    
//     fetch('https://10.0.2.2/api/login', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             email: user.email,
//             password: user.password,
//         })
//     })
//     .then((response)=>response.json())
//     .then((res)=>{
//         if(res.success === true){
//             console.log(res)
//         }else{
//             console.log(res.message)
//         }
//     }).done();

// }


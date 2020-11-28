import React, { useState } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import FireBase from './firebaseconfig'

const LoginForm =(props)=> {
    let [userData,setuserData] = useState({
        email : '',
        password : ''
    })
    let [error,seterror] = useState({
        email : false,
        password : false
    })

    function handleChange(event){
        setuserData({...userData,[event.target.name] : event.target.value})
    }
    function onLogin(){
        seterror({...error,email : userData.email == '' ? true : false, password : userData.password == '' ? true : false})
        // if(userData.email !='' && userData.password != ''){
        //     const userDetail = localStorage.getItem('user');
        //     const userInfo = JSON.parse(userDetail);
        //     if(userInfo.email == userData.email && userInfo.password == userData.password){
        //         userInfo.sessionLogin = true;
        //         const user = JSON.stringify(userInfo);
        //         localStorage.setItem('user',user);
        //         if(userInfo.sessionLogin){
        //             props.history.push('/homepage');
        //         }
        //     }
        //     else{
        //         alert('Invalid Email and Password')
        //     }
        // }
        const userDetail = localStorage.getItem('user');
        const userInfo = JSON.parse(userDetail);
        userInfo.sessionLogin = true;
        const user = JSON.stringify(userInfo);
        localStorage.setItem('user',user);
        FireBase.auth().signInWithEmailAndPassword(userData.email,userData.password)
        .then(()=>{
            props.history.push('/homepage')
        }).catch((error)=>{
            alert(error)
        })  
    }
    function responseGoogle(response){
        console.log(response)
        const userDetail = localStorage.getItem('user');
        const userInfo = JSON.parse(userDetail);
        userInfo.sessionLogin = true;
        const user = JSON.stringify(userInfo);
        localStorage.setItem('user',user);
        props.history.push('/homepage');
    }
    function responseGoogleFailure(error){
        console.log(error)
    }
    function responseFacebook(response){
        console.log(response);
        const userDetail = localStorage.getItem('user');
        const userInfo = JSON.parse(userDetail);
        userInfo.sessionLogin = true;
        const user = JSON.stringify(userInfo);
        localStorage.setItem('user',user);
        props.history.push('/homepage');
    }
    function responseFacebookFailure(error){
        console.log(error)
    }
        return (
            <div>
                <div className="row">
                    <div className="col-6 offset-3">
                        <input className="box" type="text" placeholder="Email" name="email" onChange={handleChange}></input>
                        {error.email && <span className="error">Please enter your email</span>}
                    </div>
                    <br></br>
                    <div className="col-6 offset-3">
                        <input className="box" type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                        {error.password && <span className="error">Please enter your password</span>}
                    </div>
                    <br></br>
                    <div className="col-6 offset-3">
                        <button className="btn-login" onClick={onLogin} >Log In</button>
                        <GoogleLogin className="btn-google"
                            clientId="610945941303-89lah5ndj5b7geav7b78sd91jblss2uq.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogleFailure}
                        />
                        <FacebookLogin cssClass="my-facebook-button-class"
                            textButton=" Login with Facebook"
                            appId="3865408416811080"
                            autoLoad={true}
                            fields="name,email,picture"
                            icon="fa-facebook"
                            onFailure={responseFacebookFailure}
                            callback={responseFacebook}
                        />   
                    </div>
                </div>
            </div>
        );
}

function mapStateToProps(state){
    return{
        userData : state.Reducer.userData
    }
}

function mapDispatchToProps(dispatch){
    return{}
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
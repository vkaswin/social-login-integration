import React, { useEffect, useState } from 'react';
import Firebase from './firebaseconfig'

const Database = () => {

    const [data,setData] = useState()

    useEffect(()=>{
        Firebase.database().ref('users').on('value',(respone)=>{
            setData(respone.val().name)
          });
        // Firebase.database().ref('users/age').remove();
        Firebase.database().ref('users').update({name : 'Hello World'});
        const db = Firebase.firestore();
        db.collection('users').doc('userInfo').set({
            name : 'Aswin Kumar',
            age : 22,
            gender : 'Male'
        })
        
    },[])

    return(
        <div>
            {data}
        </div>
    );

}

export default Database;
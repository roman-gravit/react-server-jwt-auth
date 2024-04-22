import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/login-form';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { User } from './models/user';
import UserService from './services/user-service';


const App: FC = () => {

    const { store } = useContext(Context);
    const [users, SetUsers] = useState<User[]>([]);

    useEffect(()=> {
        if(localStorage.getItem("token")) {
            store.CheckAuth();
        }
    }, [store])


    async function GetUsers() {
        try {
            const response = await UserService.GetUsers();
            SetUsers(response.data);
        } catch(e) {
            console.log(e);
        }
    }

    if(store.isLoading) {
        return (
            <div>loading....</div>
        )
    }

    if(!store.isAuth) {
        return (
            <div>
                <LoginForm/>
                <div>
                    <button onClick={GetUsers}>Users List</button>
                </div>
            </div>
        )
    }

    return (
        <div className="App">
            <h1> 
                { store.isAuth 
                    ? `User is authorized ${store.user?.email}` 
                    : "Need to login"
                }
            </h1>
            <h2> 
                { store.user?.isActivated 
                    ? `User is activated ${store.user?.email}` 
                    : "Need to activate account"
                }
            </h2>            

            <button onClick={()=> store.Logout()}>Logout</button>
            <div>
                <button onClick={GetUsers}>Users List</button>
            </div>
            {
                users.map(user => 
                    <div key={user.email}>{user.email}</div>
                )
            }
        </div>
    );
}

export default observer(App);

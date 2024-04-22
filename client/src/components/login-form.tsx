import React, { FC, useContext, useState }from 'react'
import { Context } from '..';

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const { store } = useContext(Context);

	return (
  		<div>
			<input 
				onChange = {e => setEmail(e.target.value)}
				value={email}
				type="text" 
				placeholder='Email'  
			/>
			<input 
				onChange = {e => setPassword(e.target.value)}
				value={password}
				type="password" 
				placeholder='Password'  
			/>
			<button onClick={() => store.Login(email || "", password || "")}>Login</button>

			<button  onClick={() => store.Register(email || "", password || "")}>Register</button>
    	</div>
  	);
};

export default LoginForm;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../sass/app.scss';
import Img from '../../assets/finaktiva-2.png'
import { AppContext } from '../../contexts/AppContext.js'

const Login = () => {

    const { addUser } = useContext(AppContext);

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const baseUrl = 'http://localhost:3001'

    async function loginUser(event) {
        event.preventDefault();
        const response = await fetch(`/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password
            }),
        });

        const data = await response.json();

        if (data.msg === 'Login success!') {
            addUser(data)
            navigate("/home")
        } else {
            alert("Ingreso fallido")
        }
    }

    async function registerUser() {
        navigate("/register")
    }

    return (
        <div className='Login'>
            <div className='Card_Login'>
                <img src={Img} alt="img fanaktiva" ></img>
                {/* <h1>Entrar</h1> */}
                <form onSubmit={loginUser}>
                    <input
                        className="inputLogin"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Nombre"
                        autoComplete='off'
                    />
                    <br />
                    <input
                        className="inputLogin"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Correo"
                        autoComplete='false'
                    />
                    <br />
                    <input
                        className="inputLogin"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Contraseña"
                        autoComplete='false'
                    />
                    <br />
                    <button className="btn" onClick={loginUser}>Ingresar</button>
                    <button className="btn" onClick={registerUser}>Registrarse</button>

                </form>
            </div>
        </div>
    )
}

export default Login
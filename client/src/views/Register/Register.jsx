import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Img from '../../assets/images.jfif'

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();

    // const baseUrl = 'http://localhost:3001'

    async function registerUser(event) {
        event.preventDefault();
        const response = await fetch(`/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                location,
            }),
        });

        const data = await response.json();
        console.log(data.msg)
        if (data.msg === 'User has been create!') {
            navigate("/")
        }
    }

    return (
        <div className='Login'>
            <div className='Card_Login'>
                <img src={Img} alt="img Finaktiva" ></img>
                {/* <h1>Registrarse</h1> */}
                <form onSubmit={registerUser}>
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
                        placeholder="Contraseña más de 6 carácteres"
                        autoComplete='false'
                    />
                    <br />
                    <button className="btn" onClick={registerUser}>Registrar</button>


                </form>
            </div>
        </div>
    )
}

export default Register
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Alert from './Alert';
import NavBar from './NavBar';
import { AppContext } from '../contexts/AppContext'

const AddClient = () => {

    const { id_user } = useContext(AppContext);
    
    const [showAlert, setShowAlert] = useState(false);
    const [color, setColor] = useState(false);

    const [name, setName] = useState('');
    const [typeDocument, setTypeDocument] = useState('');
    const [document, setDocument] = useState();
    const [businessName, setBusinessName] = useState('');
    const [providers, setProviders] = useState('');
    const [sales, setSales] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/clients/create-client', {
            name: name,
            documenType: typeDocument,
            document: document,
            businessName: businessName,
            providers: providers,
            sales: sales,
            id_user : id_user,
        })
            .then(response => {
                setShowAlert(true)
                setColor(true)
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <>
            <NavBar/>
            {showAlert ? <Alert color={color} /> : null}
            <form className="w-full max-w-sm container mt-10 mx-auto" onSubmit={onSubmit}>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Nombre Completo
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nombre y Apellidos" />
                </div>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="documenType">
                        Tipo de Documento
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={typeDocument} onChange={(e) => setTypeDocument(e.target.value)} type="text" placeholder="CC" />
                </div>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="document">
                        Número de Documento
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={document} onChange={(e) => setDocument(e.target.value)} type="number" placeholder="Eje : 1147897542" />
                </div>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="businessName">
                        Razón Social
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={businessName} onChange={(e) => setBusinessName(e.target.value)} type="text" placeholder="Eje : Finanzas" />
                </div>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="providers">
                        Proveedores
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={providers} onChange={(e) => setProviders(e.target.value)} type="text" placeholder="Eje : BBVA, Davivienda" />
                </div>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sales">
                        Últimas ventas
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={sales} onChange={(e) => setSales(e.target.value)} type="text" placeholder="Eje : 15 millones" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Agregar Cliente
                    </button>
                </div>
                <Link to="/home">
                    <div className="cursor-pointer text-center bg-red-400 mt-4 w-full hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                        <Link to="/home">Cancel</Link>
                    </div>
                </Link>
            </form>
        </>
    )
}

export default AddClient
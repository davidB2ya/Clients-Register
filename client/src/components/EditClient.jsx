import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert'
import NavBar from './NavBar';

const EditClient = () => {

    const { id } = useParams();
    // const navigate = useNavigate();
    const [client, setClient] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [color, setColor] = useState(false);

    const [name, setName] = useState(client.name);
    const [typeDocument, setTypeDocument] = useState(client.documenType);
    const [document, setDocument] = useState(client.document);
    const [businessName, setBusinessName] = useState(client.businessName);
    const [providers, setProviders] = useState(client.providers);
    const [sales, setSales] = useState(client.sales);

    useEffect(() => {
        axios({
            url: `/api/clients/one/${id}`
        })
            .then(response => {
                setClient(response.data)
                setName(response.data.name)
                setTypeDocument(response.data.documenType)
                setDocument(response.data.document)
                setBusinessName(response.data.businessName)
                setProviders(response.data.providers)
                setSales(response.data.sales)
            })
            .catch(error => {
                console.log(error)
            })
    }, [id])

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/clients/update-client/${client.id}`, {
            name: name,
            documenType: typeDocument,
            document: document,
            businessName: businessName,
            providers: providers,
            sales: sales,
        })
            .then(response => {
                setShowAlert(!showAlert)
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
                        value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder={client.name} />
                </div>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="documenType">
                        Tipo de Documento
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={typeDocument} onChange={(e) => setTypeDocument(e.target.value)} type="text" placeholder={client.documenType} />
                </div>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="document">
                        Número de Documento
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={document} onChange={(e) => setDocument(e.target.value)} type="number" placeholder={client.document} />
                </div>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="businessName">
                        Razón Social
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={businessName} onChange={(e) => setBusinessName(e.target.value)} type="text" placeholder={client.businessName} />
                </div>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="providers">
                        Proveedores
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={providers} onChange={(e) => setProviders(e.target.value)} type="text" placeholder={client.providers} />
                </div>
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sales">
                        Últimas ventas
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                        value={sales} onChange={(e) => setSales(e.target.value)} type="text" placeholder={client.sales} />
                </div>
                <div className="flex items-center justify-between">
                    <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
                        Editar Cliente
                    </button>
                </div>
                <div className="text-center mt-4 text-gray-500">
                    <Link to="/home">
                        <div className="cursor-pointer text-center bg-red-400 mt-4 w-full hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                            <Link to="/home">Cancel</Link>
                        </div>
                    </Link>
                </div>
            </form>
        </>
    )
}

export default EditClient
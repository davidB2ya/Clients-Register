import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import '../sass/app.scss'
import { BiDetail } from 'react-icons/bi'
import Alert from './Alert';
import { AppContext } from '../contexts/AppContext'

const ListClients = () => {

    const { id_user} = useContext(AppContext);

    const [updateState, setUpdateState] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [color, setColor] = useState(true);

    useEffect(() => {
        axios({
            url: `/api/clients/all-clients/${id_user}`
        })
            .then(response => {
                setClients(response.data)
                setSearch(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [id_user])

    const removeClient = (id) => {
        axios({
            method: "delete",
            url: `/api/clients/delete-client/${id}`
        })
            .then(response => {
                setShowAlert(true)
                setColor(false)
                setUpdateState(!updateState)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const [clients, setClients] = useState([])
    const [searchClient, setSearch] = useState(clients)

    const inputChange = (e) => {
        const search = e.target.value.toLowerCase().trim()
        if (search === '') {
            setSearch(clients)
        } else {
            const filter = clients.filter(c => c.name.toLowerCase().startsWith(search))
            setSearch(filter)
        }
    }

    return (
        <>
            {clients.length === 0 ?
                <div className="contenedor_loader">
                    <div className="loader"></div>
                </div>
                :
                <div>
                        <form  >
                            <div className=" flex w-80 items-center mb-4 mx-4">
                                <input type="text" onChange={(e) => inputChange(e)} placeholder="Buscar Cliente" className="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-lg border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                            </div>
                        </form>
                    {showAlert ? <Alert color={color} /> : null}

                    {searchClient.map((client) => (
                        <div className="flex items-center bg-gray-100 mb-10 shadow" key={client.id}>
                            
                            <div className="flex-auto text-left px-4 py-2 m-2">
                                <p className="text-gray-900 leading-none">{client.name}</p>
                                <p className="text-gray-600">{client.documenType} : {client.document}</p>

                            </div>
                            <div className="flex text-right px-4 py-2 m-2 items-center">
                                <Link to={`/modal/${client.id}`}>
                                    <button title="Detalles" className="bg-yellow-500 text-gray-800 font-bold uppercase text-lg px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-3 ease-linear transition-all duration-150 inline-flex items-center" type="button">
                                        <BiDetail />
                                    </button>
                                </Link>
                                <Link to={`/edit/${client.id}`}>
                                    <button title="Editar" className="cursor-pointer bg-blue-500 hover:bg-blue-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                    </button>
                                </Link>
                                <button title="Remover" onClick={() => removeClient(client.id)} className=" bg-red-500 hover:bg-red-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            }

        </>
    )
}

export default ListClients
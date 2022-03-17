import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

const Modal = () => {

  const { id } = useParams();
  const [client, setClient] = useState([])

  useEffect(() => {
    axios({
      url: `/api/clients/one/${id}`
    })
      .then(response => {
        setClient(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [id])

  return (
    <>
      <NavBar/>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h4 className="text-3xl font-semibold">
                Información de <br />{client.name}
              </h4>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">{client.name}</p>
              <p className="text-red-600 text-2 my-2">{client.documenType} : {client.document}</p>
              {
                client.providers !== undefined ?
                  <>
                    <span className="text-gray-900 text-2 my-2">Proveedores:</span>
                    {client.providers.map((provider) => (
                      <p className="text-gray-900 text-2 leading-none my-2">{provider}</p>
                    ))}
                  </> :
                  null
              }
              <span className="inline-block text-2 my-2">Razón Social: {client.businessName}</span>
              <p className="text-gray-900 text-2 leading-none my-2">Ventas: {client.sales}</p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <Link to="/home">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Cerrar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const Alert = ({ color }) => {

    const [showAlert, setShowAlert] = useState(true);

    const { id } = useParams();

    const [letter, setLetter] = useState('agregado');

    useEffect(() => {
        if (id) {
            setLetter("actualizado")
        }
    }, [id])



    return (
        <>
            {color ?
                <>
                    {showAlert ? (
                        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-green-500">
                            <span className="text-xl inline-block mr-5 align-middle">
                                <i className="fas fa-bell" />
                            </span>
                            <span className="inline-block align-middle mr-8">
                                <b className="capitalize">Cliente !</b> {letter} satisfactoriamente
                            </span>
                            <Link to="/home">
                                <button
                                    className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                                    onClick={() => setShowAlert(false)}>
                                    
                                        <span>×</span>
                                    
                                </button>
                            </Link>
                        </div>
                    ) : null}
                </>
                :
                <>
                    {showAlert ? (
                        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                            <span className="text-xl inline-block mr-5 align-middle">
                                <i className="fas fa-bell" />
                            </span>
                            <span className="inline-block align-middle mr-8">
                                <b className="capitalize">Cliente !</b> eliminado satisfactoriamente
                            </span>
                            <button
                                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                                onClick={() => setShowAlert(false)}
                            >
                                <span>×</span>
                            </button>
                        </div>
                    ) : null}
                </>
            }
        </>
    );
};

export default Alert

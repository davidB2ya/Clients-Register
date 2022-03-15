import React, { useState , useHistory} from 'react'
import { Link } from 'react-router-dom';

const AddClient = () => {

    // const history = useHistory();
    const clients = [
        {
            id: 1,
            name: 'Bruce Wayne',
            location: 'Gotham',
            designation: 'Bachelor'
        },
        {
            id: 2,
            name: 'Javier Wayne',
            location: 'Gotham',
            designation: 'Bachelor'
        }
    ]
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [designation, setDesignation] = useState('');

    // const onSubmit = (e) => {
    //     addEmployee({
    //         id,
    //         name,
    //         location,
    //         designation
    //     });

    //     e.preventDefault();
    //     history.push("/");
    // };

    return (
        <form className="w-full max-w-sm container mt-20 mx-auto" >
            <div className="w-full mb-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                    Name of employee
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={clients.name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
            </div>
            <div className="w-full mb-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
                    Location
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={clients.location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Enter location" />
            </div>
            <div className="w-full mb-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="designation">
                    Designation
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={clients.designation} onChange={(e) => setDesignation(e.target.value)} type="text" placeholder="Enter designation" />
            </div>
            <div className="flex items-center justify-between">
                <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Employee
                </button>
            </div>
            <div className="text-center mt-4 text-gray-500">
                <Link to="/">Cancel</Link>
            </div>
        </form>
    )
}

export default AddClient
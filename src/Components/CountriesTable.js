import React from 'react'

import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component'

const CountriesTable = () => {
    const [countries, setcountries] = useState([])
const [search , setSearch] = useState('')
const [filterCountries , setFilteredCountries] = useState([])
 
    const getCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v2/all')
            setcountries(response.data);
setFilteredCountries(response.data)

        } catch (error) {
            console.log(error)

        }



    };

    const columns = [{

        name: 'Country Name',
        selector: (row) => row.name,
        sortable: true

    },
    {

        name: 'Country Native Name ',
        selector: (row) => row.nativeName

    },
    {

        name: 'Code',
        selector: (row) => row.callingCodes

    },
    {

        name: 'Capital',
        selector: (row) => row.capital

    },
    {

        name: 'Population',
        selector: (row) => row.population

    },
    {

        name: 'Flag',
        selector: (row) => <img width={50} height={50} src={row.flag} />

    },{

        name: 'Action',
        cell: (row) => <button className='btn btn-primary' >Edit </button>

    }]

    useEffect(() => {
        getCountries();

    }, [])
    useEffect(()=>{

const result = countries.filter(country =>{
return country.name.toLowerCase().match(search.toLowerCase())


})

setFilteredCountries(result)
    },[search])


    return (
        <DataTable columns={columns} data={filterCountries} title='Countries List' fixedHeader pagination fixedHeaderScrollHeight='1050px'highlightOnHover selectableRows selectableRowsHighlight subHeader subHeaderComponent ={<input placeholder='search here' className='w-25 form-control' type='text' value={search}  onChange={(e)=> setSearch(e.target.value)}></input>} actions={
<button className='btn btn-info'> Export</button>

        }subHeaderAlign ='left'
    
        />
    )
}

export default CountriesTable
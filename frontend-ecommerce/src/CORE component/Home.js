import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import {getProducts} from "./apiCore"
import CardLayout from "./CardLayout"

import Search from "./Search"
const Home = () => {
    const [productBySell, setProductBySell] = useState([])
    const [productByArrival, setProductByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductBySell = () => {
        getProducts("sold")
        .then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProductBySell(data)
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts("createdAt")
        .then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProductByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductByArrival()
        loadProductBySell()
    }, [])

    return (
        <Layout title="Home page" description="Node React ECommerce Home page" className="container-fluid">
            <Search/>

                <h2 className="mb-2 text-center">Best Seller</h2>
                <div className="row">
                    {productBySell.map( (product,index) => (
                    <CardLayout key={index} product={product}/>
                    ))}
                </div>  

                <h2 className="mb-2 text-center">New Arrivals</h2>
                <div className="row">
                    {productByArrival.map( (product,index) => (
                    <CardLayout key={index} product={product}/>
                    ))}
                </div>

                <hr/>

                       
        </Layout>
    )
}

export default Home;

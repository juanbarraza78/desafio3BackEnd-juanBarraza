const express = require("express")
const ProductManager = require("./ProductManager")

const app = express();

app.use(express.urlencoded({extended:true}))

app.get("/products", (req,res)=>{
    const newProductManager = new ProductManager("./src/products.json")
    const resp = newProductManager.getProducts()
    resp
        .then(pr => {
            
            let limit = req.query.limit
            
            if((limit > 0 && limit <= pr.length) && limit)
            {
                let productsLimit = pr.slice(0,limit)
                return res.send({productsLimit})
            }
            return res.send({pr})
        })
        .catch(err =>{
            res.send(err)
        })
    
})

app.get("/products/:pid", (req,res)=>{
    let idProduct = req.params.pid
    const newProductManager = new ProductManager("./src/products.json")
    const resp = newProductManager.getProductById(idProduct)
    resp
        .then(pr => {
        res.send({pr})
    })
        .catch(err =>{
        res.send("Error, sorry")
    })
    
})


app.listen(8080 , ()=>{
    console.log("Server run on port 8080")
})
const fs = require('fs')  

class ProductManager
{
    constructor(path)
    {
        this.id = 1;
        this.path = path;
    }

    async addProduct(product)
    { 
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            let arrayProducts = JSON.parse(result)
            this.id++;
            let newProduct = {
                title: product.title,
                description: product.description,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                id: this.id
            }
            arrayProducts.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(arrayProducts,null, 2), 'utf-8')
            console.log("Product save")
        }
        catch(e){
            console.log("error addProduct")
        }
    }

    async getProducts()
    {    
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            let arrayProducts = JSON.parse(result)
            return arrayProducts
        }
        catch(e){
            console.log("error getProducts")
        }    
    }

    async lastId()
    {
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            let arrayProducts = JSON.parse(result)
            let idAux;
            arrayProducts.forEach(product => {
                idAux = product.id
            })
            this.id = idAux
        }
        catch(e){
            console.log("error lastId")
        }
    }

    async getProductById(id)
    {
        try{
                let result = await fs.promises.readFile(this.path, 'utf-8')
                let arrayProducts = JSON.parse(result)
                let respuesta;
                respuesta = arrayProducts.find(element => element.id == id);
                if(respuesta == undefined)
                {
                    return "Not founds"
                }
                return respuesta;
            }
        catch(e){
                console.log("error" + e)
        }

    }

    async updateProduct(id, field, value)
    {   
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            const arrayProducts = JSON.parse(result)
            let respuesta = false
            arrayProducts.map(function(product){
                if(product.id === id)
                {
                    respuesta = true
                    if(typeof field == "object")
                    {
                        product.title = value.title;
                        product.description = value.description;
                        product.price = value.price;
                        product.thumbnail = value.thumbnail;
                        product.code = value.code;
                        product.stock = value.stock;
                    }
                    else if(field == "title")
                    {
                        product.title = value;
                    }
                    else if(field == "description")
                    {
                        product.description = value;
                    }
                    else if(field == "price")
                    {
                        product.price = value;
                    }
                    else if(field == "thumbnail")
                    {
                        product.thumbnail = value;
                    }
                    else if (field == "code")
                    {
                        product.code = value;
                    }
                    else if(field == "stock")
                    {
                        product.stock = value;
                    }
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts,null, 2), 'utf-8')
            if(!respuesta)
            {
                console.log("not Found")
            }
        }
        catch(e){
            console.log("error updateProduct")
        }
        
    }

    async deleteProduct(id)
    {    
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            const arrayProducts = JSON.parse(result)
            const newArrayProducts = arrayProducts.filter(product => product.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts,null, 2), 'utf-8')
        }
        catch(e){
            console.log("error deleteProduct")
        }
        
    }
}

module.exports = ProductManager
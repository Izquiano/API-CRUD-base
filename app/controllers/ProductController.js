const Product = require('../models/Product')

function index(req, res){
  Product.find({})
    .then(products => {
      if(products.length){
        res.status(200).send({products})
      }
      return res.status(204).send({message: 'NO CONTENT'})
    }).catch(error => res.status(500).send({error}))
}

function create(req, res){
  let product = new Product(req.body)
  product.save().then(product => 
    res.status(201).send({product})
    ).catch(error => res.status(500).send({error}))

}
function show(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(req.body.products) return res.status(200).send({ products })
    return res.status(404).send({ message: "NOT FOUND" })

}

function update(req, res){
  if(req.body.error) return res.status(500).send({error})
  if(!req.body.products) return res.status(404).send({message: "NOT FOUND"})
  let product = req.body.products[0]
  product = Object.assign(product, req.body)
  product.save().then(product => res.status(200).send({message: "Updated", product})).catch( error => res.status(500).send(error))

}

function remove(req, res){
  if(req.body.error) return res.status(500).send({error})
  if(!req.body.products) return res.status(404).send({message: 'NOT FOUND'})
  let product = req.body.products[0]
  product.remove().then( product => res.status(200).send({message: 'REMOVED', product})).catch(error => res.status(500).send({error}))

}

function find(req, res, next){
  let query = {}
  query[req.params.key] = req.params.value
  Product.find(query).then(products => {
    if(!products.length) return next()
    req.body.products = products
    return next()
  }).catch(error => {
    req.body.error = error
    next()
  })
}

module.exports = {
  index,
  show,
  create,
  update,
  remove,
  find
}
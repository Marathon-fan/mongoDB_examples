
const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs')
const db = mongojs('mongodb://localhost:27017/catalog', ['products']);

const app = express();
const port = 3000;
app.use(bodyParser.json());

// home
app.get('/', (req, res, next) => {
    res.send('please use /api/products/');
});

//list all products
app.get('/api/products', (req, res, next) => {
    db.products.find((err, docs) => {
        if (err){
            res.send(err);
        }
        console.log('Products found...');
        //res.setHeader('content-type', 'text/html');
        res.json(docs);
    });
});

// fetch single product
app.get('/api/products/:id', (req, res, next) => {
    db.products.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
        if (err){
            res.send(err);
        }
        console.log('Product found...');
        //res.setHeader('content-type', 'text/html');
        res.json(doc);
    });
});


// add  product
app.post('/api/products', (req, res, next) => {
    res.send('add product ');
});

// update  product
app.put('/api/products/:id', (req, res, next) => {
    res.send('update product ' + req.params.id);
});

// delete  product
app.delete('/api/products/:id', (req, res, next) => {
    res.send('delete product ' + req.params.id);
});


app.listen(port, () => {
    console.log(`server start on port ${port}`)
});
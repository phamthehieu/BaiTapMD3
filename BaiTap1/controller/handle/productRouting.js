const fs = require('fs');
const ProductService = require('C:\\Users\\phamt\\WebstormProjects\\BaiTapDataBase\\service\\ProductService.js')
const qs = require('qs'); 
class ProductRouting {
    static getHtmlProducts(products, indexHtml) {
        let tbody = '';
        products.map((product, index) => {
            tbody += `<tr style="text-align: center">
        <td>${index}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><a href="/product/edit/${product.id}" type="button" class="btn btn-primary">Edit</a></td> 
        <td><a href="/product/delete/${product.id}" type="button" class="btn btn-danger">Delete</a></td>
    </tr>`
        });
        indexHtml = indexHtml.replace('{student}', tbody);
        return indexHtml;
    }
    static showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/viewUpLoadForm.html', 'utf-8', async (err, indexHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let products = await ProductService.getProducts();
                    indexHtml = ProductRouting.getHtmlProducts(products, indexHtml);
                    res.writeHead(200, 'text/html');
                    res.write(indexHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chuck => {
                data += chuck;
            })
            req.on('end',async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data)
                    fs.readFile('./views/viewUpLoadForm.html', 'utf-8', async (err, indexHtml) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let products = await ProductService.searchStudent(search.search)
                            indexHtml = ProductRouting.getHtmlProducts(products, indexHtml);
                            res.writeHead(200, 'text/html');
                            res.write(indexHtml);
                            res.end();
                        }
                    })
                }
            })
        }
    }
    static showFormCreate(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/student/create.html', 'utf-8', (err,createHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(createHtml);
                    res.end();
                }
            })
        } else {
            let productChuck = '';
            req.on('data', chuck => {
                productChuck += chuck
            })
            console.log(productChuck)
            req.on ('end', async(err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChuck);
                   await ProductService.saveProduct(product);
                   res.writeHead(301, {'location':'/home'});
                    res.end();
                }
            })
        }
    }
    static showFormEdit(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/student/edit.html', 'utf-8', async (err,editHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = await ProductService.findById(id);
                    editHtml = editHtml.replace('{name}', product[0].name);
                    editHtml = editHtml.replace('{price}', product[0].price);
                    editHtml = editHtml.replace('{description}', product[0].description);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            })
        } else {
            let productChuck = '';
            req.on('data', chuck => {
                productChuck += chuck
            })
            req.on ('end', async(err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChuck);
                    await ProductService.editProduct(product, id);
                    res.writeHead(301, {'location':'/home'});
                    res.end();
                }
            })
        }
    }
    static showFormDelete(req, res,id) {
      if (req.method === 'GET') {
          fs.readFile('./views/student/delete.html', 'utf-8', async (err,deleteHtml) => {
              if (err) {
                  console.log(err)
              } else {
                  res.writeHead(200, 'text/html');
                  deleteHtml = deleteHtml.replace('{id}', id);
                  res.write(deleteHtml);
                  res.end();
              }
          })
      } else {
          let mess =  ProductService.deleteProduct(id);
          res.writeHead(301, {'location': '/home'});
          res.end();
      }
    }

}
module.exports = ProductRouting;
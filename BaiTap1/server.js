const http = require('http');
const handler = require('./controller/router');
const url = require('url');
const NotFoundRouting = require('./controller/handle/notFoundRouting');

function getUrl (req) {
    const urlParse = url.parse(req.url,true);
    const pathName = urlParse.pathname;
    return pathName.split('/');
}
const server = http.createServer((req, res) => {
    const arrPath = getUrl(req);
    let trimPath = '';
    if (arrPath.length > 2) {
        trimPath = arrPath[1] + '/' + arrPath[2]
    } else {
        trimPath = arrPath[arrPath.length - 1];
    }
    let chosenHandler;
    if (typeof handler[trimPath] === 'undefined') {
        chosenHandler = NotFoundRouting.showNotFound
    } else {
        chosenHandler = handler[trimPath];
    }
    chosenHandler(req, res, +arrPath[3]);
})
server.listen(8080, () => {
    console.log('server running !!')
})


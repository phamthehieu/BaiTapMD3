const fs = require('fs');

class NotFoundRouting {
    static showNotFound(req, res) {
        fs.readFile('./views/error/notFound.html', 'utf-8', (err, notFoundHtml) => {
            if (err) {
                console.log(err)
            } else {
                res.writeHead(200, 'text/html');
                res.write(notFoundHtml);
                res.end();
            }
        })
    }
}
module.exports = NotFoundRouting;
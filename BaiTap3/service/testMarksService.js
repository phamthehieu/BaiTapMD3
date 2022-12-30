const Connection =require('../model/connection');
Connection.connecting()
class TestMarksService {
    static findAll() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM testmarks`,(err, testMark) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(testMark)
                }
            })
        })
    }
    static finById(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM testmarks WHERE idTestMark = ${id}`,(err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }
}
module.exports = TestMarksService;
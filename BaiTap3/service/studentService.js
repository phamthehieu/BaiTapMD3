const Connection =require('../model/connection');
Connection.connecting()
class StudentService {
    static getStudents() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM students p JOIN testmarks t on p.idTestMarks = t.idTestMark;`,(err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }
    static createStudents(data) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO students(name, age, homeTown, idTestMarks) VALUE ('${data.name}',${data.age},'${data.homeTown}','${+data.idTestMarks}')`,(err, student) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(student)
                }
            })
        })
    }
    static finById(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM students WHERE id = ${id}`,(err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }
    static editStudent(student, id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE students SET name = '${student.name}',age = ${student.age},homeTown = '${student.homeTown}', idTestMarks = '${+student.idTestMarks}' WHERE id = ${id}`, (err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }
    static deleteStudent(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM students WHERE id = ${id}`, (err) => {
                if (err) {
                    reject(err)
                } else {
                   resolve('Xoa Thanh Cong')
                }
            })
        })
    }
    static searchStudent(search) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM students WHERE name LIKE '%${search}%';`, (err, student) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(student)
                }
            })
        })
    }
}
module.exports = StudentService;
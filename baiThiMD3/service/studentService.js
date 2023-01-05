const Connection =require('../model/connection');
Connection.connecting()
class StudentService {
    static getStudents() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT *  FROM student;`,(err, product) => {
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
            connection.query(`INSERT INTO student(name, class, theoreticalPoint, Assess, practicePoints, description) VALUE ('${data.name}','${data.class}',${data.theoreticalPoint},'${data.Assess}',${data.practicePoints},'${data.description}');`,(err, student) => {
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
            connection.query(`SELECT * FROM student WHERE id = ${id}`,(err, product) => {
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
            connection.query(`UPDATE student SET name = '${student.name}',class = '${student.class}', theoreticalPoint = ${student.theoreticalPoint}, Assess = '${student.Assess}', practicePoints = ${student.practicePoints}, description = '${student.description}' WHERE id = ${id};`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    static deleteStudent(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM student WHERE id = ${id}`, (err) => {
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
            connection.query(`SELECT * FROM student WHERE name LIKE '%${search}%';`, (err, student) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(student)
                }
            })
        })
    }
    static sortTheoreticalPoint() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM student ORDER BY theoreticalPoint;`,(err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }
}
module.exports = StudentService;
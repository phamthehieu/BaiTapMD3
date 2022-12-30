const fs = require('fs');
const StudentService = require('../../service/studentService');
const TestMarksService = require('../../service/testMarksService')
const qs = require('qs');

class StudentRouting {
    static getStudent(products, indexHtml) {
        let tbody = '';
        products.map((student, index) => {
            tbody += `
             <tr style="text-align: center">
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.homeTown}</td>
                <td>${student.nameTestMark}</td>
                <td><a href="/student/edit/${student.id}" type="button" class="btn btn-primary">Edit</a></td> 
            <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop${student.id}">Delete</button>
            <div class="modal fade" id="staticBackdrop${student.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">Có Xóa Không</div>
            <div class="modal-footer">
            <a href="/student/home"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button></a>
            <form action="/student/delete/${student.id}" method="post">
            <button type="submit" class="btn btn-primary">Có</button>
            </form>
            </div>
            </div>
            </div>
            </div></td>
            </tr>`
        })
        indexHtml = indexHtml.replace('{ok}', tbody);
        return indexHtml;
    }
    static showHome(req, res) {
        fs.readFile('./views/home.html', 'utf-8', async (err, homeHtml) => {
            if (err) {
                console.log(err)
            } else {
               let a =  await StudentService.getStudents()
                homeHtml = StudentRouting.getStudent(a, homeHtml);
                res.writeHead(200, 'text/html');
                res.write(homeHtml);
                res.end();
            }
        })
    }
    static showCreate(req,res) {
        if (req.method === 'GET') {
            fs.readFile('./views/student/create.html', 'utf-8', async (err, createHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200, 'text/html');
                    let testMarksService = await TestMarksService.findAll();
                    let option = '';
                    testMarksService.map(data => {
                        option += `
                        <option value="${data.idTestMark}">${data.nameTestMark}</option>
                        `
                    })
                    createHtml = createHtml.replace('{testMarksService}', option);
                    res.write(createHtml);
                    res.end();
                }
            })
        } else {
            let student = '';
            req.on('data', chuck => {
                student += chuck;
            })
            req.on('end',async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let data = qs.parse(student)
                    await StudentService.createStudents(data)
                    res.writeHead(301, {'location':'/student/home'});
                    res.end();
                }
            })
        }
    }
    static async showFormEdit(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/student/edit.html','utf-8',async (err, editHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let student = await StudentService.finById(id)
                    let testMark = await TestMarksService.finById(student[0].idTestMarks )
                    editHtml = editHtml.replace('{name}', student[0].name);
                    editHtml = editHtml.replace('{age}', student[0].age);
                    editHtml = editHtml.replace('{homeTown}', student[0].homeTown);
                    editHtml = editHtml.replace('{Test}', testMark[0].nameTestMark);
                    let option = '';
                    let testMarks = await TestMarksService.findAll()
                    await testMarks.map(data => {
                        option += `
                        <option value="${data.idTestMark}">${data.nameTestMark}</option>
                        `
                    })
                    editHtml = editHtml.replace('{testMarksService}',option)
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            })
        } else {
            let edit = '';
            req.on('data', chuck => {
                edit += chuck;
            })
            req.on('end',async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let student = qs.parse(edit);
                    await StudentService.editStudent(student, id)
                    res.writeHead(301, {'location':'/student/home'});
                    res.end();
                }
            })
        }
    }
    static showFormDelete(req, res, id) {
        if (req.method === 'POST') {
            let a = StudentService.deleteStudent(id);
            res.writeHead(301, {'location': '/student/home'});
            res.end();
        }
    }
}
module.exports = StudentRouting;
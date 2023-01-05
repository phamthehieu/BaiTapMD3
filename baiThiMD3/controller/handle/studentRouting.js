const fs = require('fs');
const StudentService = require('../../service/studentService');
const TestMarksService = require('../../../BaiTap3/service/testMarksService')
const qs = require('qs');

class StudentRouting {
    static getStudent(students, indexHtml) {
        let tbody = '';
        students.map((student, index) => {
            tbody += `
             <tr style="text-align: center">
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.class}</td>
                <td>${student.theoreticalPoint}</td>
                <td>${student.Assess}</td>
                <td>${student.practicePoints}</td>
                <td>${student.description}</td>
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
       if (req.method === 'GET') {
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
       } else {
           let data = '';
           req.on('data', chuck => {
               data += chuck
           })
           req.on('end',async (err) => {
               if (err) {
                   console.log(err)
               } else {
                   let search = qs.parse(data);
                   fs.readFile('./views/home.html', 'utf-8', async (err, searchHtml) => {
                       if (err) {
                           console.log(err)
                       } else {
                           let students =  await StudentService.searchStudent(search.search)
                           searchHtml = StudentRouting.getStudent(students, searchHtml);
                           res.writeHead(200, 'text/html');
                           res.write(searchHtml);
                           res.end();
                       }
                   })
               }
           })
       }
    }
    static showCreate(req,res) {
        if (req.method === 'GET') {
            fs.readFile('./views/student/create.html', 'utf-8', async (err, createHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200, 'text/html');
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
                    editHtml = editHtml.replace('{name}', student[0].name);
                    editHtml = editHtml.replace('{class}', student[0].class);
                    editHtml = editHtml.replace('{theoreticalPoint}', student[0].theoreticalPoint);
                    editHtml = editHtml.replace('{Assess}', student[0].Assess);
                    editHtml = editHtml.replace('{practicePoints}', student[0].practicePoints);
                    editHtml = editHtml.replace('{description}', student[0].description);
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
    static sortTheoreticalPoint(req, res) {
       if (req.method === 'GET') {
           fs.readFile('./views/student/sort.html', 'utf-8', async (err, sortHtml) => {
               if (err) {
                   console.log(err)
               } else {
                let a = await StudentService.sortTheoreticalPoint()
                   sortHtml = await StudentRouting.getStudent(a, sortHtml)
                   res.writeHead(200,'text/html')
                   res.write(sortHtml);
                   res.end();
               }
           })
       }
    }
}
module.exports = StudentRouting;
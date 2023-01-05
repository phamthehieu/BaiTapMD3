const StudentRouting = require ('./handle/studentRouting');

    const handle = {
        'student/home' : StudentRouting.showHome,
        'student/create' : StudentRouting.showCreate,
        'student/edit' : StudentRouting.showFormEdit,
        'student/delete' : StudentRouting.showFormDelete,
        'student/sort' : StudentRouting.sortTheoreticalPoint
    }
module.exports = handle;
const ProductRouting = require ('./handle/studentRouting');

    const handle = {
        'student/home' : ProductRouting.showHome,
        'student/create' : ProductRouting.showCreate,
        'student/edit' : ProductRouting.showFormEdit,
        'student/delete' : ProductRouting.showFormDelete
    }
module.exports = handle;
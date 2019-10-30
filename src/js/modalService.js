angular.module("employeesApp", [])
    .service("modalService", function () {
    var modals = []; // array of modals on the page
    var service = {};

    service.add = add;
    service.remove = remove;
    service.open = open;
    service.close = close;

    function add(modal) {
        // add modal to array of active modals
        modals.push(modal);
    }
    
    function remove(id) {
        // remove modal from array of active modals
        var modalToRemove = _.findWhere(modals, { id: id });
        modals = _.without(modals, modalToRemove);
    }

    function open(id) {
        // open modal specified by id
        var modal = _.findWhere(modals, { id: id });
        modal.open();
    }

    function close(id) {
        // close modal specified by id
        var modal = _.findWhere(modals, { id: id });
        modal.close();
    }
});
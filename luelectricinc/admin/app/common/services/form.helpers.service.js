// used to set readonly/disabled basted on state
angular.module("app.common").service("FormHelpers", function() {
    var FormHelpers = this;

    //configures form data STATES CAN ONLY BE EDIT ADD OR VIEW
    FormHelpers.formStateOpts = function(state) {
        var opts = {};
        opts.state = state;
        switch(state) {
            case "add":
                opts.canSubmit = true;
                opts.canDelete = false;
                opts.readOnly  = false;
                break;
            case "edit":
                opts.canSubmit = true;
                opts.canDelete = true;
                opts.readOnly =  false;
                break;
            case "view":
                opts.canSubmit = false;
                opts.canDelete = false;
                opts.readOnly =  true;
                break;
            default:
                console.error("err");
                opts.canSubmit = false;
                opts.canDelete = false;
                opts.readOnly =  true;
                break;
        }
        return opts;
    };
});

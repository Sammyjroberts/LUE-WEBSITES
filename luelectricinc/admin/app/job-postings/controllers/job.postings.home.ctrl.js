angular.module("app.jobpostings").controller("JobPostingHomeCtrl", function(JobPosting, AlertPopper) {
  const self = this;
  console.log("in home ctrl");

  self.gridOptions = {
    columnDefs : [
      {
          field: 'id',
          name: '',
          enableFiltering: false,
          enableSorting: false,
          cellTemplate: '<div class="ui-grid-cell-contents">' +
          '<a data-ui-sref="app.jobpostings.view({id: row.entity.id})"><i class="fa fa-lg fa-eye"></i></a>' + '<span>&nbsp &nbsp &nbsp</span>' +
          '<a data-ui-sref="app.jobpostings.edit({id: row.entity.id})"><i class="fa fa-lg fa-pencil-square-o"></i></a> </div>',
          width: 75
      },
      {
        field: 'jobTitle',
        name:'Job Title'
      },
      {
        field: 'status',
        name : "Status"
      },
      {
        field: 'contractType',
        name:'Contract Type'
      },
      {
        field: 'location',
        name:'Locations'
      }
    ]
  };
  self.gridOptions.data = [{msg:"eyy"}];


  JobPosting.getAll()
  .then(function(response) {
    console.log(response);
    response.data.forEach((post) => {
      post.location = JobPosting.formatLocationsForView(post.location);
    });
    self.gridOptions.data = response.data;
  })
  .catch(function(err) {
    AlertPopper.popAlert("error",err.data.message);
  });

});

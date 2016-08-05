angular.module("app.jobpostings").controller("JobPostingHomeCtrl", function(JobPosting, AlertPopper) {
  const self = this;

  //options for the ui-grid component
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

  //get all the data
  JobPosting.getAll()
  .then(function(response) {
    response.data.forEach((post) => {
      //format locations
      post.location = JobPosting.formatLocationsForView(post.location);
    });
    //emplace data
    self.gridOptions.data = response.data;
  })
  .catch(function(err) {
    AlertPopper.popAlert("error",err.data.message);
  });

});

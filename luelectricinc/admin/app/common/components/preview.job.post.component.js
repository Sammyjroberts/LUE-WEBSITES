angular.module('app.common').component('previewJobPosting', {
  template: `
    <div class="container-fluid">

  <!-- Page Content -->
  <i ng-click="ctrl.flip()" class=" btn fa fa-minus-square-o fa-2x pull-right"></i>
  <div ng-hide ="ctrl.minimize" class ="well">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">


          <h1 class = "page-header">{{ctrl.jobPosting.jobTitle}} <small>{{ctrl.jobPosting.contractType}} <br>{{ctrl.jobPosting.location | location}}</small></h1>
          <div class="panel panel-default">
            <div class="panel-body">
              <h5 class = "page-header">About L.U. ELECTRIC, INC.</h5>
              <p>
                {{ctrl.jobPosting.aboutLu}}
              </p>
              <h5 class = "page-header">Job Description</h5>
              <p>
                {{ctrl.jobPosting.jobDescription}}
              </p>
              <h5 class="page-header">Preferred Qualifications</h5>
              <ul>
                <li ng-repeat="qualification in ctrl.jobPosting.qualification track by $index">{{qualification.name}}</li>
              </ul>
              <h5 class = "page-header">Additional information</h5>
                <p>
                {{ctrl.jobPosting.additionalInfo}}
                <br><b>Please email resume to <a href="mailto:<?php echo CAREER_CONTACT ?>"><?php echo CAREER_CONTACT ?>.</a><b>
                </p>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  controller: function() {

    const self = this;
    self.minimize = false;
    self.flip = function(){
      self.minimize = !self.minimize;
    };
  },
  controllerAs:"ctrl",
  bindings: {
    jobPosting: '='
  }
});

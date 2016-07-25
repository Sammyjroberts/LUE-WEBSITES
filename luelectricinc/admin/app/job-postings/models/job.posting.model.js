angular.module("app.jobpostings").service("JobPosting", function(FormHelpers, RouteGetter, $http) {
  const JobPosting = this;

  const model = "careers";
  JobPosting.getAll = function() {
    const route = RouteGetter.get(model);
    return($http.get(route));
  };


  JobPosting.initController = function(self, state) {
    return new Promise(function(resolve, reject) {
      //object model we will build
      self.jobPosting = {
          locations:[{city:"Orange County",state:"CA"},{city:"Los Angeles",state:"CA"}],
          qualifications: [{name:""}]

      };

      //schemas of reference fields to use in directives
      self.referenceFieldSchemas = {};

      //get access to the form helper service in the form
      self.FormHelpers = FormHelpers;

      //populate used Schemas
      //this form schema

      //form state
      self.formConfigOptions = FormHelpers.formStateOpts(state);

      //add default opts
      if(self.formConfigOptions.state === "add") {
        self.jobPosting.aboutLu = `A family owned business operating for over 25 years,
        the goal of L.U. Electric, Inc. is to provide best in class service with the
        highest level of professionalism and integrity. We value the many talents and
        abilities of our employees, and are seeking an experienced General
        Electrician to join ongoing projects in the OC and LA areas. We are selective
        and careful when it comes to hiring. Plenty of room for advancement and professional development.`;
        self.jobPosting.additionalInfo = `L.U. Electric, Inc. is committed to hiring
        and retaining a diverse workforce. We are proud to be an Equal Opportunity/Affirmative
        Action Employer, making decisions without regard to race, color, religion,
        creed, sex, sexual orientation, gender identity, marital status, national origin,
        age, veteran status, disability, or any other protected class. `;
      }

      resolve(self);
  });
};

  return JobPosting;
});

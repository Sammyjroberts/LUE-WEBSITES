angular.module("app.jobpostings").service("JobPosting", function(FormHelpers, RouteGetter, authHttp) {
  const JobPosting = this;

  const model = "careers";
  JobPosting.getAll = function() {
    const route = RouteGetter.get(model);
    return(authHttp.get(route));
  };
  JobPosting.getOne = function(id) {
    const route = RouteGetter.get(model, id);
    return(authHttp.get(route));
  };
  JobPosting.post = function(data) {
    const route = RouteGetter.get(model);
    return(authHttp.post(route, data));
  };
  JobPosting.put = function(id,data) {
    const route = RouteGetter.get(model,id);
    return(authHttp.put(route, data));
  };
  function replaceAll(str, from, to) {
    let temp = _.split(str,from);
    temp = _.pull(temp, "");
    let newStr = "";
    temp.forEach((substr) => {
      newStr+= substr+to;
    });
    return newStr;
  }

  JobPosting.prepForPost = function(jobposting) {
    let toRet = JSON.stringify(jobposting);
    toRet = JSON.parse(toRet);
    let tempStr = "";
    toRet.location.forEach(function(loc) {
      tempStr += loc.city +", " +loc.state +"$";
      console.log(loc);
      console.log("arr");
    });
    console.log(tempStr);
    let temp = tempStr;
    temp = temp.substr(0, temp.length-1);
    toRet.location = temp;
    tempStr = "";
    toRet.qualification.forEach(function(qual) {
      tempStr += qual.name + "$";
    });
    let temp2 = tempStr;
    temp2 = temp2.substr(0, temp.length-1);
    toRet.qualification = temp2;
    return toRet;
  };

  JobPosting.formatLocationsForView = function(locations) {
    console.log("formatting");
    const loc = replaceAll(locations,"$", " - ");
    console.log(loc);
    return loc;
  };

  JobPosting.initController = function(self, state) {
    return new Promise(function(resolve, reject) {
      //object model we will build
      self.jobPosting = {
          location:[{city:"Orange County",state:"CA"},{city:"Los Angeles",state:"CA"}],
          qualification: [{name:""}]

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
        self.jobPosting.aboutLu = `A family owned business operating for over 25 years, the goal of L.U. Electric, Inc. is to provide best in class service with the highest level of professionalism and integrity. We value the many talents and abilities of our employees, and are seeking an experienced General Electrician to join ongoing projects in the OC and LA areas. We are selective and careful when it comes to hiring. Plenty of room for advancement and professional development.`;
        self.jobPosting.additionalInfo = `L.U. Electric, Inc. is committed to hiring and retaining a diverse workforce. We are proud to be an Equal Opportunity/Affirmative Action Employer, making decisions without regard to race, color, religion, creed, sex, sexual orientation, gender identity, marital status, national origin, age, veteran status, disability, or any other protected class. `;
      }

      //based on state init jobPosting
      if(self.formConfigOptions.state  === "edit" || self.formConfigOptions.state  === "view") {
        JobPosting.getOne(self.jobPosting.id)
        .then((response) => {
          self.jobPosting = response.data;
          resolve(self);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
      }
      else {
        resolve(self);
      }
  });
};

  return JobPosting;
});

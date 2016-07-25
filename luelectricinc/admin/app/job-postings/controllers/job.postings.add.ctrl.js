angular.module("app.jobpostings").controller("JobPostingAddCtrl", function() {
  const self = this;
  self.jobPosting = {
    locations:[{city:"Orange County",state:"CA"},{city:"Los Angeles",state:"CA"}],
    qualifications: [{name:""}]
  };
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
});

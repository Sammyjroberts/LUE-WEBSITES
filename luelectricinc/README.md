# [Start Bootstrap](http://startbootstrap.com/) - [Modern Business](http://startbootstrap.com/template-overviews/modern-business/)

[Modern Business](http://startbootstrap.com/template-overviews/modern-business/) is a multipurpose, full website template for [Bootstrap](http://getbootstrap.com/) created by [Start Bootstrap](http://startbootstrap.com/). This template includes 17 unique HTML pages and a working PHP contact form.

## Getting Started

To use this template, choose one of the following options to get started:
* Download the latest release on Start Bootstrap
* Fork this repository on GitHub

## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue](https://github.com/IronSummitMedia/startbootstrap-modern-business/issues) here on GitHub or leave a comment on the [template overview page at Start Bootstrap](http://startbootstrap.com/template-overviews/modern-business/).

## Creator

Start Bootstrap was created by and is maintained by **David Miller**, Managing Parter at [Iron Summit Media Strategies](http://www.ironsummitmedia.com/).

* https://twitter.com/davidmillerskt
* https://github.com/davidtmiller

Start Bootstrap is based on the [Bootstrap](http://getbootstrap.com/) framework created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).

## Copyright and License

Copyright 2013-2015 Iron Summit Media Strategies, LLC. Code released under the [Apache 2.0](https://github.com/IronSummitMedia/startbootstrap-modern-business/blob/gh-pages/LICENSE) license.

# API
* There is a REST API for career postings on the luelectricinc.com website.
* this is stored under /api/ and it is written in php
* it returns JSON
* routs information is listed below.

## Routes

### Careers
- GET (all) `/api/api.php?model=careers`
- GET (one) `/api/api.php?model=careers&id=1`
- POST `/api/api.php?model=careers`
- PUT `/api/api.php?model=careers&id=1`
- DELETE `/api/api.php?model=careers&id=1`

**Careers Post/Put Example**

- Post Route: `/api/api.php?model=careers`
- Put Route: `/api/api.php?model=careers&id=1`

```
{
 "jobDescription":"The best job ever in the whole word.",
 "aboutLu":"LUE is the best company with the best ad.",
 "status":"active",
 "contractType":"Full-Time",
 "additionalInfo":"L.U. Electric, Inc. is committed to hiring and retaining a diverse workforce.. ",
 "jobTitle":"Electrical Apprentice",
 "application":"b64datahere for the file",
 "locations" :"Orange County, CA$Los Angeles, CA$San Francisco, CA$",
 "qualifications":"qual1$qual2$qual3$qual4$qual5"
}
```


**Careers Get Example Response**
- Get (all) Route: `/api/api.php?model=careers`
- Get (one) Route: `/api/api.php?model=careers&id=12`

```
{
  "response": {
    "status": "200",
    "successful": "true",
    "message": "GET successful for id: 12",
    "data": {
      "id": "12",
      "created_at": "2016-07-22 10:02:35",
      "updated_at": "2016-07-22 10:02:35",
      "job_description": "We are seeking an Electrical Apprentice with strong work ethic and positive attitude to work with General and Journeyman Electricians. Electrical Apprentices are required to own basic hand tools at all times. Be able to work with all type of ladders. Candidates with no experience must have a good electrical aptitude and be quick learners.",
      "location": "Orange County, CA$Los Angeles, CA$San Francisco, CA$",
      "qualifications": "Enrollment in an electrical apprenticeship program or desire to enroll$At least 1 year of experience in electrical/construction industry$Clean driving record and valid State of California Driver’s license$Ability to lift 75+ pounds$Able to physically get into attics and crawl spaces$Locations: OC, LA, Bay Area$",
      "about_lu": "A family owned business operating for over 25 years, the goal of L.U. Electric, Inc. is to provide best in class service with the highest level of professionalism and integrity. We value the many talents and abilities of our employees, and are seeking an experienced General Electrician to join ongoing projects in the OC and LA areas. We are selective and careful when it comes to hiring. Plenty of room for advancement and professional development.",
      "status": "active",
      "contract_type": "Full-Time",
      "additional_info": "L.U. Electric, Inc. is committed to hiring and retaining a diverse workforce. We are proud to be an Equal Opportunity/Affirmative Action Employer, making decisions without regard to race, color, religion, creed, sex, sexual orientation, gender identity, marital status, national origin, age, veteran status, disability, or any other protected class. ",
      "job_title": "Electrical Apprentice",
      "application": ""
    }
  }
}
```

### Auth

/* Example Post Route */
- POST `/api/api.php?model=auth`

```
{
    "username" : "admin",
    "password" : "bestBrett"
}
```

angular.module("app.auth").service("authHttp", function($http, auth) {
  const self = this;
  self.get = function(url) {
    const req = {
        method: 'GET',
        url: url,
        headers: {
            'Authorization' : 'Bearer ' + auth.getToken(),
        }
    };
    return ($http(req));

  };
  self.post = function(url, data) {
    const req = {
        method: 'POST',
        url: url,
        data: data,
        headers: {
            'Authorization' : 'Bearer ' + auth.getToken(),
        }
    };
    return ($http(req));
  };
  self.put = function(url, data) {
    const req = {
        method: 'PUT',
        url: url,
        data: data,
        headers: {
            'Authorization' : 'Bearer ' + auth.getToken(),
        }
    };
    return ($http(req));
  };
  self.delete = function(url) {
    const req = {
        method: 'DELETE',
        url: url,
        headers: {
            'Authorization' : 'Bearer ' + auth.getToken(),
        }
    };
    return ($http(req));
  };

  return self;
});

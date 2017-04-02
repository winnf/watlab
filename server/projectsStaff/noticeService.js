var Notice = require('../../db/psrNoticeModel');
var Q = require('q');
var Server = function() {};

Server.prototype.displayNoticeDB = function() {
  var deferred = Q.defer();

  Notice.find({}, function(err, notices){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(notices);
    }
  });
  return deferred.promise;
};

Server.prototype.addNotice = function(name, date, assignees, description){
  var deferred = Q.defer();
  var notice = new Notice({
    name: name,
    postDate: date,
    assignees: assignees,
    description: description
  });

  notice.save(function(err, noticeInstance){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(noticeInstance);
    }
  });
  return deferred.promise;
};


module.exports = new Server();

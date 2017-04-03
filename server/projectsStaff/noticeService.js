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

Server.prototype.updateNotice = function(title, date, assignees, description, id){
  var deferred = Q.defer();
  var query = {'_id': id};
  var update = {
    name: title,
    postDate: date,
    assignees: assignees,
    description: description
  };

  Notice.findOneAndUpdate(query, update, function(err, instance){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(instance);
    }
  });
  return deferred.promise;
};

Server.prototype.deleteNotice = function(id){
  var deferred = Q.defer();
  Notice.find({_id: id}).remove(function(err, instance){
    if(err){
      deferred.reject(err);
    }
    else {
      deferred.resolve(instance);
    }
  });
}


module.exports = new Server();

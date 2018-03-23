/*
 * Connector to Redmine from Google Apps Scripts platform.
 *
 * Copyright (c) 2018 Emergya
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * Author: Francisco Perez <fperez@emergya.com>
 *
 */

var REDMINE_URL = 'https://redmine.domain.com';


var API_ACCESS_KEY = 'api_access_key';
var USERNAME = 'user'


// HTTP Class
// This prototype is defined for HTTP Basic authentication and easy
// management of HTTP Request
var HTTP = (function() {

  function HTTP() {
    this.default_method = "GET";
    this.base_url = "";
    this.authentication = false;
    this.username = "";
    this.password = "";
  }

  HTTP.prototype.Request = function(url, method) {

    // Support for HTTP Basic Authentication.
    //let base64 = require('base-64');
    //let headers = new Headers();
    //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));;
    
    var headers = {
    'X-Redmine-API-Key': API_ACCESS_KEY,
    'X-Redmine-Switch-User': USERNAME,
    'Content-Type': 'application/json',
    };

    var options = {
      "headers" : headers,
      "method" : method,
      "validateHttpsCertificates" : false,
      "muteHttpExceptions": true,
    };

    var content = UrlFetchApp.fetch(url, options);

    return content;
  };

  HTTP.prototype.Get = function (url) {
    return this.Request(url, "GET");
  };

  HTTP.prototype.Post = function (url) {
    return this.Request(url, "POST");
  };

  HTTP.prototype.Put = function (url) {
    return this.Request(url, "PUT");
  };

  HTTP.prototype.SetAuth = function (username, password) {
    this.username = username;
    this.password = password;
    this.authentication = true;
  };
  
  HTTP.prototype.SetAuthKEY = function (api_key) {
    this.api_key = api_key;
    this.authentication = false;
  };
 

  return HTTP;

})();

var Cache = (function() {
  
  function Cache() {
    this.store = {};
  }
  
  Cache.prototype.set = function (key, value) {
    this.store[key] = value;
  }
  
  Cache.prototype.get = function (key) {
    return this.store[key] || undefined;
  }
  
  return Cache;
})();
             
// Class Translator

var Translator = (function() {

  function Translator() {
  }
   
  // JSON

/* Source: https://gist.github.com/erickoledadevrel/6b1e9e2796e3c21f669f */
/**
 * Converts an XML string to a JSON object, using logic similar to the
 * sunset method Xml.parse().
 * @param {string} xml The XML to parse.
 * @returns {Object} The parsed XML.
 */
 
  // XML to JS Object.
  Translator.prototype.xmlToJS = function (element) {
  var doc = XmlService.parse(element);
  var result = {};
  var root = doc.getRootElement();
  result[root.getName()] = Translator.prototype.elementToJSON(root);
  return result;
  
    
  };
  
  
  /**
 * Converts an XmlService element to a JSON object, using logic similar to 
 * the sunset method Xml.parse().
 * @param {XmlService.Element} element The element to parse.
 * @returns {Object} The parsed element.
 */

  Translator.prototype.elementToJSON = function (element) {
  var result = {};
  // Attributes.
  element.getAttributes().forEach(function(attribute) {
    result[attribute.getName()] = attribute.getValue();
  });
  // Child elements.
  element.getChildren().forEach(function(child) {
    var key = child.getName();
    var value = Translator.prototype.elementToJSON(child);
    if (result[key]) {
      if (!(result[key] instanceof Array)) {
        result[key] = [result[key]];
      }
      result[key].push(value);
    } else {
      result[key] = value;
    }
  });
  // Text content.
  if (element.getText()) {
    result['Text'] = element.getText();
  }
  return result;
};

  Translator.prototype.searchTag = function (data, tag) {

    var ret_value;

    for (var i in data) {
      if (data[i][tag]) {
        ret_value = data[i][tag];
        break;
      }
    }

    return ret_value;
  };

  return Translator;

})();


var Redmine = (function() {

  function Redmine(base_url, items_by_page) {
    
    this.ITEMS_BY_PAGE = items_by_page || 100;
    this.base_url = base_url || '';
    
    this.http = new HTTP();
    this.http.SetAuthKEY(API_ACCESS_KEY);
    //this.http.SetAuth(username,password);
    
    this.translator = new Translator();
    
    this.cache = new Cache();
    
    // Privileged methods
    this.paginate = function (url) {
      
      var xml_content = this.http.Get(url);
      
      var element = xml_content.getContentText();
      var doc = XmlService.parse(element);
      var result = {};
      var root = doc.getRootElement();
    
      var entries = root.getAttribute('total_count').getValue();
     
      var pages = Math.floor((entries / this.ITEMS_BY_PAGE) + 1);
     
      return pages;
    };
    
    this.getDataElement = function (url, root_tag) {
      
      if (this.cache.get(url)) {
      
        return this.cache.get(url);
      
      } 
      else {
        
        var data = [];
        var xml_content = this.http.Get(url);
       // Logger.log(xml_content);
       

        var elements_data = null;
        
        if  (xml_content!=''){
        elements_data = this.translator.xmlToJS(xml_content.getContentText());
        this.cache.set(url, elements_data);
        }

        return elements_data;
      }
    };
    
    this.getData = function (base_url_redmine, root_tag) {
  
       var base_url = base_url_redmine + '/' + root_tag + '.xml';
 
      if (this.cache.get(base_url)) {

        return this.cache.get(base_url);

      } else {
      
      
        var data = [];
        //Logger.log(base_url);
        var pages = this.paginate(base_url);
        //Logger.log(pages);
        for (var i = 1; i <= pages; i++) {
          
          if (base_url.indexOf("?") > 0)
            var url = base_url + '&limit=' + this.ITEMS_BY_PAGE + '&page=' + i;
          else
            var url = base_url + '?limit=' + this.ITEMS_BY_PAGE + '&page=' + i;
          
          
          var elements_data = null;
          var xml_content = this.http.Get(url);
          if  (xml_content!=''){
            elements_data = this.translator.xmlToJS(xml_content.getContentText());
            this.cache.set(url, elements_data);
          }

          
        }
        
        return elements_data;
      }
    };
      
  }

  Redmine.prototype.getIssues = function (project_id) {
    Logger.log("Launching getIssues(" + project_id + ")");
    
    var url = REDMINE_URL + '/issues.xml?project_id=' + project_id + '&status_id=*';
    var data = this.getData(url, '');
    
    return data;
  };

  Redmine.prototype.getProjects = function () {
    Logger.log("Launching getProjects()");
    
    var url = REDMINE_URL;
    var data = this.getData(url, 'projects');
    
    return data;
  };

  Redmine.prototype.getProject = function (project_id) {
    Logger.log("Launching getProject(" + project_id + ")");
    
    var url = REDMINE_URL + '/projects/' + project_id + '.xml';
    var data= this.getDataElement(url, 'project');

    return data;
  };

  Redmine.prototype.getTimeEntries = function (project_id) {
    Logger.log("Launching getTimeEntries(" + project_id + ")");
    
    var url_base = REDMINE_URL + '/projects/' + project_id;
    var data = this.getData(url_base, 'time_entries');

    return data;
  };
  
  Redmine.prototype.getCategory = function (project_id) {
    Logger.log("Launching getCategory (" + project_id + ")");
    
    var url = REDMINE_URL + '/projects/' + project_id;
    var data = this.getData(url, 'issue_categories');

    return data;
  };
  
  
  Redmine.prototype.getTimeEntriesByIssue = function (project_name_id, issue_id) {
    Logger.log("Launching getIssuesByTracker("+project_name_id+","+issue_id+")");
    
    var url = REDMINE_URL + '/issues/' + issue_id ;
    var data = this.getData(url, 'time_entries');
    
    return data;
  };
    
    
  Redmine.prototype.getIssuesByTracker = function (project_name_id, tracker_id) {
    Logger.log("Launching getIssuesByTracker("+project_name_id+","+tracker_id+")");
    
    var url = REDMINE_URL + '/issues.xml?project_id=' + project_name_id + '&tracker_id='+ tracker_id + '&status_id=*';
    var data = this.getData(url, '');
    
    return data;
  };


  
  Redmine.prototype.issueUpdate = function (issue_id, start_date, due_date) {
  //TODO: Update Issue 
   
  };
  
  
  Redmine.prototype.issueCreate = function (project_id, issue) {
  //TODO: Create Issue
  var payload = {
    'issue': issue, 
    'project_id': project_id,
  };
  payload = JSON.stringify(payload);
  var headers = {
    'X-Redmine-API-Key': API_ACCESS_KEY,
    'X-Redmine-Switch-User': USERNAME,
    'Content-Type': 'application/json',
  };
  var options = {
    'method': 'POST',
    'headers': headers,
    'payload': payload,
    'contentType': 'application/json',
    //'muteHttpExceptions': true
  };
  Logger.log(payload);
  var response = UrlFetchApp.fetch(REDMINE_URL, options);
  //Logger.log(response);
  
  return response;
  };

  return Redmine;

})();


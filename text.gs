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

// Some useful constants
var PROJECT_ID = 'name_project';
var CATEGORY_NAME = 'name_categoty';
var TRACKER_ID = 'your_tracker_id'; 
var ISSUE_ID =  'your_issue_id'; // issue_id from project_id
var USERNAME = 'user';

// Redmine class tests

function redmine_getIssues() {
  var redmine = new Redmine();
  var response= redmine.getIssues(PROJECT_ID);
  
  var num=redmine.translator.searchTag(response, 'total_count');
  Logger.log('Issues: ' + num);
  Logger.log(response);
}

function redmine_getProjects() {
  var redmine = new Redmine();
  var response = redmine.getProjects();
  
  var num=redmine.translator.searchTag(response, 'total_count');
  Logger.log('Projects: ' + num);
  Logger.log(response);
}

function redmine_getProject() {
  var redmine = new Redmine()
  this.cache = new Cache();
  var response = redmine.getProject(PROJECT_ID);

  var id=redmine.translator.searchTag(response, 'id');
  Logger.log('Project id: ' + id.Text);
  Logger.log(response);
}


function redmine_getIdNumByProjectId() {
  var redmine = new Redmine()
  this.cache = new Cache();
  var response = redmine.getProject(PROJECT_ID);
  
  var campo=redmine.translator.searchTag(response, 'id');
  Logger.log(campo.Text);
}

function redmine_getTimeEntries() {
  var redmine = new Redmine();
  var response = redmine.getTimeEntries(PROJECT_ID);
  
  var num=redmine.translator.searchTag(response, 'total_count');
  Logger.log('Time entries: ' + num);
  Logger.log(response);
}

function redmine_getCategory() {
  var redmine = new Redmine();
  var response = redmine.getCategory(PROJECT_ID);
  
  var num=redmine.translator.searchTag(response, 'total_count');
  Logger.log('response: ' + num);
  Logger.log(response);
}

function redmine_getIdCategoryByProjectId() {
  var redmine = new Redmine();
  var response = redmine.getCategory(PROJECT_ID);
 
  Logger.log(response);

  var valor=redmine.translator.searchTag(response, 'issue_category');
  var result = '';
  for (var i in valor) {
     Logger.log(i+":"+valor[i]['name'].Text)
     if (valor[i]['name'].Text == CATEGORY_NAME){
         result = valor[i];
     }  
  }
  if (result != ''){
      Logger.log(result['id'].Text);
  }
  
}


function redmine_getTimeEntriesByIssue () { 
  var redmine = new Redmine();
  var response= redmine.getTimeEntriesByIssue(PROJECT_ID,ISSUE_ID);
 
  var num=redmine.translator.searchTag(response, 'total_count');
  Logger.log('Issues: ' + num);
  Logger.log(response);
    
  };
  

function redmine_getIssuesByTracker() {
  var redmine = new Redmine();
  var response= redmine.getIssuesByTracker(PROJECT_ID,TRACKER_ID);
 
  var num=redmine.translator.searchTag(response, 'total_count');
  Logger.log('Issues: ' + num);
  Logger.log(response);
}

//TODO issueUpdate
function redmine_issueUpdate() {
  var redmine = new Redmine();
}

//TODO issueCreate
function redmine_issueCreate() {
  
  var issue = {
    'subject': 'This is a test ticket created by Trinh using Google Script',
    'description': 'This is genius!',
    'category_id': 1,
  };

  var redmine = new Redmine();
  var response = redmine.issueCreate(PROJECT_ID, issue);
  
  Logger.log('Response Issue: ' + response.length);
  Logger.log(response);
  
  /*
  var redmine_url = 'http://<my redmine address>/issues.json';
  var api_key = '<my api key>';
  var project_id = '<my project identifier>';
  var issue = {
    'subject': 'This is a test ticket created by Trinh using Google Script',
    'description': 'This is genius!',
    'category_id': 1,
  };
  var username = '<some username>'; // creating issue on behalf of another user
  createIssue(redmine_url, api_key, project_id, issue, username);*/
  
  }

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
var PROJECT_ID = //'your_project_id';
var PROJECT_NOM = //'your_project_name';
var CATEGORY_ID = //'your_category_id';
var CATEGORY_NAME = //'your_category_name';
var TRACKER_ID = //'your_tracker_id';  //43 Proveedores
var ISSUE_ID =  //'your_issue_id';issue_id from project_id for examples in Tests
var USERNAME = //'your_user_name';
var USERNAME_ID = //'your_user_id';
var ROL_ID = //'your_rol_id'; 
var MEMBERSHIP_ID =   //'your_membership_id';
var ACTIVITY_ID = //your_values;
var TIME_VALUE = //your_values;
var DATE_VALUE = //your_values;
var TIME_ENTRY_ID= //your_values;

// Redmine class tests

function redmine_getIssues() {
  var redmine = new Redmine();
  var response= redmine.getIssues(PROJECT_NOM);
  
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
  var response = redmine.getProject(PROJECT_NOM);

  var id=redmine.translator.searchTag(response, 'id');
  Logger.log('Project id: ' + id.Text);
  Logger.log(response);
}


function redmine_getIdNumByProjectId() {
  var redmine = new Redmine()
  this.cache = new Cache();
  var response = redmine.getProject(PROJECT_NOM);
  
  //OPCION SEARCH TAG
  var field=redmine.translator.searchTag(response, 'id');
  //{Text=73}
  Logger.log(field);
  
  // 73
  Logger.log(field.Text);
}

function redmine_getTimeEntries() {
  var redmine = new Redmine();
  var response = redmine.getTimeEntries(PROJECT_NOM);
  
  var num=redmine.translator.searchTag(response, 'total_count');
  Logger.log('Time entries: ' + num);
  Logger.log(response);
}

function redmine_getCategory() {
  var redmine = new Redmine();
  var response = redmine.getCategory(PROJECT_NOM);
  
  var num=redmine.translator.searchTag(response, 'total_count');
  Logger.log('response: ' + num);
  Logger.log(response);
}

function redmine_getIdCategoryByProjectId() {
  var redmine = new Redmine();
  var response = redmine.getCategory(PROJECT_NOM);
 
  Logger.log(response);

  var valor=redmine.translator.searchTag(response, 'issue_category');
  var result = '';
  for (var i in valor) {
     Logger.log(i+':'+valor[i]['name'].Text)
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
  var response= redmine.getTimeEntriesByIssue(PROJECT_NOM,ISSUE_ID);
 
  var num=redmine.translator.searchTag(response, 'total_count');
  Logger.log('Issues: ' + num);
  Logger.log(response);
    
  };
  

function redmine_getIssuesByTracker() {
  var redmine = new Redmine();
  var response= redmine.getIssuesByTracker(PROJECT_NOM,TRACKER_ID);
 
  var num=redmine.translator.searchTag(response, 'total_count');
  Logger.log('Issues: ' + num);
  Logger.log(response);
}

function redmine_issueCreate() {
  
  var issue = {
    'subject': 'This is a test ticket created by fperez',
    'description': 'This is genius!',
    'is_private' : 'false', // 'false' or 'true'
    'project_id': PROJECT_ID,
    'category_id': CATEGORY_ID,
    'status_id': 1,
    'assigned_to_id': USERNAME_ID,
    'tracker_id': 2,
    'start_date': '2018-03-24',
    'estimated_hours':'0.25',
    'due_date': '2018-03-31' 
  };

  var redmine = new Redmine();
  var response = redmine.issueCreate(issue);

  var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Issue Id: '+num);
  
  }

function redmine_issueUpdate() {
  var issue = {
    'subject': 'Updated 2 This is a test ticket created by fperez',
    'description': 'Updated 2 This is genius!',
    'is_private' : 'true', // 'false' or 'true'
    'project_id': PROJECT_ID,
    'category_id': 4679, //PROJECT_CATEGORY_NUM
    'status_id': 1,
    'assigned_to_id': USERNAME_ID,
    'tracker_id': 2,
    'start_date': '2018-03-24',
    'estimated_hours':'2.7',
    'due_date': '2018-07-31' 
  };

  var redmine = new Redmine();
  var response = redmine.issueUpdate(ISSUE_ID,issue);

  //var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Issue Updated Id: '+ISSUE_ID);
  
}  

function redmine_issueDelete() {
               
  var issue = {'id':ISSUE_ID //,
                        //'project_id':PROJECT_ID,
                        //'name':'Sistemas',
                        //'assigned_to_id':USERNAME_ID
                        };
  
  
  var redmine = new Redmine();
  var response = redmine.issueDelete(ISSUE_ID,issue);


  //var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('ISSUE Id '+ISSUE_ID+' Deleted from Project '+PROJECT_ID);
    
  }
  
  function redmine_projectCreate() {

    var project = {
    'name': 'Proyecto Pruebas 4.0',
    'identifier': 'proyecto-pruebas-cuatro',
    'description': 'realizando pruebas de proyectos',
    'parent_id': 73, // PROJECT_ID (PARENT)
    'status': 1,
    'custom_fields':[{'id':18,'name':'Custom Fields 1','value':'Others'},
                     {'id':26,'name':'Custom Fields 2':'XX-YYY'},
                     {'id':43,'name':'Custom Fields 3','value':''},
                     {'id':277,'name':'Custom Fields 4','value':'48'}],
                     
    'enabled_module_names': [
                           'issue_tracking',
                           'time_tracking',
                           'wiki',
                           'repository',
                           'agile'
                            ],
   
     'tracker_ids': [
                   2, //'name':'Tasks'
                   1  //'name':'Errors'
                   ]                     
     };

  var redmine = new Redmine();
  var response = redmine.projectCreate(project);

  var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Project Id: '+num);
  
  
  }
  
  function redmine_projectUpdate() {

  var project = {
    'name': 'Proyect 1',
    'identifier': 'proyect-one',
    'description': 'project descriptions',
    'parent_id': PROJECT_ID, // (PARENT)
    'status': 1,
   'custom_fields':[{'id':18,'name':'Custom Fields 1','value':'Others'},
                     {'id':26,'name':'Custom Fields 2':'XX-YYY'},
                     {'id':43,'name':'Custom Fields 3','value':''},
                     {'id':277,'name':'Custom Fields 4','value':'48'}],
                     
   'enabled_module_names': [
                           'issue_tracking',
                           'time_tracking'
                            ],
   
   'tracker_ids': [
                   2, //'name':'Tasks'
                   1  //'name':'Errors'
                   ],
   
              
               
  };
                          
  var redmine = new Redmine();
  var response = redmine.projectUpdate(PROJECT_ID,project); //PROJECT_ID , payload

  //var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Project Updated Id: '+PROJECT_ID);
  
} 
   
   
function redmine_categoryCreate() {
               
  var issue_category = {
                        'project_id':PROJECT_ID,
                        'name':'Systems',
                        'assigned_to_id':USERNAME_ID
                        };
  
  
  var redmine = new Redmine();
  var response = redmine.categoryCreate(PROJECT_ID,issue_category);

  var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Category Id '+num);
  
  
  }
  
  function redmine_categoryUpdate() {
               
  var issue_category = {'id':CATEGORY_ID,
                        'project_id':PROJECT_ID,
                        'name':'Systems',
                        'assigned_to_id':USERNAME_ID
                        };
  
  
  var redmine = new Redmine();
  var response = redmine.categoryUpdate(CATEGORY_ID,issue_category);

  //var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Category Id '+CATEGORY_ID+' Updated Project Id: '+PROJECT_ID);
  
  
  }
  
 function redmine_categoryDelete() {
               
  var issue_category = {'id':CATEGORY_ID //,
                        //'project_id':PROJECT_ID,
                        //'name':'Sistemas',
                        //'assigned_to_id':USERNAME_ID
                        };
  
  
  var redmine = new Redmine();
  var response = redmine.categoryDelete(CATEGORY_ID,issue_category);


  //var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Category Id '+CATEGORY_ID+' Deleted from Project Id: '+PROJECT_ID);
    
  }
  

  function redmine_membershipCreate() {
               
  var memberships = {
                        'project_id':PROJECT_ID,
                        'user_id':  USERNAME_ID, //976, //USERNAME_ID
                        'role_ids': [ROL_ID] //ROL_ID
                      
                      };
  
  
  var redmine = new Redmine();
  var response = redmine.membershipCreate(PROJECT_ID,memberships);

  var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Memberships Id '+num);
  
  
  }
  
function redmine_membershipUpdate() {
               
  var memberships = {'id':MEMBERSHIP_ID,
                        'project_id':PROJECT_ID,
                        'user_id':48, //USERNAME_ID
                        'role_ids': [ROL_ID,37] //ROL_ID
                        };
  
  
  var redmine = new Redmine();
  var response = redmine.membershipUpdate(MEMBERSHIP_ID,memberships);

  //var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Membership Id '+MEMBERSHIP_ID+' Updated Project Id: '+PROJECT_ID);
  
  
  }
  
  function redmine_membershipDelete() {
               
  var memberships = {'id': MEMBERSHIP_ID,
                      //  'project_,id':PROJECT_ID,
                       // 'user_id':48 //USERNAME_ID
                      //  'role_ids': [ROL_ID,37] //ROL_ID
                        };
  

  var redmine = new Redmine();
  var response = redmine.membershipDelete(MEMBERSHIP_ID,memberships);

  //var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Membership Id '+MEMBERSHIP_ID+' Deleted Project Id: '+PROJECT_ID);
  
  
  }

 function redmine_time_entryCreate() {
               
  var time_entry = {
                        'project_id':PROJECT_ID,
                        'issue_id':ISSUE_ID,
                        'activity_id': ACTIVITY_ID,
                        'user_id': USERNAME_ID,
                        'hours': TIME_VALUE,
                        'spent_on': DATE_VALUE
                        };
  
  
  var redmine = new Redmine();
  var response = redmine.time_entryCreate(ISSUE_ID,time_entry);

  var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('time_entry Id '+num);
  
  
  }

function redmine_time_entryUpdate() {
               
  var time_entry = {'id':TIME_ENTRY_ID,
                        'project_id':PROJECT_ID,
                        'issue id':ISSUE_ID,
                        'activity_id': 8,
                        'user_id': USERNAME_ID,
                        'hours': 4,
                        'spent_on': DATE_VALUE
                        };
  
  
  var redmine = new Redmine();
  var response = redmine.time_entryUpdate(TIME_ENTRY_ID,time_entry);

  //var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Category Id '+TIME_ENTRY_ID+' Updated ISSUE Id: '+ISSUE_ID);
  
  
  }
  
 function redmine_time_entryDelete() {
               
  var time_entry = {'id':TIME_ENTRY_ID //,
                        //'project_id':PROJECT_ID,
                        //'name':'Sistemas',
                        //'assigned_to_id':USERNAME_ID
                        };
  
  
  var redmine = new Redmine();
  var response = redmine.time_entryDelete(TIME_ENTRY_ID,time_entry);


  //var  num = redmine.translator.searchTag(response, 'id');
  Logger.log('Category Id '+TIME_ENTRY_ID+' Deleted ');
    
  }
  
  
  
  
  

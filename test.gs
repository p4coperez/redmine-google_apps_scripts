/*
 * Connector to Redmine from Google Apps Scripts platform.
 *
 * Copyright (c) 2020 Emergya
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
var PROJECT_NOM_ID = //'your_project_name_id';
var CATEGORY_ID = //'your_category_id';
var CATEGORY_NAME = //'your_category_name';
var TRACKER_ID = //'your_tracker_id';  
var ISSUE_ID =  //'your_issue_id';issue_id from project_id for examples in Tests
var ISSUE_SUBJECT = //'your_value_subject';
var USERNAME = //'your_user_name';
var USERNAME_ID = //'your_user_id';
var ROL_ID = //'your_rol_id'; 
var MEMBERSHIP_ID =   //'your_membership_id';
var ACTIVITY_ID = //your_values;
var TIME_VALUE = //your_values;
var DATE_VALUE = //your_values;
var TIME_ENTRY_ID= //your_values;
var VERSION_ID= //your_values;
var VERSION_NAME = //your_values;
var VERSION_DESCRIPTION = //your_values;
var PROJECT_NOM_TEST_ID = //your_values;
var ISSUE_SUBJECT_TEST = //your_values;
var NUM_C = 0;
var NUM_R = 0;
var NUM_U = 0;
var NUM_D = 0;
var TEST_OK ="OK";
var TEST_FAIL ="FAIL";

// Redmine class tests

//https://www.redmine.org/projects/redmine/wiki/Rest_api

function redmine_CRUD_Tests_Issues() {
  redmine_issueCreate();
  redmine_getIssues(); 
  redmine_issueUpdate();
  redmine_issueDelete();
}

function redmine_CRUD_Tests_Projects() {
  redmine_projectCreate();
  redmine_getProjects(); 
  redmine_projectUpdate();
  redmine_projectDelete();
}

function redmine_CRUD_Tests_Categories() {
  redmine_categoryCreate();
  redmine_getCategories(); 
  redmine_categoryUpdate();
  redmine_categoryDelete();
}

function redmine_CRUD_Tests_Memberships() {
  redmine_membershipCreate();
  redmine_getMemberships(); 
  redmine_membershipUpdate();
  redmine_membershipDelete();
}

function redmine_CRUD_Tests_Time_Entries() {
  redmine_time_entryCreate();
  redmine_getTime_Entries(); 
  redmine_time_entryUpdate();
  redmine_time_entryDelete();
}
function redmine_CRUD_Tests_Versions() {
  redmine_versionCreate();
  redmine_getVersions();
  redmine_versionUpdate();
  redmine_versionDelete();
}


function redmine_GetRedmineIdNumByIssueId() {
                      
  Logger.log("valor: "+GetRedmineIdNumByIssueId(PROJECT_ID,ISSUE_SUBJECT));

}


function redmine_issueCreate() {
  
  var issue = {
    'subject':  ISSUE_SUBJECT_TEST,
    'description': 'This is genius!',
    'is_private' : 'false', // 'false' or 'true'
    'project_id': PROJECT_ID, //your_values
    'category_id': 4679, //your_values
    'status_id': 1,
    'assigned_to_id': USERNAME_ID,//your_values
    'tracker_id': 2,//your_values
    'start_date': '2018-03-24',//your_values
    'estimated_hours':'0.25',//your_values
    'parent_id': '322932',//your_values
    'due_date': '2018-03-31' //your_values
    /* 'custom_fields': [{"id":6,"value":'Solicitudes de Servicios'}] 
 
     <custom_field id="6" name="Tipo de ticketing">
     <value>Solicitudes de Servicios</value>
     */
  };

  var num = CreateIssues(issue);
  Log_Create("issue",num);
  
  }
  
function redmine_getIssues() {
  
  var num = GetRedmineIdNumByIssueId(PROJECT_ID,ISSUE_SUBJECT_TEST);
  Log_Read ("getIssues",num);
  
}

function redmine_issueUpdate() {
  var issue = {
    'id': NUM_R,
    'subject':  ISSUE_SUBJECT_TEST+'-Test',
    'project_id': PROJECT_ID, //PROJECT_ID_NUM
   /* 
    'description': 'Updated 2 This is genius!',//your_values
    'is_private' : 'true', // 'false' or 'true' //your_values
    'category_id': 4679, //PROJECT_CATEGORY_NUM 
    'status_id': 1,//your_values
    'assigned_to_id': USERNAME_ID,//your_values
    'tracker_id': 2,//your_values
    'start_date': '2018-03-24',//your_values
    'estimated_hours':'2.7',//your_values
    'due_date': '2018-07-31' //your_values
    */
  };

  var num = UpdateIssues(NUM_R,issue);
  if (GetRedmineNameByIssueId(NUM_R)== ISSUE_SUBJECT_TEST+'-Test'){ 
    NUM_U = NUM_R;
  }
  Log_Update("issue",num);
  
}  
  
function redmine_issueDelete() {
               
  var num = DeleteIssues(NUM_C);
  Log_Delete("issue",num);
    
}

function redmine_GetRedmineIdNumByProjectId() {

  Logger.log("valor: "+GetRedmineIdNumByProjectId(PROJECT_NOM_ID));

}
 
  
  function redmine_projectCreate() {

 
     var project = {
    'name': PROJECT_NOM_TEST_ID,
    'identifier': PROJECT_NOM_TEST_ID,
    'description': 'project testing',
    'parent_id': PROJECT_ID, // (PARENT)
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
     
     

  var num = CreateProjects(project);
  Log_Create("project",num)
  
  
  }
  
  
function redmine_getProjects() {
  
   var num = GetRedmineIdNumByProjectId(PROJECT_NOM_TEST_ID);
   Log_Read ("getProjects",num);
}


  function redmine_projectUpdate() {

 
  var project = {
    'id': NUM_R, 
    'name': PROJECT_NOM_TEST_ID+'-Test',
    //'identifier': 'proyect-one',
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
  
                          
  var num = UpdateProjects(NUM_R,project);
  if (GetRedmineNameByProjectId(NUM_R)==PROJECT_NOM_TEST_ID+'-Test'){ //Update 'name' text value in project
    NUM_U = GetRedmineIdNumByProjectId(PROJECT_NOM_TEST_ID);
  }
  Log_Update("project",num);
  
} 

function redmine_projectDelete() {

  var num = DeleteProjects(NUM_C);
  Log_Delete("project",num);
  
}


function redmine_GetRedmineIdNumByCategoryId() {

  Logger.log("valor: "+GetRedmineIdNumByCategoryId(PROJECT_NOM_ID,CATEGORY_NAME));

}
   
function redmine_categoryCreate() {
               
  var issue_category = {
                        'project_id': PROJECT_ID,
                        'name': CATEGORY_NAME,
                        'assigned_to_id': USERNAME_ID
                        };
  
  var num = CreateCategory(issue_category);
  Log_Create("category",num);
  
  
}
  
function redmine_getCategories() {
  
  var num = GetRedmineIdNumByCategoryId(PROJECT_NOM_ID,CATEGORY_NAME);
  Log_Read ("getCategories",num);
  
}
  
function redmine_categoryUpdate() {
               
  var issue_category = {'id':NUM_R,
                        'project_id':PROJECT_ID,
                        'name':CATEGORY_NAME+'-Test',
                        'assigned_to_id':USERNAME_ID
                        };
  
  var num = UpdateCategory(NUM_R,issue_category);
  NUM_U = GetRedmineIdNumByCategoryId(PROJECT_NOM_ID,CATEGORY_NAME+'-Test');
  Log_Update("category",num);
  
  
}
  
function redmine_categoryDelete() {
 
  var num = DeleteCategory(NUM_C);
  Log_Delete("category",num);
    
}

function redmine_GetRedmineIdNumByMembershipId() {

  Logger.log("valor: "+GetRedmineIdNumByMembershipId(PROJECT_NOM_ID,USERNAME_ID,ROL_ID));

}
  
function redmine_membershipCreate() {
               
  var memberships = {   'project_id': PROJECT_ID,
                        'user_id':  USERNAME_ID, 
                        'role_ids': [ROL_ID] // example: [37,38]
                      };
                      
  var num_ant = GetRedmineIdNumByMembershipId(PROJECT_NOM_ID,USERNAME_ID,ROL_ID);
  if ( num_ant  > 0) { //delete value before!
     DeleteMembership(num_ant);
  }
  
  var num = CreateMembership(memberships);
  Log_Create("membership",num);
 
}
  
function redmine_getMemberships() {
  
  var num = GetRedmineIdNumByMembershipId(PROJECT_NOM_ID,USERNAME_ID,ROL_ID);
  Log_Read ("getMemberships",num);
  
}
  
function redmine_membershipUpdate() {
               
  var memberships = {'id':NUM_R,
                        'project_id':PROJECT_ID,
                        'user_id':48, //USERNAME_ID
                        'role_ids': [ROL_ID+1] //ROL_ID
                        };
  
  
  var num = UpdateMembership(NUM_R,memberships);
  NUM_U = GetRedmineIdNumByMembershipId(PROJECT_NOM_ID,USERNAME_ID,ROL_ID+1);
  Log_Update("membership",num);
  
}
  
function redmine_membershipDelete() {

  var num = DeleteMembership(NUM_C);
  Log_Delete("membership",num);
  
}

function redmine_GetRedmineIdNumByTimeEntryId() {

  Logger.log("valor: "+GetRedmineIdNumByTimeEntryId(ISSUE_ID,USERNAME_ID,TIME_VALUE,DATE_VALUE));

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
  
 
  var num = CreateTime_Entry(time_entry);
  Log_Create("time_entry",num)
  
}
  
function redmine_getTime_Entries() {
  
   var num = GetRedmineIdNumByTimeEntryId(ISSUE_ID,USERNAME_ID,TIME_VALUE,DATE_VALUE);
   Log_Read ("getTime_Entries",num)
  
}

function redmine_time_entryUpdate() {
               
  var time_entry = {'id':NUM_R,
                        'project_id':PROJECT_ID,
                        'issue_id':ISSUE_ID,
                        'activity_id': ACTIVITY_ID,
                        'user_id': USERNAME_ID,
                        'hours': TIME_VALUE+1,
                        'spent_on': DATE_VALUE
                        };
  
  var num = UpdateTime_Entry(NUM_R,time_entry);
  NUM_U = GetRedmineIdNumByTimeEntryId(ISSUE_ID,USERNAME_ID,TIME_VALUE+1,DATE_VALUE);
  Log_Update("time_entry",num);
  
}
  
function redmine_time_entryDelete() {
  
  var num = DeleteTime_Entry(NUM_C);
  Log_Delete("time_entry",num);
    
}
  
  
function redmine_GetRedmineIdNumByVersionId() {

  Logger.log("valor: "+GetRedmineIdNumByVersionId(PROJECT_NOM_ID,"Sprint 02-2020"));

}

function redmine_versionCreate() {

  var versions = {'project_id': PROJECT_ID,
                  'name':  VERSION_NAME, 
                  'description': VERSION_DESCRIPTION             
                  };

  var num = CreateVersion(versions);
  Log_Create("version",num)
   
}  
  
function redmine_getVersions() {
  
  var num = GetRedmineIdNumByVersionId(PROJECT_NOM_ID,VERSION_NAME);
  Log_Read ("getVersions",num)
  
}
  
function redmine_versionUpdate() {
               
  var versions = {'id':NUM_R,
                  //'project_id':PROJECT_ID,
                  'name': VERSION_NAME+'-Test' //name
                 };
                 
  var num = UpdateVersion(NUM_R,versions);
  NUM_U = GetRedmineIdNumByVersionId(PROJECT_NOM_ID,VERSION_NAME+'-Test');
  Log_Update("version",num);
  
}
  
function redmine_versionDelete() {
               
  var num = DeleteVersion(NUM_C);
  Log_Delete("version",num);
  
}


// Logs Functions -----------------------------------------------------------------
function Log_Create (function_name,num) {
  var TEST;
  NUM_C = num;
  
  if (num>0) {
      TEST = TEST_OK;
  }
  else {
      TEST = TEST_FAIL;
  } 
   Logger.log(function_name+'Create: '+TEST+' - value: '+num); 
}

function Log_Read (function_name,num) { 
  var TEST;
  NUM_R = num;
  
   if (num>0 && NUM_R==NUM_C) {
      TEST = TEST_OK;
  }
  else {
      TEST = TEST_FAIL;
  }
   Logger.log(function_name+': '+TEST+' - value: '+num); 

}

function Log_Update (function_name,num) { 
  var TEST;
  NUM_U = num;
  
   if (num>0 && NUM_R==NUM_U) {
      TEST = TEST_OK;
  }
  else {
      TEST = TEST_FAIL;
  }
   Logger.log(function_name+'Update: '+TEST+' - value: '+num); 

}

function Log_Delete (function_name,num) { 
  var TEST;
  NUM_D = num;
  
   if (num>0 && NUM_D==NUM_U) {
      TEST = TEST_OK;
  }
  else {
      TEST = TEST_FAIL;
  }
   Logger.log(function_name+'Delete: '+TEST+' - value: '+num); 
   
//Reset values
 NUM_C = 0;
 NUM_R = 0;
 NUM_U = 0;
 NUM_D = 0;
 
}

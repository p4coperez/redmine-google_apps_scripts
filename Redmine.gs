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
 

function GetRedmineIdNumByProjectId(redmine_nombre_id) {
  var redmine = new Redmine();
  var response = redmine.getProject(redmine_nombre_id);
  var redmine_num_id  = 0; 
  
  if (response!=null){
  
    redmine_num_id  = redmine.translator.searchTag(response, 'id').Text;
  }
  return redmine_num_id;
}

function GetRedmineIdCategoryByProjectId(redmine_nombre_id,redmine_nombre_category) {
  var redmine = new Redmine();
  var response = redmine.getCategory(redmine_nombre_id);
  var redmine_category_id  = 0; 
  
  if (response!=null){
   
    var categories =redmine.translator.searchTag(response, 'issue_category');
    var result = null;
    for (var i in categories) {
       //Logger.log(i+":"+categories[i]['name'].Text)
       if (categories[i]['name'].Text == redmine_nombre_category){
         result = categories[i];
       } 
    
    }
    if (result != null){
      redmine_category_id =result['id'].Text;
      //Logger.log(result['id'].Text);
    }
      
  }
  return redmine_category_id;
}

//Example issue
/*
   var issue = {
    'subject': 'Updated 2 This is a test ticket created by fperez',
    'description': 'Updated 2 This is genius!',
    'is_private' : 'true', // 'false' or 'true'
    'project_id': PROJECT_ID,
    'category_id': CATEGORY_ID, 
    'status_id': 1,
    'assigned_to_id': USERNAME_ID,
    'tracker_id': TRACKER_ID,
    'start_date': '2018-03-24',
    'estimated_hours':'2.7',
    'due_date': '2018-07-31' 
  };
*/


function CreateIssues(issue) {
  var num = 0;
  
  var redmine = new Redmine();
  var response = redmine.issueCreate(issue);

  if (response==null){
    Browser.msgBox("the issue is incorrect!"); 
  }else{ 
  var  num = redmine.translator.searchTag(response, 'id');
  
  }
  //Logger.log("Issue Id: "+num);
  return num;
 
}

function UpdateIssues(issue_id,issue) {
  var num = 0;
  
  var redmine = new Redmine();
  var response = redmine.issueUpdate(issue_id,issue);

  //Logger.log("Issue Updated Id: "+num);
  return issue_id;
 
}

/*
    var project = {
    'name': 'Proyect 1',
    'identifier': 'proyect-one',
    'description': 'realizando pruebas de proyectos',
    'parent_id': 73, // PROJECT_ID (PARENT)
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
                   ]                     
     };
*/

function CreateProjects(project) {
  var num = 0;
  
  var redmine = new Redmine();
  var response = redmine.projectCreate(project);

  if (response==null){
    Browser.msgBox("the project is incorrect!"); 
  }else{ 
  var  num = redmine.translator.searchTag(response, 'id');
  
  }
  //Logger.log("Project Id: "+num);
  return num;
 
}

function UpdateProjects(project_id,project) {
  
  var redmine = new Redmine();
  var response = redmine.projectUpdate(project_id,project);

  //Logger.log("Project Updated Id: "+project_id);
  return project_id;
 
}

/*
    var issue_category = {
                        //'id':CATEGORY_ID,
                        'project_id':PROJECT_ID,
                        'name':'Name Category',
                        'assigned_to_id':USERNAME_ID
                        };
*/

function CreateCategory(issue_category) {
  var num = 0;
                      
  var redmine = new Redmine();
  var response = redmine.categoryCreate(issue_category['project_id'],issue_category);

  if (response==null){
    Browser.msgBox("the issue_category is incorrect!"); 
  }else{ 
  var  num = redmine.translator.searchTag(response, 'id');
  
  }
  //Logger.log("Project Id: "+num);
  return num;
 
}

/*
 var issue_category = {
                        //'id':CATEGORY_ID,
                        'project_id':PROJECT_ID,
                        'name':'Name Category',
                        'assigned_to_id':USERNAME_ID
                        };
*/
function UpdateCategory(category_id,issue_category) {

  var redmine = new Redmine();
  var response = redmine.categoryUpdate(category_id,issue_category);

  //Logger.log('Category Id '+category_id+' Updated');
  return category_id;
 
}

function DeleteCategory(category_id) {
  
  var redmine = new Redmine();
  var issue_category ={'id':category_id} ;
  var response = redmine.categoryDelete(category_id,issue_category);

  //Logger.log('Category Id '+category_id+' Deleted');
  return category_id;
 
}


/*

 var memberships = { //'id':MEMBERSHIP_ID,
                        'project_id':PROJECT_ID,
                        'user_id':48, //USERNAME_ID
                        'role_ids': [ROL_ID,37] //ROL_ID
                        };
*/

function CreateMembership(membership) {
  var num = 0;
  
  var redmine = new Redmine();
  var response = redmine.membershipCreate(membership['project_id'],membership);

  if (response==null){
    Browser.msgBox("the membership is incorrect!"); 
  }else{ 
  var  num = redmine.translator.searchTag(response, 'id');
  
  }
  //Logger.log("Project Id: "+num);
  return num;
 
}

function UpdateMembership(membership_id,membership) {
  
  var redmine = new Redmine();
  var response = redmine.membershipUpdate(membership_id,membership);

  //Logger.log('Membership Id '+membership_id+' Updated');
  return category_id;
 
}

function DeleteMembership(membership_id) {
  
  var redmine = new Redmine();
  var membership ={'id':membership_id} ;
  var response = redmine.membershipDelete(membership_id,membership);

  //Logger.log('Category Id '+membership_id+' Deleted');
  return category_id;
 
}

function CreateTime_Entry(time_entry) {
  var num = 0;
                      
  var redmine = new Redmine();
  var response = redmine.time_entryCreate(time_entry['issue_id'],time_entry);

  if (response==null){
    Browser.msgBox("the time_entry is incorrect!"); 
  }else{ 
  var  num = redmine.translator.searchTag(response, 'id');
  
  }
  //Logger.log("Time entry Id: "+num);
  return num;
 
}

/*
  var time_entry = {'id':TIME_ENTRY_ID,
                        'project_id':PROJECT_ID,
                        'issue id':ISSUE_ID,
                        'activity_id': 8,
                        'user_id': USERNAME_ID,
                        'hours': 4,
                        'spent_on': DATE_VALUE
                        };
*/
function UpdateTime_Entry(time_entry_id,time_entry) {

  var redmine = new Redmine();
  var response = redmine.time_entryUpdate(time_entry_id,time_entry);

  //Logger.log('Time_entry Id '+time_entry_id+' Updated');
  return time_entry_id;
 
}

function DeleteTime_Entry(time_entry_id) {
  
  var redmine = new Redmine();
  var time_entry ={'id':time_entry_id} ;
  var response = redmine.time_entryDelete(time_entry_id,time_entry);

  //Logger.log('Time_entry Id '+time_entry_id+' Deleted');
  return time_entry_id;
 
}



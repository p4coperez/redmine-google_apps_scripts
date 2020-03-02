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
 

// CRUD Redmine API

function GetRedmineIdNumByIssueId(redmine_project_id,redmine_subject_name_id) {
 
  var vistazo = GetIssuesBySubject(redmine_project_id,redmine_subject_name_id);
  var issue_id = 0;
  var result = null;
  var first_value = false;
  
  if (vistazo!=null){
    
       //Logger.log(vistazo);
       // get only one result
       result = vistazo['id'];
      
  }
   
  if (result != null){
      issue_id =result.Text;
     // Logger.log(result.Text);
  }
  return issue_id;
 
}

function GetRedmineNameByIssueId(issue_id) {
  var redmine = new Redmine();
  var response = redmine.getIssue(issue_id);
  var redmine_name_id  = 0; 
  
  if (response!=null){
    redmine_name_id  = redmine.translator.searchTag(response, 'subject').Text;
  }
  return redmine_name_id;
}

function GetIssues(project_id) {
  var redmine = new Redmine();
  var response = redmine.getIssues(project_id);
  
  if (response==null){
    Browser.msgBox("the issues is incorrect!"); 
  }else{ 
  
    var issue=redmine.translator.searchTag(response, 'issue');
  }
  
  return issue;
}

function GetIssuesBySubject(project_id,subject_name_id) {
  
  var redmine = new Redmine();
  var response = redmine.getIssuesBySubject(project_id,subject_name_id);
  
  if (response==null){
    Browser.msgBox("the issues is incorrect!"); 
  }else{ 
     // get only one result
     var issue=redmine.translator.searchTag(response, 'issue');
    
  }
  
  return issue;
}

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
  if (response==null){
    Browser.msgBox("the project is incorrect!"); 
  }else{ 
     num = response['issue']['id'].Text
  }
  //Logger.log("Issue Updated Id: "+num);
  return num;
 
}

function DeleteIssues(issue_id) {
  var num= 0 ;
  var redmine = new Redmine();
  var issue ={'id':issue_id} ;
  var response = redmine.issueDelete(issue_id,issue);
  if (response==''){
     num = issue_id;
  }else{ 
     Browser.msgBox("the issue is incorrect!"); 
  }
  //Logger.log('Issue Id '+issue_id+' Deleted');
  return num;
 
}

function GetRedmineIdNumByProjectId(redmine_project_name_id) {
  var num = 0;
  var redmine = new Redmine();
  var response = redmine.getProject(redmine_project_name_id);

  if (response!=null){
    num  = redmine.translator.searchTag(response, 'id').Text;
  }
  return num;
}

function GetRedmineNameByProjectId(redmine_nombre_id) {
  var redmine = new Redmine();
  var response = redmine.getProject(redmine_nombre_id);
  var redmine_name_id  = 0; 
  
  if (response!=null){
    redmine_name_id  = redmine.translator.searchTag(response, 'name').Text;
  }
  return redmine_name_id;
}

function CreateProjects(project) {
  var num = 0;
  var redmine = new Redmine();
  var response = redmine.projectCreate(project);
 
  if (response==null){
    Browser.msgBox("the project is incorrect!"); 
  }else{ 
     num = redmine.translator.searchTag(response, 'id');
  
  }
  //Logger.log("Project Id: "+num);
  return num;
 
}

function UpdateProjects(project_id,project) {
  var num= 0 ;
  var redmine = new Redmine();
  var response = redmine.projectUpdate(project_id,project);
  if (response==null){
    Browser.msgBox("the project is incorrect!"); 
  }else{ 
     num = response['project']['id'].Text
  }
  //Logger.log("Project Updated Id: "+project_id);
  return num;
 
}

function DeleteProjects(project_id) {
  var num= 0 ;
  var project = {'id': project_id };
 
  var redmine = new Redmine();
  var response = redmine.projectDelete(project_id,project);

  if (response==''){
     num = project_id;
  }else{ 
     Browser.msgBox("the project is incorrect!"); 
  }
  //Logger.log('project Id '+project_id+' Deleted');
  return num;
}

function  GetRedmineIdNumByCategoryId(project_id,category_name) {

  
  var vistazo = GetCategories(project_id);
  var category_id  = 0; 
  var result = null;
  
  if (vistazo!=null){
   
    for (var i in vistazo) {
       //Logger.log(vistazo[i]);
       if (vistazo[i]['name'].Text == category_name){ //exist category_name
             result = vistazo[i]['id'];
            //Logger.log(vistazo[i]['id']);
       }   
    }
  }
   
  if (result != null){
      category_id =result.Text;
     // Logger.log(result.Text);
  }
      
  return category_id;
}

function GetCategories(project_id) {
  var redmine = new Redmine();
  var response = redmine.getCategories(project_id);
  
  if (response==null){
    Browser.msgBox("the issue_categories is incorrect!"); 
  }else{ 
  
    var categories=redmine.translator.searchTag(response, 'issue_category');
  //Logger.log(response);
  }
  
  return categories;
}

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

function UpdateCategory(category_id,issue_category) {
  var num= 0 ;
  var redmine = new Redmine();
  var response = redmine.categoryUpdate(category_id,issue_category);
  if (response==null){
    Browser.msgBox("the issue_category is incorrect!"); 
  }else{ 
     num = response['issue_category']['id'].Text
  }
  //Logger.log('Category Id '+category_id+' Updated');
  return num;
 
}

function DeleteCategory(category_id) {
  var num= 0 ;
  var redmine = new Redmine();
  var issue_category ={'id':category_id} ;
  var response = redmine.categoryDelete(category_id,issue_category);
  if (response==''){
     num = category_id;
  }else{ 
     Browser.msgBox("the issue_category is incorrect!"); 
  }
  //Logger.log('Category Id '+category_id+' Deleted');
  return num;
 
}

function  GetRedmineIdNumByMembershipId(project_id,user_id,rol_id) {

  var vistazo = GetMemberships(project_id);
  var membership_id  = 0; 
  var result = null;
  
  if (vistazo!=null){
   
    for (var i in vistazo) {
       
       if (vistazo[i]['user']['id'] == user_id && vistazo[i]['roles']['role']['id'] == rol_id){ //exist rol in user_id  
             result = vistazo[i]['id'];
       }
       //Logger.log(vistazo[i]['roles']['role']); 
       //Logger.log(vistazo[i]['id']);
        
    }
  }
   
  if (result != null){
      membership_id =result.Text;
     // Logger.log(result.Text);
  }
      
  return membership_id;
}

function GetMemberships(project_id) {
  var redmine = new Redmine();
  var response = redmine.getMemberships(project_id);
  
  if (response==null){
    Browser.msgBox("the issue_membership is incorrect!"); 
  }else{ 
  
    var memberships=redmine.translator.searchTag(response, 'membership');
  //Logger.log(response);
  }
  
  return memberships;
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
  //Logger.log("Membership Id: "+num);
  return num;
 
}

function UpdateMembership(membership_id,membership) {
  var num= 0 ;
  var redmine = new Redmine();
  var response = redmine.membershipUpdate(membership_id,membership);
  if (response==null){
    Browser.msgBox("the issue_membership is incorrect!"); 
  }else{ 
     num = response['membership']['id'].Text
  }
  //Logger.log('Membership Id '+membership_id+' Updated');
  return num;
 
}

function DeleteMembership(membership_id) {
  var num= 0 ;
  var redmine = new Redmine();
  var membership ={'id':membership_id} ;
  var response = redmine.membershipDelete(membership_id,membership);
  if (response==''){
     num = membership_id;
  }else{ 
     Browser.msgBox("the issue_membership is incorrect!"); 
  }
  //Logger.log('Membership Id '+membership_id+' Deleted');
  return num;
 
}

function  GetRedmineIdNumByTimeEntryId(issue_id,user_id,hours,spent_on) {

  
  var vistazo = GetTime_Entries(issue_id);
  var time_entry_id  = 0; 
  var result = null;
  
  if (vistazo!=null){
  
   // var vistazo=redmine.translator.searchTag(response, 'time_entries');

    for (var i in vistazo) {
       //Logger.log(vistazo[i]);
       //Search by user_id,hours,spent_on 
       if (vistazo[i]['user']['id'] == user_id && vistazo[i]['hours'].Text==hours && vistazo[i]['spent_on'].Text == spent_on ){
         result = vistazo[i]['id'];
           //Logger.log(vistazo[i]['id']);
       } 
    }
  }
   
  if (result != null){
      time_entry_id =result.Text;
     // Logger.log(result.Text);
  }
      
  return time_entry_id;
}

function GetTime_Entries(issue_id) {
  var redmine = new Redmine();
  var response = redmine.getTime_Entries(issue_id);
  
  if (response==null){
    Browser.msgBox("the issue_time_entry is incorrect!"); 
  }else{ 
  
    var time_entries=redmine.translator.searchTag(response, 'time_entry');
  //Logger.log(response);
  }
  
  return time_entries;
}



function CreateTime_Entry(time_entry) {
  var num = 0;                 
  var redmine = new Redmine();
  var response = redmine.time_entryCreate(time_entry['issue_id'],time_entry);

  if (response==null){
    Browser.msgBox("the time_entry is incorrect!"); 
  }else{ 
    num = redmine.translator.searchTag(response, 'id');
  }
  //Logger.log("Time entry Id: "+num);
  return num;
}

/*
  var time_entry = {'id':TIME_ENTRY_ID,
                        'project_id':PROJECT_ID,
                        'issue_id':ISSUE_ID,
                        'activity_id': ACTIVITY_ID,
                        'user_id': USERNAME_ID,
                        'hours': TIME_VALUE,
                        'spent_on': DATE_VALUE
                        };
*/

function UpdateTime_Entry(time_entry_id,time_entry) {
  var num= 0;
  var redmine = new Redmine();
  var response = redmine.time_entryUpdate(time_entry_id,time_entry);
  if (response==null){
    Browser.msgBox("the issue_time_entry is incorrect!"); 
  }else{ 
     
     num = response['time_entry']['id'].Text
  }
  //Logger.log('Time_entry Id '+time_entry_id+' Updated');
  return num;
 
}

function DeleteTime_Entry(time_entry_id) {
  var num= 0 ;
  var redmine = new Redmine();
  var time_entry ={'id':time_entry_id} ;
  var response = redmine.time_entryDelete(time_entry_id,time_entry);
  if (response==''){
     num = time_entry_id;
  }else{ 
     Browser.msgBox("the issue_version is incorrect!"); 
  }
  //Logger.log('Time_entry Id '+time_entry_id+' Deleted');
  return num;
 
}


function  GetRedmineIdNumByVersionId(project_id,redmine_version_name) {

  
  var vistazo = GetVersions(project_id);
  var redmine_version_id  = 0; 
  var result = null;
  
  if (vistazo!=null){
  
    for (var i in vistazo) {
       //Logger.log(vistazo[i]);
       if (vistazo[i]['name'].Text == redmine_version_name){
         result = vistazo[i]['id'];
           //Logger.log(vistazo[i]['id']);
       } 
    }
  }
   
  if (result != null){
      redmine_version_id =result.Text;
     // Logger.log(result.Text);
  }
      
  return redmine_version_id;
}

function GetVersions(project_id) {
 
  var redmine = new Redmine();
  var response = redmine.getVersions(project_id);
  
  if (response==null){
    Browser.msgBox("the issue_version is incorrect!"); 
  }else{ 
  
    var versions=redmine.translator.searchTag(response, 'version');
  //Logger.log(response);
  }
  
  return versions;
}

function CreateVersion(issue_version) {
  var num = 0;                  
  var redmine = new Redmine();
  var response = redmine.versionCreate(issue_version['project_id'],issue_version);

  if (response==null){
    Browser.msgBox("the issue_version is incorrect!"); 
  }else{ 
    num = redmine.translator.searchTag(response, 'id');
  }
  //Logger.log("version Id: "+num);
  return num;
}

/*
 var issue_version = {
                        //'id':VERSION_ID,
                        'project_id':PROJECT_ID,
                        'name': VERSION_NAME
                        };
*/

function UpdateVersion(version_id,issue_version) {
  var num= 0 ;
  var redmine = new Redmine();
  var response = redmine.versionUpdate(version_id,issue_version);
  if (response==null){
    Browser.msgBox("the issue_version is incorrect!"); 
  }else{ 
     num = response['version']['id'].Text
  }
  //Logger.log('version Id '+version_id+' Updated');
  return num;
 
}

function DeleteVersion(version_id) {
  var num= 0 ;
  var versions = {'id': version_id
                   //'project_id':PROJECT_ID,
                   //'name': VERSION_NAME
                  };
 
  var redmine = new Redmine();
  var response = redmine.versionDelete(version_id,versions);

  
  if (response==''){
     num = version_id;
  }else{ 
     Browser.msgBox("the issue_version is incorrect!"); 
  }
  //Logger.log('version Id '+version_id+' Deleted');
  return num;
}




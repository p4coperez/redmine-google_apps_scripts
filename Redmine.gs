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
  
  if (response==null){
    Browser.msgBox("ID Name project of Redmine is not found!"); 
  }
  else{
    redmine_num_id  = redmine.translator.searchTag(response, 'id').Text;
  }
  return redmine_num_id;
}

function GetRedmineIdCategoryByProjectId(redmine_nombre_id,redmine_nombre_category) {
  var redmine = new Redmine();
  var response = redmine.getCategory(redmine_nombre_id);
  var redmine_category_id  = 0; 
  
  if (response==null){
    Browser.msgBox("ID Name project of Redmine is not found!"); 
  }
  else{
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

//TODO CreateRedmineProject
function CreateRedmineProject(nombre_id) {
  var redmine = new Redmine();
  var project = redmine.getProject(nombre_id);
  // check if project is null
  Logger.log(project);
}


//TODO Create Issues
function CreateIssues() {
  
}


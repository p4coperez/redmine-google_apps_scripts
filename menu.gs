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

function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menu_entries = [{name: "Create Project", functionName: "CreateProject"},
                      {name: "Get ID Project", functionName: "UpdateRedmineIdNum"},
                      {name: "Get ID Category", functionName: "UpdateRedmineIdCategory"},
                      {name: "Add Issues", functionName: "AddIssues"}];
  ss.addMenu("Redmine", menu_entries);
}


//TODO CreateProject
function CreateProject () {
  Browser.msgBox("Create Project in Redmine");
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("NAME_SHEET");
  var redmine_name_id =  sheet.getRange("GET_VALUE_FROM_SHEET").getValues();
  
  CreateRedmineProject(redmine_name_id);
  
}



function UpdateRedmineIdNum () {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetalta = ss.getSheetByName("NAME_SHEET");
  var redmine_nombre_id =  sheetalta.getRange("GET_VALUE_FROM_SHEET").getValues();
  
  if(redmine_nombre_id =='') {
    Browser.msgBox("GET ID NAME REDMINE");
  }
  else
  {
  var data = [];
  //Logger.log(GetRedmineIdNumByProjectId(redmine_nombre_id));
  var text = [[GetRedmineIdNumByProjectId(redmine_nombre_id)]];
  data.push(text);
  var range = sheetalta.getRange("GET_VALUE_FROM_SHEET");
  range.setValues(data);
    if (text!=0){
      Browser.msgBox("GET ID NUM REDMINE");
    }
  }
  
}

function UpdateRedmineIdCategory () {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("NAME_SHEET");
  var redmine_nombre_id =  sheet.getRange("GET_VALUE_FROM_SHEET").getValues();
  var redmine_nombre_category = sheet.getRange("GET_VALUE_FROM_SHEET").getValues();
  if(redmine_nombre_id =='') {
    Browser.msgBox("GET ID NAME REDMINE");
  }
  else
  {
  var data = [];
  //Logger.log(GetRedmineIdCategoryByProjectId(redmine_nombre_id,redmine_nombre_category));
  var text = [[ GetRedmineIdCategoryByProjectId(redmine_nombre_id,redmine_nombre_category)]];
  data.push(text);
  var range = sheet.getRange("GET_VALUE_FROM_SHEET");
  range.setValues(data);
    if (text!=0){
      Browser.msgBox("GET CATEGORY VALUE");
    }
  }
  
}



// TODO AddIssues
function AddIssues () {
  Browser.msgBox("ADD ISSUES IN REDMINE");
}


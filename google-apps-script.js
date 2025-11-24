
/**
 * =========================================================
 * SMART STEP ACADEMY - BACKEND & ADMIN SYSTEM
 * =========================================================
 * 
 * INSTRUCTIONS:
 * 1. Paste this code into your Google Apps Script editor.
 * 2. Save (Ctrl+S).
 * 3. Click "Deploy" > "New Deployment" > Select "Web App".
 * 4. Configuration:
 *    - Description: "V2 with Validation"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 5. Click "Deploy".
 */

// --- CONFIGURATION ---
var SHEET_NAME = "Sheet1";
var ADMIN_PASSWORD = "Nida123"; 

// --- SETUP FUNCTION ---
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Smart Step Admin')
    .addItem('Setup Sheet', 'setupSheet')
    .addToUi();
}

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Headers
  var headers = ["Timestamp", "Student Name", "Grade", "Phone", "Message", "Source", "Status"];
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight("bold").setBackground("#00bfa6").setFontColor("white");
  sheet.setFrozenRows(1);
}

// --- MAIN API HANDLER (POST) ---
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    // Parse Data
    var rawData = e.postData.contents;
    var data;
    try {
      data = JSON.parse(rawData);
    } catch(err) {
      data = {};
    }

    var action = data.action || "submit"; 
    var response = {};
    
    // --- ACTION: SUBMIT FORM ---
    if (action === "submit") {
      // VALIDATION: Prevent empty entries
      var name = data.name ? data.name.toString().trim() : "";
      var phone = data.phone ? data.phone.toString().trim() : "";

      if (name === "" || phone === "") {
         response = { status: "error", message: "Name and Phone are required." };
      } else {
        var timestamp = new Date();
        sheet.appendRow([
          timestamp,
          name,
          data.grade || "",
          phone,
          data.message || "",
          data.source || "Website",
          "New"
        ]);
        response = { status: "success", message: "Data saved" };
      }
    }
    
    // --- ACTION: ADMIN LOGIN ---
    else if (action === "login") {
      if (data.password === ADMIN_PASSWORD) {
        response = { status: "success", message: "Authenticated" };
      } else {
        response = { status: "error", message: "Invalid Password" };
      }
    }
    
    // --- ACTION: GET LEADS (ADMIN) ---
    else if (action === "get_leads") {
      if (data.password === ADMIN_PASSWORD) {
        var rows = sheet.getDataRange().getValues();
        var headers = rows.shift(); // Remove headers
        
        // Convert to array of objects
        var leads = rows.map(function(row) {
          // Check if row is empty
          if(!row[0] && !row[1]) return null;

          return {
            timestamp: row[0],
            name: row[1],
            grade: row[2],
            phone: row[3],
            message: row[4],
            source: row[5],
            status: row[6]
          };
        })
        .filter(function(item) { return item !== null; }) // Remove nulls
        .reverse(); // Show newest first
        
        response = { status: "success", data: leads };
      } else {
        response = { status: "error", message: "Unauthorized" };
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}


/**
 * =========================================================
 * SMART STEP ACADEMY - BACKEND
 * =========================================================
 * 
 * INSTRUCTIONS:
 * 1. Paste this code into your Google Apps Script editor.
 * 2. Save (Ctrl+S).
 * 3. Click "Deploy" > "New Deployment" > Select "Web App".
 * 4. Configuration:
 *    - Description: "Public Form Backend"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 5. Click "Deploy".
 */

// --- CONFIGURATION ---
var SHEET_NAME = "Sheet1";

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
    } else {
      response = { status: "error", message: "Invalid action" };
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

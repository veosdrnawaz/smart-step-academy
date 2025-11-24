
/**
 * =========================================================
 * SMART STEP ACADEMY - BACKEND & ADMIN SYSTEM
 * =========================================================
 * 
 * INSTRUCTIONS:
 * 1. Paste this code into your Google Apps Script editor.
 * 2. Save (Ctrl+S).
 * 3. Click "Smart Step Admin" > "Setup Sheet" in the toolbar (refresh sheet if menu missing).
 * 4. Deploy > New Deployment > Web App > Access: "Anyone" > Deploy.
 * 5. Copy the URL and paste it into your website code (src/config.ts).
 */

// --- CONFIGURATION ---
var SHEET_NAME = "Sheet1";
var ADMIN_PASSWORD = "Nida123"; // Updated Password

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
    var data = JSON.parse(rawData);
    var action = data.action || "submit"; // 'submit', 'login', 'get_leads'
    
    var response = {};
    
    // --- ACTION: SUBMIT FORM ---
    if (action === "submit") {
      var timestamp = new Date();
      sheet.appendRow([
        timestamp,
        data.name || "",
        data.grade || "",
        data.phone || "",
        data.message || "",
        data.source || "Website",
        "New"
      ]);
      response = { status: "success", message: "Data saved" };
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
          return {
            timestamp: row[0],
            name: row[1],
            grade: row[2],
            phone: row[3],
            message: row[4],
            source: row[5],
            status: row[6]
          };
        }).reverse(); // Show newest first
        
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
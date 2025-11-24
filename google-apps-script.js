/**
 * =========================================================
 * SMART STEP ACADEMY - GOOGLE SHEETS BACKEND
 * =========================================================
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete any existing code and PASTE all the code below.
 * 4. Save the project (Ctrl+S).
 * 5. Refresh your Google Sheet tab.
 * 6. You will see a new menu "Smart Step Admin" in the toolbar (after Help).
 * 7. Click "Smart Step Admin" > "Setup Sheet Database" to automatically configure headers.
 * 8. To connect to website: Click "Deploy" > "New Deployment" > Type: "Web app" > Who has access: "Anyone" > Deploy.
 */

// CONFIGURATION
// Ensure the name inside the quotes matches your Google Sheet tab name exactly.
var SHEET_NAME = "Sheet1";

// 1. CREATE CUSTOM MENU
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Smart Step Admin')
      .addItem('Setup Sheet Database', 'setupSheet')
      .addToUi();
}

// 2. AUTOMATIC SHEET SETUP
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  const ui = SpreadsheetApp.getUi();
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  } else {
    // Check if sheet already has data to prevent accidental overwrite
    if (sheet.getLastRow() > 1) {
      const response = ui.alert(
        'Existing Data Detected', 
        'The sheet "' + SHEET_NAME + '" seems to have data. Initializing might mess up existing headers. Do you want to continue?', 
        ui.ButtonSet.YES_NO
      );
      if (response == ui.Button.NO) return;
    }
  }

  // Activate the sheet
  sheet.activate();

  // Define the Columns
  // Added "Source" to track if it came from the Admission Modal or Contact Form
  const headers = ["Timestamp", "Student Name", "Grade/Class", "Phone", "Message", "Source"];
  
  // Set Headers at Row 1
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  
  // Apply Styling
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#00bfa6"); // The website's primary teal color
  headerRange.setFontColor("#ffffff");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 40); // Make header row taller
  
  // Freeze Top Row so it stays visible while scrolling
  sheet.setFrozenRows(1);
  
  // Adjust Column Widths for better readability
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 150); // Name
  sheet.setColumnWidth(3, 100); // Grade
  sheet.setColumnWidth(4, 120); // Phone
  sheet.setColumnWidth(5, 300); // Message
  sheet.setColumnWidth(6, 120); // Source
  
  ui.alert('Success!', 'Sheet "' + SHEET_NAME + '" has been successfully configured.', ui.ButtonSet.OK);
}

// 3. HANDLE WEBSITE FORM SUBMISSIONS (POST)
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
       return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Sheet not found: ' + SHEET_NAME }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the data sent from the website
    // If e.postData is undefined, we handle it gracefully
    const data = e.postData ? JSON.parse(e.postData.contents) : {};
    
    const timestamp = new Date();
    const name = data.name || "N/A";
    const grade = data.grade || "N/A";
    const phone = data.phone || "N/A";
    const message = data.message || "N/A";
    // We default to 'Website Contact Form' if source isn't provided
    const source = data.source || "Website Contact Form"; 

    // Append the data
    sheet.appendRow([timestamp, name, grade, phone, message, source]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 4. TEST FUNCTION (GET)
function doGet(e) {
  return ContentService.createTextOutput("Smart Step Academy Backend is Online. Target Sheet: " + SHEET_NAME);
}
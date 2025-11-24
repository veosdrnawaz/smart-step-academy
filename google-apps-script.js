// =========================================================
// GOOGLE SHEETS BACKEND CODE
// =========================================================
// Instructions:
// 1. Create a new Google Sheet.
// 2. Go to Extensions > Apps Script.
// 3. Delete existing code and paste the code below.
// 4. Click "Deploy" > "New Deployment".
// 5. Select type: "Web app".
// 6. Set "Who has access" to "Anyone" (Critical step!).
// 7. Click "Deploy", copy the Web App URL.
// 8. Paste the URL into 'components/Contact.tsx' variable 'GOOGLE_SCRIPT_URL'.
// =========================================================

function doPost(e) {
  try {
    // Open the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if header row exists, if not create it
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Student Name", "Grade/Class", "Phone", "Message"]);
      // Style the header
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#00bfa6").setFontColor("white");
    }

    // Parse the data sent from the website
    var data = JSON.parse(e.postData.contents);
    
    // Get current time
    var timestamp = new Date();
    
    // Add the new row
    sheet.appendRow([
      timestamp, 
      data.name, 
      data.grade, 
      data.phone, 
      data.message
    ]);
    
    // Return success
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper function to test permission setup
function doGet(e) {
  return ContentService.createTextOutput("Backend is working! Use POST method to submit data.");
}
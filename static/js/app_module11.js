// import the data from data.js
//use const cause We don’t want the variable to be reassigned or reused at all in our program. 
const tableData = data;   

// Reference the HTML table using d3
//1. Declare a variable, tbody
//2.Use d3.select to tell JavaScript to look for the <tbody> tags in the HTML 
var tbody = d3.select("tbody");

// we need to clear the data first, 
// otherwise the data users search will already be filtered when they search again.
// tbody.html("");— use an empty string when creating the table/create a blank canvas
function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");
  
  // Next, loop through each object in the data, add an argument (dataRow) that will represent each row of the data as we iterate through the array.
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => { 
    // Append a row to the table body
    let row = tbody.append("tr"); //create a variable that will append a row to the table body, find the <tbody> tag within the HTML and add a table row ("tr")
    
    // Loop through each field in the dataRow and add
    // each value as a table cell (td)   
    Object.values(dataRow).forEach((val) => { //Object.values:to reference one object from the array of UFO sightings; add (dataRow) as the argument, let the values to go into the dataRow; forEach((val) to specify of one object per row.
      let cell = row.append("td"); //set up the action of appending data into a table data tag (<td>
      cell.text(val);   //the variable that holds only each value from the object.
      }
    );
  });
}

//11.5.3 Add Filters

function handleClick() {
  // Grab the datetime value from the filter
  let date = d3.select("#datetime").property("value"); //telling D3 to look for the #datetime id in the HTML tags, and grab that information and hold it in the "date" variable
  let filteredData = tableData; //set a default filter and save it to a new variable; By setting the filteredData variable to our raw data, we're basically using it as a blank slate. The function we're working on right now will be run each time the filter button is clicked on the website. If no date has been entered as a filter, then all of the data will be returned instead.
  
  // Check to see if a date was entered and filter the data using that date. 
  if (date) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.datetime === date); 
  };
  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData willjust be the original tableData.
  buildTable(filteredData);
}

// Attach an event to listen for the form button
//execute our handleClick() function when the button with an id of filter-btn is clicked
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads (Refresh the filter when table loads)
buildTable(tableData);
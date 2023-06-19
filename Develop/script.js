var parentEl = document.querySelector(".container-fluid");
var startHour = 9;
var endHour = 18;
var ampm = ["AM", "PM"];
var timeBlock = $("#hour .saveBtn").parent();
var textArea = timeBlock.find(".description");
var saveButton = document.getElementsByClassName("saveBtn");

var currentHour = dayjs().format("HH");
var currentDate = dayjs().format("MMMM DD YYYY");
$("#timer").text(currentDate);

timeBlockGenerator();
textAreaGenerator();

//this checks the current hour with the hour on the planner and adds color
//this also generates the div elements from 9am-5pm
function timeBlockGenerator() {
  //for loops goes from 9-18 to make 9 div elements
  for (let index = startHour; index < endHour; index++) {
    //this if loop adds class: present, and adds the correct meridiem
    if (currentHour == index) {
      if (index > 12) {
        var hourIndex = index - 12;
        var ampm = "PM";
      } else {
        hourIndex = index;
        ampm = "AM";
      }
      //this creates a new div element with the proper class and bootstrap elements
      var timeBlockEl = document.createElement("div");
      timeBlockEl.setAttribute("id", "hour-" + index);
      timeBlockEl.setAttribute("class", "row time-block present");
      var inHtml =
        `<div class="col-2 col-md-1 hour text-center py-3"> ` +
        hourIndex +
        ampm +
        ` </div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>`;
      timeBlockEl.innerHTML = inHtml;
      parentEl.appendChild(timeBlockEl);
    }
    //this if loop adds class: future, and adds the correct meridiem
    if (currentHour < index) {
      if (index > 12) {
        var hourIndex = index - 12;
        var ampm = "PM";
      } else {
        hourIndex = index;
        ampm = "AM";
      }
      //this creates a new div element with the proper class and bootstrap elements
      var timeBlockEl = document.createElement("div");
      timeBlockEl.setAttribute("id", "hour-" + index);
      timeBlockEl.setAttribute("class", "row time-block future");
      var inHtml =
        `<div class="col-2 col-md-1 hour text-center py-3"> ` +
        hourIndex +
        ampm +
        ` </div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>`;
      timeBlockEl.innerHTML = inHtml;
      parentEl.appendChild(timeBlockEl);
    }
    //this if loop adds class: past, and adds the correct meridiem
    if (currentHour > index) {
      if (index > 12) {
        var hourIndex = index - 12;
        var ampm = "PM";
      } else {
        hourIndex = index;
        ampm = "AM";
      }
      //this creates a new div element with the proper class and bootstrap elements
      var timeBlockEl = document.createElement("div");
      timeBlockEl.setAttribute("id", "hour-" + index);
      timeBlockEl.setAttribute("class", "row time-block past");
      var inHtml =
        `<div class="col-2 col-md-1 hour text-center py-3"> ` +
        hourIndex +
        ampm +
        ` </div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>`;
      timeBlockEl.innerHTML = inHtml;
      parentEl.appendChild(timeBlockEl);
    }
  }
}
//this function takes local storage items and fills in the text areas
function textAreaGenerator() {
  //for loop so that it goes through 9am-5pm
  for (let index = startHour; index < endHour; index++) {
    textArea = localStorage.getItem("hour-" + index);
    //grabs id of hour-index, and changes the text area of the textarea with the localstorage item
    $("#hour-" + index + " .description").text(textArea);
  }
}

//the save button function creates an hour key, with textArea as the value
$(".saveBtn").on("click", function () {
  var hour = $(this).parent().attr("id");
  var textArea = $(this).siblings(".description").val();
  localStorage.setItem(hour, textArea);
});

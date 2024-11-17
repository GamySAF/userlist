document.addEventListener("DOMContentLoaded", function () {
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const tasklist = document.getElementById("tasklist");
  const button = document.getElementById("button");

  // I used a Variable to keep track of the current task being edited
  let currentTask = null;

  button.addEventListener("click", function (event) {
    //preventing the default form submission
    event.preventDefault();
    const firstnamevalue = firstname.value.trim();
    const lastnamevalue = lastname.value.trim();
    const emailvalue = email.value.trim();

    //check if all forms are fullfilled
    if (firstnamevalue && lastnamevalue && emailvalue) {
      const fullname = document.createElement("span");
      fullname.classList.add("fullname");
      fullname.textContent = firstnamevalue + " " + lastnamevalue;

      //making sure if i'm updating existing task;
      if (currentTask) {
        currentTask.fullname.textContent = firstnamevalue + " " + lastnamevalue;
        currentTask.email.textContent = emailvalue;
        button.textContent = "Register";
        currentTask = null;
      } else {
        const emails = document.createElement("span");
        emails.classList.add("emails");
        emails.textContent = emailvalue;

        const edit = document.createElement("span");
        edit.classList.add("edit");
        edit.textContent = "Edit";

        const deleteaccount = document.createElement("span");
        deleteaccount.classList.add("deleteaccount");
        deleteaccount.textContent = "Delete";

        const taskContainer = document.createElement("div");
        taskContainer.classList.add("taskcontainer");
        taskContainer.appendChild(fullname);
        taskContainer.appendChild(emails);
        taskContainer.appendChild(edit);
        taskContainer.appendChild(deleteaccount);
        tasklist.appendChild(taskContainer);

        deleteaccount.addEventListener("click", function () {
          tasklist.removeChild(taskContainer);
        });

        edit.addEventListener("click", function () {
          const nameparts = fullname.textContent.split(" ");
          firstname.value = nameparts[0] || "";
          lastname.value = nameparts[1] || "";
          email.value = emails.textContent;

          //store the task for editing
          currentTask = {
            fullname: fullname,
            email: emails,
            taskContainer: taskContainer,
          };
          button.textContent = "save changes";
          button.addEventListener("click", function () {
            firstname.value = "";
            lastname.value = "";
            email.value = "";
          });
        });
        // Clear input fields after adding a new task

        firstname.value = "";
        lastname.value = "";
        email.value = "";
      }
    } else {
      alert("please fill all the forms");
    }
  });
});

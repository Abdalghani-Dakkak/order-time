// aside
let aside = document.getElementById("aside");
let navAndContainer = document.getElementById("navAndContainer");
let headingsOfLinks = Array.from(document.querySelectorAll(".effect"));
let asideLinks = Array.from(document.querySelectorAll("aside .dropdown-label"));
let dropdownOfAside = Array.from(document.querySelectorAll("aside .dropdown-label ~ ul"));
let searchInput = document.getElementById("searchInput");

let counter = 0;
let userId, postId;

function asideEffect() {
  if(counter % 2 === 0) {
    counter++;

    headingsOfLinks.forEach( e => {
      e.style.display = "none";
    });

    asideLinks.forEach( e => {
      e.removeAttribute("data-bs-toggle");
    });

    aside.style.cssText = "width:50px !important;";
    navAndContainer.style.cssText = "width:calc(100% - 50px) !important;";
  } else {
    counter++;

    setTimeout( _ => {
      headingsOfLinks.forEach( e => {
        e.style.display = "inline";
      });

      asideLinks.forEach( e => {
        e.setAttribute("data-bs-toggle", "dropdown");
      });
    },100)
    
    aside.style.cssText = "width:22% !important;";
    navAndContainer.style.cssText = "width:78% !important;";
  }
}

window.addEventListener("resize", _ => {
  if(document.body.clientWidth < 992) {
    headingsOfLinks.forEach( e => {
      e.style.display = "none";
    });

    asideLinks.forEach( e => {
      e.setAttribute("aria-expanded", "false")
    })

    dropdownOfAside.forEach( e => {
      e.classList.remove("show");
      setTimeout( _ => {
        e.removeAttribute("style");
      }, 0)
    });

    aside.classList.add("text-center");
    aside.style.cssText = "width:50px !important;";
    navAndContainer.style.cssText = "width:clac(100% - 50px) !important;";
  } else {
    setTimeout( _ => {
      headingsOfLinks.forEach( e => {
        e.style.display = "inline";
      });

      asideLinks.forEach( e => {
        e.setAttribute("data-bs-toggle", "dropdown");
      });
    },100)
    
    aside.classList.remove("text-center");
    aside.style.cssText = "width:22% !important;";
    navAndContainer.style.cssText = "width:78% !important;";
  }
});

if(document.body.clientWidth < 992) {
  aside.classList.add("text-center");
  asideLinks.forEach( e => {
    e.removeAttribute("data-bs-toggle");
  });
}


// add class active to the opened list

asideLinks.forEach( e => {
  e.addEventListener("click", () => {
    if(e.getAttribute("aria-expanded") === "true") {
      e.classList.add("aside-active");
    } else {
      e.classList.remove("aside-active");
    }
  });
});


// get the data from API by Fetch

const spinner = document.createElement("span");
spinner.classList.add("spinner", "rounded-circle");

async function getData(url) {
  let mainOfHome = document.querySelector("#mainOfHome");
  mainOfHome.appendChild(spinner);
  try {
    
    setLoading(true, spinner, mainOfHome);
    
    const response = await fetch(url);
    
    if(!response.ok) {
      throw new Error(response.status);
    }

    const data = response.json();

    setLoading(false, spinner, mainOfHome);

    data.then((myData) => {
      
      let table = document.createElement("table");
      table.classList.add("text-center", "mt-3", "mb-3");
      let trOfHeadings = document.createElement("tr");

      for(let key in myData[0]) {
        
        let th = document.createElement("th");
        th.classList.add("p-2", "fs-5", "fw-bolder", "text-capitalize");
        let heading = document.createTextNode(key);
        th.appendChild(heading);
        trOfHeadings.appendChild(th);

      }

      table.appendChild(trOfHeadings);

      for(let i=0; i < myData.length; i++) {
        
        let tr = document.createElement("tr");

        for(let j in myData[i]) {
        
          let td = document.createElement("td");
          td.classList.add("p-2", "fw-medium");
          let dataValue = document.createTextNode(myData[i][j]);
          td.appendChild(dataValue);
          tr.appendChild(td);

        }

        table.appendChild(tr);
        mainOfHome.appendChild(table);
      }

      
    }).then( _ => {
      userId = Array.from(document.querySelectorAll("table tr td:nth-child(1)"));
    });
    
  } catch (error) {
    
    setLoading(false, spinner, mainOfHome);

    mainOfHome.classList.add("justify-content-center", "align-items-center");

    const paragraph = document.createElement("p");
    paragraph.classList.add("error-message", "fs-2", "mb-5", "fw-bolder");
    const errorMessage = document.createTextNode(error);
    paragraph.appendChild(errorMessage);
    mainOfHome.appendChild(paragraph);

    const reResponse = document.createElement("button");
    reResponse.classList.add("rounded", "background-transparent", "p-3", "ps-4", "pe-4", "fs-4", "fw-medium", "reRespoense-btn");
    reResponse.append("Refresh");
    mainOfHome.appendChild(reResponse);

    reResponse.onclick = () => {
      getData("https://jsonplaceholder.typicode.com/todos");
      paragraph.remove();
      reResponse.remove();
    }
  }
}

function setLoading(isLoading, spanElement, main) {

  if(isLoading) {

    main.classList.add("justify-content-center", "align-items-center");
    spanElement.classList.add("d-block");
    spanElement.classList.remove("d-none");
    
  } else {
    
    main.classList.remove("justify-content-center", "align-items-center");
    spanElement.classList.add("d-none");
    spanElement.classList.remove("d-block");

  }
  
}

if(window.location.pathname.includes("/index.html")) {
  getData("https://jsonplaceholder.typicode.com/todos");
  
  searchInput.addEventListener("input", _ => {
    userId.forEach( e => {
      if(searchInput.value !== "") {
        e.parentNode.classList.add("d-none");
        if(e.textContent === searchInput.value) {
          e.parentNode.classList.remove("d-none");
        }
      } else {
        e.parentNode.classList.remove("d-none");
      }
    });
  })
}


// get the data from API 2 by JQuery

function getDataUsingJQuery(url) {

  let mainOfActivities = document.querySelector("#mainOfActivities");
  mainOfActivities.appendChild(spinner);

  setLoading(true, spinner, mainOfActivities);

  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function (data) {

      setLoading(false, spinner, mainOfActivities);
  
      // Process the data
      let table = document.createElement("table");
      table.classList.add("text-center", "mt-3", "mb-3");
      let trOfHeadings = document.createElement("tr");

      for(let key in data[0]) {
      
        let th = document.createElement("th");
        th.classList.add("p-2", "fs-5", "fw-bolder", "text-capitalize");
        let heading = document.createTextNode(key);
        th.appendChild(heading);
        trOfHeadings.appendChild(th);

      }

      table.appendChild(trOfHeadings);

      for(let i=0; i < data.length; i++) {
        
        let tr = document.createElement("tr");

        for(let j in data[i]) {
        
          let td = document.createElement("td");
          td.classList.add("p-2", "fw-medium");
          let dataValue = document.createTextNode(data[i][j]);
          td.appendChild(dataValue);
          tr.appendChild(td);

        }

        table.appendChild(tr);
        mainOfActivities.appendChild(table);
      }

      
    },
    error: function (xhr, status, error) {
      // Handle errors
      setLoading(false, spinner, mainOfActivities);

      
      mainOfActivities.classList.add("justify-content-center", "align-items-center");

      const paragraph = document.createElement("p");
      paragraph.classList.add("error-message", "fs-2", "mb-5", "fw-bolder", "text-capitalize");
      const errorMessage = document.createTextNode(`${status}: ${xhr.status}`);
      paragraph.appendChild(errorMessage);
      mainOfActivities.appendChild(paragraph);

      const reResponse = document.createElement("button");
      reResponse.classList.add("rounded", "background-transparent", "p-3", "ps-4", "pe-4", "fs-4", "fw-medium", "reRespoense-btn");
      reResponse.append("Refresh");
      mainOfActivities.appendChild(reResponse);

      reResponse.onclick = () => {
        getDataUsingJQuery("https://jsonplaceholder.typicode.com/comments");
        paragraph.remove();
        reResponse.remove();
      }
    }
  }).then( _ => {
    postId = Array.from(document.querySelectorAll("table tr td:nth-child(1)"));
  });
}

if(window.location.pathname.includes("/activities.html")) {
  getDataUsingJQuery('https://jsonplaceholder.typicode.com/comments');

  searchInput.addEventListener("input", _ => {
    postId.forEach( e => {
      if(searchInput.value !== "") {
        e.parentNode.classList.add("d-none");
        if(e.textContent === searchInput.value) {
          e.parentNode.classList.remove("d-none");
        }
      } else {
        e.parentNode.classList.remove("d-none");
      }
    });
  })
}
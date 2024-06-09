try {
  let userSelect = document.querySelector("#selectUser");
  let showUserDataBtn = document.querySelector("#showUserDataBtn");
  let userDetails = document.querySelector("#userDetails");

  const url = "https://jsonplaceholder.typicode.com/users";
  let usersData;

  // fetch(url)
  //   .then((response) => response.json())
  //   .then(data => {
  //     usersData = [...data];
  //     data.forEach((user) => {
  //       // console.log(user);
  //
  //       let element = document.createElement("option");
  //       element.value = user.id;
  //       element.innerText = user.name;
  //       userSelect.appendChild(element);
  //
  //     })
  //   })
  //   .then(()=>{
  //     showUserDataBtn.disabled = false;
  //   })
  // userSelect.addEventListener("change", e => {
  //   usersData.forEach((user)=>{
  //     if (user.id == userSelect.value){
  //       console.log(user);
  //       userDetails.innerHTML = `
  //          <h2>  ${user.name} </h2>
  //          <p>user-name : ${user.username}</p>
  //          <p>phone : ${user.phone}</p>
  //          <p>email : ${user.email}</p>
  //          <p>address : ${user.address.suite} - ${user.address.street} - ${user.address.city}</p>
  //          <p>website : ${user.website}</p>
  //       `
  //     }
  //   });
  // });

  /**--------------------------------------------------------------------------*/
  async function fetchUsersData() {
    let response = await fetch(url);
    usersData = await response.json();
  }

  /**--------------------------------------------------------------------------*/
  fetchUsersData().then(() => {
    usersData.forEach((user) => {
      // console.log(user);
      let element = document.createElement("option");
      element.value = user.id;
      element.innerText = user.name;
      userSelect.appendChild(element);
    })
  })
    .then(() => {
      showUserDataBtn.disabled = false;
    }).then(() => {
    userSelect.addEventListener("change", e => {
      usersData.forEach((user) => {
        if (user.id == userSelect.value) {
          console.log(user);
          userDetails.innerHTML = `
             <h2>  ${user.name} </h2>
             <p>user-name : ${user.username}</p>
             <p>phone : ${user.phone}</p>
             <p>email : ${user.email}</p>
             <p>address : ${user.address.suite} - ${user.address.street} - ${user.address.city}</p>
             <p>website : ${user.website}</p>
          `
        }
      });
    });
  })

  /**---------------------------------------------------------------*/

  const postUrl = "https://jsonplaceholder.typicode.com/posts";

  async function postData(url = "", data = {}) {

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  postData(postUrl, {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
  ).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });

  /**------------------------------------------------------------*/
  function showMessage(message, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        document.getElementById('message').innerText = message;
        resolve();
      }, delay);
    });
  }

  function showUserImage() {
    return new Promise(resolve => {
      const userImage = document.getElementById('user-image');
      userImage.style.display = 'block';
      resolve();
    });
  }
  function redirectToPage(url, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        window.location.assign(url);
        resolve();
      }, delay);
    });
  }
  showMessage('Welcome To Our Website :)', 3000)
    .then(() => showUserImage())
    .then(() => showMessage('Thank YOu :)', 3000))
    .then(() => redirectToPage('https://www.google.com', 3000));

} catch (e) {
  console.error(e);
}

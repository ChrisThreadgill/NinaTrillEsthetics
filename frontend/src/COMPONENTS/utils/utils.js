export const checkAvailableTimes = (appointments, schedule) => {
  let bookedTimes = [];
  let availableTimes = [...schedule];

  for (let i = 0; i < appointments.length; i++) {
    let currAPP = appointments[i];
    let hours = currAPP.hours;
    let startTime = currAPP.startTime;

    bookedTimes.push(Number(startTime));

    if (hours > 0.5) {
      var bookedSlots = Number(startTime);

      for (let i = 0.5; i < hours; i += 0.5) {
        bookedSlots += 0.5;
        bookedTimes.push(bookedSlots);
      }
    }
  }

  while (bookedTimes.length) {
    let currentBook = bookedTimes.pop();
    // console.log(availableTimes);
    if (availableTimes.includes(currentBook)) {
      for (let i = 0; i < availableTimes.length; i++) {
        if (availableTimes[i] === currentBook) {
          availableTimes.splice(i, 1);
        }
      }
    }
  }
  return availableTimes;
};

export const formatDate = (date) => {
  // console.log(date);
  // convert date from date picker to js string object
  const dateString = new String(date);
  //split by the space
  const dateArr = dateString.split(" ");
  // console.log(dateArr);

  //define the day,month, and year of client selection
  let day = dateArr[2];
  let year = dateArr[3];
  let month = dateArr[1];
  let weekDay = dateArr[0];

  //set selection to match db storage
  switch (month) {
    case "Jan":
      month = "1";
      break;
    case "Feb":
      month = "2";
      break;
    case "Mar":
      month = "3";
      break;
    case "Apr":
      month = "4";
      break;
    case "May":
      month = "5";
      break;
    case "Jun":
      month = "6";
      break;
    case "Jul":
      month = "7";
      break;
    case "Aug":
      month = "8";
      break;
    case "Sep":
      month = "9";
      break;
    case "Oct":
      month = "10";
      break;
    case "Nov":
      month = "11";
      break;
    case "Dec":
      month = "12";
      break;
  }
  let formattedDate = month + day + year;
  return { formattedDate, weekDay };
};

// export const bookAppointment = async (e) => {
//   e.preventDefault();
//   const appointment = {
//     date: selectedDate,
//     startTime: 12,
//     hours: 2,
//     employeeId: 1,
//     customerId: 3,
//     services: "1 2 3 4",
//   };
//   const newAppointment = await csrfFetch(`/api/appointments`, {
//     method: "POST",
//     body: JSON.stringify(appointment),
//   }).catch(async (res) => {
//     const data = await res.json();

//     console.log(data.errors);
//   });
//   // if (response.newAppointment) {
//   // }
// };

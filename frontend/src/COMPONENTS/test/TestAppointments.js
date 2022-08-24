// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DatePicker from "react-datepicker";
// import { csrfFetch } from "../../store/csrf";
// import * as appointmentsActions from "../../store/appointments";
// import { checkAvailableTimes, formatDate } from "../utils/utils";
// const moment = require("moment");

// function TestAppointments() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session);
//   const allAppointments = useSelector((state) => state.appointments);

//   const [startDate, setStartDate] = useState(new Date());
//   const [minHour, setMinHour] = useState(6);
//   const { formattedDate: todaysDate } = formatDate(new Date());
//   const [selectedDate, setSelectedDate] = useState(todaysDate);
//   const [selectedTime, setSelectedTime] = useState("");
//   const [weekDay, setWeekDay] = useState("");
//   const [currentAppointments, setCurrentAppointments] = useState([]);
//   const [trigger, setTrigger] = useState(false);

//   let schedule = [10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5];

//   const bookAppointment = async (e) => {
//     e.preventDefault();
//     const appointment = {
//       date: selectedDate,
//       startTime: 12,
//       hours: 2,
//       employeeId: 1,
//       customerId: 3,
//       services: "1 2 3 4",
//     };
//     const newAppointment = await csrfFetch(`/api/appointments`, {
//       method: "POST",
//       body: JSON.stringify(appointment),
//     }).catch(async (res) => {
//       const data = await res.json();
//     });
//     // if (response.newAppointment) {
//     // }
//   };
//   useEffect(() => {
//     if (allAppointments.length) {
//       const currentAppointments = allAppointments?.filter(
//         (appointment) => appointment.date == selectedDate && appointment.employeeId == 2
//       );

//       setCurrentAppointments(checkAvailableTimes(currentAppointments, schedule));
//     }
//   }, [selectedDate]);

//   useEffect(() => {
//     //setting date to today's formatted date on component mount
//     const { formattedDate } = formatDate(new Date());
//     dispatch(appointmentsActions.getAllAppointments());
//     return () => {
//       const { formattedDate } = formatDate(new Date());
//       setSelectedDate(formattedDate);
//     };
//   }, [dispatch]);
//   return (
//     <div>
//       <DatePicker
//         onChange={(date) => {
//           const { formattedDate, weekDay } = formatDate(date);
//           setSelectedDate(formattedDate);
//           setWeekDay(weekDay);
//           setStartDate(date);
//           setSelectedTime("");
//         }}
//         dateFormat="MMMM d, yyyy h:mm aa"
//         inline
//       />
//       {currentAppointments.map((timeSlot, idx) => {
//         {
//           timeSlot % 1 === 0 ? (timeSlot = timeSlot) : (timeSlot = `${timeSlot}:30`);
//         }
//         return (
//           <li
//             key={idx}
//             onClick={
//               () => {
//                 if (typeof timeSlot === "string") {
//                   const decimalTime = timeSlot.split(":")[0];

//                   setSelectedTime(Number(decimalTime));
//                 } else {
//                   setSelectedTime(timeSlot);
//                 }
//               }
//               // setSelectedTime()
//             }
//           >
//             {moment(timeSlot, "HH:mm").format("hh:mm A")}
//           </li>
//         );
//       })}
//       <form onSubmit={(e) => bookAppointment(e)}>
//         <button>NEW APPOINTMENT</button>
//       </form>
//     </div>
//   );
// }

// export default TestAppointments;

// 20220429025510 - create - boat;

// ("use strict");
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable("Boats", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       userId: {
//         allowNull: false,
//         type: Sequelize.INTEGER,
//         references: { model: "Users" },
//       },
//       marina: {
//         allowNull: false,
//         type: Sequelize.STRING(75),
//       },
//       city: {
//         allowNull: false,
//         type: Sequelize.STRING(50),
//       },
//       state: {
//         allowNull: false,
//         type: Sequelize.STRING(2),
//       },
//       year: {
//         allowNull: false,
//         type: Sequelize.INTEGER,
//       },
//       model: {
//         allowNull: false,
//         type: Sequelize.STRING(100),
//       },
//       accessories: {
//         type: Sequelize.STRING,
//       },
//       captain: {
//         type: Sequelize.BOOLEAN,
//       },
//       price: {
//         allowNull: false,
//         type: Sequelize.INTEGER,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.fn("now"),
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.fn("now"),
//       },
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable("Boats");
//   },
// };

// ("use strict");
// module.exports = (sequelize, DataTypes) => {
//   const Boat = sequelize.define(
//     "Boat",
//     {
//       userId: DataTypes.INTEGER,
//       marina: DataTypes.STRING,
//       city: DataTypes.STRING,
//       state: DataTypes.STRING,
//       year: DataTypes.INTEGER,
//       model: DataTypes.STRING,
//       accessories: DataTypes.STRING,
//       captain: DataTypes.BOOLEAN,
//       price: DataTypes.INTEGER,
//     },
//     {}
//   );
//   Boat.associate = function (models) {
//     // associations can be defined here
//     Boat.hasMany(models.Booking, { foreignKey: "boatId", onDelete: "CASCADE", hooks: true });
//     Boat.belongsTo(models.User, { foreignKey: "userId" });
//     Boat.hasMany(models.Image, { foreignKey: "boatId", onDelete: "CASCADE", hooks: true });
//     Boat.hasMany(models.BoatReview, { foreignKey: "boatId", onDelete: "CASCADE", hooks: true });
//     Boat.hasMany(models.BoatRating, { foreignKey: "boatId", onDelete: "CASCADE", hooks: true });
//   };
//   return Boat;
// };

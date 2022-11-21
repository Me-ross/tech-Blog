module.exports = {
  // helper method 'format_time" takes in a timestamp and return a string with only time.
    format_time: (date) => {
      // toLocalTimeString() method formats the time as H:MM:SS AM/PM
      return date.toLocaleTimeString();
    },
    // The custom helper 'format_date' takes in a timestamp
    format_date: (date) => {
      // Using JavaScript Date methods, we get and format the month, date, and year
      // We need to add one to the month since it is returned as a zero-based value
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()
      }`;
    },
  };
  
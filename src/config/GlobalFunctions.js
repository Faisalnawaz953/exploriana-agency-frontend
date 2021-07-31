export const handleEditPopUp = (editRef, index, array) => {
  if (editRef.current[index].style.display === "block") {
    editRef.current[index].style.display = "none";
  } else {
    editRef.current[index].style.display = "block";

    array.forEach((link, i) => {
      if (index !== i) {
        editRef.current[i].style.display = "none";
      }
    });
  }
};

export const getDaysDifference = date => {
  let date1 = new Date(date);
  let date2 = new Date();

  // To calculate the time difference of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Math.trunc(Difference_In_Days);
};
export const formatDate = date => {
  date = new Date(date);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let d =
    (day < 10 ? "0" + day : day) +
    "." +
    (month < 10 ? "0" + month : month) +
    "." +
    year.toString().substr(-2);

  return d;
};

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

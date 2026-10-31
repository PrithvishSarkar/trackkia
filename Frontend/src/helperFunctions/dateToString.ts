const dateToString = (date: string) => {
  const dateStr = new Date(date)
    .toLocaleDateString("en-IN")
    .split("/")
    .reverse()
    .map((ele, index) => (index === 0 ? ele : ele.padStart(2, "0")))
    .join("-");
  return dateStr;
};

export default dateToString;

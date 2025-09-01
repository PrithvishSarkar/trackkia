const dateToString = (date: string) => {
  const dateStr = new Date(date)
    .toLocaleDateString("en-IN")
    .split("/")
    .reverse()
    .map((ele, index) => {
      if (index === 0) return ele;
      else return ele.padStart(2, "0");
    })
    .join("-");
  return dateStr;
};

export default dateToString;
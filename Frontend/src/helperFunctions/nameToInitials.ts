const nameToInitials = (name: string) => {
  const nameArray: string[] = name.split(" ");
  let initials: string = "";
  if (nameArray.length === 1) initials = nameArray[0][0].toUpperCase();
  else initials = (nameArray[0][0] + nameArray[1][0]).toUpperCase();
  return initials;
};

export default nameToInitials;

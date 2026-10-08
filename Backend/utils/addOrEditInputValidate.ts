const addOrEditInputValidate = (
  userId: number,
  title: string,
  description: string,
  priority: "Low Priority" | "Medium Priority" | "High Priority",
  startingDate: Date,
  deadline: Date,
): boolean => {
  const condition1 =
    title === undefined || (title !== undefined && !title.trim());
  const condition2 =
    description === undefined ||
    (description !== undefined && !description.trim());
  const condition3 =
    priority === undefined || (priority !== undefined && !priority.trim());
  const condition4 = startingDate > deadline;

  if (
    userId === undefined ||
    condition1 ||
    condition2 ||
    condition3 ||
    condition4
  )
    return false;

  return true;
};

export default addOrEditInputValidate;

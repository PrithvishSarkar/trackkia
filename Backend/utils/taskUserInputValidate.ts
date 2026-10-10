export interface ReturnType {
  isValid: boolean;
  errorText: string;
}

const taskUserInputValidate = (
  userId: number,
  title: string,
  description: string,
  priority: "Low Priority" | "Medium Priority" | "High Priority",
  startingDate: string,
  deadline: string,
): ReturnType => {
  // User ID is undefined or not a number.
  const userIdInvalidCondition: boolean = userId === undefined || isNaN(userId);
  if (userIdInvalidCondition)
    return { isValid: false, errorText: "Invalid User ID Format" };

  // Title is undefined or empty or overflowing.
  const titleInvalidCondition: boolean =
    title === undefined ||
    (title !== undefined && !title.trim()) ||
    title.length > 50;
  if (titleInvalidCondition)
    return { isValid: false, errorText: "Invalid Title Text" };

  // Description is undefined or empty or overflowing.
  const descriptionInvalidCondition: boolean =
    description === undefined ||
    (description !== undefined && !description.trim()) ||
    description.length > 100;
  if (descriptionInvalidCondition)
    return { isValid: false, errorText: "Invalid Description Text" };

  // Priority is undefined or empty.
  const priorityInvalidCondition: boolean =
    priority === undefined || (priority !== undefined && !priority.trim());
  if (priorityInvalidCondition)
    return { isValid: false, errorText: "Invalid Priority Text" };

  // Starting date format is invalid.
  const startingDateInvalidCondition: boolean = isNaN(
    new Date(startingDate).getTime(),
  );
  if (startingDateInvalidCondition)
    return { isValid: false, errorText: "Invalid Starting Date Format" };

  // Deadline date format is invalid.
  const deadlineInvalidCondition: boolean = isNaN(new Date(deadline).getTime());
  if (deadlineInvalidCondition)
    return { isValid: false, errorText: "Invalid Deadline Date Format" };

  // Starting date exceeds deadline.
  const dateInvalidCondition: boolean =
    new Date(startingDate) > new Date(deadline);
  if (dateInvalidCondition)
    return {
      isValid: false,
      errorText: "Invalid Chronology - Starting Date Exceeds Deadline",
    };

  return { isValid: true, errorText: "" };
};

export default taskUserInputValidate;

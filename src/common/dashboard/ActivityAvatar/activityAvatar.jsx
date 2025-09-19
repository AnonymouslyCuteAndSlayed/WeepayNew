export function getDepartmentAvatar(department) {
  const mappings = {
    "Finance": { letter: "F", className: "activity-avatar-finance" },
    "Admin": { letter: "A", className: "activity-avatar-admin" },
    "Project Manager": { letter: "P", className: "activity-avatar-pm" },
    "IT": { letter: "I", className: "activity-avatar-it" },
  };
  return mappings[department] || { letter: department ? department[0].toUpperCase() : "?", className: "activity-avatar-default" };
}

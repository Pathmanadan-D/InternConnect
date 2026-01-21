export function calculateProfileCompletion(user) {
  if (!user) return 0;

  const requiredFields = [
    user.name,
    user.email,
    user.course,
    user.year,
    user.phone,
    user.location,
    user.about,
    user.skills && user.skills.length > 0,
    user.resume,
  ];

  const filled = requiredFields.filter(Boolean).length;
  const total = requiredFields.length;

  return Math.round((filled / total) * 100);
}

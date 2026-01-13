export function calculateProfileCompletion(user) {
    let completion = 40; // base (name + email)
  
    if (user.resume) completion += 20;
  
    const fields = [
      user.phone,
      user.location,
      user.education,
      user.skills,
    ];
  
    const filledCount = fields.filter(Boolean).length;
    completion += filledCount * 10;
  
    return Math.min(completion, 100);
  }
  
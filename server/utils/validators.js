export const validateIdea = ({ title, description, category, impact, resources }) => {
  if (!title || title.trim().length < 3) {
    return 'Title must be at least 3 characters long';
  }
  
  if (!description || description.trim().length < 10) {
    return 'Description must be at least 10 characters long';
  }
  
  if (!category) {
    return 'Category is required';
  }
  
  if (!impact || impact.trim().length < 10) {
    return 'Impact description must be at least 10 characters long';
  }
  
  if (!resources || resources.trim().length < 10) {
    return 'Resources description must be at least 10 characters long';
  }
  
  return null;
};
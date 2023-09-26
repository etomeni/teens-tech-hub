// remove Special Characters And Replace Spaces
export function sanitizedString(text: string) {
    // Use a regular expression to match special characters and spaces
    const regex = /[^a-zA-Z0-9\s]/g;
  
    // Replace special characters with an empty string and spaces with hyphens
    const sanitizedString = text.replace(regex, '').replace(/\s+/g, '-');
  
    return sanitizedString;
}

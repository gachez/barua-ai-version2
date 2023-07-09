export function separateEmails(emailString) {
    // Define the regular expression pattern to match each email
    const pattern = /Email \d+\s+Subject:.*?Message:.*?(?=\n\n\s+Email \d+|$)/gs;
    
    // Use the regular expression pattern to extract emails from the string
    const emails = emailString.match(pattern);
  
    return emails;
}
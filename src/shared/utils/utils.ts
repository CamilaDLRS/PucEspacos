import { Regexs } from "./regexs";

export class Utils {

  static validateEmailDomain(email: string, allowedDomains: string[]): boolean {
    if (!Regexs.email.test(email)) {
      return false;
    }

    // Extract the domain from the email
    const [, domain] = email.split('@');

    // Check if the domain is in the allowed domains array
    return allowedDomains.includes(domain);
  }

  static removeSpecialCharacters(string: string) {
    return string.replace(/[^a-zA-Z0-9 ]/g, "");
  }
}

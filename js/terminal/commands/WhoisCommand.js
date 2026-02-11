import { Command } from "./Command.js";
import { getStudentData } from "../../Fdnd.js";

export class WhoisCommand extends Command {
  constructor() {
    super(
      "whois",
      "[int]",
      "Fetches and displays personal data of a student by id",
      "Fetches and displays personal data of a student by id",
    );
  }

  async execute(...args) {
    if (!this.isValidNumber(args)) {
      return [`whois expects 1 numeric parameter, but received ${args.length}`];
    }

    try {
      const data = await getStudentData(args[0]);
      if (!data) return ["Failed to fetch personal data."];

      const lines = [];

      if (data.name) lines.push("Naam:       " + data.name);
      if (data.nickname) lines.push("Bijnaam:    " + data.nickname);
      if (data.birthdate)
        lines.push("Verjaardag: " + this.formatDate(data.birthdate));
      if (data.github_handle) lines.push("GitHub:     " + data.github_handle);
      if (data.website) lines.push("Website:    " + data.website);
      if (data.bio) lines.push("Bio:        " + data.bio);
      return lines;
    } catch (e) {
      console.error(e);
      return ["Failed to fetch personal data."];
    }
  }

  isValidNumber(args) {
    if (args.length !== 1 || !args[0]) return false;

    const n = Number(args);
    return Number.isInteger(n);
  }

  formatDate(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}

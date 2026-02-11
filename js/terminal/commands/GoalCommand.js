import { Command } from "./Command.js";

export class GoalCommand extends Command {
  goalsMap = {
    0: "Tijdens mijn major komt het menselijke aspect van software ontwikkeling weinig aan bod. Ik wil tijdens de minor leren om een website te ontwerpen die gebruiksvriendelijk is en principes die hieraan ten grondslag liggen beter begrijpen.",
    1: "Ik wil leren meer te itereren over mijn werk en minder tijd te spenderen aan kleine details verbeteren. Ik wil dus minder gericht zijn op een groot en ambitieus doel, en me meer richten op kleine prototypes maken en deze uitbreiden tot een steeds complexer geheel.",
    2: "Ik verwacht relatief snel vaardiger te worden in JavaScript. Ik hoop echter tijdens de minor vooral stappen te zetten met HTML en in het bijzonder CSS. Concreet zou ik het heel leuk vinden als ik aan het einde van de minor mooie en effectieve microinteracties met animaties te kunnen maken.",
  };

  constructor() {
    super(
      "goal",
      "[id]",
      "Get information about one of my minor goals",
      "Get information about one of my minor goals by id (0, 1 or 2)",
    );
  }

  async execute(...args) {
    if (!this.isValidGoal(args)) {
      return [
        "Invalid goal id.",
        "Try one of:",
        ...Object.keys(this.goalsMap).map((id) => `- ${id}`),
      ];
    }

    const id = args[0];
    return [this.goalsMap[id]];
  }

  isValidGoal(args) {
    if (args.length !== 1) return false;

    const n = Number(args[0]);
    if (!Number.isInteger(n)) return false;

    return Object.keys(this.goalsMap).includes(String(n));
  }
}

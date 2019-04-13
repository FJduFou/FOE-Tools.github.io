import gbs from "../../../../lib/foe-data/gbs";
import GbProcess from "../../../../lib/foe-compute-process/gb-investment";
import * as Errors from "../../../../scripts/errors";

describe("FoeGbInvestment", () => {
  describe("ComputeLevelInvestment", () => {
    const funcName =
      "ComputeLevelInvestment(levelCost, currentDeposits, yourParticipation, otherParticipation, " +
      "yourArcBonus, fpTargetReward)";

    test("Valid value", () => {
      const result = GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], gbs.agesCost.BronzeAge);

      expect(result).toMatchSnapshot();
    });

    test("Valid value with empty investor array", () => {
      const result = GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], gbs.agesCost.BronzeAge, []);

      expect(result).toMatchSnapshot();
    });

    test("Valid value with extra investors (2 snip for P1 and P2)", () => {
      const extraInvestors = [{ value: 1069, isPotentialSniper: false }, { value: 537, isPotentialSniper: false }];
      const result = GbProcess.ComputeLevelInvestment(42, [90, 90, 90, 90, 90], gbs.agesCost.TheFuture, extraInvestors);

      expect(result).toMatchSnapshot();
    });

    test("Valid value with extra investors", () => {
      const extraInvestors = [
        { value: 1, isPotentialSniper: false },
        { value: 75, isPotentialSniper: false },
        { value: 1, isPotentialSniper: false }
      ];
      const result = GbProcess.ComputeLevelInvestment(
        56,
        [90, 90, 90, 90, 90],
        gbs.agesCost.PostmodernEra,
        extraInvestors
      );

      expect(result).toMatchSnapshot();
    });

    test("Valid value with investor that secure place", () => {
      const extraInvestors = [{ value: 500, isPotentialSniper: false }];
      const result = GbProcess.ComputeLevelInvestment(
        18,
        [90, 90, 90, 90, 90],
        gbs.agesCost.PostmodernEra,
        extraInvestors
      );

      expect(result).toMatchSnapshot();
    });

    test("Valid value with investor that secure place with P1 780 instead of 181 and P3 10 instead of 29", () => {
      const extraInvestors = [{ value: 780, isPotentialSniper: false }, { value: 10, isPotentialSniper: false }];
      const result = GbProcess.ComputeLevelInvestment(
        10,
        [90, 90, 90, 90, 90],
        gbs.agesCost.PostmodernEra,
        extraInvestors
      );
      expect(result).toMatchSnapshot();
    });

    test(
      "Valid value for PostmodernEra 20 -> 21 with owner preparation (276) and investors: P1 447, " +
        "P2 228 and P4 63 instead of 19",
      () => {
        const extraInvestors = [
          { value: 447, isPotentialSniper: false },
          { value: 228, isPotentialSniper: false },
          { value: 63, isPotentialSniper: false }
        ];
        const result = GbProcess.ComputeLevelInvestment(
          21,
          [90, 90, 90, 90, 90],
          gbs.agesCost.PostmodernEra,
          extraInvestors,
          276
        );
        expect(result).toMatchSnapshot();
      }
    );

    test("Valid value with owner that secure place and snipe on P1", () => {
      const extraInvestors = [{ value: 549, isPotentialSniper: false }];
      const result = GbProcess.ComputeLevelInvestment(
        24,
        [90, 90, 90, 90, 90],
        gbs.agesCost.TheFuture,
        extraInvestors,
        273
      );

      expect(result).toMatchSnapshot();
    });

    test("Valid value with many investors", () => {
      const deepCopy = JSON.parse(JSON.stringify(gbs.agesCost.BronzeAge));
      const extraInvestors = [
        { value: deepCopy[0].cost - 7, isPotentialSniper: false },
        { value: 2, isPotentialSniper: false },
        { value: 1, isPotentialSniper: false },
        { value: 1, isPotentialSniper: false },
        { value: 1, isPotentialSniper: false },
        { value: 1, isPotentialSniper: false },
        { value: 1, isPotentialSniper: false }
      ];
      const result = GbProcess.ComputeLevelInvestment(
        1,
        [90, 90, 90, 90, 90],
        gbs.agesCost.TheFuture,
        extraInvestors,
        0
      );

      expect(result).toMatchSnapshot();
    });

    test("Valid value with Cap 9 -> 10, extra investors", () => {
      const extraInvestors = [
        { value: 170, isPotentialSniper: false },
        { value: 95, isPotentialSniper: false },
        { value: 70, isPotentialSniper: false },
        { value: 2, isPotentialSniper: false },
        { value: 1, isPotentialSniper: false },
        { value: 1, isPotentialSniper: false },
        { value: 1, isPotentialSniper: false }
      ];
      const result = GbProcess.ComputeLevelInvestment(
        10,
        [90, 90, 90, 90, 90],
        gbs.agesCost.PostmodernEra,
        extraInvestors,
        0
      );

      expect(result).toMatchSnapshot();
    });

    test("Valid value with Cap 26 -> 27, owner start to secure", () => {
      const extraInvestors = [];
      const result = GbProcess.ComputeLevelInvestment(
        27,
        [90, 90, 90, 90, 90],
        gbs.agesCost.PostmodernEra,
        extraInvestors,
        77
      );

      expect(result).toMatchSnapshot();
    });

    test("Valid value with Arc 36 -> 37, with one investor", () => {
      const extraInvestors = [{ value: 972, isPotentialSniper: false }];
      const result = GbProcess.ComputeLevelInvestment(
        37,
        [80, 80, 80, 80, 80],
        gbs.agesCost.TheFuture,
        extraInvestors,
        0,
        90
      );

      expect(result).toMatchSnapshot();
    });

    test("Valid value with Château Frontenac level 85 → 86, with two investor at 100 PFs", () => {
      const extraInvestors = [{ value: 100, isPotentialSniper: false }, { value: 100, isPotentialSniper: false }];
      const result = GbProcess.ComputeLevelInvestment(
        86,
        [80, 80, 80, 80, 80],
        gbs.agesCost.ProgressiveEra,
        extraInvestors,
        600,
        90
      );

      expect(result).toMatchSnapshot();
    });

    test("Throw error when invalid type for currentLevel", () => {
      expect(() => GbProcess.ComputeLevelInvestment("a", [0, 0, 0, 0, 0], gbs.agesCost.BronzeAge, [])).toThrow(
        new Errors.InvalidTypeError({
          expected: "number",
          actual: {
            value: "string",
            lowerBound: "number",
            upperBound: "number"
          }
        })
      );
    });

    test("Throw error when invalid value for currentLevel", () => {
      expect(() => GbProcess.ComputeLevelInvestment(0, [0, 0, 0, 0, 0], gbs.agesCost.BronzeAge, [])).toThrow(
        new Errors.NotInBoundsError({
          value: 0,
          lowerBound: 1,
          upperBound: gbs.agesCost.BronzeAge.length,
          additionalMessage: `for parameter "currentLevel" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for investorPercentage", () => {
      expect(() => GbProcess.ComputeLevelInvestment(10, "a", gbs.agesCost.BronzeAge, [])).toThrow(
        new Errors.InvalidTypeError({
          expected: "Array",
          actual: "string",
          additionalMessage: `for parameter "investorPercentage" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for gb", () => {
      expect(() => GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], "a", [])).toThrow(
        new Errors.InvalidTypeError({
          expected: "Array",
          actual: "string",
          additionalMessage: `for parameter "gb" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for defaultParticipation", () => {
      expect(() => GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], gbs.agesCost.BronzeAge, "a")).toThrow(
        new Errors.InvalidTypeError({
          expected: "Array",
          actual: "string",
          additionalMessage: `for parameter "defaultParticipation" of ${funcName}`
        })
      );
    });

    test("Throw error when key gb[3].cost are not found", () => {
      const deepCopy = JSON.parse(JSON.stringify(gbs.agesCost.BronzeAge));
      delete deepCopy[3].cost;
      expect(() => GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], deepCopy, [])).toThrow(
        new Errors.KeyNotFoundError({
          expected: "cost",
          actual: "gb[3]",
          additionalMessage: `in "checkGbData" called by ${funcName}`
        })
      );
    });

    test("Throw error when key gb[3].reward are not found", () => {
      const deepCopy = JSON.parse(JSON.stringify(gbs.agesCost.BronzeAge));
      delete deepCopy[3].reward;
      expect(() => GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], deepCopy, [])).toThrow(
        new Errors.KeyNotFoundError({
          expected: "reward",
          actual: "gb[3]",
          additionalMessage: `in "checkGbData" called by ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for gb[3]", () => {
      const deepCopy = JSON.parse(JSON.stringify(gbs.agesCost.BronzeAge));
      deepCopy[3].cost = "a";
      expect(() => GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], deepCopy, [])).toThrow(
        new Errors.InvalidTypeError({
          expected: "number",
          actual: "string",
          additionalMessage: `for parameter "gb[3].cost" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid value for gb[3]", () => {
      const deepCopy = JSON.parse(JSON.stringify(gbs.agesCost.BronzeAge));
      deepCopy[3].cost = -1;
      expect(() => GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], deepCopy, [])).toThrow(
        new Errors.BoundExceededError({
          type: Errors.AvailableBoundTypes["<"],
          value: -1,
          boundValue: 0,
          additionalMessage: `for parameter "gb[3].cost" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for gb[3].reward", () => {
      const deepCopy = JSON.parse(JSON.stringify(gbs.agesCost.BronzeAge));
      deepCopy[3].reward = "a";
      expect(() => GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], deepCopy, [])).toThrow(
        new Errors.InvalidTypeError({
          expected: "Array",
          actual: "string",
          additionalMessage: `for parameter "gb[3].reward" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for gb[3].reward[1]", () => {
      const deepCopy = JSON.parse(JSON.stringify(gbs.agesCost.BronzeAge));
      deepCopy[3].reward[1] = "a";
      expect(() => GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], deepCopy, [])).toThrow(
        new Errors.InvalidTypeError({
          expected: "number",
          actual: "string",
          additionalMessage: `for parameter "gb[3].reward[1]" of ${funcName}`
        })
      );
    });

    test("Throw error when sum of investment > level cost", () => {
      const deepCopy = JSON.parse(JSON.stringify(gbs.agesCost.BronzeAge));
      expect(() =>
        GbProcess.ComputeLevelInvestment(10, [0, 0, 0, 0, 0], deepCopy, [
          { value: deepCopy[9].cost, isPotentialSniper: false },
          { value: 1, isPotentialSniper: false },
          { value: 1, isPotentialSniper: false }
        ])
      ).toThrow(
        new Errors.BoundExceededError({
          type: Errors.AvailableBoundTypes[">"],
          value: deepCopy[9].cost + 2,
          boundValue: deepCopy[9].cost,
          additionalMessage: 'for the sum of values of parameter "defaultParticipation" of ' + funcName
        })
      );
    });

    test("Throw error when participationSum + ownerPreparation > level cost", () => {
      const deepCopy = JSON.parse(JSON.stringify(gbs.agesCost.BronzeAge));
      expect(() =>
        GbProcess.ComputeLevelInvestment(
          10,
          [0, 0, 0, 0, 0],
          deepCopy,
          [{ value: deepCopy[9].cost, isPotentialSniper: false }],
          2
        )
      ).toThrow(
        new Errors.BoundExceededError({
          type: Errors.AvailableBoundTypes[">"],
          value: "participationSum + ownerPreparation",
          boundValue: deepCopy[9].cost,
          additionalMessage: 'for parameters "participationSum" and "ownerPreparation" of ' + funcName
        })
      );
    });
  });

  describe("ComputeLevelInvestmentRange", () => {
    const funcName = "ComputeLevelInvestmentRange(from, to, investorPercentage, gb)";

    test("Valid value", () => {
      const result = GbProcess.ComputeLevelInvestmentRange(1, 10, [0, 0, 0, 0, 0], gbs.agesCost.BronzeAge);

      expect(result).toMatchSnapshot();
    });

    test("Valid value with from > to", () => {
      const result = GbProcess.ComputeLevelInvestmentRange(10, 1, [0, 0, 0, 0, 0], gbs.agesCost.BronzeAge);

      expect(result).toBeTruthy();
    });

    test("Throw error when invalid value for from", () => {
      expect(() => GbProcess.ComputeLevelInvestmentRange(0, 10, [0, 0, 0, 0, 0], gbs.agesCost.BronzeAge)).toThrow(
        new Errors.NotInBoundsError({
          value: 0,
          lowerBound: 1,
          upperBound: gbs.agesCost.BronzeAge.length,
          additionalMessage: `for parameter "from" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid value for to", () => {
      expect(() => GbProcess.ComputeLevelInvestmentRange(1, 0, [0, 0, 0, 0, 0], gbs.agesCost.BronzeAge)).toThrow(
        new Errors.NotInBoundsError({
          value: 0,
          lowerBound: 1,
          upperBound: gbs.agesCost.BronzeAge.length,
          additionalMessage: `for parameter "to" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for gb", () => {
      expect(() => GbProcess.ComputeLevelInvestmentRange(1, 10, [0, 0, 0, 0, 0], "a")).toThrow(
        new Errors.InvalidTypeError({
          expected: "Array",
          actual: "string",
          additionalMessage: `for parameter "gb" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for investorPercentage", () => {
      expect(() => GbProcess.ComputeLevelInvestmentRange(1, 10, "a", gbs.agesCost.BronzeAge)).toThrow(
        new Errors.InvalidTypeError({
          expected: "Array",
          actual: "string",
          additionalMessage: `for parameter "investorPercentage" of ${funcName}`
        })
      );
    });
  });

  describe("ComputeSecurePlace", () => {
    const funcName =
      "ComputeSecurePlace(levelCost, currentDeposits, yourParticipation, otherParticipation, " +
      "yourArcBonus, fpTargetReward)";

    test("Valid value", () => {
      const result = GbProcess.ComputeSecurePlace(1720, 860, 10, 50, 90, 245);

      expect(result).toEqual({ fp: 460, roi: 6 });
    });

    test("Valid value with no reward", () => {
      const result = GbProcess.ComputeSecurePlace(1720, 860, 10, 50, 90, 0);

      expect(result).toEqual({ fp: 460, roi: -460 });
    });

    test("Valid value with unreachable place", () => {
      const result = GbProcess.ComputeSecurePlace(1720, 860, 0, 860, 90, 245);

      expect(result).toEqual({ fp: -1, roi: 0 });
    });

    test("Throw error when invalid type for levelCost", () => {
      expect(() => GbProcess.ComputeSecurePlace("a", 860, 10, 50, 90, 245)).toThrow(
        new Errors.InvalidTypeError({
          expected: "number",
          actual: "string",
          additionalMessage: `for parameter "levelCost" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for currentDeposits", () => {
      expect(() => GbProcess.ComputeSecurePlace(1720, "a", 10, 50, 90, 245)).toThrow(
        new Errors.InvalidTypeError({
          expected: "number",
          actual: "string",
          additionalMessage: `for parameter "currentDeposits" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for yourParticipation", () => {
      expect(() => GbProcess.ComputeSecurePlace(1720, 860, "a", 50, 90, 245)).toThrow(
        new Errors.InvalidTypeError({
          expected: "number",
          actual: "string",
          additionalMessage: `for parameter "yourParticipation" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for otherParticipation", () => {
      expect(() => GbProcess.ComputeSecurePlace(1720, 860, 10, "a", 90, 245)).toThrow(
        new Errors.InvalidTypeError({
          expected: "number",
          actual: "string",
          additionalMessage: `for parameter "otherParticipation" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for yourArcBonus", () => {
      expect(() => GbProcess.ComputeSecurePlace(1720, 860, 10, 50, "a", 245)).toThrow(
        new Errors.InvalidTypeError({
          expected: "number",
          actual: "string",
          additionalMessage: `for parameter "yourArcBonus" of ${funcName}`
        })
      );
    });

    test("Throw error when invalid type for fpTargetReward", () => {
      expect(() => GbProcess.ComputeSecurePlace(1720, 860, 10, 50, 90, "a")).toThrow(
        new Errors.InvalidTypeError({
          expected: "number",
          actual: "string",
          additionalMessage: `for parameter "fpTargetReward" of ${funcName}`
        })
      );
    });
  });
});

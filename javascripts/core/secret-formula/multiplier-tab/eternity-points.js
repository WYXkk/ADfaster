import { DC } from "../../constants";
import { GameDatabase } from "../game-database";
import { PlayerProgress } from "../../app/player-progress";

import { MultiplierTabIcons } from "./icons";

// See index.js for documentation
GameDatabase.multiplierTabValues.EP = {
  total: {
    name: "Total EP Gained",
    isBase: true,
    multValue: () => gainedEternityPoints(),
    isActive: () => PlayerProgress.eternityUnlocked(),
    overlay: ["Δ", "<i class='fa-solid fa-layer-group' />"],
  },
  base: {
    name: "Base Eternity Points",
    isBase: true,
    fakeValue: DC.D5,
    multValue: () => DC.D5.pow(player.records.thisEternity.maxIP.plus(
      gainedInfinityPoints()).log10() / (308 - PelleRifts.recursion.effectValue.toNumber()) - 0.7),
    isActive: () => PlayerProgress.eternityUnlocked(),
    icon: MultiplierTabIcons.CONVERT_FROM("IP"),
  },
  IP: {
    name: "Eternity Points from Infinity Points",
    displayOverride: () => `${format(player.records.thisEternity.maxIP.plus(gainedInfinityPoints()), 2, 2)} IP`,
    // Just needs to match the value in base and be larger than 1
    multValue: DC.D5,
    isActive: () => PlayerProgress.eternityUnlocked(),
    icon: MultiplierTabIcons.SPECIFIC_GLYPH("infinity"),
  },
  divisor: {
    name: "Formula Improvement",
    displayOverride: () => {
      const div = 308 - PelleRifts.recursion.effectValue.toNumber();
      return `log(IP)/${formatInt(308)} ➜ log(IP)/${format(div, 2, 2)}`;
    },
    powValue: () => 308 / (308 - PelleRifts.recursion.effectValue.toNumber()),
    isActive: () => PelleRifts.recursion.canBeApplied,
    icon: MultiplierTabIcons.DIVISOR("EP"),
  },
  eternityUpgrade: {
    name: () => `Repeatable ${formatX(5)} Eternity Upgrade`,
    multValue: () => EternityUpgrade.epMult.effectOrDefault(1),
    isActive: () => PlayerProgress.eternityUnlocked() && !Pelle.isDoomed,
    icon: MultiplierTabIcons.UPGRADE("eternity"),
  },
  timeStudy: {
    name: "Time Studies",
    multValue: () => DC.D1.timesEffectsOf(
      TimeStudy(61),
      TimeStudy(121),
      TimeStudy(122),
      TimeStudy(123),
    ),
    isActive: () => PlayerProgress.eternityUnlocked() && !Pelle.isDoomed,
    icon: MultiplierTabIcons.TIME_STUDY,
  },
  glyph: {
    name: "Equipped Glyphs",
    multValue: () => DC.D1.timesEffectsOf(GlyphEffect.epMult).times(Pelle.specialGlyphEffect.time),
    powValue: () => (GlyphAlteration.isAdded("time") ? getSecondaryGlyphEffect("timeEP") : 1),
    isActive: () => PlayerProgress.realityUnlocked(),
    icon: MultiplierTabIcons.GENERIC_GLYPH,
  },
  realityUpgrade: {
    name: "The Knowing Existence",
    multValue: () => RealityUpgrade(12).effectOrDefault(1),
    isActive: () => RealityUpgrade(12).canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("reality"),
  },
  pelle: {
    name: "Pelle Vacuum Rift",
    multValue: () => PelleRifts.vacuum.milestones[2].effectOrDefault(1),
    isActive: () => PelleRifts.vacuum.milestones[2].canBeApplied,
    icon: MultiplierTabIcons.PELLE,
  },
  iap: {
    name: "Shop Tab Purchases",
    multValue: () => ShopPurchase.EPPurchases.currentMult,
    isActive: () => player.IAP.totalSTD > 0,
    icon: MultiplierTabIcons.IAP,
  },
};
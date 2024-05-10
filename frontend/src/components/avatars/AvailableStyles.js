import * as dicebear from '@dicebear/collection';

const seeds = [ "Garfield", "Socks", "Gizmo", "Precious", "Bailey", "Whiskers", "Missy", "Misty", "Snowball", 
                "Jasmine", "Smokey", "Scooter", "Lucy", "Simon", "Bubba", "Pepper"]


const availableStyles = {
    "adventurer": {
      style: dicebear.adventurer,
      styleName: "adventurer",
      options: dicebear.adventurer.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#AC87C5'
    },
    "adventurer-neutral": {
      style: dicebear.adventurerNeutral,
      styleName: "adventurer-neutral",
      options: dicebear.adventurerNeutral.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#E1D1B8'
    },
    "avataaars": {
      style: dicebear.avataaars,
      styleName: "avataaars",
      options: dicebear.avataaars.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#BFD9CC'
    },
    "avataaars-neutral": {
      style: dicebear.avataaarsNeutral,
      styleName: "avataaars-neutral",
      options: dicebear.avataaarsNeutral.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#E1C5B8'
    },
    "big-ears": {
      style: dicebear.bigEars,
      styleName: "big-ears",
      options: dicebear.bigEars.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#86A7FC'
    },
    "big-ears-neutral": {
      style: dicebear.bigEarsNeutral,
      styleName: "big-ears-neutral",
      options: dicebear.bigEarsNeutral.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#F8C9A6'
    },
    "big-smile": {
      style: dicebear.bigSmile,
      styleName: "big-smile",
      options: dicebear.bigSmile.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#ED5AB3'
    },
    "bottts": {
      style: dicebear.bottts,
      styleName: "bottts",
      options: dicebear.bottts.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#75B3C2'
    },
    "bottts-neutral": {
      style: dicebear.botttsNeutral,
      styleName: "bottts-neutral",
      options: dicebear.botttsNeutral.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#FFC4C4'
    },
    "croodles": {
      style: dicebear.croodles,
      styleName: "croodles",
      options: dicebear.croodles.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#5498A8'
    },
    "croodles-neutral": {
      style: dicebear.croodlesNeutral,
      styleName: "croodles-neutral",
      options: dicebear.croodlesNeutral.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#FF7B54'
    },
    "fun-emoji": {
      style: dicebear.funEmoji,
      styleName: "fun-emoji",
      options: dicebear.funEmoji.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#E0AED0'
    },
    "lorelei": {
      style: dicebear.lorelei,
      styleName: "lorelei",
      options: dicebear.lorelei.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#9CA986'
    },
    "lorelei-neutral": {
      style: dicebear.loreleiNeutral,
      styleName: "lorelei-neutral",
      options: dicebear.loreleiNeutral.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#EB455F'
    },
    "micah": {
      style: dicebear.micah,
      styleName: "micah",
      options: dicebear.micah.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#FF7B54'
    },
    "miniavs": {
      style: dicebear.miniavs,
      styleName: "miniavs",
      options: dicebear.miniavs.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#3468C0'
    },
    "notionists": {
      style: dicebear.notionists,
      styleName: "notionists",
      options: dicebear.notionists.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#756AB6'
    },
    "notionists-neutral": {
      style: dicebear.notionistsNeutral,
      styleName: "notionists-neutral",
      options: dicebear.notionistsNeutral.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#FFC4C4'
    },
    "open-peeps": {
      style: dicebear.openPeeps,
      styleName: "open-peeps",
      options: dicebear.openPeeps.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#D2A1BD'
    },
    "personas": {
      style: dicebear.personas,
      styleName: "personas",
      options: dicebear.personas.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#F5D9E4'
    },
    "pixel-art": {
      style: dicebear.pixelArt,
      styleName: "pixel-art",
      options: dicebear.pixelArt.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#CCE1B8'
    },
    "pixel-art-neutral": {
      style: dicebear.pixelArtNeutral,
      styleName: "pixel-art-neutral",
      options: dicebear.pixelArtNeutral.schema.properties ?? {},
      randomSeeds: seeds,
      color: '#A6C6E1'
    },
  };
  
export default availableStyles;
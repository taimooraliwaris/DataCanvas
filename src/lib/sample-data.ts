import { buildDataset, type Dataset } from "@/lib/spreadsheet";

const ITEMS = [
  { Product: "Oak lounge chair", Category: "Seating", Price: 890, Units: 42, Rating: 4.7, Region: "Nordics" },
  { Product: "Linen daybed", Category: "Seating", Price: 1240, Units: 18, Rating: 4.5, Region: "Nordics" },
  { Product: "Walnut side table", Category: "Tables", Price: 320, Units: 67, Rating: 4.6, Region: "Alpine" },
  { Product: "Marble console", Category: "Tables", Price: 1580, Units: 9, Rating: 4.8, Region: "Mediterranean" },
  { Product: "Wool throw, rust", Category: "Textiles", Price: 95, Units: 210, Rating: 4.4, Region: "Atlantic" },
  { Product: "Hand-loomed rug 8×10", Category: "Textiles", Price: 760, Units: 31, Rating: 4.9, Region: "Atlantic" },
  { Product: "Opal glass lamp", Category: "Lighting", Price: 210, Units: 88, Rating: 4.3, Region: "Pacific" },
  { Product: "Brass floor lamp", Category: "Lighting", Price: 540, Units: 24, Rating: 4.6, Region: "Pacific" },
  { Product: "Ceramic table lamp", Category: "Lighting", Price: 180, Units: 73, Rating: 4.2, Region: "Mediterranean" },
  { Product: "Ash dining table", Category: "Tables", Price: 2100, Units: 11, Rating: 4.8, Region: "Nordics" },
  { Product: "Cane lounge set", Category: "Seating", Price: 1680, Units: 7, Rating: 4.5, Region: "Pacific" },
  { Product: "Stoneware vase", Category: "Objects", Price: 64, Units: 156, Rating: 4.1, Region: "Alpine" },
  { Product: "Oak bookshelf", Category: "Storage", Price: 980, Units: 19, Rating: 4.7, Region: "Atlantic" },
  { Product: "Leather ottoman", Category: "Seating", Price: 410, Units: 36, Rating: 4.4, Region: "Mediterranean" },
  { Product: "Linen curtain pair", Category: "Textiles", Price: 220, Units: 58, Rating: 4.3, Region: "Nordics" },
  { Product: "Cedar chest", Category: "Storage", Price: 640, Units: 14, Rating: 4.6, Region: "Alpine" },
  { Product: "Paper pendant", Category: "Lighting", Price: 130, Units: 102, Rating: 4.5, Region: "Pacific" },
  { Product: "Travertine bowl", Category: "Objects", Price: 85, Units: 91, Rating: 4.2, Region: "Mediterranean" },
  { Product: "Elm bench", Category: "Seating", Price: 560, Units: 22, Rating: 4.7, Region: "Atlantic" },
  { Product: "Wool runner", Category: "Textiles", Price: 310, Units: 40, Rating: 4.8, Region: "Alpine" },
  { Product: "Oak nightstand", Category: "Storage", Price: 390, Units: 45, Rating: 4.4, Region: "Nordics" },
  { Product: "Iron candleholders", Category: "Objects", Price: 48, Units: 188, Rating: 4.0, Region: "Atlantic" },
  { Product: "Rattan armchair", Category: "Seating", Price: 470, Units: 27, Rating: 4.3, Region: "Pacific" },
  { Product: "Slate coffee table", Category: "Tables", Price: 890, Units: 16, Rating: 4.6, Region: "Alpine" },
  { Product: "Cotton bed throw", Category: "Textiles", Price: 140, Units: 77, Rating: 4.5, Region: "Mediterranean" },
  { Product: "Pine wall shelf", Category: "Storage", Price: 160, Units: 63, Rating: 4.1, Region: "Nordics" },
  { Product: "Blown-glass carafe", Category: "Objects", Price: 72, Units: 120, Rating: 4.4, Region: "Mediterranean" },
  { Product: "Oak desk", Category: "Tables", Price: 1320, Units: 13, Rating: 4.9, Region: "Atlantic" },
] as const;

const PHOTO_IDS = [
  1011, 1018, 1025, 103, 1060, 1074, 119, 133, 145, 157, 164, 175, 193, 201, 211, 225, 238, 250, 259, 274, 292, 306, 326, 338, 349, 365, 375, 399,
];

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getSampleDataset(): Dataset {
  const rows = ITEMS.map((item, index) => {
    const launched = new Date(Date.UTC(2023, index % 12, 4 + (index % 20)));
    return {
      Product: item.Product,
      Photo: `https://picsum.photos/id/${PHOTO_IDS[index % PHOTO_IDS.length]}/320/320`,
      Category: item.Category,
      Price: item.Price,
      Units: item.Units,
      Rating: item.Rating,
      Launched: launched.toISOString().slice(0, 10),
      "In stock": index % 7 === 0 ? "No" : "Yes",
      Region: item.Region,
      Website: `https://atelier.example/${slug(item.Product)}`,
    };
  });
  return buildDataset("atelier-catalog.csv", rows);
}

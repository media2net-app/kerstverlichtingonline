export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export const CATEGORIES: ProductCategory[] = [
  {
    id: "vlaggenmast",
    name: "Vlaggenmast Kerstbomen",
    slug: "vlaggenmast-kerstbomen",
    description: "LED kerstbomen voor vlaggenmasten",
  },
  {
    id: "buiten",
    name: "Kerstverlichting Buiten",
    slug: "kerstverlichting-buiten",
    description: "Kerstverlichting voor buiten gebruik",
  },
  {
    id: "lichtsnoeren",
    name: "LED Lichtsnoeren",
    slug: "led-lichtsnoeren",
    description: "LED lichtsnoeren en lichtkettingen",
  },
  {
    id: "figuren",
    name: "Kerstfiguren",
    slug: "kerstfiguren",
    description: "LED kerstfiguren en decoraties",
  },
  {
    id: "projectoren",
    name: "Kerstprojectoren",
    slug: "kerstprojectoren",
    description: "LED projectoren voor kerstverlichting",
  },
  {
    id: "notenkraker",
    name: "Kerst Notenkrakers",
    slug: "kerst-notenkrakers",
    description: "LED kerst notenkrakers en decoraties",
  },
  {
    id: "kunstkerstboom",
    name: "Kunstkerstbomen",
    slug: "kunstkerstbomen",
    description: "Kunstmatige kerstbomen voor binnen en buiten",
  },
];

export function getCategoryById(id: string): ProductCategory | undefined {
  return CATEGORIES.find((cat) => cat.id === id);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}


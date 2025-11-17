import { ScrapedProduct } from "./amazon";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  relatedProductAsins?: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "De ultieme gids voor vlaggenmast kerstverlichting in 2025",
    slug: "ultieme-gids-vlaggenmast-kerstverlichting-2025",
    excerpt:
      "Ontdek alles wat je moet weten over vlaggenmast kerstverlichting: van installatie tot onderhoud en de beste producten voor jouw tuin.",
    content: `
# De ultieme gids voor vlaggenmast kerstverlichting in 2025

Vlaggenmast kerstverlichting is dé trend voor de feestdagen. Of je nu een kleine tuin hebt of een groot bedrijfsterrein, deze LED-kerstbomen brengen magie en sfeer naar elke locatie.

## Waarom kiezen voor vlaggenmast kerstverlichting?

Vlaggenmast kerstverlichting biedt talloze voordelen:

- **Opvallend en indrukwekkend**: Perfect zichtbaar van veraf
- **Energiezuinig**: Moderne LED-technologie verbruikt minimaal stroom
- **Weersbestendig**: Gemaakt voor buiten gebruik, bestand tegen regen en wind
- **Eenvoudige installatie**: Meeste sets zijn inclusief haringen en bevestigingsmateriaal
- **Verschillende maten**: Van 3 meter tot 8+ meter, voor elke ruimte

## Welke hoogte past bij jou?

De keuze voor de juiste hoogte hangt af van je situatie:

- **3-5 meter**: Perfect voor kleine tuinen en balkons
- **6 meter**: Ideaal voor gemiddelde tuinen en bedrijfsterreinen
- **8+ meter**: Voor grote ruimtes en indrukwekkende displays

## Installatie tips

1. **Kies de juiste locatie**: Zorg voor voldoende ruimte rondom de vlaggenmast
2. **Controleer de elektrische aansluiting**: Zorg voor een veilige buitenstopcontact
3. **Gebruik haringen**: Bevestig de basis stevig met de meegeleverde haringen
4. **Test voor plaatsing**: Controleer eerst of alle LEDs werken

## Onderhoud

LED-kerstverlichting vraagt minimaal onderhoud. Na het seizoen:
- Droog opbergen in de originele verpakking
- Controleer op beschadigingen
- Bewaar op een droge, donkere plek

Met de juiste vlaggenmast kerstverlichting creëer je een betoverende sfeer die je buren en bezoekers zal verbazen!
    `,
    author: "Kerstverlichtingonline Team",
    date: "2025-11-15",
    relatedProductAsins: ["B00FAIRY6M", "B0GALAXY960", "B0CVIDAXL1534"],
  },
  {
    id: "2",
    title: "Warm wit vs. kleurrijk: welke kerstverlichting past bij jou?",
    slug: "warm-wit-vs-kleurrijk-kerstverlichting",
    excerpt:
      "Ontdek het verschil tussen warm witte en kleurrijke LED-kerstverlichting en maak de juiste keuze voor jouw kerstdecoratie.",
    content: `
# Warm wit vs. kleurrijk: welke kerstverlichting past bij jou?

De keuze tussen warm wit en kleurrijke kerstverlichting is een belangrijke beslissing voor je kerstdecoratie. Beide opties hebben hun eigen charme en toepassingen.

## Warm wit: tijdloos en elegant

Warm witte LED-kerstverlichting biedt:

- **Klassieke uitstraling**: Traditionele kerstsfeer
- **Rustgevend effect**: Minder opvallend, meer subtiel
- **Universeel toepasbaar**: Past bij elke stijl
- **Energiezuinig**: Meestal de meest efficiënte optie

Perfect voor: Woningen, restaurants, en locaties waar een elegante uitstraling gewenst is.

## Kleurrijk: vrolijk en feestelijk

Kleurrijke LED-kerstverlichting brengt:

- **Feestelijke sfeer**: Vrolijk en opvallend
- **Aandacht trekken**: Ideaal voor commerciële locaties
- **Diverse effecten**: Vaak met verschillende lichtmodi
- **Kinderen favoriet**: Populair bij gezinnen

Perfect voor: Winkelcentra, evenementen, en gezinnen die van een vrolijke sfeer houden.

## Onze aanbeveling

Voor de meeste situaties raden we warm wit aan vanwege de tijdloze uitstraling en energie-efficiëntie. Voor commerciële locaties of speciale evenementen kan kleurrijk een geweldige keuze zijn.

Kies wat past bij jouw stijl en de sfeer die je wilt creëren!
    `,
    author: "Kerstverlichtingonline Team",
    date: "2025-11-10",
    relatedProductAsins: ["B00FAIRY6M", "B0VIDAXL570", "B0BUUDALA200"],
  },
  {
    id: "3",
    title: "Hoeveel LEDs heb je nodig voor je vlaggenmast kerstboom?",
    slug: "hoeveel-leds-vlaggenmast-kerstboom",
    excerpt:
      "Leer hoe je de juiste hoeveelheid LEDs kiest voor je vlaggenmast kerstverlichting. Meer LEDs betekent niet altijd beter!",
    content: `
# Hoeveel LEDs heb je nodig voor je vlaggenmast kerstboom?

De hoeveelheid LEDs in een vlaggenmast kerstboom varieert sterk, van 200 tot meer dan 1500 LEDs. Maar hoeveel heb je nu echt nodig?

## LED-dichtheid per hoogte

- **3-4 meter**: 200-400 LEDs is voldoende
- **5-6 meter**: 500-900 LEDs geeft een goede balans
- **7-8 meter**: 1000-1500+ LEDs voor een vol effect

## Waarom niet altijd meer beter is

Meer LEDs betekent:
- Hoger energieverbruik
- Hogere kosten
- Niet altijd beter zichtbaar effect

## Onze topkeuzes

Voor de meeste gebruikers raden we aan:
- **Kleine tuinen**: 300-500 LEDs
- **Gemiddelde tuinen**: 600-900 LEDs
- **Grote ruimtes**: 1000+ LEDs

De beste keuze hangt af van je budget, beschikbare ruimte, en het gewenste effect. Ons advies: kies voor kwaliteit boven kwantiteit!
    `,
    author: "Kerstverlichtingonline Team",
    date: "2025-11-05",
    relatedProductAsins: ["B0CI2BAYCON", "B0LED360", "B0TIDYARD732"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedProducts(
  post: BlogPost,
  allProducts: ScrapedProduct[]
): ScrapedProduct[] {
  if (!post.relatedProductAsins || post.relatedProductAsins.length === 0) {
    return allProducts.slice(0, 3);
  }

  const related = post.relatedProductAsins
    .map((asin) => allProducts.find((p) => p.asin === asin))
    .filter((p): p is ScrapedProduct => p !== undefined);

  // Fill with additional products if needed
  if (related.length < 3) {
    const additional = allProducts
      .filter((p) => !post.relatedProductAsins?.includes(p.asin))
      .slice(0, 3 - related.length);
    return [...related, ...additional].slice(0, 3);
  }

  return related.slice(0, 3);
}


interface Recipe extends HowTo {
  /** The time it takes to actually cook the dish, in ISO 8601 duration format. */
  cookTime: Duration;
  /** Nutrition information about the recipe or menu item. */
  nutrition: NutritionInformation;
  /** The category of the recipe—for example, appetizer, entree, etc. */
  recipeCategory: string;
  /** A single ingredient used in the recipe, e.g. sugar, flour or garlic. Supersedes ingredients. */
  recipeIngredient: string;
  /** A step in making the recipe, in the form of a single item (document, video, etc.) or an ordered list with HowToStep and/or HowToSection items. */
  recipeInstructions: CreativeWork | ItemList | string;
  /** The quantity produced by the recipe (for example, number of people served, number of servings, etc). */
  recipeYield: QuantitativeValue | string;
  /** Indicates a dietary restriction or guideline for which this recipe or menu item is suitable, e.g. diabetic, halal etc. */
  suitableForDiet: RestrictedDiet;
}

interface HowTo extends CreativeWork {
  /** The length of time it takes to prepare the items to be used in instructions or a direction, in ISO 8601 duration format. */
  prepTime: Duration;
  /** The total time required to perform instructions or a direction (including time to prepare the supplies), in ISO 8601 duration format. */
  totalTime: Duration;
}

interface CreativeWork extends Thing {
  /** The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably. */
  author: Organization | Person;
  /** The date on which the CreativeWork was most recently modified or when the item's entry was modified within a DataFeed. */
  dateModified: Date | DateTime;
  /** Date of first publication or broadcast. For example the date a CreativeWork was broadcast or a Certification was issued. */
  datePublished: Date | DateTime;
  /** Indicates an item or CreativeWork that is part of this item, or CreativeWork (in some sense).
Inverse property: isPartOf */
  hasPart: CreativeWork;
  /** Headline of the article. */
  headline: string;
  /** A flag to signal that the item, event, or place is accessible for free. Supersedes free. */
  isAccessibleForFree: boolean;
  /** Keywords or tags used to describe some item. Multiple textual entries in a keywords list are typically delimited by commas, or by repeating the property. */
  keywords: DefinedTerm | string | URL;
  /** The publisher of the creative work. */
  publisher: Organization | Person;
}

interface Thing {
  /** A description of the item. */
  description: string | TextObject;
  /** An image of the item. This can be a URL or a fully described ImageObject. */
  image: ImageObject | URL;
  /** Indicates a page (or other CreativeWork) for which this thing is the main entity being described. See background notes for details.
Inverse property: mainEntity */
  mainEntityOfPage: CreativeWork | URL;
  /** The name of the item. */
  name: string;
  /** URL of the item. */
  url: URL;
}

interface NutritionInformation extends Thing {
  /** The number of calories. */
  calories: Energy;
  /** The number of grams of carbohydrates. */
  carbohydrateContent: Mass;
  /** The number of milligrams of cholesterol. */
  cholesterolContent: Mass;
  /** The number of grams of fat. */
  fatContent: Mass;
  /** The number of grams of fiber. */
  fiberContent: Mass;
  /** The number of grams of protein. */
  proteinContent: Mass;
  /** The number of grams of saturated fat. */
  saturatedFatContent: Mass;
  /** The serving size, in terms of the number of volume or mass. */
  servingSize: string;
  /** The number of milligrams of sodium. */
  sodiumContent: Mass;
  /** The number of grams of sugar. */
  sugarContent: Mass;
  /** The number of grams of trans fat. */
  transFatContent: Mass;
  /** The number of grams of unsaturated fat. */
  unsaturatedFatContent: Mass;
}

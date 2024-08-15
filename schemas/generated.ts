/* File generated from schema.org */

type MaybeArray<T> = T | T[];

/** A recipe. For dietary restrictions covered by the recipe, a few common restrictions are enumerated via [[suitableForDiet]]. The [[keywords]] property can also be used to add more detail. */
export type Recipe = HowTo & {

  /** The time it takes to actually cook the dish, in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
  'cookTime': string;
  /** The method of cooking, such as Frying, Steaming, ... */
  'cookingMethod': string;
  /** A single ingredient used in the recipe, e.g. sugar, flour or garlic. */
  'ingredients': string | string[];
  /** Nutrition information about the recipe or menu item. */
  'nutrition': NutritionInformation;
  /** The category of the recipe—for example, appetizer, entree, etc. */
  'recipeCategory': string;
  /** The cuisine of the recipe (for example, French or Ethiopian). */
  'recipeCuisine': string;
  /** A single ingredient used in the recipe, e.g. sugar, flour or garlic. */
  'recipeIngredient': string | string[];
  /** A step in making the recipe, in the form of a single item (document, video, etc.) or an ordered list with HowToStep and/or HowToSection items. */
  'recipeInstructions': MaybeArray<string | CreativeWork>;
  /** The quantity produced by the recipe (for example, number of people served, number of servings, etc). */
  'recipeYield': string | QuantitativeValue;
  /** Indicates a dietary restriction or guideline for which this recipe or menu item is suitable, e.g. diabetic, halal etc. */
  'suitableForDiet': RestrictedDiet | RestrictedDiet[];
};

/** Instructions that explain how to achieve a result by performing a sequence of steps. */
type HowTo = CreativeWork & {

  /** The estimated cost of the supply or supplies consumed when performing instructions. */
  'estimatedCost': string | MonetaryAmount;
  /** The length of time it takes to perform instructions or a direction (not including time to prepare the supplies), in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
  'performTime': string;
  /** The length of time it takes to prepare the items to be used in instructions or a direction, in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
  'prepTime': string;
  /** A single step item (as HowToStep, text, document, video, etc.) or a HowToSection. */
  'step': string | CreativeWork | HowToSection | HowToStep | string | CreativeWork | HowToSection | HowToStep[];
  /** A single step item (as HowToStep, text, document, video, etc.) or a HowToSection (originally misnamed 'steps'; 'step' is preferred). */
  'steps': MaybeArray<string | CreativeWork> | MaybeArray<string | CreativeWork>[];
  /** A sub-property of instrument. A supply consumed when performing instructions or a direction. */
  'supply': string | HowToSupply | string | HowToSupply[];
  /** A sub property of instrument. An object used (but not consumed) when performing instructions or a direction. */
  'tool': string | HowToTool | string | HowToTool[];
  /** The total time required to perform instructions or a direction (including time to prepare the supplies), in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
  'totalTime': string;
  /** The quantity that results by performing instructions. For example, a paper airplane, 10 personalized candles. */
  'yield': string | QuantitativeValue;
};



/** Nutritional information about the recipe. */
type NutritionInformation = StructuredValue & {

  /** The number of calories. */
  'calories': string;
  /** The number of grams of carbohydrates. */
  'carbohydrateContent': string;
  /** The number of milligrams of cholesterol. */
  'cholesterolContent': string;
  /** The number of grams of fat. */
  'fatContent': string;
  /** The number of grams of fiber. */
  'fiberContent': string;
  /** The number of grams of protein. */
  'proteinContent': string;
  /** The number of grams of saturated fat. */
  'saturatedFatContent': string;
  /** The serving size, in terms of the number of volume or mass. */
  'servingSize': string;
  /** The number of milligrams of sodium. */
  'sodiumContent': string;
  /** The number of grams of sugar. */
  'sugarContent': string;
  /** The number of grams of trans fat. */
  'transFatContent': string;
  /** The number of grams of unsaturated fat. */
  'unsaturatedFatContent': string;
};



/** The most generic kind of creative work, including books, movies, photographs, software programs, etc. */
type CreativeWork = Thing & {

  /**  */
  '[object Object]': string | QuantitativeValue | string | QuantitativeValue[];
  /** The subject matter of the content. */
  'about': Thing;
  /** An abstract is a short description that summarizes a [[CreativeWork]]. */
  'abstract': string | string[];
  /** The human sensory perceptual system or cognitive faculty through which a person may process or perceive information. Expected values include: auditory, tactile, textual, visual, colorDependent, chartOnVisual, chemOnVisual, diagramOnVisual, mathOnVisual, musicOnVisual, textOnVisual.
       */
  'accessMode': string | string[];
  /** A list of single or combined accessModes that are sufficient to understand all the intellectual content of a resource. Expected values include:  auditory, tactile, textual, visual.
       */
  'accessModeSufficient': MaybeArray<ItemList[]>;
  /** Indicates that the resource is compatible with the referenced accessibility API ([WebSchemas wiki lists possible values](http://www.w3.org/wiki/WebSchemas/Accessibility)). */
  'accessibilityAPI': string | string[];
  /** Identifies input methods that are sufficient to fully control the described resource ([WebSchemas wiki lists possible values](http://www.w3.org/wiki/WebSchemas/Accessibility)). */
  'accessibilityControl': string | string[];
  /** Content features of the resource, such as accessible media, alternatives and supported enhancements for accessibility ([WebSchemas wiki lists possible values](http://www.w3.org/wiki/WebSchemas/Accessibility)). */
  'accessibilityFeature': string | string[];
  /** A characteristic of the described resource that is physiologically dangerous to some users. Related to WCAG 2.0 guideline 2.3 ([WebSchemas wiki lists possible values](http://www.w3.org/wiki/WebSchemas/Accessibility)). */
  'accessibilityHazard': string | string[];
  /** A human-readable summary of specific accessibility features or deficiencies, consistent with the other accessibility metadata but expressing subtleties such as "short descriptions are present but long descriptions will be needed for non-visual users" or "short descriptions are present and no long descriptions are needed." */
  'accessibilitySummary': string;
  /** Specifies the Person that is legally accountable for the CreativeWork. */
  'accountablePerson': Person;
  /** Indicates a page documenting how licenses can be purchased or otherwise acquired, for the current item. */
  'acquireLicensePage': string | CreativeWork | string | CreativeWork[];
  /** The overall rating, based on a collection of reviews or ratings, of the item. */
  'aggregateRating': AggregateRating;
  /** A secondary title of the CreativeWork. */
  'alternativeHeadline': string | string[];
  /** Indicates a page or other link involved in archival of a [[CreativeWork]]. In the case of [[MediaReview]], the items in a [[MediaReviewItem]] may often become inaccessible, but be archived by archival, journalistic, activist, or law enforcement organizations. In such cases, the referenced page may not directly publish the content. */
  'archivedAt': string | WebPage | string | WebPage[];
  /** The item being described is intended to assess the competency or learning outcome defined by the referenced term. */
  'assesses': string | DefinedTerm;
  /** A media object that encodes this CreativeWork. This property is a synonym for encoding. */
  'associatedMedia': MediaObject;
  /** An intended audience, i.e. a group for whom something was created. */
  'audience': Audience;
  /** An embedded audio object. */
  'audio': AudioObject | Clip | MusicRecording | AudioObject | Clip | MusicRecording[];
  /** The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably. */
  'author': Organization | Person;
  /** An award won by or for this item. */
  'award': string | string[];
  /** Awards won by or for this item. */
  'awards': string | string[];
  /** Fictional person connected with a creative work. */
  'character': Person | Person[];
  /** A citation or reference to another creative work, such as another publication, web page, scholarly article, etc. */
  'citation': string | CreativeWork | string | CreativeWork[];
  /** Comments, typically from users. */
  'comment': Comment_ | Comment_[];
  /** The number of comments this CreativeWork (e.g. Article, Question or Answer) has received. This is most applicable to works published in Web sites with commenting system; additional comments may exist elsewhere. */
  'commentCount': number;
  /** Conditions that affect the availability of, or method(s) of access to, an item. Typically used for real world items such as an [[ArchiveComponent]] held by an [[ArchiveOrganization]]. This property is not suitable for use as a general Web access control mechanism. It is expressed only in natural language.\n\nFor example "Available by appointment from the Reading Room" or "Accessible only from logged-in accounts ".  */
  'conditionsOfAccess': string | string[];
  /** The location depicted or described in the content. For example, the location in a photograph or painting. */
  'contentLocation': Place;
  /** Official rating of a piece of content—for example,'MPAA PG-13'. */
  'contentRating': string | Rating | string | Rating[];
  /** The specific time described by a creative work, for works (e.g. articles, video objects etc.) that emphasise a particular moment within an Event. */
  'contentReferenceTime': string;
  /** A secondary contributor to the CreativeWork or Event. */
  'contributor': Organization | Person | Organization | Person[];
  /** The party holding the legal copyright to the CreativeWork. */
  'copyrightHolder': Organization | Person;
  /** Text of a notice appropriate for describing the copyright aspects of this Creative Work, ideally indicating the owner of the copyright for the Work. */
  'copyrightNotice': string | string[];
  /** The year during which the claimed copyright for the CreativeWork was first asserted. */
  'copyrightYear': number;
  /** Indicates a correction to a [[CreativeWork]], either via a [[CorrectionComment]], textually or in another document. */
  'correction': string | string | CorrectionComment | string | string | CorrectionComment[];
  /** The country of origin of something, including products as well as creative  works such as movie and TV content.

In the case of TV and movie, this would be the country of the principle offices of the production company or individual responsible for the movie. For other kinds of [[CreativeWork]] it is difficult to provide fully general guidance, and properties such as [[contentLocation]] and [[locationCreated]] may be more applicable.

In the case of products, the country of origin of the product. The exact interpretation of this may vary by context and product type, and cannot be fully enumerated here. */
  'countryOfOrigin': Country;
  /** The status of a creative work in terms of its stage in a lifecycle. Example terms include Incomplete, Draft, Published, Obsolete. Some organizations define a set of terms for the stages of their publication lifecycle. */
  'creativeWorkStatus': string | DefinedTerm;
  /** The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. */
  'creator': Organization | Person;
  /** Text that can be used to credit person(s) and/or organization(s) associated with a published Creative Work. */
  'creditText': string | string[];
  /** The date on which the CreativeWork was created or the item was added to a DataFeed. */
  'dateCreated': string | string;
  /** The date on which the CreativeWork was most recently modified or when the item's entry was modified within a DataFeed. */
  'dateModified': string | string;
  /** Date of first broadcast/publication. */
  'datePublished': string | string;
  /** A link to the page containing the comments of the CreativeWork. */
  'discussionUrl': string | string[];
  /** An [EIDR](https://eidr.org/) (Entertainment Identifier Registry) [[identifier]] representing a specific edit / edition for a work of film or television.

For example, the motion picture known as "Ghostbusters" whose [[titleEIDR]] is "10.5240/7EC7-228A-510A-053E-CBB8-J", has several edits e.g. "10.5240/1F2A-E1C5-680A-14C6-E76B-I" and "10.5240/8A35-3BEE-6497-5D12-9E4F-3".

Since schema.org types like [[Movie]] and [[TVEpisode]] can be used for both works and their multiple expressions, it is possible to use [[titleEIDR]] alone (for a general description), or alongside [[editEIDR]] for a more edit-specific description.
 */
  'editEIDR': string | string | string | string[];
  /** Specifies the Person who edited the CreativeWork. */
  'editor': Person;
  /** An alignment to an established educational framework.

This property should not be used where the nature of the alignment can be described using a simple property, for example to express that a resource [[teaches]] or [[assesses]] a competency. */
  'educationalAlignment': AlignmentObject | AlignmentObject[];
  /** The level in terms of progression through an educational or training context. Examples of educational levels include 'beginner', 'intermediate' or 'advanced', and formal sets of level indicators. */
  'educationalLevel': string | string | DefinedTerm;
  /** The purpose of a work in the context of education; for example, 'assignment', 'group work'. */
  'educationalUse': string | DefinedTerm;
  /** A media object that encodes this CreativeWork. This property is a synonym for associatedMedia. */
  'encoding': MediaObject | MediaObject[];
  /** Media type typically expressed using a MIME format (see [IANA site](http://www.iana.org/assignments/media-types/media-types.xhtml) and [MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)) e.g. application/zip for a SoftwareApplication binary, audio/mpeg for .mp3 etc.).

In cases where a [[CreativeWork]] has several media type representations, [[encoding]] can be used to indicate each [[MediaObject]] alongside particular [[encodingFormat]] information.

Unregistered or niche encoding and file formats can be indicated instead via the most appropriate URL, e.g. defining Web page or a Wikipedia/Wikidata entry. */
  'encodingFormat': string | string;
  /** A media object that encodes this CreativeWork. */
  'encodings': MediaObject | MediaObject[];
  /** A creative work that this work is an example/instance/realization/derivation of. */
  'exampleOfWork': CreativeWork | CreativeWork[];
  /** Date the content expires and is no longer useful or available. For example a [[VideoObject]] or [[NewsArticle]] whose availability or relevance is time-limited, or a [[ClaimReview]] fact check whose publisher wants to indicate that it may no longer be relevant (or helpful to highlight) after some date. */
  'expires': string;
  /** Media type, typically MIME format (see [IANA site](http://www.iana.org/assignments/media-types/media-types.xhtml)) of the content e.g. application/zip of a SoftwareApplication binary. In cases where a CreativeWork has several media type representations, 'encoding' can be used to indicate each MediaObject alongside particular fileFormat information. Unregistered or niche file formats can be indicated instead via the most appropriate URL, e.g. defining Web page or a Wikipedia entry. */
  'fileFormat': string | string;
  /** A person or organization that supports (sponsors) something through some kind of financial contribution. */
  'funder': Organization | Person | Organization | Person[];
  /** Genre of the creative work, broadcast channel or group. */
  'genre': string | string;
  /** Indicates an item or CreativeWork that is part of this item, or CreativeWork (in some sense). */
  'hasPart': CreativeWork | CreativeWork[];
  /** Headline of the article. */
  'headline': string;
  /** The language of the content or performance or used in an action. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[availableLanguage]]. */
  'inLanguage': string | Language;
  /** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. The most specific child type of InteractionCounter should be used. */
  'interactionStatistic': InteractionCounter;
  /** The predominant mode of learning supported by the learning resource. Acceptable values are 'active', 'expositive', or 'mixed'. */
  'interactivityType': string;
  /** Used to indicate a specific claim contained, implied, translated or refined from the content of a [[MediaObject]] or other [[CreativeWork]]. The interpreting party can be indicated using [[claimInterpreter]]. */
  'interpretedAsClaim': Claim | Claim[];
  /** A flag to signal that the item, event, or place is accessible for free. */
  'isAccessibleForFree': boolean;
  /** A resource from which this work is derived or from which it is a modification or adaption. */
  'isBasedOn': string | CreativeWork | Product | string | CreativeWork | Product[];
  /** A resource that was used in the creation of this resource. This term can be repeated for multiple sources. For example, http://example.com/great-multiplication-intro.html. */
  'isBasedOnUrl': string | CreativeWork | Product | string | CreativeWork | Product[];
  /** Indicates whether this content is family friendly. */
  'isFamilyFriendly': boolean;
  /** Indicates an item or CreativeWork that this item, or CreativeWork (in some sense), is part of. */
  'isPartOf': string | CreativeWork;
  /** Keywords or tags used to describe this content. Multiple entries in a keywords list are typically delimited by commas. */
  'keywords': string | string | DefinedTerm;
  /** The predominant type or kind characterizing the learning resource. For example, 'presentation', 'handout'. */
  'learningResourceType': string | DefinedTerm;
  /** A license document that applies to this content, typically indicated by URL. */
  'license': string | CreativeWork | string | CreativeWork[];
  /** The location where the CreativeWork was created, which may not be the same as the location depicted in the CreativeWork. */
  'locationCreated': Place;
  /** Indicates the primary entity described in some page or other CreativeWork. */
  'mainEntity': Thing | Thing[];
  /** A maintainer of a [[Dataset]], software package ([[SoftwareApplication]]), or other [[Project]]. A maintainer is a [[Person]] or [[Organization]] that manages contributions to, and/or publication of, some (typically complex) artifact. It is common for distributions of software and data to be based on "upstream" sources. When [[maintainer]] is applied to a specific version of something e.g. a particular version or packaging of a [[Dataset]], it is always  possible that the upstream source has a different maintainer. The [[isBasedOn]] property can be used to indicate such relationships between datasets to make the different maintenance roles clear. Similarly in the case of software, a package may have dedicated maintainers working on integration into software distributions such as Ubuntu, as well as upstream maintainers of the underlying work.
       */
  'maintainer': Organization | Person | Organization | Person[];
  /** A material that something is made from, e.g. leather, wool, cotton, paper. */
  'material': string | string | Product | string | string | Product[];
  /** Indicates that the CreativeWork contains a reference to, but is not necessarily about a concept. */
  'mentions': Thing | Thing[];
  /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer.
       */
  'offers': Demand | Offer | Demand | Offer[];
  /** A pattern that something has, for example 'polka dot', 'striped', 'Canadian flag'. Values are typically expressed as text, although links to controlled value schemes are also supported. */
  'pattern': string | DefinedTerm | string | DefinedTerm[];
  /** The position of an item in a series or sequence of items. */
  'position': number | string;
  /** The person or organization who produced the work (e.g. music album, movie, tv/radio series etc.). */
  'producer': Organization | Person;
  /** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
  'provider': Organization | Person;
  /** A publication event associated with the item. */
  'publication': PublicationEvent | PublicationEvent[];
  /** The publisher of the creative work. */
  'publisher': Organization | Person;
  /** The publishing division which published the comic. */
  'publisherImprint': Organization;
  /** The publishingPrinciples property indicates (typically via [[URL]]) a document describing the editorial principles of an [[Organization]] (or individual e.g. a [[Person]] writing a blog) that relate to their activities as a publisher, e.g. ethics or diversity policies. When applied to a [[CreativeWork]] (e.g. [[NewsArticle]]) the principles are those of the party primarily responsible for the creation of the [[CreativeWork]].

While such policies are most typically expressed in natural language, sometimes related information (e.g. indicating a [[funder]]) can be expressed using schema.org terminology.
 */
  'publishingPrinciples': string | CreativeWork;
  /** The Event where the CreativeWork was recorded. The CreativeWork may capture all or part of the event. */
  'recordedAt': Event_;
  /** The place and time the release was issued, expressed as a PublicationEvent. */
  'releasedEvent': PublicationEvent;
  /** A review of the item. */
  'review': Review | Review[];
  /** Review of the item. */
  'reviews': Review | Review[];
  /** Indicates (by URL or string) a particular version of a schema used in some CreativeWork. This property was created primarily to
    indicate the use of a specific schema.org release, e.g. ```10.0``` as a simple string, or more explicitly via URL, ```https://schema.org/docs/releases.html#v10.0```. There may be situations in which other schemas might usefully be referenced this way, e.g. ```http://dublincore.org/specifications/dublin-core/dces/1999-07-02/``` but this has not been carefully explored in the community. */
  'schemaVersion': string | string | string | string[];
  /** Indicates the date on which the current structured data was generated / published. Typically used alongside [[sdPublisher]] */
  'sdDatePublished': string | string[];
  /** A license document that applies to this structured data, typically indicated by URL. */
  'sdLicense': string | CreativeWork | string | CreativeWork[];
  /** Indicates the party responsible for generating and publishing the current structured data markup, typically in cases where the structured data is derived automatically from existing published content but published on a different site. For example, student projects and open data initiatives often re-publish existing content with more explicitly structured metadata. The
[[sdPublisher]] property helps make such practices more explicit. */
  'sdPublisher': Organization | Person | Organization | Person[];
  /** A standardized size of a product or creative work, specified either through a simple textual string (for example 'XL', '32Wx34L'), a  QuantitativeValue with a unitCode, or a comprehensive and structured [[SizeSpecification]]; in other cases, the [[width]], [[height]], [[depth]] and [[weight]] properties may be more applicable.  */
  'size': string | DefinedTerm | QuantitativeValue | SizeSpecification | string | DefinedTerm | QuantitativeValue | SizeSpecification[];
  /** The Organization on whose behalf the creator was working. */
  'sourceOrganization': Organization;
  /** The "spatial" property can be used in cases when more specific properties
(e.g. [[locationCreated]], [[spatialCoverage]], [[contentLocation]]) are not known to be appropriate. */
  'spatial': Place;
  /** The spatialCoverage of a CreativeWork indicates the place(s) which are the focus of the content. It is a subproperty of
      contentLocation intended primarily for more technical and detailed materials. For example with a Dataset, it indicates
      areas that the dataset describes: a dataset of New York weather would have spatialCoverage which was the place: the state of New York. */
  'spatialCoverage': Place;
  /** A person or organization that supports a thing through a pledge, promise, or financial contribution. e.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
  'sponsor': Organization | Person | Organization | Person[];
  /** The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term. */
  'teaches': string | DefinedTerm;
  /** The "temporal" property can be used in cases where more specific properties
(e.g. [[temporalCoverage]], [[dateCreated]], [[dateModified]], [[datePublished]]) are not known to be appropriate. */
  'temporal': string | string;
  /** The temporalCoverage of a CreativeWork indicates the period that the content applies to, i.e. that it describes, either as a DateTime or as a textual string indicating a time period in [ISO 8601 time interval format](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals). In
      the case of a Dataset it will typically indicate the relevant time period in a precise notation (e.g. for a 2011 census dataset, the year 2011 would be written "2011/2012"). Other forms of content e.g. ScholarlyArticle, Book, TVSeries or TVEpisode may indicate their temporalCoverage in broader terms - textually or via well-known URL.
      Written works such as books may sometimes have precise temporal coverage too, e.g. a work set in 1939 - 1945 can be indicated in ISO 8601 interval format format via "1939/1945".

Open-ended date ranges can be written with ".." in place of the end date. For example, "2015-11/.." indicates a range beginning in November 2015 and with no specified final date. This is tentative and might be updated in future when ISO 8601 is officially updated. */
  'temporalCoverage': string | string | string;
  /** The textual content of this CreativeWork. */
  'text': string;
  /** A thumbnail image relevant to the Thing. */
  'thumbnailUrl': string | string[];
  /** Approximate or typical time it takes to work with or through this learning resource for the typical intended target audience, e.g. 'PT30M', 'PT1H25M'. */
  'timeRequired': string;
  /** The work that this work has been translated from. e.g. 物种起源 is a translationOf “On the Origin of Species” */
  'translationOfWork': CreativeWork;
  /** Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event. */
  'translator': Organization | Person | Organization | Person[];
  /** The typical expected age range, e.g. '7-9', '11-'. */
  'typicalAgeRange': string;
  /** The schema.org [[usageInfo]] property indicates further information about a [[CreativeWork]]. This property is applicable both to works that are freely available and to those that require payment or other transactions. It can reference additional information e.g. community expectations on preferred linking and citation conventions, as well as purchasing details. For something that can be commercially licensed, usageInfo can provide detailed, resource-specific information about licensing options.

This property can be used alongside the license property which indicates license(s) applicable to some piece of content. The usageInfo property can provide information about other licensing options, e.g. acquiring commercial usage rights for an image that is also available under non-commercial creative commons licenses. */
  'usageInfo': string | CreativeWork;
  /** The version of the CreativeWork embodied by a specified resource. */
  'version': number | string;
  /** An embedded video object. */
  'video': Clip | VideoObject | Clip | VideoObject[];
  /** Example/instance/realization/derivation of the concept of this creative work. eg. The paperback edition, first edition, or eBook. */
  'workExample': CreativeWork | CreativeWork[];
  /** A work that is a translation of the content of this work. e.g. 西遊記 has an English workTranslation “Journey to the West”,a German workTranslation “Monkeys Pilgerfahrt” and a Vietnamese  translation Tây du ký bình khảo. */
  'workTranslation': CreativeWork | CreativeWork[];
};



/** A point value or interval for product characteristics and other purposes. */
type QuantitativeValue = StructuredValue & {

  /** A property-value pair representing an additional characteristics of the entitity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.\n\nNote: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism.
 */
  'additionalProperty': PropertyValue | PropertyValue[];
  /** The upper value of some characteristic or property. */
  'maxValue': number;
  /** The lower value of some characteristic or property. */
  'minValue': number;
  /** The unit of measurement given using the UN/CEFACT Common Code (3 characters) or a URL. Other codes than the UN/CEFACT Common Code may be used with a prefix followed by a colon. */
  'unitCode': string | string;
  /** A string or text indicating the unit of measurement. Useful if you cannot provide a standard unit code for
unitCode. */
  'unitText': string | string[];
  /** The value of the quantitative value or property value node.\n\n* For [[QuantitativeValue]] and [[MonetaryAmount]], the recommended type for values is 'Number'.\n* For [[PropertyValue]], it can be 'Text;', 'Number', 'Boolean', or 'StructuredValue'.\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. */
  'value': boolean | number | string | StructuredValue;
  /** A secondary value that provides additional information on the original value, e.g. a reference temperature or a type of measurement. */
  'valueReference': string | DefinedTerm | Enumeration | MeasurementTypeEnumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue | string | DefinedTerm | Enumeration | MeasurementTypeEnumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue[];
};



/** A diet restricted to certain foods or preparations for cultural, religious, health or lifestyle reasons.  */
type RestrictedDiet = string;

/** A monetary value or range. This type can be used to describe an amount of money such as $50 USD, or a range as in describing a bank account being suitable for a balance between £1,000 and £1,000,000 GBP, or the value of a salary, etc. It is recommended to use [[PriceSpecification]] Types to describe the price of an Offer, Invoice, etc. */
type MonetaryAmount = StructuredValue & {

  /** The currency in which the monetary amount is expressed.\n\nUse standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217) e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies e.g. "BTC"; well known names for [Local Exchange Tradings Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types e.g. "Ithaca HOUR". */
  'currency': string;
  /** The upper value of some characteristic or property. */
  'maxValue': number;
  /** The lower value of some characteristic or property. */
  'minValue': number;
  /** The date when the item becomes valid. */
  'validFrom': string | string;
  /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
  'validThrough': string | string;
  /** The value of the quantitative value or property value node.\n\n* For [[QuantitativeValue]] and [[MonetaryAmount]], the recommended type for values is 'Number'.\n* For [[PropertyValue]], it can be 'Text;', 'Number', 'Boolean', or 'StructuredValue'.\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. */
  'value': boolean | number | string | StructuredValue;
};



/** A sub-grouping of steps in the instructions for how to achieve a result (e.g. steps for making a pie crust within a pie recipe). */
type HowToSection = CreativeWork & ItemList & ListItem & {

  /** A single step item (as HowToStep, text, document, video, etc.) or a HowToSection (originally misnamed 'steps'; 'step' is preferred). */
  'steps': MaybeArray<string | CreativeWork> | MaybeArray<string | CreativeWork>[];
};



/** A step in the instructions for how to achieve a result. It is an ordered list with HowToDirection and/or HowToTip items. */
type HowToStep = CreativeWork & ItemList & ListItem & {

};



/** A supply consumed when performing the instructions for how to achieve a result. */
type HowToSupply = HowToItem & {

  /** The estimated cost of the supply or supplies consumed when performing instructions. */
  'estimatedCost': string | MonetaryAmount;
};



/** A tool used (but not consumed) when performing instructions for how to achieve a result. */
type HowToTool = HowToItem & {

};



/** Structured values are used when the value of a property has a more complex structure than simply being a textual value or a reference to another thing. */
type StructuredValue = Intangible & {

};



/** A property-value pair, e.g. representing a feature of a product or place. Use the 'name' property for the name of the property. If there is an additional human-readable version of the value, put that into the 'description' property.\n\n Always use specific schema.org properties when a) they exist and b) you can populate them. Using PropertyValue as a substitute will typically not trigger the same effect as using the original, specific property.
     */
type PropertyValue = StructuredValue & {

  /** The upper value of some characteristic or property. */
  'maxValue': number;
  /** A technique or technology used in a [[Dataset]] (or [[DataDownload]], [[DataCatalog]]),
corresponding to the method used for measuring the corresponding variable(s) (described using [[variableMeasured]]). This is oriented towards scientific and scholarly dataset publication but may have broader applicability; it is not intended as a full representation of measurement, but rather as a high level summary for dataset discovery.

For example, if [[variableMeasured]] is: molecule concentration, [[measurementTechnique]] could be: "mass spectrometry" or "nmr spectroscopy" or "colorimetry" or "immunofluorescence".

If the [[variableMeasured]] is "depression rating", the [[measurementTechnique]] could be "Zung Scale" or "HAM-D" or "Beck Depression Inventory".

If there are several [[variableMeasured]] properties recorded for some given data object, use a [[PropertyValue]] for each [[variableMeasured]] and attach the corresponding [[measurementTechnique]].
       */
  'measurementTechnique': string | string | string | string[];
  /** The lower value of some characteristic or property. */
  'minValue': number;
  /** A commonly used identifier for the characteristic represented by the property, e.g. a manufacturer or a standard code for a property. propertyID can be
(1) a prefixed string, mainly meant to be used with standards for product properties; (2) a site-specific, non-prefixed string (e.g. the primary key of the property or the vendor-specific id of the property), or (3)
a URL indicating the type of the property, either pointing to an external vocabulary, or a Web resource that describes the property (e.g. a glossary entry).
Standards bodies should promote a standard prefix for the identifiers of properties from their standards. */
  'propertyID': string | string | string | string[];
  /** The unit of measurement given using the UN/CEFACT Common Code (3 characters) or a URL. Other codes than the UN/CEFACT Common Code may be used with a prefix followed by a colon. */
  'unitCode': string | string;
  /** A string or text indicating the unit of measurement. Useful if you cannot provide a standard unit code for
unitCode. */
  'unitText': string | string[];
  /** The value of the quantitative value or property value node.\n\n* For [[QuantitativeValue]] and [[MonetaryAmount]], the recommended type for values is 'Number'.\n* For [[PropertyValue]], it can be 'Text;', 'Number', 'Boolean', or 'StructuredValue'.\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. */
  'value': boolean | number | string | StructuredValue;
  /** A secondary value that provides additional information on the original value, e.g. a reference temperature or a type of measurement. */
  'valueReference': string | DefinedTerm | Enumeration | MeasurementTypeEnumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue | string | DefinedTerm | Enumeration | MeasurementTypeEnumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue[];
};



/** A word, name, acronym, phrase, etc. with a formal definition. Often used in the context of category or subject classification, glossaries or dictionaries, product or creative work types, etc. Use the name property for the term being defined, use termCode if the term has an alpha-numeric code allocated, use description to provide the definition of the term. */
type DefinedTerm = Intangible & {

  /** A [[DefinedTermSet]] that contains this term. */
  'inDefinedTermSet': string | DefinedTermSet | string | DefinedTermSet[];
  /** A code that identifies this [[DefinedTerm]] within a [[DefinedTermSet]] */
  'termCode': string | string[];
};



/** Lists or enumerations—for example, a list of cuisines or music genres, etc. */
type Enumeration = Intangible & {

  /** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
  'supersededBy': Class | Enumeration | Property | Class | Enumeration | Property[];
};



/** Enumeration of common measurement types (or dimensions), for example "chest" for a person, "inseam" for pants, "gauge" for screws, or "wheel" for bicycles. */
type MeasurementTypeEnumeration = {

};



/** A predefined value for a product characteristic, e.g. the power cord plug type 'US' or the garment sizes 'S', 'M', 'L', and 'XL'. */
type QualitativeValue = {

  /** A property-value pair representing an additional characteristics of the entitity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.\n\nNote: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism.
 */
  'additionalProperty': PropertyValue | PropertyValue[];
  /** This ordering relation for qualitative values indicates that the subject is equal to the object. */
  'equal': QualitativeValue | QualitativeValue[];
  /** This ordering relation for qualitative values indicates that the subject is greater than the object. */
  'greater': QualitativeValue | QualitativeValue[];
  /** This ordering relation for qualitative values indicates that the subject is greater than or equal to the object. */
  'greaterOrEqual': QualitativeValue | QualitativeValue[];
  /** This ordering relation for qualitative values indicates that the subject is lesser than the object. */
  'lesser': QualitativeValue | QualitativeValue[];
  /** This ordering relation for qualitative values indicates that the subject is lesser than or equal to the object. */
  'lesserOrEqual': QualitativeValue | QualitativeValue[];
  /** This ordering relation for qualitative values indicates that the subject is not equal to the object. */
  'nonEqual': QualitativeValue | QualitativeValue[];
  /** A secondary value that provides additional information on the original value, e.g. a reference temperature or a type of measurement. */
  'valueReference': string | DefinedTerm | Enumeration | MeasurementTypeEnumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue | string | DefinedTerm | Enumeration | MeasurementTypeEnumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue[];
};



/** The most generic type of item. */
type Thing = {

  /** undefined */
  '@context': string;
  /** undefined */
  '@type': string;
  /** An additional type for the item, typically used for adding more specific types from external vocabularies in microdata syntax. This is a relationship between something and a class that the thing is in. In RDFa syntax, it is better to use the native RDFa syntax - the 'typeof' attribute - for multiple types. Schema.org tools may have only weaker understanding of extra types, in particular those defined externally. */
  'additionalType': string | string[];
  /** An alias for the item. */
  'alternateName': string | string[];
  /** A description of the item. */
  'description': string | string[];
  /** A sub property of description. A short description of the item used to disambiguate from other, similar items. Information from other properties (in particular, name) may be necessary for the description to be useful for disambiguation. */
  'disambiguatingDescription': string | string[];
  /** The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.
         */
  'identifier': string | string | PropertyValue;
  /** An image of the item. This can be a [[URL]] or a fully described [[ImageObject]]. */
  'image': string | ImageObject | string | ImageObject[];
  /** Indicates a page (or other CreativeWork) for which this thing is the main entity being described. See [background notes](/docs/datamodel.html#mainEntityBackground) for details. */
  'mainEntityOfPage': string | CreativeWork | string | CreativeWork[];
  /** The name of the item. */
  'name': string;
  /** Indicates a potential Action, which describes an idealized action in which this thing would play an 'object' role. */
  'potentialAction': Action | Action[];
  /** URL of a reference Web page that unambiguously indicates the item's identity. E.g. the URL of the item's Wikipedia page, Wikidata entry, or official website. */
  'sameAs': string | string[];
  /** A CreativeWork or Event about this Thing. */
  'subjectOf': CreativeWork | Event_ | CreativeWork | Event_[];
  /** URL of the item. */
  'url': string;
};



/** A list of items of any sort—for example, Top 10 Movies About Weathermen, or Top 100 Party Songs. Not to be confused with HTML lists, which are often used only for formatting. */
type ItemList = Intangible & {

  /** For itemListElement values, you can use simple strings (e.g. "Peter", "Paul", "Mary"), existing entities, or use ListItem.\n\nText values are best if the elements in the list are plain strings. Existing entities are best for a simple, unordered list of existing things in your data. ListItem is used with ordered lists when you want to provide additional context about the element in that list or when the same item might be in different places in different lists.\n\nNote: The order of elements in your mark-up is not sufficient for indicating the order or elements.  Use ListItem with a 'position' property in such cases. */
  'itemListElement': string | ListItem | Thing | string | ListItem | Thing[];
  /** Type of ordering (e.g. Ascending, Descending, Unordered). */
  'itemListOrder': string | ItemListOrderType;
  /** The number of items in an ItemList. Note that some descriptions might not fully describe all items in a list (e.g., multi-page pagination); in such cases, the numberOfItems would be for the entire list. */
  'numberOfItems': number;
};



/** A person (alive, dead, undead, or fictional). */
type Person = Thing & {

  /** An additional name for a Person, can be used for a middle name. */
  'additionalName': string | string[];
  /** Physical address of the item. */
  'address': string | PostalAddress;
  /** An organization that this person is affiliated with. For example, a school/university, a club, or a team. */
  'affiliation': Organization | Organization[];
  /** An organization that the person is an alumni of. */
  'alumniOf': EducationalOrganization | Organization | EducationalOrganization | Organization[];
  /** An award won by or for this item. */
  'award': string | string[];
  /** Awards won by or for this item. */
  'awards': string | string[];
  /** Date of birth. */
  'birthDate': string;
  /** The place where the person was born. */
  'birthPlace': Place;
  /** The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person. */
  'brand': Brand | Organization;
  /** A [callsign](https://en.wikipedia.org/wiki/Call_sign), as used in broadcasting and radio communications to identify people, radio and TV stations, or vehicles. */
  'callSign': string | string[];
  /** A child of the person. */
  'children': Person | Person[];
  /** A colleague of the person. */
  'colleague': string | Person | string | Person[];
  /** A colleague of the person. */
  'colleagues': Person | Person[];
  /** A contact point for a person or organization. */
  'contactPoint': ContactPoint | ContactPoint[];
  /** A contact point for a person or organization. */
  'contactPoints': ContactPoint | ContactPoint[];
  /** Date of death. */
  'deathDate': string;
  /** The place where the person died. */
  'deathPlace': Place;
  /** The Dun & Bradstreet DUNS number for identifying an organization or business person. */
  'duns': string;
  /** Email address. */
  'email': string | string[];
  /** Family name. In the U.S., the last name of a Person. */
  'familyName': string;
  /** The fax number. */
  'faxNumber': string;
  /** The most generic uni-directional social relation. */
  'follows': Person | Person[];
  /** A person or organization that supports (sponsors) something through some kind of financial contribution. */
  'funder': Organization | Person | Organization | Person[];
  /** Gender of something, typically a [[Person]], but possibly also fictional characters, animals, etc. While https://schema.org/Male and https://schema.org/Female may be used, text strings are also acceptable for people who do not identify as a binary gender. The [[gender]] property can also be used in an extended sense to cover e.g. the gender of sports teams. As with the gender of individuals, we do not try to enumerate all possibilities. A mixed-gender [[SportsTeam]] can be indicated with a text value of "Mixed". */
  'gender': string | GenderType;
  /** Given name. In the U.S., the first name of a Person. */
  'givenName': string | string[];
  /** The [Global Location Number](http://www.gs1.org/gln) (GLN, sometimes also referred to as International Location Number or ILN) of the respective organization, person, or place. The GLN is a 13-digit number used to identify parties and physical locations. */
  'globalLocationNumber': string;
  /** A credential awarded to the Person or Organization. */
  'hasCredential': EducationalOccupationalCredential | EducationalOccupationalCredential[];
  /** The Person's occupation. For past professions, use Role for expressing dates. */
  'hasOccupation': Occupation;
  /** Indicates an OfferCatalog listing for this Organization, Person, or Service. */
  'hasOfferCatalog': OfferCatalog | OfferCatalog[];
  /** Points-of-Sales operated by the organization or person. */
  'hasPOS': Place | Place[];
  /** The height of the item. */
  'height': string | QuantitativeValue;
  /** A contact location for a person's residence. */
  'homeLocation': ContactPoint | Place | ContactPoint | Place[];
  /** An honorific prefix preceding a Person's name such as Dr/Mrs/Mr. */
  'honorificPrefix': string | string[];
  /** An honorific suffix following a Person's name such as M.D. /PhD/MSCSW. */
  'honorificSuffix': string | string[];
  /** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. The most specific child type of InteractionCounter should be used. */
  'interactionStatistic': InteractionCounter;
  /** The International Standard of Industrial Classification of All Economic Activities (ISIC), Revision 4 code for a particular organization, business person, or place. */
  'isicV4': string;
  /** The job title of the person (for example, Financial Manager). */
  'jobTitle': string | DefinedTerm;
  /** The most generic bi-directional social/work relation. */
  'knows': Person;
  /** Of a [[Person]], and less typically of an [[Organization]], to indicate a topic that is known about - suggesting possible expertise but not implying it. We do not distinguish skill levels here, or relate this to educational content, events, objectives or [[JobPosting]] descriptions. */
  'knowsAbout': string | string | Thing | string | string | Thing[];
  /** Of a [[Person]], and less typically of an [[Organization]], to indicate a known language. We do not distinguish skill levels or reading/writing/speaking/signing here. Use language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). */
  'knowsLanguage': string | Language | string | Language[];
  /** A pointer to products or services offered by the organization or person. */
  'makesOffer': Offer | Offer[];
  /** An Organization (or ProgramMembership) to which this Person or Organization belongs. */
  'memberOf': Organization | ProgramMembership | Organization | ProgramMembership[];
  /** The North American Industry Classification System (NAICS) code for a particular organization or business person. */
  'naics': string;
  /** Nationality of the person. */
  'nationality': Country | Country[];
  /** The total financial value of the person as calculated by subtracting assets from liabilities. */
  'netWorth': MonetaryAmount | PriceSpecification;
  /** Products owned by the organization or person. */
  'owns': OwnershipInfo | Product | OwnershipInfo | Product[];
  /** A parent of this person. */
  'parent': Person | Person[];
  /** A parents of the person. */
  'parents': Person | Person[];
  /** Event that this person is a performer or participant in. */
  'performerIn': Event_ | Event_[];
  /** The publishingPrinciples property indicates (typically via [[URL]]) a document describing the editorial principles of an [[Organization]] (or individual e.g. a [[Person]] writing a blog) that relate to their activities as a publisher, e.g. ethics or diversity policies. When applied to a [[CreativeWork]] (e.g. [[NewsArticle]]) the principles are those of the party primarily responsible for the creation of the [[CreativeWork]].

While such policies are most typically expressed in natural language, sometimes related information (e.g. indicating a [[funder]]) can be expressed using schema.org terminology.
 */
  'publishingPrinciples': string | CreativeWork;
  /** The most generic familial relation. */
  'relatedTo': Person;
  /** A pointer to products or services sought by the organization or person (demand). */
  'seeks': Demand | Demand[];
  /** A sibling of the person. */
  'sibling': Person | Person[];
  /** A sibling of the person. */
  'siblings': Person | Person[];
  /** A person or organization that supports a thing through a pledge, promise, or financial contribution. e.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
  'sponsor': Organization | Person | Organization | Person[];
  /** The person's spouse. */
  'spouse': Person;
  /** The Tax / Fiscal ID of the organization or person, e.g. the TIN in the US or the CIF/NIF in Spain. */
  'taxID': string;
  /** The telephone number. */
  'telephone': string;
  /** The Value-added Tax ID of the organization or person. */
  'vatID': string;
  /** The weight of the product or person. */
  'weight': QuantitativeValue;
  /** A contact location for a person's place of work. */
  'workLocation': ContactPoint | Place | ContactPoint | Place[];
  /** Organizations that the person works for. */
  'worksFor': Organization | Organization[];
};



/** The average rating based on multiple ratings or reviews. */
type AggregateRating = Rating & {

  /** The item that is being reviewed/rated. */
  'itemReviewed': Thing;
  /** The count of total number of ratings. */
  'ratingCount': number;
  /** The count of total number of reviews. */
  'reviewCount': number;
};



/** A web page. Every web page is implicitly assumed to be declared to be of type WebPage, so the various properties about that webpage, such as breadcrumb may be used. We recommend explicit declaration if these properties are specified, but if they are found outside of an itemscope, they will be assumed to be about the page. */
type WebPage = CreativeWork & {

  /** A set of links that can help a user understand and navigate a website hierarchy. */
  'breadcrumb': string | BreadcrumbList | string | BreadcrumbList[];
  /** Date on which the content on this web page was last reviewed for accuracy and/or completeness. */
  'lastReviewed': string;
  /** Indicates if this web page element is the main subject of the page. */
  'mainContentOfPage': WebPageElement;
  /** Indicates the main image on the page. */
  'primaryImageOfPage': ImageObject;
  /** A link related to this web page, for example to other related web pages. */
  'relatedLink': string | string[];
  /** People or organizations that have reviewed the content on this web page for accuracy and/or completeness. */
  'reviewedBy': Organization | Person | Organization | Person[];
  /** One of the more significant URLs on the page. Typically, these are the non-navigation links that are clicked on the most. */
  'significantLink': string | string[];
  /** The most significant URLs on the page. Typically, these are the non-navigation links that are clicked on the most. */
  'significantLinks': string;
  /** Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech.

The *speakable* property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values:

1.) *id-value* URL references - uses *id-value* of an element in the page being annotated. The simplest use of *speakable* has (potentially relative) URL values, referencing identified sections of the document concerned.

2.) CSS Selectors - addresses content in the annotated page, eg. via class attribute. Use the [[cssSelector]] property.

3.)  XPaths - addresses content via XPaths (assuming an XML view of the content). Use the [[xpath]] property.


For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this
we define a supporting type, [[SpeakableSpecification]]  which is defined to be a possible value of the *speakable* property.
          */
  'speakable': string | SpeakableSpecification | string | SpeakableSpecification[];
  /** One of the domain specialities to which this web page's content applies. */
  'specialty': Specialty | Specialty[];
};



/** A media object, such as an image, video, or audio object embedded in a web page or a downloadable dataset i.e. DataDownload. Note that a creative work may have many media objects associated with it on the same web page. For example, a page about a single song (MusicRecording) may have a music video (VideoObject), and a high and low bandwidth audio stream (2 AudioObject's). */
type MediaObject = CreativeWork & {

  /** A NewsArticle associated with the Media Object. */
  'associatedArticle': NewsArticle | NewsArticle[];
  /** The bitrate of the media object. */
  'bitrate': string;
  /** File size in (mega/kilo) bytes. */
  'contentSize': string;
  /** Actual bytes of the media object, for example the image file or video file. */
  'contentUrl': string;
  /** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601). */
  'duration': string;
  /** A URL pointing to a player for a specific video. In general, this is the information in the ```src``` element of an ```embed``` tag and should not be the same as the content of the ```loc``` tag. */
  'embedUrl': string;
  /** The CreativeWork encoded by this media object. */
  'encodesCreativeWork': CreativeWork;
  /** Media type typically expressed using a MIME format (see [IANA site](http://www.iana.org/assignments/media-types/media-types.xhtml) and [MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)) e.g. application/zip for a SoftwareApplication binary, audio/mpeg for .mp3 etc.).

In cases where a [[CreativeWork]] has several media type representations, [[encoding]] can be used to indicate each [[MediaObject]] alongside particular [[encodingFormat]] information.

Unregistered or niche encoding and file formats can be indicated instead via the most appropriate URL, e.g. defining Web page or a Wikipedia/Wikidata entry. */
  'encodingFormat': string | string;
  /** The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. e.g. John wrote a book from January to *December*. For media, including audio and video, it's the time offset of the end of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
  'endTime': string | string;
  /** The height of the item. */
  'height': string | QuantitativeValue;
  /** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.\n\nSee also [[eligibleRegion]].
       */
  'ineligibleRegion': string | GeoShape | Place;
  /** Used to indicate a specific claim contained, implied, translated or refined from the content of a [[MediaObject]] or other [[CreativeWork]]. The interpreting party can be indicated using [[claimInterpreter]]. */
  'interpretedAsClaim': Claim | Claim[];
  /** Player type required—for example, Flash or Silverlight. */
  'playerType': string | string[];
  /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
  'productionCompany': Organization;
  /** The regions where the media is allowed. If not specified, then it's assumed to be allowed everywhere. Specify the countries in [ISO 3166 format](http://en.wikipedia.org/wiki/ISO_3166). */
  'regionsAllowed': Place;
  /** Indicates if use of the media require a subscription  (either paid or free). Allowed values are ```true``` or ```false``` (note that an earlier version had 'yes', 'no'). */
  'requiresSubscription': boolean | MediaSubscription;
  /** The [SHA-2](https://en.wikipedia.org/wiki/SHA-2) SHA256 hash of the content of the item. For example, a zero-length input has value 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' */
  'sha256': string;
  /** The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. e.g. John wrote a book from *January* to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
  'startTime': string | string;
  /** Date when this media object was uploaded to this site. */
  'uploadDate': string;
  /** The width of the item. */
  'width': string | QuantitativeValue;
};



/** Intended audience for an item, i.e. the group for whom the item was created. */
type Audience = Intangible & {

  /** The target group associated with a given audience (e.g. veterans, car owners, musicians, etc.). */
  'audienceType': string;
  /** The geographic area associated with the audience. */
  'geographicArea': AdministrativeArea;
};



/** An audio file. */
type AudioObject = MediaObject & {

  /** The caption for this object. For downloadable machine formats (closed caption, subtitles etc.) use MediaObject and indicate the [[encodingFormat]]. */
  'caption': string | MediaObject;
  /** Represents textual captioning from a [[MediaObject]], e.g. text of a 'meme'. */
  'embeddedTextCaption': string | string[];
  /** If this MediaObject is an AudioObject or VideoObject, the transcript of that object. */
  'transcript': string;
};



/** A short TV or radio program or a segment/part of a program. */
type Clip = CreativeWork & {

  /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
  'actor': Person | Person[];
  /** An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip. */
  'actors': Person | Person[];
  /** Position of the clip within an ordered group of clips. */
  'clipNumber': number | string;
  /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
  'director': Person;
  /** A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip. */
  'directors': Person | Person[];
  /** The end time of the clip expressed as the number of seconds from the beginning of the work. */
  'endOffset': number | HyperTocEntry;
  /** The composer of the soundtrack. */
  'musicBy': MusicGroup | Person;
  /** The episode to which this clip belongs. */
  'partOfEpisode': Episode;
  /** The season to which this episode belongs. */
  'partOfSeason': CreativeWorkSeason;
  /** The series to which this episode or season belongs. */
  'partOfSeries': CreativeWorkSeries;
  /** The start time of the clip expressed as the number of seconds from the beginning of the work. */
  'startOffset': number | HyperTocEntry;
};



/** A music recording (track), usually a single song. */
type MusicRecording = CreativeWork & {

  /** The artist that performed this album or recording. */
  'byArtist': MusicGroup | Person;
  /** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601). */
  'duration': string;
  /** The album to which this recording belongs. */
  'inAlbum': MusicAlbum;
  /** The playlist to which this recording belongs. */
  'inPlaylist': MusicPlaylist;
  /** The International Standard Recording Code for the recording. */
  'isrcCode': string;
  /** The composition this track is a recording of. */
  'recordingOf': MusicComposition;
};



/** An organization such as a school, NGO, corporation, club, etc. */
type Organization = Thing & {

  /** For a [[NewsMediaOrganization]] or other news-related [[Organization]], a statement about public engagement activities (for news media, the newsroom’s), including involving the public - digitally or otherwise -- in coverage decisions, reporting and activities after publication. */
  'actionableFeedbackPolicy': string | CreativeWork | string | CreativeWork[];
  /** Physical address of the item. */
  'address': string | PostalAddress;
  /** The overall rating, based on a collection of reviews or ratings, of the item. */
  'aggregateRating': AggregateRating;
  /** Alumni of an organization. */
  'alumni': Person | Person[];
  /** The geographic area where a service or offered item is provided. */
  'areaServed': string | AdministrativeArea | GeoShape | Place;
  /** An award won by or for this item. */
  'award': string | string[];
  /** Awards won by or for this item. */
  'awards': string | string[];
  /** The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person. */
  'brand': Brand | Organization;
  /** A contact point for a person or organization. */
  'contactPoint': ContactPoint | ContactPoint[];
  /** A contact point for a person or organization. */
  'contactPoints': ContactPoint | ContactPoint[];
  /** For an [[Organization]] (e.g. [[NewsMediaOrganization]]), a statement describing (in news media, the newsroom’s) disclosure and correction policy for errors. */
  'correctionsPolicy': string | CreativeWork | string | CreativeWork[];
  /** A relationship between an organization and a department of that organization, also described as an organization (allowing different urls, logos, opening hours). For example: a store with a pharmacy, or a bakery with a cafe. */
  'department': Organization | Organization[];
  /** The date that this organization was dissolved. */
  'dissolutionDate': string;
  /** Statement on diversity policy by an [[Organization]] e.g. a [[NewsMediaOrganization]]. For a [[NewsMediaOrganization]], a statement describing the newsroom’s diversity policy on both staffing and sources, typically providing staffing data. */
  'diversityPolicy': string | CreativeWork | string | CreativeWork[];
  /** For an [[Organization]] (often but not necessarily a [[NewsMediaOrganization]]), a report on staffing diversity issues. In a news context this might be for example ASNE or RTDNA (US) reports, or self-reported. */
  'diversityStaffingReport': string | Article | string | Article[];
  /** The Dun & Bradstreet DUNS number for identifying an organization or business person. */
  'duns': string;
  /** Email address. */
  'email': string | string[];
  /** Someone working for this organization. */
  'employee': Person | Person[];
  /** People working for this organization. */
  'employees': Person | Person[];
  /** Statement about ethics policy, e.g. of a [[NewsMediaOrganization]] regarding journalistic and publishing practices, or of a [[Restaurant]], a page describing food source policies. In the case of a [[NewsMediaOrganization]], an ethicsPolicy is typically a statement describing the personal, organizational, and corporate standards of behavior expected by the organization. */
  'ethicsPolicy': string | CreativeWork | string | CreativeWork[];
  /** Upcoming or past event associated with this place, organization, or action. */
  'event': Event_ | Event_[];
  /** Upcoming or past events associated with this place or organization. */
  'events': Event_ | Event_[];
  /** The fax number. */
  'faxNumber': string;
  /** A person who founded this organization. */
  'founder': Person | Person[];
  /** A person who founded this organization. */
  'founders': Person | Person[];
  /** The date that this organization was founded. */
  'foundingDate': string;
  /** The place where the Organization was founded. */
  'foundingLocation': Place;
  /** A person or organization that supports (sponsors) something through some kind of financial contribution. */
  'funder': Organization | Person | Organization | Person[];
  /** The [Global Location Number](http://www.gs1.org/gln) (GLN, sometimes also referred to as International Location Number or ILN) of the respective organization, person, or place. The GLN is a 13-digit number used to identify parties and physical locations. */
  'globalLocationNumber': string;
  /** A credential awarded to the Person or Organization. */
  'hasCredential': EducationalOccupationalCredential | EducationalOccupationalCredential[];
  /** Specifies a MerchantReturnPolicy that may be applicable. */
  'hasMerchantReturnPolicy': MerchantReturnPolicy | MerchantReturnPolicy[];
  /** Indicates an OfferCatalog listing for this Organization, Person, or Service. */
  'hasOfferCatalog': OfferCatalog | OfferCatalog[];
  /** Points-of-Sales operated by the organization or person. */
  'hasPOS': Place | Place[];
  /** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. The most specific child type of InteractionCounter should be used. */
  'interactionStatistic': InteractionCounter;
  /** The International Standard of Industrial Classification of All Economic Activities (ISIC), Revision 4 code for a particular organization, business person, or place. */
  'isicV4': string;
  /** Of a [[Person]], and less typically of an [[Organization]], to indicate a topic that is known about - suggesting possible expertise but not implying it. We do not distinguish skill levels here, or relate this to educational content, events, objectives or [[JobPosting]] descriptions. */
  'knowsAbout': string | string | Thing | string | string | Thing[];
  /** Of a [[Person]], and less typically of an [[Organization]], to indicate a known language. We do not distinguish skill levels or reading/writing/speaking/signing here. Use language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). */
  'knowsLanguage': string | Language | string | Language[];
  /** The official name of the organization, e.g. the registered company name. */
  'legalName': string;
  /** An organization identifier that uniquely identifies a legal entity as defined in ISO 17442. */
  'leiCode': string | string[];
  /** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
  'location': string | Place | PostalAddress | VirtualLocation;
  /** An associated logo. */
  'logo': string | ImageObject | string | ImageObject[];
  /** A pointer to products or services offered by the organization or person. */
  'makesOffer': Offer | Offer[];
  /** A member of an Organization or a ProgramMembership. Organizations can be members of organizations; ProgramMembership is typically for individuals. */
  'member': Organization | Person | Organization | Person[];
  /** An Organization (or ProgramMembership) to which this Person or Organization belongs. */
  'memberOf': Organization | ProgramMembership | Organization | ProgramMembership[];
  /** A member of this organization. */
  'members': Organization | Person | Organization | Person[];
  /** The North American Industry Classification System (NAICS) code for a particular organization or business person. */
  'naics': string;
  /** nonprofit Status indicates the legal status of a non-profit organization in its primary place of business. */
  'nonprofitStatus': NonprofitType | NonprofitType[];
  /** The number of employees in an organization e.g. business. */
  'numberOfEmployees': QuantitativeValue;
  /** For an [[Organization]] (often but not necessarily a [[NewsMediaOrganization]]), a description of organizational ownership structure; funding and grants. In a news/media setting, this is with particular reference to editorial independence.   Note that the [[funder]] is also available and can be used to make basic funder information machine-readable. */
  'ownershipFundingInfo': string | string | AboutPage | CreativeWork | string | string | AboutPage | CreativeWork[];
  /** Products owned by the organization or person. */
  'owns': OwnershipInfo | Product | OwnershipInfo | Product[];
  /** The larger organization that this organization is a [[subOrganization]] of, if any. */
  'parentOrganization': Organization;
  /** The publishingPrinciples property indicates (typically via [[URL]]) a document describing the editorial principles of an [[Organization]] (or individual e.g. a [[Person]] writing a blog) that relate to their activities as a publisher, e.g. ethics or diversity policies. When applied to a [[CreativeWork]] (e.g. [[NewsArticle]]) the principles are those of the party primarily responsible for the creation of the [[CreativeWork]].

While such policies are most typically expressed in natural language, sometimes related information (e.g. indicating a [[funder]]) can be expressed using schema.org terminology.
 */
  'publishingPrinciples': string | CreativeWork;
  /** A review of the item. */
  'review': Review | Review[];
  /** Review of the item. */
  'reviews': Review | Review[];
  /** A pointer to products or services sought by the organization or person (demand). */
  'seeks': Demand | Demand[];
  /** The geographic area where the service is provided. */
  'serviceArea': AdministrativeArea | GeoShape | Place;
  /** A slogan or motto associated with the item. */
  'slogan': string | string[];
  /** A person or organization that supports a thing through a pledge, promise, or financial contribution. e.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
  'sponsor': Organization | Person | Organization | Person[];
  /** A relationship between two organizations where the first includes the second, e.g., as a subsidiary. See also: the more specific 'department' property. */
  'subOrganization': Organization | Organization[];
  /** The Tax / Fiscal ID of the organization or person, e.g. the TIN in the US or the CIF/NIF in Spain. */
  'taxID': string;
  /** The telephone number. */
  'telephone': string;
  /** For an [[Organization]] (typically a [[NewsMediaOrganization]]), a statement about policy on use of unnamed sources and the decision process required. */
  'unnamedSourcesPolicy': string | CreativeWork | string | CreativeWork[];
  /** The Value-added Tax ID of the organization or person. */
  'vatID': string;
};



/** A comment on an item - for example, a comment on a blog post. The comment's content is expressed via the [[text]] property, and its topic via [[about]], properties shared with all CreativeWorks. */
type Comment_ = CreativeWork & {

  /** The number of downvotes this question, answer or comment has received from the community. */
  'downvoteCount': number;
  /** The parent of a question, answer or item in general. */
  'parentItem': Comment_;
  /** The number of upvotes this question, answer or comment has received from the community. */
  'upvoteCount': number;
};



/** Entities that have a somewhat fixed, physical extension. */
type Place = Thing & {

  /** A property-value pair representing an additional characteristics of the entitity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.\n\nNote: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism.
 */
  'additionalProperty': PropertyValue | PropertyValue[];
  /** Physical address of the item. */
  'address': string | PostalAddress;
  /** The overall rating, based on a collection of reviews or ratings, of the item. */
  'aggregateRating': AggregateRating;
  /** An amenity feature (e.g. a characteristic or service) of the Accommodation. This generic property does not make a statement about whether the feature is included in an offer for the main accommodation or available at extra costs. */
  'amenityFeature': LocationFeatureSpecification | LocationFeatureSpecification[];
  /** A short textual code (also called "store code") that uniquely identifies a place of business. The code is typically assigned by the parentOrganization and used in structured URLs.\n\nFor example, in the URL http://www.starbucks.co.uk/store-locator/etc/detail/3047 the code "3047" is a branchCode for a particular branch.
       */
  'branchCode': string | string[];
  /** The basic containment relation between a place and one that contains it. */
  'containedIn': Place;
  /** The basic containment relation between a place and one that contains it. */
  'containedInPlace': Place;
  /** The basic containment relation between a place and another that it contains. */
  'containsPlace': Place;
  /** Upcoming or past event associated with this place, organization, or action. */
  'event': Event_ | Event_[];
  /** Upcoming or past events associated with this place or organization. */
  'events': Event_ | Event_[];
  /** The fax number. */
  'faxNumber': string;
  /** The geo coordinates of the place. */
  'geo': GeoCoordinates | GeoShape;
  /** Represents a relationship between two geometries (or the places they represent), relating a containing geometry to a contained geometry. "a contains b iff no points of b lie in the exterior of a, and at least one point of the interior of b lies in the interior of a". As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoContains': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that covers it. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoCoveredBy': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents a relationship between two geometries (or the places they represent), relating a covering geometry to a covered geometry. "Every point of b is a point of (the interior or boundary of) a". As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoCovers': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that crosses it: "a crosses b: they have some but not all interior points in common, and the dimension of the intersection is less than that of at least one of them". As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoCrosses': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents spatial relations in which two geometries (or the places they represent) are topologically disjoint: they have no point in common. They form a set of disconnected geometries." (a symmetric relationship, as defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM)) */
  'geoDisjoint': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents spatial relations in which two geometries (or the places they represent) are topologically equal, as defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). "Two geometries are topologically equal if their interiors intersect and no part of the interior or boundary of one geometry intersects the exterior of the other" (a symmetric relationship) */
  'geoEquals': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents spatial relations in which two geometries (or the places they represent) have at least one point in common. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoIntersects': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that geospatially overlaps it, i.e. they have some but not all points in common. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoOverlaps': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents spatial relations in which two geometries (or the places they represent) touch: they have at least one boundary point in common, but no interior points." (a symmetric relationship, as defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM) ) */
  'geoTouches': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents a relationship between two geometries (or the places they represent), relating a geometry to one that contains it, i.e. it is inside (i.e. within) its interior. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoWithin': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** The [Global Location Number](http://www.gs1.org/gln) (GLN, sometimes also referred to as International Location Number or ILN) of the respective organization, person, or place. The GLN is a 13-digit number used to identify parties and physical locations. */
  'globalLocationNumber': string;
  /** Indicates whether some facility (e.g. [[FoodEstablishment]], [[CovidTestingFacility]]) offers a service that can be used by driving through in a car. In the case of [[CovidTestingFacility]] such facilities could potentially help with social distancing from other potentially-infected users. */
  'hasDriveThroughService': boolean;
  /** A URL to a map of the place. */
  'hasMap': string | Map_ | string | Map_[];
  /** A flag to signal that the item, event, or place is accessible for free. */
  'isAccessibleForFree': boolean;
  /** The International Standard of Industrial Classification of All Economic Activities (ISIC), Revision 4 code for a particular organization, business person, or place. */
  'isicV4': string;
  /** The latitude of a location. For example ```37.42242``` ([WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System)). */
  'latitude': number | string;
  /** An associated logo. */
  'logo': string | ImageObject | string | ImageObject[];
  /** The longitude of a location. For example ```-122.08585``` ([WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System)). */
  'longitude': number | string;
  /** A URL to a map of the place. */
  'map': string | string[];
  /** A URL to a map of the place. */
  'maps': string | string[];
  /** The total number of individuals that may attend an event or venue. */
  'maximumAttendeeCapacity': number;
  /** The opening hours of a certain place. */
  'openingHoursSpecification': OpeningHoursSpecification;
  /** A photograph of this place. */
  'photo': ImageObject | Photograph | ImageObject | Photograph[];
  /** Photographs of this place. */
  'photos': ImageObject | Photograph | ImageObject | Photograph[];
  /** A flag to signal that the [[Place]] is open to public visitors.  If this property is omitted there is no assumed default boolean value */
  'publicAccess': boolean;
  /** A review of the item. */
  'review': Review | Review[];
  /** Review of the item. */
  'reviews': Review | Review[];
  /** A slogan or motto associated with the item. */
  'slogan': string | string[];
  /** Indicates whether it is allowed to smoke in the place, e.g. in the restaurant, hotel or hotel room. */
  'smokingAllowed': boolean;
  /** The special opening hours of a certain place.\n\nUse this to explicitly override general opening hours brought in scope by [[openingHoursSpecification]] or [[openingHours]].
       */
  'specialOpeningHoursSpecification': OpeningHoursSpecification;
  /** The telephone number. */
  'telephone': string;
  /** A page providing information on how to book a tour of some [[Place]], such as an [[Accommodation]] or [[ApartmentComplex]] in a real estate setting, as well as other kinds of tours as appropriate. */
  'tourBookingPage': string | string[];
};



/** A rating is an evaluation on a numeric scale, such as 1 to 5 stars. */
type Rating = Intangible & {

  /** The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably. */
  'author': Organization | Person;
  /** The highest value allowed in this rating system. If bestRating is omitted, 5 is assumed. */
  'bestRating': number | string;
  /** A short explanation (e.g. one to two sentences) providing background context and other information that led to the conclusion expressed in the rating. This is particularly applicable to ratings associated with "fact check" markup using [[ClaimReview]]. */
  'ratingExplanation': string | string[];
  /** The rating for the content.\n\nUsage guidelines:\n\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. */
  'ratingValue': number | string;
  /** This Review or Rating is relevant to this part or facet of the itemReviewed. */
  'reviewAspect': string | string[];
  /** The lowest value allowed in this rating system. If worstRating is omitted, 1 is assumed. */
  'worstRating': number | string;
};



/** A [[comment]] that corrects [[CreativeWork]]. */
type CorrectionComment = Comment_ & {

};



/** A country. */
type Country = AdministrativeArea & {

};



/** An intangible item that describes an alignment between a learning resource and a node in an educational framework.

Should not be used where the nature of the alignment can be described using a simple property, for example to express that a resource [[teaches]] or [[assesses]] a competency. */
type AlignmentObject = Intangible & {

  /** A category of alignment between the learning resource and the framework node. Recommended values include: 'requires', 'textComplexity', 'readingLevel', and 'educationalSubject'. */
  'alignmentType': string | string[];
  /** The framework to which the resource being described is aligned. */
  'educationalFramework': string;
  /** The description of a node in an established educational framework. */
  'targetDescription': string;
  /** The name of a node in an established educational framework. */
  'targetName': string;
  /** The URL of a node in an established educational framework. */
  'targetUrl': string;
};



/** Natural languages such as Spanish, Tamil, Hindi, English, etc. Formal language code tags expressed in [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) can be used via the [[alternateName]] property. The Language type previously also covered programming languages such as Scheme and Lisp, which are now best represented using [[ComputerLanguage]]. */
type Language = Intangible & {

};



/** A summary of how users have interacted with this CreativeWork. In most cases, authors will use a subtype to specify the specific type of interaction. */
type InteractionCounter = StructuredValue & {

  /** The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. e.g. John wrote a book from January to *December*. For media, including audio and video, it's the time offset of the end of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
  'endTime': string | string;
  /** The WebSite or SoftwareApplication where the interactions took place. */
  'interactionService': SoftwareApplication | WebSite;
  /** The Action representing the type of interaction. For up votes, +1s, etc. use [[LikeAction]]. For down votes use [[DislikeAction]]. Otherwise, use the most specific Action. */
  'interactionType': Action;
  /** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
  'location': string | Place | PostalAddress | VirtualLocation;
  /** The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. e.g. John wrote a book from *January* to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
  'startTime': string | string;
  /** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. */
  'userInteractionCount': number;
};



/** A [[Claim]] in Schema.org represents a specific, factually-oriented claim that could be the [[itemReviewed]] in a [[ClaimReview]]. The content of a claim can be summarized with the [[text]] property. Variations on well known claims can have their common identity indicated via [[sameAs]] links, and summarized with a [[name]]. Ideally, a [[Claim]] description includes enough contextual information to minimize the risk of ambiguity or inclarity. In practice, many claims are better understood in the context in which they appear or the interpretations provided by claim reviews.

  Beyond [[ClaimReview]], the Claim type can be associated with related creative works - for example a [[ScholarlyArticle]] or [[Question]] might be [[about]] some [[Claim]].

  At this time, Schema.org does not define any types of relationship between claims. This is a natural area for future exploration.
   */
type Claim = CreativeWork & {

  /** Indicates an occurence of a [[Claim]] in some [[CreativeWork]]. */
  'appearance': CreativeWork | CreativeWork[];
  /** For a [[Claim]] interpreted from [[MediaObject]] content
    sed to indicate a claim contained, implied or refined from the content of a [[MediaObject]]. */
  'claimInterpreter': Organization | Person | Organization | Person[];
  /** Indicates the first known occurence of a [[Claim]] in some [[CreativeWork]]. */
  'firstAppearance': CreativeWork | CreativeWork[];
};



/** Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online. */
type Product = Thing & {

  /** A property-value pair representing an additional characteristics of the entitity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.\n\nNote: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism.
 */
  'additionalProperty': PropertyValue | PropertyValue[];
  /** The overall rating, based on a collection of reviews or ratings, of the item. */
  'aggregateRating': AggregateRating;
  /** An intended audience, i.e. a group for whom something was created. */
  'audience': Audience;
  /** An award won by or for this item. */
  'award': string | string[];
  /** Awards won by or for this item. */
  'awards': string | string[];
  /** The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person. */
  'brand': Brand | Organization;
  /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
  'category': string | string | PhysicalActivityCategory | Thing | string | string | PhysicalActivityCategory | Thing[];
  /** The color of the product. */
  'color': string;
  /** The place where the product was assembled. */
  'countryOfAssembly': string;
  /** The place where the item (typically [[Product]]) was last processed and tested before importation. */
  'countryOfLastProcessing': string;
  /** The country of origin of something, including products as well as creative  works such as movie and TV content.

In the case of TV and movie, this would be the country of the principle offices of the production company or individual responsible for the movie. For other kinds of [[CreativeWork]] it is difficult to provide fully general guidance, and properties such as [[contentLocation]] and [[locationCreated]] may be more applicable.

In the case of products, the country of origin of the product. The exact interpretation of this may vary by context and product type, and cannot be fully enumerated here. */
  'countryOfOrigin': Country;
  /** The depth of the item. */
  'depth': string | QuantitativeValue;
  /** A Global Trade Item Number ([GTIN](https://www.gs1.org/standards/id-keys/gtin)). GTINs identify trade items, including products and services, using numeric identification codes. The [[gtin]] property generalizes the earlier [[gtin8]], [[gtin12]], [[gtin13]], and [[gtin14]] properties. The GS1 [digital link specifications](https://www.gs1.org/standards/Digital-Link/) express GTINs as URLs. A correct [[gtin]] value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a [valid GS1 check digit](https://www.gs1.org/services/check-digit-calculator) and meet the other rules for valid GTINs. See also [GS1's GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) and [Wikipedia](https://en.wikipedia.org/wiki/Global_Trade_Item_Number) for more details. Left-padding of the gtin values is not required or encouraged.
    */
  'gtin': string | string[];
  /** The GTIN-12 code of the product, or the product to which the offer refers. The GTIN-12 is the 12-digit GS1 Identification Key composed of a U.P.C. Company Prefix, Item Reference, and Check Digit used to identify trade items. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin12': string;
  /** The GTIN-13 code of the product, or the product to which the offer refers. This is equivalent to 13-digit ISBN codes and EAN UCC-13. Former 12-digit UPC codes can be converted into a GTIN-13 code by simply adding a preceding zero. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin13': string;
  /** The GTIN-14 code of the product, or the product to which the offer refers. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin14': string;
  /** The GTIN-8 code of the product, or the product to which the offer refers. This code is also known as EAN/UCC-8 or 8-digit EAN. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin8': string;
  /** Defines the energy efficiency Category (also known as "class" or "rating") for a product according to an international energy efficiency standard. */
  'hasEnergyConsumptionDetails': EnergyConsumptionDetails | EnergyConsumptionDetails[];
  /** A product measurement, for example the inseam of pants, the wheel size of a bicycle, or the gauge of a screw. Usually an exact measurement, but can also be a range of measurements for adjustable products, for example belts and ski bindings. */
  'hasMeasurement': QuantitativeValue | QuantitativeValue[];
  /** Specifies a MerchantReturnPolicy that may be applicable. */
  'hasMerchantReturnPolicy': MerchantReturnPolicy | MerchantReturnPolicy[];
  /** The height of the item. */
  'height': string | QuantitativeValue;
  /** Indicates the [[productGroupID]] for a [[ProductGroup]] that this product [[isVariantOf]].  */
  'inProductGroupWithID': string | string[];
  /** A pointer to another product (or multiple products) for which this product is an accessory or spare part. */
  'isAccessoryOrSparePartFor': Product | Product[];
  /** A pointer to another product (or multiple products) for which this product is a consumable. */
  'isConsumableFor': Product | Product[];
  /** A pointer to another, somehow related product (or multiple products). */
  'isRelatedTo': Product | Service | Product | Service[];
  /** A pointer to another, functionally similar product (or multiple products). */
  'isSimilarTo': Product | Service | Product | Service[];
  /** Indicates the kind of product that this is a variant of. In the case of [[ProductModel]], this is a pointer (from a ProductModel) to a base product from which this product is a variant. It is safe to infer that the variant inherits all product features from the base model, unless defined locally. This is not transitive. In the case of a [[ProductGroup]], the group description also serves as a template, representing a set of Products that vary on explicitly defined, specific dimensions only (so it defines both a set of variants, as well as which values distinguish amongst those variants). When used with [[ProductGroup]], this property can apply to any [[Product]] included in the group. */
  'isVariantOf': ProductGroup | ProductModel | ProductGroup | ProductModel[];
  /** A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. */
  'itemCondition': OfferItemCondition | OfferItemCondition[];
  /** An associated logo. */
  'logo': string | ImageObject | string | ImageObject[];
  /** The manufacturer of the product. */
  'manufacturer': Organization;
  /** A material that something is made from, e.g. leather, wool, cotton, paper. */
  'material': string | string | Product | string | string | Product[];
  /** The model of the product. Use with the URL of a ProductModel or a textual representation of the model identifier. The URL of the ProductModel can be from an external source. It is recommended to additionally provide strong product identifiers via the gtin8/gtin13/gtin14 and mpn properties. */
  'model': string | ProductModel;
  /** The Manufacturer Part Number (MPN) of the product, or the product to which the offer refers. */
  'mpn': string;
  /** Indicates the [NATO stock number](https://en.wikipedia.org/wiki/NATO_Stock_Number) (nsn) of a [[Product]].  */
  'nsn': string | string[];
  /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer.
       */
  'offers': Demand | Offer | Demand | Offer[];
  /** A pattern that something has, for example 'polka dot', 'striped', 'Canadian flag'. Values are typically expressed as text, although links to controlled value schemes are also supported. */
  'pattern': string | DefinedTerm | string | DefinedTerm[];
  /** The product identifier, such as ISBN. For example: ``` meta itemprop="productID" content="isbn:123-456-789" ```. */
  'productID': string;
  /** The date of production of the item, e.g. vehicle. */
  'productionDate': string;
  /** The date the item e.g. vehicle was purchased by the current owner. */
  'purchaseDate': string;
  /** The release date of a product or product model. This can be used to distinguish the exact variant of a product. */
  'releaseDate': string;
  /** A review of the item. */
  'review': Review | Review[];
  /** Review of the item. */
  'reviews': Review | Review[];
  /** A standardized size of a product or creative work, specified either through a simple textual string (for example 'XL', '32Wx34L'), a  QuantitativeValue with a unitCode, or a comprehensive and structured [[SizeSpecification]]; in other cases, the [[width]], [[height]], [[depth]] and [[weight]] properties may be more applicable.  */
  'size': string | DefinedTerm | QuantitativeValue | SizeSpecification | string | DefinedTerm | QuantitativeValue | SizeSpecification[];
  /** The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a product or service, or the product to which the offer refers. */
  'sku': string;
  /** A slogan or motto associated with the item. */
  'slogan': string | string[];
  /** The weight of the product or person. */
  'weight': QuantitativeValue;
  /** The width of the item. */
  'width': string | QuantitativeValue;
};



/** A demand entity represents the public, not necessarily binding, not necessarily exclusive, announcement by an organization or person to seek a certain type of goods or services. For describing demand using this type, the very same properties used for Offer apply. */
type Demand = Intangible & {

  /** The payment method(s) accepted by seller for this offer. */
  'acceptedPaymentMethod': LoanOrCredit | PaymentMethod;
  /** The amount of time that is required between accepting the offer and the actual usage of the resource or service. */
  'advanceBookingRequirement': QuantitativeValue;
  /** The geographic area where a service or offered item is provided. */
  'areaServed': string | AdministrativeArea | GeoShape | Place;
  /** The availability of this item—for example In stock, Out of stock, Pre-order, etc. */
  'availability': ItemAvailability;
  /** The end of the availability of the product or service included in the offer. */
  'availabilityEnds': string | string | string;
  /** The beginning of the availability of the product or service included in the offer. */
  'availabilityStarts': string | string | string;
  /** The place(s) from which the offer can be obtained (e.g. store locations). */
  'availableAtOrFrom': Place;
  /** The delivery method(s) available for this offer. */
  'availableDeliveryMethod': DeliveryMethod;
  /** The business function (e.g. sell, lease, repair, dispose) of the offer or component of a bundle (TypeAndQuantityNode). The default is http://purl.org/goodrelations/v1#Sell. */
  'businessFunction': BusinessFunction;
  /** The typical delay between the receipt of the order and the goods either leaving the warehouse or being prepared for pickup, in case the delivery method is on site pickup. */
  'deliveryLeadTime': QuantitativeValue;
  /** The type(s) of customers for which the given offer is valid. */
  'eligibleCustomerType': BusinessEntityType;
  /** The duration for which the given offer is valid. */
  'eligibleDuration': QuantitativeValue;
  /** The interval and unit of measurement of ordering quantities for which the offer or price specification is valid. This allows e.g. specifying that a certain freight charge is valid only for a certain quantity. */
  'eligibleQuantity': QuantitativeValue;
  /** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is valid.\n\nSee also [[ineligibleRegion]].
     */
  'eligibleRegion': string | GeoShape | Place;
  /** The transaction volume, in a monetary unit, for which the offer or price specification is valid, e.g. for indicating a minimal purchasing volume, to express free shipping above a certain order volume, or to limit the acceptance of credit cards to purchases to a certain minimal amount. */
  'eligibleTransactionVolume': PriceSpecification;
  /** A Global Trade Item Number ([GTIN](https://www.gs1.org/standards/id-keys/gtin)). GTINs identify trade items, including products and services, using numeric identification codes. The [[gtin]] property generalizes the earlier [[gtin8]], [[gtin12]], [[gtin13]], and [[gtin14]] properties. The GS1 [digital link specifications](https://www.gs1.org/standards/Digital-Link/) express GTINs as URLs. A correct [[gtin]] value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a [valid GS1 check digit](https://www.gs1.org/services/check-digit-calculator) and meet the other rules for valid GTINs. See also [GS1's GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) and [Wikipedia](https://en.wikipedia.org/wiki/Global_Trade_Item_Number) for more details. Left-padding of the gtin values is not required or encouraged.
    */
  'gtin': string | string[];
  /** The GTIN-12 code of the product, or the product to which the offer refers. The GTIN-12 is the 12-digit GS1 Identification Key composed of a U.P.C. Company Prefix, Item Reference, and Check Digit used to identify trade items. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin12': string;
  /** The GTIN-13 code of the product, or the product to which the offer refers. This is equivalent to 13-digit ISBN codes and EAN UCC-13. Former 12-digit UPC codes can be converted into a GTIN-13 code by simply adding a preceding zero. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin13': string;
  /** The GTIN-14 code of the product, or the product to which the offer refers. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin14': string;
  /** The GTIN-8 code of the product, or the product to which the offer refers. This code is also known as EAN/UCC-8 or 8-digit EAN. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin8': string;
  /** This links to a node or nodes indicating the exact quantity of the products included in  an [[Offer]] or [[ProductCollection]]. */
  'includesObject': TypeAndQuantityNode | TypeAndQuantityNode[];
  /** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.\n\nSee also [[eligibleRegion]].
       */
  'ineligibleRegion': string | GeoShape | Place;
  /** The current approximate inventory level for the item or items. */
  'inventoryLevel': QuantitativeValue;
  /** A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. */
  'itemCondition': OfferItemCondition | OfferItemCondition[];
  /** An item being offered (or demanded). The transactional nature of the offer or demand is documented using [[businessFunction]], e.g. sell, lease etc. While several common expected types are listed explicitly in this definition, others can be used. Using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
  'itemOffered': AggregateOffer | CreativeWork | Event_ | MenuItem | Product | Service | Trip;
  /** The Manufacturer Part Number (MPN) of the product, or the product to which the offer refers. */
  'mpn': string;
  /** One or more detailed price specifications, indicating the unit price and delivery or payment charges. */
  'priceSpecification': PriceSpecification | PriceSpecification[];
  /** An entity which offers (sells / leases / lends / loans) the services / goods.  A seller may also be a provider. */
  'seller': Organization | Person;
  /** The serial number or any alphanumeric identifier of a particular product. When attached to an offer, it is a shortcut for the serial number of the product included in the offer. */
  'serialNumber': string;
  /** The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a product or service, or the product to which the offer refers. */
  'sku': string;
  /** The date when the item becomes valid. */
  'validFrom': string | string;
  /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
  'validThrough': string | string;
  /** The warranty promise(s) included in the offer. */
  'warranty': WarrantyPromise;
};



/** An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book.\n\nNote: As the [[businessFunction]] property, which identifies the form of offer (e.g. sell, lease, repair, dispose), defaults to http://purl.org/goodrelations/v1#Sell; an Offer without a defined businessFunction value can be assumed to be an offer to sell.\n\nFor [GTIN](http://www.gs1.org/barcodes/technical/idkeys/gtin)-related fields, see [Check Digit calculator](http://www.gs1.org/barcodes/support/check_digit_calculator) and [validation guide](http://www.gs1us.org/resources/standards/gtin-validation-guide) from [GS1](http://www.gs1.org/). */
type Offer = Intangible & {

  /** The payment method(s) accepted by seller for this offer. */
  'acceptedPaymentMethod': LoanOrCredit | PaymentMethod;
  /** An additional offer that can only be obtained in combination with the first base offer (e.g. supplements and extensions that are available for a surcharge). */
  'addOn': Offer | Offer[];
  /** The amount of time that is required between accepting the offer and the actual usage of the resource or service. */
  'advanceBookingRequirement': QuantitativeValue;
  /** The overall rating, based on a collection of reviews or ratings, of the item. */
  'aggregateRating': AggregateRating;
  /** The geographic area where a service or offered item is provided. */
  'areaServed': string | AdministrativeArea | GeoShape | Place;
  /** The availability of this item—for example In stock, Out of stock, Pre-order, etc. */
  'availability': ItemAvailability;
  /** The end of the availability of the product or service included in the offer. */
  'availabilityEnds': string | string | string;
  /** The beginning of the availability of the product or service included in the offer. */
  'availabilityStarts': string | string | string;
  /** The place(s) from which the offer can be obtained (e.g. store locations). */
  'availableAtOrFrom': Place;
  /** The delivery method(s) available for this offer. */
  'availableDeliveryMethod': DeliveryMethod;
  /** The business function (e.g. sell, lease, repair, dispose) of the offer or component of a bundle (TypeAndQuantityNode). The default is http://purl.org/goodrelations/v1#Sell. */
  'businessFunction': BusinessFunction;
  /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
  'category': string | string | PhysicalActivityCategory | Thing | string | string | PhysicalActivityCategory | Thing[];
  /** The typical delay between the receipt of the order and the goods either leaving the warehouse or being prepared for pickup, in case the delivery method is on site pickup. */
  'deliveryLeadTime': QuantitativeValue;
  /** The type(s) of customers for which the given offer is valid. */
  'eligibleCustomerType': BusinessEntityType;
  /** The duration for which the given offer is valid. */
  'eligibleDuration': QuantitativeValue;
  /** The interval and unit of measurement of ordering quantities for which the offer or price specification is valid. This allows e.g. specifying that a certain freight charge is valid only for a certain quantity. */
  'eligibleQuantity': QuantitativeValue;
  /** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is valid.\n\nSee also [[ineligibleRegion]].
     */
  'eligibleRegion': string | GeoShape | Place;
  /** The transaction volume, in a monetary unit, for which the offer or price specification is valid, e.g. for indicating a minimal purchasing volume, to express free shipping above a certain order volume, or to limit the acceptance of credit cards to purchases to a certain minimal amount. */
  'eligibleTransactionVolume': PriceSpecification;
  /** A Global Trade Item Number ([GTIN](https://www.gs1.org/standards/id-keys/gtin)). GTINs identify trade items, including products and services, using numeric identification codes. The [[gtin]] property generalizes the earlier [[gtin8]], [[gtin12]], [[gtin13]], and [[gtin14]] properties. The GS1 [digital link specifications](https://www.gs1.org/standards/Digital-Link/) express GTINs as URLs. A correct [[gtin]] value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a [valid GS1 check digit](https://www.gs1.org/services/check-digit-calculator) and meet the other rules for valid GTINs. See also [GS1's GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) and [Wikipedia](https://en.wikipedia.org/wiki/Global_Trade_Item_Number) for more details. Left-padding of the gtin values is not required or encouraged.
    */
  'gtin': string | string[];
  /** The GTIN-12 code of the product, or the product to which the offer refers. The GTIN-12 is the 12-digit GS1 Identification Key composed of a U.P.C. Company Prefix, Item Reference, and Check Digit used to identify trade items. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin12': string;
  /** The GTIN-13 code of the product, or the product to which the offer refers. This is equivalent to 13-digit ISBN codes and EAN UCC-13. Former 12-digit UPC codes can be converted into a GTIN-13 code by simply adding a preceding zero. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin13': string;
  /** The GTIN-14 code of the product, or the product to which the offer refers. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin14': string;
  /** The GTIN-8 code of the product, or the product to which the offer refers. This code is also known as EAN/UCC-8 or 8-digit EAN. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
  'gtin8': string;
  /** A product measurement, for example the inseam of pants, the wheel size of a bicycle, or the gauge of a screw. Usually an exact measurement, but can also be a range of measurements for adjustable products, for example belts and ski bindings. */
  'hasMeasurement': QuantitativeValue | QuantitativeValue[];
  /** Specifies a MerchantReturnPolicy that may be applicable. */
  'hasMerchantReturnPolicy': MerchantReturnPolicy | MerchantReturnPolicy[];
  /** This links to a node or nodes indicating the exact quantity of the products included in  an [[Offer]] or [[ProductCollection]]. */
  'includesObject': TypeAndQuantityNode | TypeAndQuantityNode[];
  /** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.\n\nSee also [[eligibleRegion]].
       */
  'ineligibleRegion': string | GeoShape | Place;
  /** The current approximate inventory level for the item or items. */
  'inventoryLevel': QuantitativeValue;
  /** A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. */
  'itemCondition': OfferItemCondition | OfferItemCondition[];
  /** An item being offered (or demanded). The transactional nature of the offer or demand is documented using [[businessFunction]], e.g. sell, lease etc. While several common expected types are listed explicitly in this definition, others can be used. Using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
  'itemOffered': AggregateOffer | CreativeWork | Event_ | MenuItem | Product | Service | Trip;
  /** Length of the lease for some [[Accommodation]], either particular to some [[Offer]] or in some cases intrinsic to the property. */
  'leaseLength': string | QuantitativeValue | string | QuantitativeValue[];
  /** The Manufacturer Part Number (MPN) of the product, or the product to which the offer refers. */
  'mpn': string;
  /** A pointer to the organization or person making the offer. */
  'offeredBy': Organization | Person | Organization | Person[];
  /** The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes.\n\nUsage guidelines:\n\n* Use the [[priceCurrency]] property (with standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217) e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies e.g. "BTC"; well known names for [Local Exchange Tradings Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types e.g. "Ithaca HOUR") instead of including [ambiguous symbols](http://en.wikipedia.org/wiki/Dollar_sign#Currencies_that_use_the_dollar_or_peso_sign) such as '$' in the value.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.\n* Note that both [RDFa](http://www.w3.org/TR/xhtml-rdfa-primer/#using-the-content-attribute) and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting.\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
       */
  'price': number | string;
  /** The currency of the price, or a price component when attached to [[PriceSpecification]] and its subtypes.\n\nUse standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217) e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies e.g. "BTC"; well known names for [Local Exchange Tradings Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types e.g. "Ithaca HOUR". */
  'priceCurrency': string;
  /** One or more detailed price specifications, indicating the unit price and delivery or payment charges. */
  'priceSpecification': PriceSpecification | PriceSpecification[];
  /** The date after which the price is no longer available. */
  'priceValidUntil': string;
  /** A review of the item. */
  'review': Review | Review[];
  /** Review of the item. */
  'reviews': Review | Review[];
  /** An entity which offers (sells / leases / lends / loans) the services / goods.  A seller may also be a provider. */
  'seller': Organization | Person;
  /** The serial number or any alphanumeric identifier of a particular product. When attached to an offer, it is a shortcut for the serial number of the product included in the offer. */
  'serialNumber': string;
  /** Indicates information about the shipping policies and options associated with an [[Offer]]. */
  'shippingDetails': OfferShippingDetails | OfferShippingDetails[];
  /** The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a product or service, or the product to which the offer refers. */
  'sku': string;
  /** The date when the item becomes valid. */
  'validFrom': string | string;
  /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
  'validThrough': string | string;
  /** The warranty promise(s) included in the offer. */
  'warranty': WarrantyPromise;
};



/** A PublicationEvent corresponds indifferently to the event of publication for a CreativeWork of any type e.g. a broadcast event, an on-demand event, a book/journal publication via a variety of delivery media. */
type PublicationEvent = Event_ & {

  /** A flag to signal that the item, event, or place is accessible for free. */
  'free': boolean;
  /** An agent associated with the publication event. */
  'publishedBy': Organization | Person | Organization | Person[];
  /** A broadcast service associated with the publication event. */
  'publishedOn': BroadcastService | BroadcastService[];
};



/** An event happening at a certain time and location, such as a concert, lecture, or festival. Ticketing information may be added via the [[offers]] property. Repeated events may be structured as separate Event objects. */
type Event_ = Thing & {

  /** The subject matter of the content. */
  'about': Thing;
  /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
  'actor': Person | Person[];
  /** The overall rating, based on a collection of reviews or ratings, of the item. */
  'aggregateRating': AggregateRating;
  /** A person or organization attending the event. */
  'attendee': Organization | Person | Organization | Person[];
  /** A person attending the event. */
  'attendees': Organization | Person | Organization | Person[];
  /** An intended audience, i.e. a group for whom something was created. */
  'audience': Audience;
  /** The person or organization who wrote a composition, or who is the composer of a work performed at some event. */
  'composer': Organization | Person;
  /** A secondary contributor to the CreativeWork or Event. */
  'contributor': Organization | Person | Organization | Person[];
  /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
  'director': Person;
  /** The time admission will commence. */
  'doorTime': string | string;
  /** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601). */
  'duration': string;
  /** The end date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
  'endDate': string | string;
  /** The eventAttendanceMode of an event indicates whether it occurs online, offline, or a mix. */
  'eventAttendanceMode': EventAttendanceModeEnumeration;
  /** Associates an [[Event]] with a [[Schedule]]. There are circumstances where it is preferable to share a schedule for a series of
      repeating events rather than data on the individual events themselves. For example, a website or application might prefer to publish a schedule for a weekly
      gym class rather than provide data on every event. A schedule could be processed by applications to add forthcoming events to a calendar. An [[Event]] that
      is associated with a [[Schedule]] using this property should not have [[startDate]] or [[endDate]] properties. These are instead defined within the associated
      [[Schedule]], this avoids any ambiguity for clients using the data. The property might have repeated values to specify different schedules, e.g. for different months
      or seasons. */
  'eventSchedule': Schedule | Schedule[];
  /** An eventStatus of an event represents its status; particularly useful when an event is cancelled or rescheduled. */
  'eventStatus': EventStatusType | EventStatusType[];
  /** A person or organization that supports (sponsors) something through some kind of financial contribution. */
  'funder': Organization | Person | Organization | Person[];
  /** The language of the content or performance or used in an action. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[availableLanguage]]. */
  'inLanguage': string | Language;
  /** A flag to signal that the item, event, or place is accessible for free. */
  'isAccessibleForFree': boolean;
  /** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
  'location': string | Place | PostalAddress | VirtualLocation;
  /** The total number of individuals that may attend an event or venue. */
  'maximumAttendeeCapacity': number;
  /** The maximum physical attendee capacity of an [[Event]] whose [[eventAttendanceMode]] is [[OfflineEventAttendanceMode]] (or the offline aspects, in the case of a [[MixedEventAttendanceMode]]).  */
  'maximumPhysicalAttendeeCapacity': number;
  /** The maximum physical attendee capacity of an [[Event]] whose [[eventAttendanceMode]] is [[OnlineEventAttendanceMode]] (or the online aspects, in the case of a [[MixedEventAttendanceMode]]).  */
  'maximumVirtualAttendeeCapacity': number;
  /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer.
       */
  'offers': Demand | Offer | Demand | Offer[];
  /** An organizer of an Event. */
  'organizer': Organization | Person | Organization | Person[];
  /** A performer at the event—for example, a presenter, musician, musical group or actor. */
  'performer': Organization | Person | Organization | Person[];
  /** The main performer or performers of the event—for example, a presenter, musician, or actor. */
  'performers': Organization | Person;
  /** Used in conjunction with eventStatus for rescheduled or cancelled events. This property contains the previously scheduled start date. For rescheduled events, the startDate property should be used for the newly scheduled start date. In the (rare) case of an event that has been postponed and rescheduled multiple times, this field may be repeated. */
  'previousStartDate': string | string[];
  /** The CreativeWork that captured all or part of this Event. */
  'recordedIn': CreativeWork;
  /** The number of attendee places for an event that remain unallocated. */
  'remainingAttendeeCapacity': number;
  /** A review of the item. */
  'review': Review | Review[];
  /** A person or organization that supports a thing through a pledge, promise, or financial contribution. e.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
  'sponsor': Organization | Person | Organization | Person[];
  /** The start date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
  'startDate': string | string;
  /** An Event that is part of this event. For example, a conference event includes many presentations, each of which is a subEvent of the conference. */
  'subEvent': Event_ | Event_[];
  /** Events that are a part of this event. For example, a conference event includes many presentations, each subEvents of the conference. */
  'subEvents': Event_ | Event_[];
  /** An event that this event is a part of. For example, a collection of individual music performances might each have a music festival as their superEvent. */
  'superEvent': Event_ | Event_[];
  /** Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event. */
  'translator': Organization | Person | Organization | Person[];
  /** The typical expected age range, e.g. '7-9', '11-'. */
  'typicalAgeRange': string;
  /** A work featured in some event, e.g. exhibited in an ExhibitionEvent.
       Specific subproperties are available for workPerformed (e.g. a play), or a workPresented (a Movie at a ScreeningEvent). */
  'workFeatured': CreativeWork | CreativeWork[];
  /** A work performed in some event, for example a play performed in a TheaterEvent. */
  'workPerformed': CreativeWork | CreativeWork[];
};



/** A review of an item - for example, of a restaurant, movie, or store. */
type Review = CreativeWork & {

  /** An associated [[ClaimReview]], related by specific common content, topic or claim. The expectation is that this property would be most typically used in cases where a single activity is conducting both claim reviews and media reviews, in which case [[relatedMediaReview]] would commonly be used on a [[ClaimReview]], while [[relatedClaimReview]] would be used on [[MediaReview]]. */
  'associatedClaimReview': Review | Review[];
  /** An associated [[MediaReview]], related by specific common content, topic or claim. The expectation is that this property would be most typically used in cases where a single activity is conducting both claim reviews and media reviews, in which case [[relatedMediaReview]] would commonly be used on a [[ClaimReview]], while [[relatedClaimReview]] would be used on [[MediaReview]]. */
  'associatedMediaReview': Review | Review[];
  /** An associated [[Review]]. */
  'associatedReview': Review | Review[];
  /** The item that is being reviewed/rated. */
  'itemReviewed': Thing;
  /** Indicates, in the context of a [[Review]] (e.g. framed as 'pro' vs 'con' considerations), negative considerations - either as unstructured text, or a list. */
  'negativeNotes': MaybeArray<string | ListItem | WebContent> | MaybeArray<string | ListItem | WebContent>[];
  /** Indicates, in the context of a [[Review]] (e.g. framed as 'pro' vs 'con' considerations), positive considerations - either as unstructured text, or a list. */
  'positiveNotes': MaybeArray<string | ListItem | WebContent> | MaybeArray<string | ListItem | WebContent>[];
  /** This Review or Rating is relevant to this part or facet of the itemReviewed. */
  'reviewAspect': string | string[];
  /** The actual body of the review. */
  'reviewBody': string;
  /** The rating given in this review. Note that reviews can themselves be rated. The ```reviewRating``` applies to rating given by the review. The [[aggregateRating]] property applies to the review itself, as a creative work. */
  'reviewRating': Rating;
};



/** Size related properties of a product, typically a size code ([[name]]) and optionally a [[sizeSystem]], [[sizeGroup]], and product measurements ([[hasMeasurement]]). In addition, the intended audience can be defined through [[suggestedAge]], [[suggestedGender]], and suggested body measurements ([[suggestedMeasurement]]). */
type SizeSpecification = QualitativeValue & {

  /** A product measurement, for example the inseam of pants, the wheel size of a bicycle, or the gauge of a screw. Usually an exact measurement, but can also be a range of measurements for adjustable products, for example belts and ski bindings. */
  'hasMeasurement': QuantitativeValue | QuantitativeValue[];
  /** The size group (also known as "size type") for a product's size. Size groups are common in the fashion industry to define size segments and suggested audiences for wearable products. Multiple values can be combined, for example "men's big and tall", "petite maternity" or "regular" */
  'sizeGroup': string | SizeGroupEnumeration;
  /** The size system used to identify a product's size. Typically either a standard (for example, "GS1" or "ISO-EN13402"), country code (for example "US" or "JP"), or a measuring system (for example "Metric" or "Imperial"). */
  'sizeSystem': string | SizeSystemEnumeration;
  /** The age or age range for the intended audience or person, for example 3-12 months for infants, 1-5 years for toddlers. */
  'suggestedAge': QuantitativeValue;
  /** The suggested gender of the intended person or audience, for example "male", "female", or "unisex". */
  'suggestedGender': string | GenderType;
  /** A suggested range of body measurements for the intended audience or person, for example inseam between 32 and 34 inches or height between 170 and 190 cm. Typically found on a size chart for wearable products. */
  'suggestedMeasurement': QuantitativeValue | QuantitativeValue[];
};



/** A video file. */
type VideoObject = MediaObject & {

  /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
  'actor': Person | Person[];
  /** An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip. */
  'actors': Person | Person[];
  /** The caption for this object. For downloadable machine formats (closed caption, subtitles etc.) use MediaObject and indicate the [[encodingFormat]]. */
  'caption': string | MediaObject;
  /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
  'director': Person;
  /** A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip. */
  'directors': Person | Person[];
  /** Represents textual captioning from a [[MediaObject]], e.g. text of a 'meme'. */
  'embeddedTextCaption': string | string[];
  /** The composer of the soundtrack. */
  'musicBy': MusicGroup | Person;
  /** Thumbnail image for an image or video. */
  'thumbnail': ImageObject;
  /** If this MediaObject is an AudioObject or VideoObject, the transcript of that object. */
  'transcript': string;
  /** The frame size of the video. */
  'videoFrameSize': string;
  /** The quality of the video. */
  'videoQuality': string;
};

/** An list item, e.g. a step in a checklist or how-to description. */
type ListItem = Intangible & {

  /** An entity represented by an entry in a list or data feed (e.g. an 'artist' in a list of 'artists')’. */
  'item': Thing | Thing[];
  /** A link to the ListItem that follows the current one. */
  'nextItem': ListItem | ListItem[];
  /** The position of an item in a series or sequence of items. */
  'position': number | string;
  /** A link to the ListItem that preceeds the current one. */
  'previousItem': ListItem | ListItem[];
};



/** An item used as either a tool or supply when performing the instructions for how to to achieve a result. */
type HowToItem = ListItem & {

  /** The required quantity of the item(s). */
  'requiredQuantity': number | string | QuantitativeValue;
};



/** A NewsArticle is an article whose content reports news, or provides background context and supporting materials for understanding the news.

A more detailed overview of [schema.org News markup](/docs/news.html) is also available.
 */
type NewsArticle = Article & {

  /** A [dateline](https://en.wikipedia.org/wiki/Dateline) is a brief piece of text included in news articles that describes where and when the story was written or filed though the date is often omitted. Sometimes only a placename is provided.

Structured representations of dateline-related information can also be expressed more explicitly using [[locationCreated]] (which represents where a work was created e.g. where a news report was written).  For location depicted or described in the content, use [[contentLocation]].

Dateline summaries are oriented more towards human readers than towards automated processing, and can vary substantially. Some examples: "BEIRUT, Lebanon, June 2.", "Paris, France", "December 19, 2017 11:43AM Reporting from Washington", "Beijing/Moscow", "QUEZON CITY, Philippines".
       */
  'dateline': string;
  /** The number of the column in which the NewsArticle appears in the print edition. */
  'printColumn': string;
  /** The edition of the print product in which the NewsArticle appears. */
  'printEdition': string;
  /** If this NewsArticle appears in print, this field indicates the name of the page on which the article is found. Please note that this field is intended for the exact page name (e.g. A5, B18). */
  'printPage': string;
  /** If this NewsArticle appears in print, this field indicates the print section in which the article appeared. */
  'printSection': string;
};



/** The geographic shape of a place. A GeoShape can be described using several properties whose values are based on latitude/longitude pairs. Either whitespace or commas can be used to separate latitude and longitude; whitespace should be used when writing a list of several such points. */
type GeoShape = StructuredValue & {

  /** Physical address of the item. */
  'address': string | PostalAddress;
  /** The country. For example, USA. You can also provide the two-letter [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1). */
  'addressCountry': string | Country;
  /** A box is the area enclosed by the rectangle formed by two points. The first point is the lower corner, the second point is the upper corner. A box is expressed as two points separated by a space character. */
  'box': string | string[];
  /** A circle is the circular region of a specified radius centered at a specified latitude and longitude. A circle is expressed as a pair followed by a radius in meters. */
  'circle': string | string[];
  /** The elevation of a location ([WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System)). Values may be of the form 'NUMBER UNIT_OF_MEASUREMENT' (e.g., '1,000 m', '3,200 ft') while numbers alone should be assumed to be a value in meters. */
  'elevation': number | string;
  /** A line is a point-to-point path consisting of two or more points. A line is expressed as a series of two or more point objects separated by space. */
  'line': string | string[];
  /** A polygon is the area enclosed by a point-to-point path for which the starting and ending points are the same. A polygon is expressed as a series of four or more space delimited points where the first and final points are identical. */
  'polygon': string | string[];
  /** The postal code. For example, 94043. */
  'postalCode': string;
};



/** A subscription which allows a user to access media including audio, video, books, etc. */
type MediaSubscription = Intangible & {

  /** The Organization responsible for authenticating the user's subscription. For example, many media apps require a cable/satellite provider to authenticate your subscription before playing media. */
  'authenticator': Organization;
  /** An Offer which must be accepted before the user can perform the Action. For example, the user may need to buy a movie before being able to watch it. */
  'expectsAcceptanceOf': Offer | Offer[];
};



/** A HyperToEntry is an item within a [[HyperToc]], which represents a hypertext table of contents for complex media objects, such as [[VideoObject]], [[AudioObject]]. The media object itself is indicated using [[associatedMedia]]. Each section of interest within that content can be described with a [[HyperTocEntry]], with associated [[startOffset]] and [[endOffset]]. When several entries are all from the same file, [[associatedMedia]] is used on the overarching [[HyperTocEntry]]; if the content has been split into multiple files, they can be referenced using [[associatedMedia]] on each [[HyperTocEntry]]. */
type HyperTocEntry = CreativeWork & {

  /** A media object that encodes this CreativeWork. This property is a synonym for encoding. */
  'associatedMedia': MediaObject;
  /** A [[HyperTocEntry]] can have a [[tocContinuation]] indicated, which is another [[HyperTocEntry]] that would be the default next item to play or render. */
  'tocContinuation': HyperTocEntry | HyperTocEntry[];
  /** Text of an utterances (spoken words, lyrics etc.) that occurs at a certain section of a media object, represented as a [[HyperTocEntry]]. */
  'utterances': string | string[];
};



/** A musical group, such as a band, an orchestra, or a choir. Can also be a solo musician. */
type MusicGroup = PerformingGroup & {

  /** A music album. */
  'album': MusicAlbum | MusicAlbum[];
  /** A collection of music albums. */
  'albums': MusicAlbum | MusicAlbum[];
  /** Genre of the creative work, broadcast channel or group. */
  'genre': string | string;
  /** A member of a music group—for example, John, Paul, George, or Ringo. */
  'musicGroupMember': Person | Person[];
  /** A music recording (track)—usually a single song. If an ItemList is given, the list should contain items of type MusicRecording. */
  'track': MaybeArray<MusicRecording> | MaybeArray<MusicRecording>[];
  /** A music recording (track)—usually a single song. */
  'tracks': MusicRecording | MusicRecording[];
};



/** A media episode (e.g. TV, radio, video game) which can be part of a series or season. */
type Episode = CreativeWork & {

  /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
  'actor': Person | Person[];
  /** An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip. */
  'actors': Person | Person[];
  /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
  'director': Person;
  /** A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip. */
  'directors': Person | Person[];
  /** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601). */
  'duration': string;
  /** Position of the episode within an ordered group of episodes. */
  'episodeNumber': number | string;
  /** The composer of the soundtrack. */
  'musicBy': MusicGroup | Person;
  /** The season to which this episode belongs. */
  'partOfSeason': CreativeWorkSeason;
  /** The series to which this episode or season belongs. */
  'partOfSeries': CreativeWorkSeries;
  /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
  'productionCompany': Organization;
  /** The trailer of a movie or tv/radio series, season, episode, etc. */
  'trailer': VideoObject;
};



/** A media season e.g. tv, radio, video game etc. */
type CreativeWorkSeason = CreativeWork & {

  /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
  'actor': Person | Person[];
  /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
  'director': Person;
  /** The end date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
  'endDate': string | string;
  /** An episode of a tv, radio or game media within a series or season. */
  'episode': Episode | Episode[];
  /** An episode of a TV/radio series or season. */
  'episodes': Episode | Episode[];
  /** The number of episodes in this season or series. */
  'numberOfEpisodes': number;
  /** The series to which this episode or season belongs. */
  'partOfSeries': CreativeWorkSeries;
  /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
  'productionCompany': Organization;
  /** Position of the season within an ordered group of seasons. */
  'seasonNumber': number | string;
  /** The start date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
  'startDate': string | string;
  /** The trailer of a movie or tv/radio series, season, episode, etc. */
  'trailer': VideoObject;
};



/** A CreativeWorkSeries in schema.org is a group of related items, typically but not necessarily of the same kind. CreativeWorkSeries are usually organized into some order, often chronological. Unlike [[ItemList]] which is a general purpose data structure for lists of things, the emphasis with CreativeWorkSeries is on published materials (written e.g. books and periodicals, or media such as tv, radio and games).\n\nSpecific subtypes are available for describing [[TVSeries]], [[RadioSeries]], [[MovieSeries]], [[BookSeries]], [[Periodical]] and [[VideoGameSeries]]. In each case, the [[hasPart]] / [[isPartOf]] properties can be used to relate the CreativeWorkSeries to its parts. The general CreativeWorkSeries type serves largely just to organize these more specific and practical subtypes.\n\nIt is common for properties applicable to an item from the series to be usefully applied to the containing group. Schema.org attempts to anticipate some of these cases, but publishers should be free to apply properties of the series parts to the series as a whole wherever they seem appropriate.
	   */
type CreativeWorkSeries = CreativeWork & Series & {

  /** The end date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
  'endDate': string | string;
  /** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
  'issn': string;
  /** The start date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
  'startDate': string | string;
};



/** A delivery service through which content is provided via broadcast over the air or online. */
type BroadcastService = Service & {

  /** The area within which users can expect to reach the broadcast service. */
  'area': Place;
  /** The media network(s) whose content is broadcast on this station. */
  'broadcastAffiliateOf': Organization;
  /** The name displayed in the channel guide. For many US affiliates, it is the network name. */
  'broadcastDisplayName': string;
  /** The frequency used for over-the-air broadcasts. Numeric values or simple ranges e.g. 87-99. In addition a shortcut idiom is supported for frequences of AM and FM radio channels, e.g. "87 FM". */
  'broadcastFrequency': string | BroadcastFrequencySpecification;
  /** The timezone in [ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601) for which the service bases its broadcasts */
  'broadcastTimezone': string;
  /** The organization owning or operating the broadcast service. */
  'broadcaster': Organization;
  /** A [callsign](https://en.wikipedia.org/wiki/Call_sign), as used in broadcasting and radio communications to identify people, radio and TV stations, or vehicles. */
  'callSign': string | string[];
  /** A broadcast channel of a broadcast service. */
  'hasBroadcastChannel': BroadcastChannel_ | BroadcastChannel_[];
  /** The language of the content or performance or used in an action. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[availableLanguage]]. */
  'inLanguage': string | Language;
  /** A broadcast service to which the broadcast service may belong to such as regional variations of a national channel. */
  'parentService': BroadcastService | BroadcastService[];
  /** The type of screening or video broadcast used (e.g. IMAX, 3D, SD, HD, etc.). */
  'videoFormat': string;
};



/** A collection of music tracks. */
type MusicAlbum = MusicPlaylist & {

  /** Classification of the album by it's type of content: soundtrack, live album, studio album, etc. */
  'albumProductionType': MusicAlbumProductionType | MusicAlbumProductionType[];
  /** A release of this album. */
  'albumRelease': MusicRelease | MusicRelease[];
  /** The kind of release which this album is: single, EP or album. */
  'albumReleaseType': MusicAlbumReleaseType;
  /** The artist that performed this album or recording. */
  'byArtist': MusicGroup | Person;
};



/** A collection of music tracks in playlist form. */
type MusicPlaylist = CreativeWork & {

  /** The number of tracks in this album or playlist. */
  'numTracks': number;
  /** A music recording (track)—usually a single song. If an ItemList is given, the list should contain items of type MusicRecording. */
  'track': MaybeArray<MusicRecording> | MaybeArray<MusicRecording>[];
  /** A music recording (track)—usually a single song. */
  'tracks': MusicRecording | MusicRecording[];
};



/** A musical composition. */
type MusicComposition = CreativeWork & {

  /** The person or organization who wrote a composition, or who is the composer of a work performed at some event. */
  'composer': Organization | Person;
  /** The date and place the work was first performed. */
  'firstPerformance': Event_;
  /** Smaller compositions included in this work (e.g. a movement in a symphony). */
  'includedComposition': MusicComposition | MusicComposition[];
  /** The International Standard Musical Work Code for the composition. */
  'iswcCode': string;
  /** The person who wrote the words. */
  'lyricist': Person;
  /** The words in the song. */
  'lyrics': CreativeWork;
  /** An arrangement derived from the composition. */
  'musicArrangement': MusicComposition | MusicComposition[];
  /** The type of composition (e.g. overture, sonata, symphony, etc.). */
  'musicCompositionForm': string;
  /** The key, mode, or scale this composition uses. */
  'musicalKey': string;
  /** An audio recording of the work. */
  'recordedAs': MusicRecording | MusicRecording[];
};



/** A utility class that serves as the umbrella for a number of 'intangible' things such as quantities, structured values, etc. */
type Intangible = Thing & {

};



/** A class, also often called a 'Type'; equivalent to rdfs:Class. */
type Class = Intangible & {

  /** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
  'supersededBy': Class | Enumeration | Property | Class | Enumeration | Property[];
};



/** A property, used to indicate attributes and relationships of some Thing; equivalent to rdf:Property. */
type Property = Intangible & {

  /** Relates a property to a class that is (one of) the type(s) the property is expected to be used on. */
  'domainIncludes': Class | Class[];
  /** Relates a property to a property that is its inverse. Inverse properties relate the same pairs of items to each other, but in reversed direction. For example, the 'alumni' and 'alumniOf' properties are inverseOf each other. Some properties don't have explicit inverses; in these situations RDFa and JSON-LD syntax for reverse properties can be used. */
  'inverseOf': Property | Property[];
  /** Relates a property to a class that constitutes (one of) the expected type(s) for values of the property. */
  'rangeIncludes': Class | Class[];
  /** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
  'supersededBy': Class | Enumeration | Property | Class | Enumeration | Property[];
};



/** A set of defined terms for example a set of categories or a classification scheme, a glossary, dictionary or enumeration. */
type DefinedTermSet = CreativeWork & {

  /** A Defined Term contained in this term set. */
  'hasDefinedTerm': DefinedTerm | DefinedTerm[];
};



/** An image file. */
type ImageObject = MediaObject & {

  /** The caption for this object. For downloadable machine formats (closed caption, subtitles etc.) use MediaObject and indicate the [[encodingFormat]]. */
  'caption': string | MediaObject;
  /** Represents textual captioning from a [[MediaObject]], e.g. text of a 'meme'. */
  'embeddedTextCaption': string | string[];
  /** exif data for this object. */
  'exifData': string | PropertyValue;
  /** Indicates whether this image is representative of the content of the page. */
  'representativeOfPage': boolean;
  /** Thumbnail image for an image or video. */
  'thumbnail': ImageObject;
};



/** A geographical region, typically under the jurisdiction of a particular government. */
type AdministrativeArea = Place & {

};



/** A software application. */
type SoftwareApplication = CreativeWork & {

  /** Type of software application, e.g. 'Game, Multimedia'. */
  'applicationCategory': string | string;
  /** Subcategory of the application, e.g. 'Arcade Game'. */
  'applicationSubCategory': string | string;
  /** The name of the application suite to which the application belongs (e.g. Excel belongs to Office). */
  'applicationSuite': string;
  /** Device required to run the application. Used in cases where a specific make/model is required to run the application. */
  'availableOnDevice': string | string[];
  /** Countries for which the application is not supported. You can also provide the two-letter ISO 3166-1 alpha-2 country code. */
  'countriesNotSupported': string | string[];
  /** Countries for which the application is supported. You can also provide the two-letter ISO 3166-1 alpha-2 country code. */
  'countriesSupported': string | string[];
  /** Device required to run the application. Used in cases where a specific make/model is required to run the application. */
  'device': string;
  /** If the file can be downloaded, URL to download the binary. */
  'downloadUrl': string;
  /** Features or modules provided by this application (and possibly required by other applications). */
  'featureList': string | string | string | string[];
  /** Size of the application / package (e.g. 18MB). In the absence of a unit (MB, KB etc.), KB will be assumed. */
  'fileSize': string;
  /** URL at which the app may be installed, if different from the URL of the item. */
  'installUrl': string;
  /** Minimum memory requirements. */
  'memoryRequirements': string | string;
  /** Operating systems supported (Windows 7, OSX 10.6, Android 1.6). */
  'operatingSystem': string | string[];
  /** Permission(s) required to run the app (for example, a mobile app may require full internet access or may run only on wifi). */
  'permissions': string | string[];
  /** Processor architecture required to run the application (e.g. IA64). */
  'processorRequirements': string;
  /** Description of what changed in this version. */
  'releaseNotes': string | string;
  /** Component dependency requirements for application. This includes runtime environments and shared libraries that are not included in the application distribution package, but required to run the application (Examples: DirectX, Java or .NET runtime). */
  'requirements': string | string | string | string[];
  /** A link to a screenshot image of the app. */
  'screenshot': string | ImageObject | string | ImageObject[];
  /** Additional content for a software application. */
  'softwareAddOn': SoftwareApplication | SoftwareApplication[];
  /** Software application help. */
  'softwareHelp': CreativeWork | CreativeWork[];
  /** Component dependency requirements for application. This includes runtime environments and shared libraries that are not included in the application distribution package, but required to run the application (Examples: DirectX, Java or .NET runtime). */
  'softwareRequirements': string | string | string | string[];
  /** Version of the software instance. */
  'softwareVersion': string;
  /** Storage requirements (free space required). */
  'storageRequirements': string | string;
  /** Supporting data for a SoftwareApplication. */
  'supportingData': DataFeed | DataFeed[];
};



/** A WebSite is a set of related web pages and other items typically served from a single web domain and accessible via URLs. */
type WebSite = CreativeWork & {

  /** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
  'issn': string;
};



/** An action performed by a direct agent and indirect participants upon a direct object. Optionally happens at a location with the help of an inanimate instrument. The execution of the action may produce a result. Specific action sub-type documentation specifies the exact expectation of each argument/role.\n\nSee also [blog post](http://blog.schema.org/2014/04/announcing-schemaorg-actions.html) and [Actions overview document](https://schema.org/docs/actions.html). */
type Action = Thing & {

  /** Indicates the current disposition of the Action. */
  'actionStatus': ActionStatusType | ActionStatusType[];
  /** The direct performer or driver of the action (animate or inanimate). e.g. *John* wrote a book. */
  'agent': Organization | Person;
  /** The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. e.g. John wrote a book from January to *December*. For media, including audio and video, it's the time offset of the end of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
  'endTime': string | string;
  /** For failed actions, more information on the cause of the failure. */
  'error': Thing | Thing[];
  /** The object that helped the agent perform the action. e.g. John wrote a book with *a pen*. */
  'instrument': Thing;
  /** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
  'location': string | Place | PostalAddress | VirtualLocation;
  /** The object upon which the action is carried out, whose state is kept intact or changed. Also known as the semantic roles patient, affected or undergoer (which change their state) or theme (which doesn't). e.g. John read *a book*. */
  'object': Thing;
  /** Other co-agents that participated in the action indirectly. e.g. John wrote a book with *Steve*. */
  'participant': Organization | Person | Organization | Person[];
  /** The result produced in the action. e.g. John wrote *a book*. */
  'result': Thing;
  /** The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. e.g. John wrote a book from *January* to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
  'startTime': string | string;
  /** Indicates a target EntryPoint for an Action. */
  'target': EntryPoint | EntryPoint[];
};



/** The mailing address. */
type PostalAddress = ContactPoint & {

  /** The country. For example, USA. You can also provide the two-letter [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1). */
  'addressCountry': string | Country;
  /** The locality in which the street address is, and which is in the region. For example, Mountain View. */
  'addressLocality': string;
  /** The region in which the locality is, and which is in the country. For example, California or another appropriate first-level [Administrative division](https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country)  */
  'addressRegion': string;
  /** The post office box number for PO box addresses. */
  'postOfficeBoxNumber': string;
  /** The postal code. For example, 94043. */
  'postalCode': string;
  /** The street address. For example, 1600 Amphitheatre Pkwy. */
  'streetAddress': string;
};



/** An online or virtual location for attending events. For example, one may attend an online seminar or educational event. While a virtual location may be used as the location of an event, virtual locations should not be confused with physical locations in the real world. */
type VirtualLocation = Intangible & {

};



/** An EventAttendanceModeEnumeration value is one of potentially several modes of organising an event, relating to whether it is online or offline. */
type EventAttendanceModeEnumeration = string;



/** A schedule defines a repeating time period used to describe a regularly occurring [[Event]]. At a minimum a schedule will specify [[repeatFrequency]] which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely.
      This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also
      have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
type Schedule = Intangible & {

  /** Defines the day(s) of the week on which a recurring [[Event]] takes place. May be specified using either [[DayOfWeek]], or alternatively [[Text]] conforming to iCal's syntax for byDay recurrence rules. */
  'byDay': string | DayOfWeek | string | DayOfWeek[];
  /** Defines the month(s) of the year on which a recurring [[Event]] takes place. Specified as an [[Integer]] between 1-12. January is 1. */
  'byMonth': number | number[];
  /** Defines the day(s) of the month on which a recurring [[Event]] takes place. Specified as an [[Integer]] between 1-31. */
  'byMonthDay': number | number[];
  /** Defines the week(s) of the month on which a recurring Event takes place. Specified as an Integer between 1-5. For clarity, byMonthWeek is best used in conjunction with byDay to indicate concepts like the first and third Mondays of a month. */
  'byMonthWeek': number | number[];
  /** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601). */
  'duration': string;
  /** The end date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
  'endDate': string | string;
  /** The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. e.g. John wrote a book from January to *December*. For media, including audio and video, it's the time offset of the end of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
  'endTime': string | string;
  /** Defines a [[Date]] or [[DateTime]] during which a scheduled [[Event]] will not take place. The property allows exceptions to
      a [[Schedule]] to be specified. If an exception is specified as a [[DateTime]] then only the event that would have started at that specific date and time
      should be excluded from the schedule. If an exception is specified as a [[Date]] then any event that is scheduled for that 24 hour period should be
      excluded from the schedule. This allows a whole day to be excluded from the schedule without having to itemise every scheduled event. */
  'exceptDate': string | string | string | string[];
  /** Defines the number of times a recurring [[Event]] will take place */
  'repeatCount': number | number[];
  /** Defines the frequency at which [[Event]]s will occur according to a schedule [[Schedule]]. The intervals between
      events should be defined as a [[Duration]] of time. */
  'repeatFrequency': string | string | string | string[];
  /** Indicates the timezone for which the time(s) indicated in the [[Schedule]] are given. The value provided should be among those listed in the IANA Time Zone Database. */
  'scheduleTimezone': string | string[];
  /** The start date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
  'startDate': string | string;
  /** The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. e.g. John wrote a book from *January* to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
  'startTime': string | string;
};



/** EventStatusType is an enumeration type whose instances represent several states that an Event may be in. */
type EventStatusType = StatusEnumeration & {

};



/** A financial product for the loaning of an amount of money, or line of credit, under agreed terms and charges. */
type LoanOrCredit = FinancialProduct & {

  /** The amount of money. */
  'amount': number | MonetaryAmount;
  /** The currency in which the monetary amount is expressed.\n\nUse standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217) e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies e.g. "BTC"; well known names for [Local Exchange Tradings Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types e.g. "Ithaca HOUR". */
  'currency': string;
  /** The period of time after any due date that the borrower has to fulfil its obligations before a default (failure to pay) is deemed to have occurred. */
  'gracePeriod': string;
  /** A form of paying back money previously borrowed from a lender. Repayment usually takes the form of periodic payments that normally include part principal plus interest in each payment. */
  'loanRepaymentForm': RepaymentSpecification | RepaymentSpecification[];
  /** The duration of the loan or credit agreement. */
  'loanTerm': QuantitativeValue;
  /** The type of a loan or credit. */
  'loanType': string | string;
  /** The only way you get the money back in the event of default is the security. Recourse is where you still have the opportunity to go back to the borrower for the rest of the money. */
  'recourseLoan': boolean;
  /** Whether the terms for payment of interest can be renegotiated during the life of the loan. */
  'renegotiableLoan': boolean;
  /** Assets required to secure loan or credit repayments. It may take form of third party pledge, goods, financial instruments (cash, securities, etc.) */
  'requiredCollateral': string | Thing | string | Thing[];
};



/** A payment method is a standardized procedure for transferring the monetary amount for a purchase. Payment methods are characterized by the legal and technical structures used, and by the organization or group carrying out the transaction.\n\nCommonly used values:\n\n* http://purl.org/goodrelations/v1#ByBankTransferInAdvance\n* http://purl.org/goodrelations/v1#ByInvoice\n* http://purl.org/goodrelations/v1#Cash\n* http://purl.org/goodrelations/v1#CheckInAdvance\n* http://purl.org/goodrelations/v1#COD\n* http://purl.org/goodrelations/v1#DirectDebit\n* http://purl.org/goodrelations/v1#GoogleCheckout\n* http://purl.org/goodrelations/v1#PayPal\n* http://purl.org/goodrelations/v1#PaySwarm
         */
type PaymentMethod = {

};



/** A list of possible product availability options. */
type ItemAvailability = string;



/** A delivery method is a standardized procedure for transferring the product or service to the destination of fulfillment chosen by the customer. Delivery methods are characterized by the means of transportation used, and by the organization or group that is the contracting party for the sending organization or person.\n\nCommonly used values:\n\n* http://purl.org/goodrelations/v1#DeliveryModeDirectDownload\n* http://purl.org/goodrelations/v1#DeliveryModeFreight\n* http://purl.org/goodrelations/v1#DeliveryModeMail\n* http://purl.org/goodrelations/v1#DeliveryModeOwnFleet\n* http://purl.org/goodrelations/v1#DeliveryModePickUp\n* http://purl.org/goodrelations/v1#DHL\n* http://purl.org/goodrelations/v1#FederalExpress\n* http://purl.org/goodrelations/v1#UPS
         */
type DeliveryMethod = string;



/** The business function specifies the type of activity or access (i.e., the bundle of rights) offered by the organization or business person through the offer. Typical are sell, rental or lease, maintenance or repair, manufacture / produce, recycle / dispose, engineering / construction, or installation. Proprietary specifications of access rights are also instances of this class.\n\nCommonly used values:\n\n* http://purl.org/goodrelations/v1#ConstructionInstallation\n* http://purl.org/goodrelations/v1#Dispose\n* http://purl.org/goodrelations/v1#LeaseOut\n* http://purl.org/goodrelations/v1#Maintain\n* http://purl.org/goodrelations/v1#ProvideService\n* http://purl.org/goodrelations/v1#Repair\n* http://purl.org/goodrelations/v1#Sell\n* http://purl.org/goodrelations/v1#Buy
         */
type BusinessFunction = {

};



/** A business entity type is a conceptual entity representing the legal form, the size, the main line of business, the position in the value chain, or any combination thereof, of an organization or business person.\n\nCommonly used values:\n\n* http://purl.org/goodrelations/v1#Business\n* http://purl.org/goodrelations/v1#Enduser\n* http://purl.org/goodrelations/v1#PublicInstitution\n* http://purl.org/goodrelations/v1#Reseller
	   */
type BusinessEntityType = {

};



/** A structured value representing a price or price range. Typically, only the subclasses of this type are used for markup. It is recommended to use [[MonetaryAmount]] to describe independent amounts of money such as a salary, credit card limits, etc. */
type PriceSpecification = StructuredValue & {

  /** The interval and unit of measurement of ordering quantities for which the offer or price specification is valid. This allows e.g. specifying that a certain freight charge is valid only for a certain quantity. */
  'eligibleQuantity': QuantitativeValue;
  /** The transaction volume, in a monetary unit, for which the offer or price specification is valid, e.g. for indicating a minimal purchasing volume, to express free shipping above a certain order volume, or to limit the acceptance of credit cards to purchases to a certain minimal amount. */
  'eligibleTransactionVolume': PriceSpecification;
  /** The highest price if the price is a range. */
  'maxPrice': number;
  /** The lowest price if the price is a range. */
  'minPrice': number;
  /** The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes.\n\nUsage guidelines:\n\n* Use the [[priceCurrency]] property (with standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217) e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies e.g. "BTC"; well known names for [Local Exchange Tradings Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types e.g. "Ithaca HOUR") instead of including [ambiguous symbols](http://en.wikipedia.org/wiki/Dollar_sign#Currencies_that_use_the_dollar_or_peso_sign) such as '$' in the value.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.\n* Note that both [RDFa](http://www.w3.org/TR/xhtml-rdfa-primer/#using-the-content-attribute) and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting.\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
       */
  'price': number | string;
  /** The currency of the price, or a price component when attached to [[PriceSpecification]] and its subtypes.\n\nUse standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217) e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies e.g. "BTC"; well known names for [Local Exchange Tradings Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types e.g. "Ithaca HOUR". */
  'priceCurrency': string;
  /** The date when the item becomes valid. */
  'validFrom': string | string;
  /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
  'validThrough': string | string;
  /** Specifies whether the applicable value-added tax (VAT) is included in the price specification or not. */
  'valueAddedTaxIncluded': boolean;
};



/** A structured value indicating the quantity, unit of measurement, and business function of goods included in a bundle offer. */
type TypeAndQuantityNode = StructuredValue & {

  /** The quantity of the goods included in the offer. */
  'amountOfThisGood': number;
  /** The business function (e.g. sell, lease, repair, dispose) of the offer or component of a bundle (TypeAndQuantityNode). The default is http://purl.org/goodrelations/v1#Sell. */
  'businessFunction': BusinessFunction;
  /** The product that this structured value is referring to. */
  'typeOfGood': Product | Service;
  /** The unit of measurement given using the UN/CEFACT Common Code (3 characters) or a URL. Other codes than the UN/CEFACT Common Code may be used with a prefix followed by a colon. */
  'unitCode': string | string;
  /** A string or text indicating the unit of measurement. Useful if you cannot provide a standard unit code for
unitCode. */
  'unitText': string | string[];
};



/** A list of possible conditions for the item. */
type OfferItemCondition = string;



/** When a single product is associated with multiple offers (for example, the same pair of shoes is offered by different merchants), then AggregateOffer can be used.\n\nNote: AggregateOffers are normally expected to associate multiple offers that all share the same defined [[businessFunction]] value, or default to http://purl.org/goodrelations/v1#Sell if businessFunction is not explicitly defined. */
type AggregateOffer = Offer & {

  /** The highest price of all offers available.\n\nUsage guidelines:\n\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. */
  'highPrice': number | string;
  /** The lowest price of all offers available.\n\nUsage guidelines:\n\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. */
  'lowPrice': number | string;
  /** The number of offers for the product. */
  'offerCount': number;
  /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer.
       */
  'offers': Demand | Offer | Demand | Offer[];
};



/** A food or drink item listed in a menu or menu section. */
type MenuItem = Intangible & {

  /** Additional menu item(s) such as a side dish of salad or side order of fries that can be added to this menu item. Additionally it can be a menu section containing allowed add-on menu items for this menu item. */
  'menuAddOn': MenuItem | MenuSection | MenuItem | MenuSection[];
  /** Nutrition information about the recipe or menu item. */
  'nutrition': NutritionInformation;
  /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer.
       */
  'offers': Demand | Offer | Demand | Offer[];
  /** Indicates a dietary restriction or guideline for which this recipe or menu item is suitable, e.g. diabetic, halal etc. */
  'suitableForDiet': RestrictedDiet | RestrictedDiet[];
};



/** A service provided by an organization, e.g. delivery service, print services, etc. */
type Service = Intangible & {

  /** The overall rating, based on a collection of reviews or ratings, of the item. */
  'aggregateRating': AggregateRating;
  /** The geographic area where a service or offered item is provided. */
  'areaServed': string | AdministrativeArea | GeoShape | Place;
  /** An intended audience, i.e. a group for whom something was created. */
  'audience': Audience;
  /** A means of accessing the service (e.g. a phone bank, a web site, a location, etc.). */
  'availableChannel': ServiceChannel | ServiceChannel[];
  /** An award won by or for this item. */
  'award': string | string[];
  /** The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person. */
  'brand': Brand | Organization;
  /** An entity that arranges for an exchange between a buyer and a seller.  In most cases a broker never acquires or releases ownership of a product or service involved in an exchange.  If it is not clear whether an entity is a broker, seller, or buyer, the latter two terms are preferred. */
  'broker': Organization | Person | Organization | Person[];
  /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
  'category': string | string | PhysicalActivityCategory | Thing | string | string | PhysicalActivityCategory | Thing[];
  /** Indicates an OfferCatalog listing for this Organization, Person, or Service. */
  'hasOfferCatalog': OfferCatalog | OfferCatalog[];
  /** The hours during which this service or contact is available. */
  'hoursAvailable': OpeningHoursSpecification;
  /** A pointer to another, somehow related product (or multiple products). */
  'isRelatedTo': Product | Service | Product | Service[];
  /** A pointer to another, functionally similar product (or multiple products). */
  'isSimilarTo': Product | Service | Product | Service[];
  /** An associated logo. */
  'logo': string | ImageObject | string | ImageObject[];
  /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer.
       */
  'offers': Demand | Offer | Demand | Offer[];
  /** The tangible thing generated by the service, e.g. a passport, permit, etc. */
  'produces': Thing;
  /** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
  'provider': Organization | Person;
  /** Indicates the mobility of a provided service (e.g. 'static', 'dynamic'). */
  'providerMobility': string | string[];
  /** A review of the item. */
  'review': Review | Review[];
  /** The geographic area where the service is provided. */
  'serviceArea': AdministrativeArea | GeoShape | Place;
  /** The audience eligible for this service. */
  'serviceAudience': Audience;
  /** The tangible thing generated by the service, e.g. a passport, permit, etc. */
  'serviceOutput': Thing;
  /** The type of service being offered, e.g. veterans' benefits, emergency relief, etc. */
  'serviceType': string | GovernmentBenefitsType;
  /** A slogan or motto associated with the item. */
  'slogan': string | string[];
  /** Human-readable terms of service documentation. */
  'termsOfService': string | string | string | string[];
};



/** A trip or journey. An itinerary of visits to one or more places. */
type Trip = Intangible & {

  /** The expected arrival time. */
  'arrivalTime': string | string;
  /** The expected departure time. */
  'departureTime': string | string;
  /** Destination(s) ( [[Place]] ) that make up a trip. For a trip where destination order is important use [[ItemList]] to specify that order (see examples). */
  'itinerary': MaybeArray<Place> | MaybeArray<Place>[];
  /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer.
       */
  'offers': Demand | Offer | Demand | Offer[];
  /** Identifies that this [[Trip]] is a subTrip of another Trip.  For example Day 1, Day 2, etc. of a multi-day trip. */
  'partOfTrip': Trip | Trip[];
  /** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
  'provider': Organization | Person;
  /** Identifies a [[Trip]] that is a subTrip of this Trip.  For example Day 1, Day 2, etc. of a multi-day trip. */
  'subTrip': Trip | Trip[];
};



/** A structured value representing the duration and scope of services that will be provided to a customer free of charge in case of a defect or malfunction of a product. */
type WarrantyPromise = StructuredValue & {

  /** The duration of the warranty promise. Common unitCode values are ANN for year, MON for months, or DAY for days. */
  'durationOfWarranty': QuantitativeValue;
  /** The scope of the warranty promise. */
  'warrantyScope': WarrantyScope;
};



/** Specifies a location feature by providing a structured value representing a feature of an accommodation as a property-value pair of varying degrees of formality. */
type LocationFeatureSpecification = PropertyValue & {

  /** The hours during which this service or contact is available. */
  'hoursAvailable': OpeningHoursSpecification;
  /** The date when the item becomes valid. */
  'validFrom': string | string;
  /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
  'validThrough': string | string;
};



/** The geographic coordinates of a place or event. */
type GeoCoordinates = StructuredValue & {

  /** Physical address of the item. */
  'address': string | PostalAddress;
  /** The country. For example, USA. You can also provide the two-letter [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1). */
  'addressCountry': string | Country;
  /** The elevation of a location ([WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System)). Values may be of the form 'NUMBER UNIT_OF_MEASUREMENT' (e.g., '1,000 m', '3,200 ft') while numbers alone should be assumed to be a value in meters. */
  'elevation': number | string;
  /** The latitude of a location. For example ```37.42242``` ([WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System)). */
  'latitude': number | string;
  /** The longitude of a location. For example ```-122.08585``` ([WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System)). */
  'longitude': number | string;
  /** The postal code. For example, 94043. */
  'postalCode': string;
};



/** (Eventually to be defined as) a supertype of GeoShape designed to accommodate definitions from Geo-Spatial best practices. */
type GeospatialGeometry = Intangible & {

  /** Represents a relationship between two geometries (or the places they represent), relating a containing geometry to a contained geometry. "a contains b iff no points of b lie in the exterior of a, and at least one point of the interior of b lies in the interior of a". As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoContains': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that covers it. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoCoveredBy': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents a relationship between two geometries (or the places they represent), relating a covering geometry to a covered geometry. "Every point of b is a point of (the interior or boundary of) a". As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoCovers': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that crosses it: "a crosses b: they have some but not all interior points in common, and the dimension of the intersection is less than that of at least one of them". As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoCrosses': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents spatial relations in which two geometries (or the places they represent) are topologically disjoint: they have no point in common. They form a set of disconnected geometries." (a symmetric relationship, as defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM)) */
  'geoDisjoint': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents spatial relations in which two geometries (or the places they represent) are topologically equal, as defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). "Two geometries are topologically equal if their interiors intersect and no part of the interior or boundary of one geometry intersects the exterior of the other" (a symmetric relationship) */
  'geoEquals': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents spatial relations in which two geometries (or the places they represent) have at least one point in common. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoIntersects': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that geospatially overlaps it, i.e. they have some but not all points in common. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoOverlaps': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents spatial relations in which two geometries (or the places they represent) touch: they have at least one boundary point in common, but no interior points." (a symmetric relationship, as defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM) ) */
  'geoTouches': GeospatialGeometry | Place | GeospatialGeometry | Place[];
  /** Represents a relationship between two geometries (or the places they represent), relating a geometry to one that contains it, i.e. it is inside (i.e. within) its interior. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
  'geoWithin': GeospatialGeometry | Place | GeospatialGeometry | Place[];
};



/** A map. */
type Map_ = CreativeWork & {

  /** Indicates the kind of Map, from the MapCategoryType Enumeration. */
  'mapType': MapCategoryType | MapCategoryType[];
};



/** A structured value providing information about the opening hours of a place or a certain service inside a place.\n\n
The place is __open__ if the [[opens]] property is specified, and __closed__ otherwise.\n\nIf the value for the [[closes]] property is less than the value for the [[opens]] property then the hour range is assumed to span over the next day.
       */
type OpeningHoursSpecification = StructuredValue & {

  /** The closing hour of the place or service on the given day(s) of the week. */
  'closes': string;
  /** The day of the week for which these opening hours are valid. */
  'dayOfWeek': DayOfWeek;
  /** The opening hour of the place or service on the given day(s) of the week. */
  'opens': string;
  /** The date when the item becomes valid. */
  'validFrom': string | string;
  /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
  'validThrough': string | string;
};



/** A photograph. */
type Photograph = CreativeWork & {

};



/** A brand is a name used by an organization or business person for labeling a product, product group, or similar. */
type Brand = Intangible & {

  /** The overall rating, based on a collection of reviews or ratings, of the item. */
  'aggregateRating': AggregateRating;
  /** An associated logo. */
  'logo': string | ImageObject | string | ImageObject[];
  /** A review of the item. */
  'review': Review | Review[];
  /** A slogan or motto associated with the item. */
  'slogan': string | string[];
};



/** A contact point—for example, a Customer Complaints department. */
type ContactPoint = StructuredValue & {

  /** The geographic area where a service or offered item is provided. */
  'areaServed': string | AdministrativeArea | GeoShape | Place;
  /** A language someone may use with or at the item, service or place. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[inLanguage]] */
  'availableLanguage': string | Language | string | Language[];
  /** An option available on this contact point (e.g. a toll-free number or support for hearing-impaired callers). */
  'contactOption': ContactPointOption | ContactPointOption[];
  /** A person or organization can have different contact points, for different purposes. For example, a sales contact point, a PR contact point and so on. This property is used to specify the kind of contact point. */
  'contactType': string | string[];
  /** Email address. */
  'email': string | string[];
  /** The fax number. */
  'faxNumber': string;
  /** The hours during which this service or contact is available. */
  'hoursAvailable': OpeningHoursSpecification;
  /** The product or service this support contact point is related to (such as product support for a particular product line). This can be a specific product or product line (e.g. "iPhone") or a general category of products or services (e.g. "smartphones"). */
  'productSupported': string | Product;
  /** The geographic area where the service is provided. */
  'serviceArea': AdministrativeArea | GeoShape | Place;
  /** The telephone number. */
  'telephone': string;
};



/** An article, such as a news article or piece of investigative report. Newspapers and magazines have articles of many different types and this is intended to cover them all.\n\nSee also [blog post](http://blog.schema.org/2014/09/schemaorg-support-for-bibliographic_2.html). */
type Article = CreativeWork & {

  /** The actual body of the article. */
  'articleBody': string;
  /** Articles may belong to one or more 'sections' in a magazine or newspaper, such as Sports, Lifestyle, etc. */
  'articleSection': string | string[];
  /** For an [[Article]], typically a [[NewsArticle]], the backstory property provides a textual summary giving a brief explanation of why and how an article was created. In a journalistic setting this could include information about reporting process, methods, interviews, data sources, etc. */
  'backstory': string | CreativeWork | string | CreativeWork[];
  /** The page on which the work ends; for example "138" or "xvi". */
  'pageEnd': number | string;
  /** The page on which the work starts; for example "135" or "xiii". */
  'pageStart': number | string;
  /** Any description of pages that is not separated into pageStart and pageEnd; for example, "1-6, 9, 55" or "10-12, 46-49". */
  'pagination': string | string[];
  /** Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech.

The *speakable* property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values:

1.) *id-value* URL references - uses *id-value* of an element in the page being annotated. The simplest use of *speakable* has (potentially relative) URL values, referencing identified sections of the document concerned.

2.) CSS Selectors - addresses content in the annotated page, eg. via class attribute. Use the [[cssSelector]] property.

3.)  XPaths - addresses content via XPaths (assuming an XML view of the content). Use the [[xpath]] property.


For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this
we define a supporting type, [[SpeakableSpecification]]  which is defined to be a possible value of the *speakable* property.
          */
  'speakable': string | SpeakableSpecification | string | SpeakableSpecification[];
  /** The number of words in the text of the Article. */
  'wordCount': number;
};



/** An educational or occupational credential. A diploma, academic degree, certification, qualification, badge, etc., that may be awarded to a person or other entity that meets the requirements defined by the credentialer. */
type EducationalOccupationalCredential = CreativeWork & {

  /** Knowledge, skill, ability or personal attribute that must be demonstrated by a person or other entity in order to do something such as earn an Educational Occupational Credential or understand a LearningResource. */
  'competencyRequired': string | string | DefinedTerm | string | string | DefinedTerm[];
  /** The category or type of credential being described, for example "degree”, “certificate”, “badge”, or more specific term. */
  'credentialCategory': string | string | DefinedTerm;
  /** The level in terms of progression through an educational or training context. Examples of educational levels include 'beginner', 'intermediate' or 'advanced', and formal sets of level indicators. */
  'educationalLevel': string | string | DefinedTerm;
  /** An organization that acknowledges the validity, value or utility of a credential. Note: recognition may include a process of quality assurance or accreditation. */
  'recognizedBy': Organization | Organization[];
  /** The duration of validity of a permit or similar thing. */
  'validFor': string;
  /** The geographic area where a permit or similar thing is valid. */
  'validIn': AdministrativeArea;
};



/** A MerchantReturnPolicy provides information about product return policies associated with an [[Organization]], [[Product]], or [[Offer]]. */
type MerchantReturnPolicy = Intangible & {

  /** A property-value pair representing an additional characteristics of the entitity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.\n\nNote: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism.
 */
  'additionalProperty': PropertyValue | PropertyValue[];
  /** The type of return fees if the product is returned due to customer remorse. */
  'customerRemorseReturnFees': ReturnFeesEnumeration;
  /** The method (from an enumeration) by which the customer obtains a return shipping label for a product returned due to customer remorse. */
  'customerRemorseReturnLabelSource': ReturnLabelSourceEnumeration;
  /** The amount of shipping costs if a product is returned due to customer remorse. Applicable when property [[customerRemorseReturnFees]] equals [[ReturnShippingFees]]. */
  'customerRemorseReturnShippingFeesAmount': MonetaryAmount;
  /** Are in-store returns offered? (for more advanced return methods use the [[returnMethod]] property) */
  'inStoreReturnsOffered': boolean;
  /** A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. */
  'itemCondition': OfferItemCondition | OfferItemCondition[];
  /** The type of return fees for returns of defect products. */
  'itemDefectReturnFees': ReturnFeesEnumeration;
  /** The method (from an enumeration) by which the customer obtains a return shipping label for a defect product. */
  'itemDefectReturnLabelSource': ReturnLabelSourceEnumeration;
  /** Amount of shipping costs for defect product returns. Applicable when property [[itemDefectReturnFees]] equals [[ReturnShippingFees]]. */
  'itemDefectReturnShippingFeesAmount': MonetaryAmount | MonetaryAmount[];
  /** Specifies either a fixed return date or the number of days (from the delivery date) that a product can be returned. Used when the [[returnPolicyCategory]] property is specified as [[MerchantReturnFiniteReturnWindow]]. */
  'merchantReturnDays': number | string | string | number | string | string[];
  /** Specifies a Web page or service by URL, for product returns. */
  'merchantReturnLink': string | string[];
  /** A refund type, from an enumerated list. */
  'refundType': RefundTypeEnumeration | RefundTypeEnumeration[];
  /** Use [[MonetaryAmount]] to specify a fixed restocking fee for product returns, or use [[Number]] to specify a percentage of the product price paid by the customer. */
  'restockingFee': number | MonetaryAmount | number | MonetaryAmount[];
  /** The type of return fees for purchased products (for any return reason) */
  'returnFees': ReturnFeesEnumeration;
  /** The method (from an enumeration) by which the customer obtains a return shipping label for a product returned for any reason. */
  'returnLabelSource': ReturnLabelSourceEnumeration;
  /** The type of return method offered, specified from an enumeration. */
  'returnMethod': ReturnMethodEnumeration;
  /** Specifies an applicable return policy (from an enumeration). */
  'returnPolicyCategory': MerchantReturnEnumeration | MerchantReturnEnumeration[];
  /** The country where the product has to be sent to for returns, for example "Ireland" using the [[name]] property of [[Country]]. You can also provide the two-letter [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1). Note that this can be different from the country where the product was originally shipped from or sent too. */
  'returnPolicyCountry': string | Country;
  /** Seasonal override of a return policy. */
  'returnPolicySeasonalOverride': MerchantReturnPolicySeasonalOverride | MerchantReturnPolicySeasonalOverride[];
  /** Amount of shipping costs for product returns (for any reason). Applicable when property [[returnFees]] equals [[ReturnShippingFees]]. */
  'returnShippingFeesAmount': MonetaryAmount | MonetaryAmount[];
};



/** An OfferCatalog is an ItemList that contains related Offers and/or further OfferCatalogs that are offeredBy the same provider. */
type OfferCatalog = ItemList & {

};



/** Used to describe membership in a loyalty programs (e.g. "StarAliance"), traveler clubs (e.g. "AAA"), purchase clubs ("Safeway Club"), etc. */
type ProgramMembership = Intangible & {

  /** The organization (airline, travelers' club, etc.) the membership is made with. */
  'hostingOrganization': Organization;
  /** A member of an Organization or a ProgramMembership. Organizations can be members of organizations; ProgramMembership is typically for individuals. */
  'member': Organization | Person | Organization | Person[];
  /** A member of this organization. */
  'members': Organization | Person | Organization | Person[];
  /** A unique identifier for the membership. */
  'membershipNumber': string | string[];
  /** The number of membership points earned by the member. If necessary, the unitText can be used to express the units the points are issued in. (e.g. stars, miles, etc.) */
  'membershipPointsEarned': number | QuantitativeValue;
  /** The program providing the membership. */
  'programName': string;
};



/** NonprofitType enumerates several kinds of official non-profit types of which a non-profit organization can be. */
type NonprofitType = {

};



/** Web page type: About page. */
type AboutPage = WebPage & {

};



/** A structured value providing information about when a certain organization or person owned a certain product. */
type OwnershipInfo = StructuredValue & {

  /** The organization or person from which the product was acquired. */
  'acquiredFrom': Organization | Person;
  /** The date and time of obtaining the product. */
  'ownedFrom': string;
  /** The date and time of giving up ownership on the product. */
  'ownedThrough': string;
  /** The product that this structured value is referring to. */
  'typeOfGood': Product | Service;
};



/** Enumerated for values for itemListOrder for indicating how an ordered ItemList is organized. */
type ItemListOrderType = string;



/** Categories of physical activity, organized by physiologic classification. */
type PhysicalActivityCategory = string;



/** EnergyConsumptionDetails represents information related to the energy efficiency of a product that consumes energy. The information that can be provided is based on international regulations such as for example [EU directive 2017/1369](https://eur-lex.europa.eu/eli/reg/2017/1369/oj) for energy labeling and the [Energy labeling rule](https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/energy-water-use-labeling-consumer) under the Energy Policy and Conservation Act (EPCA) in the US. */
type EnergyConsumptionDetails = Intangible & {

  /** Specifies the most energy efficient class on the regulated EU energy consumption scale for the product category a product belongs to. For example, energy consumption for televisions placed on the market after January 1, 2020 is scaled from D to A+++. */
  'energyEfficiencyScaleMax': EUEnergyEfficiencyEnumeration | EUEnergyEfficiencyEnumeration[];
  /** Specifies the least energy efficient class on the regulated EU energy consumption scale for the product category a product belongs to. For example, energy consumption for televisions placed on the market after January 1, 2020 is scaled from D to A+++. */
  'energyEfficiencyScaleMin': EUEnergyEfficiencyEnumeration | EUEnergyEfficiencyEnumeration[];
  /** Defines the energy efficiency Category (which could be either a rating out of range of values or a yes/no certification) for a product according to an international energy efficiency standard. */
  'hasEnergyEfficiencyCategory': EnergyEfficiencyEnumeration | EnergyEfficiencyEnumeration[];
};



/** A ProductGroup represents a group of [[Product]]s that vary only in certain well-described ways, such as by [[size]], [[color]], [[material]] etc.

While a ProductGroup itself is not directly offered for sale, the various varying products that it represents can be. The ProductGroup serves as a prototype or template, standing in for all of the products who have an [[isVariantOf]] relationship to it. As such, properties (including additional types) can be applied to the ProductGroup to represent characteristics shared by each of the (possibly very many) variants. Properties that reference a ProductGroup are not included in this mechanism; neither are the following specific properties [[variesBy]], [[hasVariant]], [[url]].  */
type ProductGroup = Product & {

  /** Indicates a [[Product]] that is a member of this [[ProductGroup]] (or [[ProductModel]]). */
  'hasVariant': Product | Product[];
  /** Indicates a textual identifier for a ProductGroup. */
  'productGroupID': string | string[];
  /** Indicates the property or properties by which the variants in a [[ProductGroup]] vary, e.g. their size, color etc. Schema.org properties can be referenced by their short name e.g. "color"; terms defined elsewhere can be referenced with their URIs. */
  'variesBy': string | DefinedTerm | string | DefinedTerm[];
};



/** A datasheet or vendor specification of a product (in the sense of a prototypical description). */
type ProductModel = Product & {

  /** Indicates the kind of product that this is a variant of. In the case of [[ProductModel]], this is a pointer (from a ProductModel) to a base product from which this product is a variant. It is safe to infer that the variant inherits all product features from the base model, unless defined locally. This is not transitive. In the case of a [[ProductGroup]], the group description also serves as a template, representing a set of Products that vary on explicitly defined, specific dimensions only (so it defines both a set of variants, as well as which values distinguish amongst those variants). When used with [[ProductGroup]], this property can apply to any [[Product]] included in the group. */
  'isVariantOf': ProductGroup | ProductModel | ProductGroup | ProductModel[];
  /** A pointer from a previous, often discontinued variant of the product to its newer variant. */
  'predecessorOf': ProductModel | ProductModel[];
  /** A pointer from a newer variant of a product  to its previous, often discontinued predecessor. */
  'successorOf': ProductModel | ProductModel[];
};



/** OfferShippingDetails represents information about shipping destinations.

Multiple of these entities can be used to represent different shipping rates for different destinations:

One entity for Alaska/Hawaii. A different one for continental US.A different one for all France.

Multiple of these entities can be used to represent different shipping costs and delivery times.

Two entities that are identical but differ in rate and time:

e.g. Cheaper and slower: $5 in 5-7days
or Fast and expensive: $15 in 1-2 days. */
type OfferShippingDetails = StructuredValue & {

  /** The total delay between the receipt of the order and the goods reaching the final customer. */
  'deliveryTime': ShippingDeliveryTime;
  /** Indicates when shipping to a particular [[shippingDestination]] is not available. */
  'doesNotShip': boolean;
  /** indicates (possibly multiple) shipping destinations. These can be defined in several ways e.g. postalCode ranges. */
  'shippingDestination': DefinedRegion | DefinedRegion[];
  /** Label to match an [[OfferShippingDetails]] with a [[ShippingRateSettings]] (within the context of a [[shippingSettingsLink]] cross-reference). */
  'shippingLabel': string | string[];
  /** The shipping rate is the cost of shipping to the specified destination. Typically, the maxValue and currency values (of the [[MonetaryAmount]]) are most appropriate. */
  'shippingRate': MonetaryAmount;
  /** Link to a page containing [[ShippingRateSettings]] and [[DeliveryTimeSettings]] details. */
  'shippingSettingsLink': string | string[];
  /** Label to match an [[OfferShippingDetails]] with a [[DeliveryTimeSettings]] (within the context of a [[shippingSettingsLink]] cross-reference). */
  'transitTimeLabel': string | string[];
};



/** A BreadcrumbList is an ItemList consisting of a chain of linked Web pages, typically described using at least their URL and their name, and typically ending with the current page.\n\nThe [[position]] property is used to reconstruct the order of the items in a BreadcrumbList The convention is that a breadcrumb list has an [[itemListOrder]] of [[ItemListOrderAscending]] (lower values listed first), and that the first items in this list correspond to the "top" or beginning of the breadcrumb trail, e.g. with a site or section homepage. The specific values of 'position' are not assigned meaning for a BreadcrumbList, but they should be integers, e.g. beginning with '1' for the first item in the list.
       */
type BreadcrumbList = ItemList & {

};



/** A web page element, like a table or an image. */
type WebPageElement = CreativeWork & {

  /** A CSS selector, e.g. of a [[SpeakableSpecification]] or [[WebPageElement]]. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
  'cssSelector': string;
  /** An XPath, e.g. of a [[SpeakableSpecification]] or [[WebPageElement]]. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
  'xpath': string;
};



/** A SpeakableSpecification indicates (typically via [[xpath]] or [[cssSelector]]) sections of a document that are highlighted as particularly [[speakable]]. Instances of this type are expected to be used primarily as values of the [[speakable]] property. */
type SpeakableSpecification = Intangible & {

  /** A CSS selector, e.g. of a [[SpeakableSpecification]] or [[WebPageElement]]. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
  'cssSelector': string;
  /** An XPath, e.g. of a [[SpeakableSpecification]] or [[WebPageElement]]. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
  'xpath': string;
};



/** Any branch of a field in which people typically develop specific expertise, usually after significant study, time, and effort. */
type Specialty = {

};



/** An educational organization. */
type EducationalOrganization = CivicStructure & Organization & {

  /** Alumni of an organization. */
  'alumni': Person | Person[];
};



/** An enumeration of genders. */
type GenderType = string;



/** A profession, may involve prolonged training and/or a formal qualification. */
type Occupation = Intangible & {

  /** Educational background needed for the position or Occupation. */
  'educationRequirements': string | EducationalOccupationalCredential;
  /** An estimated salary for a job posting or occupation, based on a variety of variables including, but not limited to industry, job title, and location. Estimated salaries  are often computed by outside organizations rather than the hiring organization, who may not have committed to the estimated value. */
  'estimatedSalary': number | MonetaryAmount | MonetaryAmountDistribution | number | MonetaryAmount | MonetaryAmountDistribution[];
  /** Description of skills and experience needed for the position or Occupation. */
  'experienceRequirements': string | OccupationalExperienceRequirements;
  /** The region/country for which this occupational description is appropriate. Note that educational requirements and qualifications can vary between jurisdictions. */
  'occupationLocation': AdministrativeArea;
  /** A category describing the job, preferably using a term from a taxonomy such as [BLS O*NET-SOC](http://www.onetcenter.org/taxonomy.html), [ISCO-08](https://www.ilo.org/public/english/bureau/stat/isco/isco08/) or similar, with the property repeated for each applicable value. Ideally the taxonomy should be identified, and both the textual label and formal code for the category should be provided.\n
Note: for historical reasons, any textual label and formal code provided as a literal may be assumed to be from O*NET-SOC. */
  'occupationalCategory': string | CategoryCode | string | CategoryCode[];
  /** Specific qualifications required for this role or Occupation. */
  'qualifications': string | EducationalOccupationalCredential | string | EducationalOccupationalCredential[];
  /** Responsibilities associated with this role or Occupation. */
  'responsibilities': string | string[];
  /** A statement of knowledge, skill, ability, task or any other assertion expressing a competency that is desired or required to fulfill this role or to work in this occupation. */
  'skills': string | DefinedTerm | string | DefinedTerm[];
};



/** WebContent is a type representing all [[WebPage]], [[WebSite]] and [[WebPageElement]] content. It is sometimes the case that detailed distinctions between Web pages, sites and their parts is not always important or obvious. The  [[WebContent]] type makes it easier to describe Web-addressable content without requiring such distinctions to always be stated. (The intent is that the existing types [[WebPage]], [[WebSite]] and [[WebPageElement]] will eventually be declared as subtypes of [[WebContent]]). */
type WebContent = CreativeWork & {

};



/** Enumerates common size groups for various product categories. */
type SizeGroupEnumeration = {

};



/** Enumerates common size systems for different categories of products, for example "EN-13402" or "UK" for wearables or "Imperial" for screws. */
type SizeSystemEnumeration = string;

/** Classification of the album by it's type of content: soundtrack, live album, studio album, etc. */
type MusicAlbumProductionType = string;



/** A MusicRelease is a specific release of a music album. */
type MusicRelease = MusicPlaylist & {

  /** The catalog number for the release. */
  'catalogNumber': string;
  /** The group the release is credited to if different than the byArtist. For example, Red and Blue is credited to "Stefani Germanotta Band", but by Lady Gaga. */
  'creditedTo': Organization | Person;
  /** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601). */
  'duration': string;
  /** Format of this release (the type of recording media used, ie. compact disc, digital media, LP, etc.). */
  'musicReleaseFormat': MusicReleaseFormatType | MusicReleaseFormatType[];
  /** The label that issued the release. */
  'recordLabel': Organization;
  /** The album this is a release of. */
  'releaseOf': MusicAlbum;
};



/** The kind of release which this album is: single, EP or album. */
type MusicAlbumReleaseType = string;



/** A performance group, such as a band, an orchestra, or a circus. */
type PerformingGroup = Organization & {

};



/** The day of the week, e.g. used to specify to which day the opening hours of an OpeningHoursSpecification refer.

Originally, URLs from [GoodRelations](http://purl.org/goodrelations/v1) were used (for [[Monday]], [[Tuesday]], [[Wednesday]], [[Thursday]], [[Friday]], [[Saturday]], [[Sunday]] plus a special entry for [[PublicHolidays]]); these have now been integrated directly into schema.org.
       */
type DayOfWeek = string;



/** A product provided to consumers and businesses by financial institutions such as banks, insurance companies, brokerage firms, consumer finance companies, and investment companies which comprise the financial services industry. */
type FinancialProduct = Service & {

  /** The annual rate that is charged for borrowing (or made by investing), expressed as a single percentage number that represents the actual yearly cost of funds over the term of a loan. This includes any fees or additional costs associated with the transaction. */
  'annualPercentageRate': number | QuantitativeValue;
  /** Description of fees, commissions, and other terms applied either to a class of financial product, or by a financial service organization. */
  'feesAndCommissionsSpecification': string | string | string | string[];
  /** The interest rate, charged or paid, applicable to the financial product. Note: This is different from the calculated annualPercentageRate. */
  'interestRate': number | QuantitativeValue;
};



/** A structured value representing repayment. */
type RepaymentSpecification = StructuredValue & {

  /** a type of payment made in cash during the onset of the purchase of an expensive good/service. The payment typically represents only a percentage of the full purchase price. */
  'downPayment': number | MonetaryAmount | number | MonetaryAmount[];
  /** The amount to be paid as a penalty in the event of early payment of the loan. */
  'earlyPrepaymentPenalty': MonetaryAmount;
  /** The amount of money to pay in a single payment. */
  'loanPaymentAmount': MonetaryAmount;
  /** Frequency of payments due, i.e. number of months between payments. This is defined as a frequency, i.e. the reciprocal of a period of time. */
  'loanPaymentFrequency': number | number[];
  /** The number of payments contractually required at origination to repay the loan. For monthly paying loans this is the number of months from the contractual first payment date to the maturity date. */
  'numberOfLoanPayments': number;
};



/** The status of an Action. */
type ActionStatusType = StatusEnumeration & {

};



/** An entry point, within some Web-based protocol. */
type EntryPoint = Intangible & {

  /** An application that can complete the request. */
  'actionApplication': SoftwareApplication | SoftwareApplication[];
  /** The high level platform(s) where the Action can be performed for the given URL. To specify a specific application or operating system instance, use actionApplication. */
  'actionPlatform': string | string;
  /** An application that can complete the request. */
  'application': SoftwareApplication | SoftwareApplication[];
  /** The supported content type(s) for an EntryPoint response. */
  'contentType': string;
  /** The supported encoding type(s) for an EntryPoint request. */
  'encodingType': string;
  /** An HTTP method that specifies the appropriate HTTP method for a request to an HTTP EntryPoint. Values are capitalized strings as used in HTTP. */
  'httpMethod': string | string[];
  /** An url template (RFC6570) that will be used to construct the target of the execution of the action. */
  'urlTemplate': string | string[];
};



/** A sub-grouping of food or drink items in a menu. E.g. courses (such as 'Dinner', 'Breakfast', etc.), specific type of dishes (such as 'Meat', 'Vegan', 'Drinks', etc.), or some other classification made by the menu provider. */
type MenuSection = CreativeWork & {

  /** A food or drink item contained in a menu or menu section. */
  'hasMenuItem': MenuItem | MenuItem[];
  /** A subgrouping of the menu (by dishes, course, serving time period, etc.). */
  'hasMenuSection': MenuSection | MenuSection[];
};



/** The frequency in MHz and the modulation used for a particular BroadcastService. */
type BroadcastFrequencySpecification = Intangible & {

  /** The frequency in MHz for a particular broadcast. */
  'broadcastFrequencyValue': number | QuantitativeValue;
  /** The modulation (e.g. FM, AM, etc) used by a particular broadcast service. */
  'broadcastSignalModulation': string | QualitativeValue;
  /** The subchannel used for the broadcast. */
  'broadcastSubChannel': string;
};



/** A unique instance of a BroadcastService on a CableOrSatelliteService lineup. */
type BroadcastChannel_ = Intangible & {

  /** The unique address by which the BroadcastService can be identified in a provider lineup. In US, this is typically a number. */
  'broadcastChannelId': string;
  /** The frequency used for over-the-air broadcasts. Numeric values or simple ranges e.g. 87-99. In addition a shortcut idiom is supported for frequences of AM and FM radio channels, e.g. "87 FM". */
  'broadcastFrequency': string | BroadcastFrequencySpecification;
  /** The type of service required to have access to the channel (e.g. Standard or Premium). */
  'broadcastServiceTier': string;
  /** Genre of the creative work, broadcast channel or group. */
  'genre': string | string;
  /** The CableOrSatelliteService offering the channel. */
  'inBroadcastLineup': CableOrSatelliteService;
  /** The BroadcastService offered on this channel. */
  'providesBroadcastService': BroadcastService;
};



/** A single feed providing structured information about one or more entities or topics. */
type DataFeed = Dataset & {

  /** An item within in a data feed. Data feeds may have many elements. */
  'dataFeedElement': string | DataFeedItem | Thing | string | DataFeedItem | Thing[];
};



/** A Series in schema.org is a group of related items, typically but not necessarily of the same kind. See also [[CreativeWorkSeries]], [[EventSeries]]. */
type Series = Intangible & {

};



/** Lists or enumerations dealing with status types. */
type StatusEnumeration = {

};



/** An enumeration of several kinds of Map. */
type MapCategoryType = string;



/** ShippingDeliveryTime provides various pieces of information about delivery times for shipping. */
type ShippingDeliveryTime = StructuredValue & {

  /** Days of the week when the merchant typically operates, indicated via opening hours markup. */
  'businessDays': OpeningHoursSpecification | OpeningHoursSpecification[];
  /** Order cutoff time allows merchants to describe the time after which they will no longer process orders received on that day. For orders processed after cutoff time, one day gets added to the delivery time estimate. This property is expected to be most typically used via the [[ShippingRateSettings]] publication pattern. The time is indicated using the ISO-8601 Time format, e.g. "23:30:00-05:00" would represent 6:30 pm Eastern Standard Time (EST) which is 5 hours behind Coordinated Universal Time (UTC). */
  'cutoffTime': string | string[];
  /** The typical delay between the receipt of the order and the goods either leaving the warehouse or being prepared for pickup, in case the delivery method is on site pickup. Typical properties: minValue, maxValue, unitCode (d for DAY).  This is by common convention assumed to mean business days (if a unitCode is used, coded as "d"), i.e. only counting days when the business normally operates. */
  'handlingTime': QuantitativeValue;
  /** The typical delay the order has been sent for delivery and the goods reach the final customer. Typical properties: minValue, maxValue, unitCode (d for DAY). */
  'transitTime': QuantitativeValue;
};



/** A DefinedRegion is a geographic area defined by potentially arbitrary (rather than political, administrative or natural geographical) criteria. Properties are provided for defining a region by reference to sets of postal codes.

Examples: a delivery destination when shopping. Region where regional pricing is configured.

Requirement 1:
Country: US
States: "NY", "CA"

Requirement 2:
Country: US
PostalCode Set: { [94000-94585], [97000, 97999], [13000, 13599]}
{ [12345, 12345], [78945, 78945], }
Region = state, canton, prefecture, autonomous community...
 */
type DefinedRegion = StructuredValue & {

  /** The country. For example, USA. You can also provide the two-letter [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1). */
  'addressCountry': string | Country;
  /** The region in which the locality is, and which is in the country. For example, California or another appropriate first-level [Administrative division](https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country)  */
  'addressRegion': string;
  /** The postal code. For example, 94043. */
  'postalCode': string;
  /** A defined range of postal codes indicated by a common textual prefix. Used for non-numeric systems such as UK. */
  'postalCodePrefix': string | string[];
  /** A defined range of postal codes. */
  'postalCodeRange': PostalCodeRangeSpecification | PostalCodeRangeSpecification[];
};



/** Enumerated options related to a ContactPoint. */
type ContactPointOption = string;



/** A range of of services that will be provided to a customer free of charge in case of a defect or malfunction of a product.\n\nCommonly used values:\n\n* http://purl.org/goodrelations/v1#Labor-BringIn\n* http://purl.org/goodrelations/v1#PartsAndLabor-BringIn\n* http://purl.org/goodrelations/v1#PartsAndLabor-PickUp
       */
type WarrantyScope = {

};



/** A statistical distribution of monetary amounts. */
type MonetaryAmountDistribution = QuantitativeValueDistribution & {

  /** The currency in which the monetary amount is expressed.\n\nUse standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217) e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies e.g. "BTC"; well known names for [Local Exchange Tradings Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types e.g. "Ithaca HOUR". */
  'currency': string;
};



/** Indicates employment-related experience requirements, e.g. [[monthsOfExperience]]. */
type OccupationalExperienceRequirements = Intangible & {

  /** Indicates the minimal number of months of experience required for a position. */
  'monthsOfExperience': number | number[];
};



/** A Category Code. */
type CategoryCode = DefinedTerm & {

  /** A short textual code that uniquely identifies the value. */
  'codeValue': string;
  /** A [[CategoryCodeSet]] that contains this category code. */
  'inCodeSet': string | CategoryCodeSet | string | CategoryCodeSet[];
};



/** Enumerates several kinds of policies for product return fees. */
type ReturnFeesEnumeration = string;



/** Enumerates several types of return labels for product returns. */
type ReturnLabelSourceEnumeration = string;



/** Enumerates several kinds of product return refund types. */
type RefundTypeEnumeration = string;



/** Enumerates several types of product return methods. */
type ReturnMethodEnumeration = string;



/** Enumerates several kinds of product return policies. */
type MerchantReturnEnumeration = string;



/** A seasonal override of a return policy, for example used for holidays. */
type MerchantReturnPolicySeasonalOverride = Intangible & {

  /** The end date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
  'endDate': string | string;
  /** Specifies either a fixed return date or the number of days (from the delivery date) that a product can be returned. Used when the [[returnPolicyCategory]] property is specified as [[MerchantReturnFiniteReturnWindow]]. */
  'merchantReturnDays': number | string | string | number | string | string[];
  /** Specifies an applicable return policy (from an enumeration). */
  'returnPolicyCategory': MerchantReturnEnumeration | MerchantReturnEnumeration[];
  /** The start date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
  'startDate': string | string;
};



/** A means for accessing a service, e.g. a government office location, web site, or phone number. */
type ServiceChannel = Intangible & {

  /** A language someone may use with or at the item, service or place. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[inLanguage]] */
  'availableLanguage': string | Language | string | Language[];
  /** Estimated processing time for the service using this channel. */
  'processingTime': string;
  /** The service provided by this channel. */
  'providesService': Service;
  /** The location (e.g. civic structure, local business, etc.) where a person can go to access the service. */
  'serviceLocation': Place;
  /** The phone number to use to access the service. */
  'servicePhone': ContactPoint;
  /** The address for accessing the service by mail. */
  'servicePostalAddress': PostalAddress;
  /** The number to access the service by text message. */
  'serviceSmsNumber': ContactPoint;
  /** The website to access the service. */
  'serviceUrl': string;
};



/** GovernmentBenefitsType enumerates several kinds of government benefits to support the COVID-19 situation. Note that this structure may not capture all benefits offered. */
type GovernmentBenefitsType = string;



/** A public structure, such as a town hall or concert hall. */
type CivicStructure = Place & {

  /** The general opening hours for a business. Opening hours can be specified as a weekly time range, starting with days, then times per day. Multiple days can be listed with commas ',' separating each day. Day or time ranges are specified using a hyphen '-'.\n\n* Days are specified using the following two-letter combinations: ```Mo```, ```Tu```, ```We```, ```Th```, ```Fr```, ```Sa```, ```Su```.\n* Times are specified using 24:00 format. For example, 3pm is specified as ```15:00```, 10am as ```10:00```. \n* Here is an example: <time itemprop="openingHours" datetime="Tu,Th 16:00-20:00">Tuesdays and Thursdays 4-8pm</time>.\n* If a business is open 7 days a week, then it can be specified as <time itemprop="openingHours" datetime="Mo-Su">Monday through Sunday, all day</time>. */
  'openingHours': string;
};



/** Enumerates the EU energy efficiency classes A-G as well as A+, A++, and A+++ as defined in EU directive 2017/1369. */
type EUEnergyEfficiencyEnumeration = EnergyEfficiencyEnumeration & {

};



/** Enumerates energy efficiency levels (also known as "classes" or "ratings") and certifications that are part of several international energy efficiency standards. */
type EnergyEfficiencyEnumeration = {

};

/** A service which provides access to media programming like TV or radio. Access may be via cable or satellite. */
type CableOrSatelliteService = Service & {

};



/** Format of this release (the type of recording media used, ie. compact disc, digital media, LP, etc.). */
type MusicReleaseFormatType = string;



/** A body of structured information describing some topic(s) of interest. */
type Dataset = CreativeWork & {

  /** A data catalog which contains this dataset. */
  'catalog': DataCatalog | DataCatalog[];
  /** The range of temporal applicability of a dataset, e.g. for a 2011 census dataset, the year 2011 (in ISO 8601 time interval format). */
  'datasetTimeInterval': string;
  /** A downloadable form of this dataset, at a specific location, in a specific format. */
  'distribution': DataDownload | DataDownload[];
  /** A data catalog which contains this dataset (this property was previously 'catalog', preferred name is now 'includedInDataCatalog'). */
  'includedDataCatalog': DataCatalog | DataCatalog[];
  /** A data catalog which contains this dataset. */
  'includedInDataCatalog': DataCatalog | DataCatalog[];
  /** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
  'issn': string;
  /** A technique or technology used in a [[Dataset]] (or [[DataDownload]], [[DataCatalog]]),
corresponding to the method used for measuring the corresponding variable(s) (described using [[variableMeasured]]). This is oriented towards scientific and scholarly dataset publication but may have broader applicability; it is not intended as a full representation of measurement, but rather as a high level summary for dataset discovery.

For example, if [[variableMeasured]] is: molecule concentration, [[measurementTechnique]] could be: "mass spectrometry" or "nmr spectroscopy" or "colorimetry" or "immunofluorescence".

If the [[variableMeasured]] is "depression rating", the [[measurementTechnique]] could be "Zung Scale" or "HAM-D" or "Beck Depression Inventory".

If there are several [[variableMeasured]] properties recorded for some given data object, use a [[PropertyValue]] for each [[variableMeasured]] and attach the corresponding [[measurementTechnique]].
       */
  'measurementTechnique': string | string | string | string[];
  /** The variableMeasured property can indicate (repeated as necessary) the  variables that are measured in some dataset, either described as text or as pairs of identifier and description using PropertyValue. */
  'variableMeasured': string | PropertyValue;
};



/** A single item within a larger data feed. */
type DataFeedItem = Intangible & {

  /** The date on which the CreativeWork was created or the item was added to a DataFeed. */
  'dateCreated': string | string;
  /** The datetime the item was removed from the DataFeed. */
  'dateDeleted': string | string;
  /** The date on which the CreativeWork was most recently modified or when the item's entry was modified within a DataFeed. */
  'dateModified': string | string;
  /** An entity represented by an entry in a list or data feed (e.g. an 'artist' in a list of 'artists')’. */
  'item': Thing | Thing[];
};



/** A set of Category Code values. */
type CategoryCodeSet = DefinedTermSet & {

  /** A Category code contained in this code set. */
  'hasCategoryCode': CategoryCode | CategoryCode[];
};



/** Indicates a range of postalcodes, usually defined as the set of valid codes between [[postalCodeBegin]] and [[postalCodeEnd]], inclusively. */
type PostalCodeRangeSpecification = StructuredValue & {

  /** First postal code in a range (included). */
  'postalCodeBegin': string | string[];
  /** Last postal code in the range (included). Needs to be after [[postalCodeBegin]]. */
  'postalCodeEnd': string | string[];
};



/** A statistical distribution of values. */
type QuantitativeValueDistribution = StructuredValue & {

  /** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601). */
  'duration': string;
  /** The median value. */
  'median': number;
  /** The 10th percentile value. */
  'percentile10': number;
  /** The 25th percentile value. */
  'percentile25': number;
  /** The 75th percentile value. */
  'percentile75': number;
  /** The 90th percentile value. */
  'percentile90': number;
};

/** A collection of datasets. */
type DataCatalog = CreativeWork & {

  /** A dataset contained in this catalog. */
  'dataset': Dataset | Dataset[];
  /** A technique or technology used in a [[Dataset]] (or [[DataDownload]], [[DataCatalog]]),
corresponding to the method used for measuring the corresponding variable(s) (described using [[variableMeasured]]). This is oriented towards scientific and scholarly dataset publication but may have broader applicability; it is not intended as a full representation of measurement, but rather as a high level summary for dataset discovery.

For example, if [[variableMeasured]] is: molecule concentration, [[measurementTechnique]] could be: "mass spectrometry" or "nmr spectroscopy" or "colorimetry" or "immunofluorescence".

If the [[variableMeasured]] is "depression rating", the [[measurementTechnique]] could be "Zung Scale" or "HAM-D" or "Beck Depression Inventory".

If there are several [[variableMeasured]] properties recorded for some given data object, use a [[PropertyValue]] for each [[variableMeasured]] and attach the corresponding [[measurementTechnique]].
       */
  'measurementTechnique': string | string | string | string[];
};



/** A dataset in downloadable form. */
type DataDownload = MediaObject & {

  /** A technique or technology used in a [[Dataset]] (or [[DataDownload]], [[DataCatalog]]),
corresponding to the method used for measuring the corresponding variable(s) (described using [[variableMeasured]]). This is oriented towards scientific and scholarly dataset publication but may have broader applicability; it is not intended as a full representation of measurement, but rather as a high level summary for dataset discovery.

For example, if [[variableMeasured]] is: molecule concentration, [[measurementTechnique]] could be: "mass spectrometry" or "nmr spectroscopy" or "colorimetry" or "immunofluorescence".

If the [[variableMeasured]] is "depression rating", the [[measurementTechnique]] could be "Zung Scale" or "HAM-D" or "Beck Depression Inventory".

If there are several [[variableMeasured]] properties recorded for some given data object, use a [[PropertyValue]] for each [[variableMeasured]] and attach the corresponding [[measurementTechnique]].
       */
  'measurementTechnique': string | string | string | string[];
};


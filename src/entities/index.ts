/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: ballfeatures
 * Interface for BallFeatures
 */
export interface BallFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  featureTitle?: string;
  /** @wixFieldType text */
  featureDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featureImage?: string;
  /** @wixFieldType text */
  benefitHighlight?: string;
  /** @wixFieldType text */
  specificationValue?: string;
}

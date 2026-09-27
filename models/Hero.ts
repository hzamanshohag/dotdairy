import mongoose, { Document, Model, Schema } from "mongoose";

export interface IHeroImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface IHero extends Document {
  locationText: string;
  title: string;
  highlightedTitle: string;
  description: string;

  orderButtonText: string;
  aboutButtonText: string;

  trustItems: string[];

  images: IHeroImage[];

  createdAt: Date;
  updatedAt: Date;
}

const HeroImageSchema = new Schema<IHeroImage>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
    },

    alt: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const HeroSchema = new Schema<IHero>(
  {
    locationText: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    highlightedTitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    orderButtonText: {
      type: String,
      required: true,
      trim: true,
    },

    aboutButtonText: {
      type: String,
      required: true,
      trim: true,
    },

    trustItems: {
      type: [String],
      default: [],
    },

    images: {
      type: [HeroImageSchema],
      default: [],
    },
  },

  {
    timestamps: true,
  },
);

const Hero: Model<IHero> =
  mongoose.models.Hero || mongoose.model<IHero>("Hero", HeroSchema);

export default Hero;

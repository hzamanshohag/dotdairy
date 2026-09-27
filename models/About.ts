import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbout extends Document {
  sectionLabel: string;
  title: string;
  highlightedTitle: string;

  descriptions: string[];

  image: {
    url: string;
    publicId: string;
    alt: string;
  };

  videoId: string;

  stats: {
    value: string;
    label: string;
  }[];

  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}

const AboutSchema = new Schema<IAbout>(
  {
    sectionLabel: {
      type: String,
      default: "আমাদের সম্পর্কে",
    },

    title: {
      type: String,
      default: "নওগাঁর বিখ্যাত",
    },

    highlightedTitle: {
      type: String,
      default: "পাড়া সন্দেশ",
    },

    descriptions: {
      type: [String],
      default: [],
    },

    image: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },

      alt: {
        type: String,
        default: "",
      },
    },

    videoId: {
      type: String,
      default: "",
    },

    stats: {
      type: [
        {
          value: {
            type: String,
            default: "",
          },

          label: {
            type: String,
            default: "",
          },
        },
      ],

      default: [],
    },

    features: {
      type: [
        {
          title: {
            type: String,
            default: "",
          },

          description: {
            type: String,
            default: "",
          },

          icon: {
            type: String,
            default: "Award",
          },
        },
      ],

      default: [],
    },
  },

  {
    timestamps: true,
  },
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);

export default About;

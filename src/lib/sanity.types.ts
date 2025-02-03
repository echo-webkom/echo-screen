export type AllHappeningsQueryResult = Array<{
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: string;
  isPinned: boolean;
  happeningType: "bedpres" | "event" | "external";
  company: {
    _id: string;
    name: string;
    website: string;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
  } | null;
  organizers: Array<{
    _id: string;
    name: string;
    slug: string;
  }> | null;
  contacts: Array<{
    email: string;
    profile: {
      _id: string;
      name: string;
    };
  }> | null;
  date: string;
  endDate: string | null;
  cost: number | null;
  registrationStartGroups: string | null;
  registrationGroups: Array<string> | null;
  registrationStart: string | null;
  registrationEnd: string | null;
  location: {
    name: string;
  } | null;
  spotRanges: Array<{
    spots: number;
    minYear: number;
    maxYear: number;
  }> | null;
  additionalQuestions: Array<{
    id: string;
    title: string;
    required: boolean;
    type: "checkbox" | "radio" | "text" | "textarea";
    options: Array<string> | null;
  }> | null;
  externalLink: string | null;
  body: string | null;
}>;

export type AllRepeatingHappeningsQueryResult = Array<{
  _id: string;
  _type: "repeatingHappening";
  title: string;
  slug: string;
  happeningType: "event" | "external";
  organizers: Array<{
    _id: string;
    name: string;
    slug: string;
  }> | null;
  contacts: Array<{
    email: string;
    profile: {
      _id: string;
      name: string;
    };
  }> | null;
  location: {
    name: string;
  } | null;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startTime: Ttime;
  endTime: Ttime;
  startDate: string;
  endDate: string;
  interval: "bi-weekly" | "monthly" | "weekly";
  cost: number | null;
  ignoredDates: Array<string> | null;
  externalLink: string | null;
  body: string | null;
}>;

type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type MoviesQueryResult = Array<{
  _id: string;
  title: string;
  date: string;
  link: string | null;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
}>;

declare const internalGroqTypeReferenceTo: unique symbol;

type Ttime = {
  _type: "ttime";
  hour:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23;
  minute:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59;
};

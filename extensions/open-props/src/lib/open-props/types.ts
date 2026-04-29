export type SupportedVersion = "1";

export type VersionConfig = {
  version: SupportedVersion;
  sections: {
    name: string;
    file: string;
    type?: "color";
  }[];
};

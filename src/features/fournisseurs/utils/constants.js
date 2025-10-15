export const FOURNISSEUR_TYPES = {
  ENTREPRISE: "entreprise",
  PARTICULIER: "particulier",
  ASSOCIATION: "association",
};

export const FOURNISSEUR_STATUS = {
  ACTIF: "actif",
  INACTIF: "inactif",
  SUSPENDU: "suspendu",
};

export const FOURNISSEUR_FIELDS = {
  NOM: "nom",
  EMAIL: "email",
  TELEPHONE: "telephone",
  ADRESSE: "adresse",
  CODE_POSTAL: "codePostal",
  VILLE: "ville",
  PAYS: "pays",
  TYPE: "type",
  STATUT: "statut",
  SIRET: "siret",
  SITEWEB: "siteweb",
};

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[0-9\s\-\(\)]+$/,
  SIRET_REGEX: /^[0-9]{14}$/,
  URL_REGEX: /^https?:\/\/.+/,
};

export const DEFAULT_FOURNISSEUR = {
  nom: "",
  email: "",
  telephone: "",
  adresse: "",
  codePostal: "",
  ville: "",
  pays: "France",
  type: FOURNISSEUR_TYPES.ENTREPRISE,
  statut: FOURNISSEUR_STATUS.ACTIF,
  siret: "",
  siteweb: "",
};

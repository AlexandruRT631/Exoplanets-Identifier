export type InputProps = {
  period_d: number | undefined;
  sigma_period_d: number | undefined;
  asym_period_d: number | undefined;

  dur_hr: number | undefined;
  sigma_dur_hr: number | undefined;
  asym_dur_hr: number | undefined;

  depth_ppm: number | undefined;
  sigma_depth_ppm: number | undefined;
  asym_depth_ppm: number | undefined;

  ror: number | undefined;
  sigma_ror: number | undefined;
  asym_ror: number | undefined;

  incl_deg: number | undefined;
  a_over_r: number | undefined;
  num_trans: number | undefined;
  sma_au: number | undefined;
  tranmid_bjd: number | undefined;

  prad_re: number | undefined;
  sigma_prad_re: number | undefined;
  asym_prad_re: number | undefined;

  insol_ef: number | undefined;
  teq_k: number | undefined;
  sigma_teq_k: number | undefined;
  asym_teq_k: number | undefined;

  teff_k: number | undefined;
  sigma_teff_k: number | undefined;
  asym_teff_k: number | undefined;

  logg_cgs: number | undefined;
  sigma_logg_cgs: number | undefined;
  asym_logg_cgs: number | undefined;

  met_dex: number | undefined;
  sigma_met_dex: number | undefined;
  asym_met_dex: number | undefined;

  rstar_rs: number | undefined;
  sigma_rstar_rs: number | undefined;
  asym_rstar_rs: number | undefined;

  mstar_ms: number | undefined;
  sigma_mstar_ms: number | undefined;
  asym_mstar_ms: number | undefined;

  rho_cgs: number | undefined;

  snr: number | undefined;
  multi_ct: number | undefined;
  star_ct: number | undefined;
};

export const fieldsNameGroupsDictionary: Record<string, (keyof InputProps)[]> = {
  "Orbital Period": [
    "period_d",
    "sigma_period_d",
    "asym_period_d",
  ],

  "Transit Duration": [
    "dur_hr",
    "sigma_dur_hr",
    "asym_dur_hr",
  ],

  "Transit Depth": [
    "depth_ppm",
    "sigma_depth_ppm",
    "asym_depth_ppm",
  ],

  "Radius Ratio": [
    "ror",
    "sigma_ror",
    "asym_ror",
  ],

  "Orbital / Transit Geometry": [
    "incl_deg",
    "a_over_r",
    "num_trans",
    "sma_au",
    "tranmid_bjd",
  ],

  "Planet Radius": [
    "prad_re",
    "sigma_prad_re",
    "asym_prad_re",
  ],

  "Irradiation & Temperature": [
    "insol_ef",
    "teq_k",
    "sigma_teq_k",
    "asym_teq_k",
  ],

  "Stellar Temperature": [
    "teff_k",
    "sigma_teff_k",
    "asym_teff_k",
  ],

  "Stellar Gravity": [
    "logg_cgs",
    "sigma_logg_cgs",
    "asym_logg_cgs",
  ],

  "Stellar Metallicity": [
    "met_dex",
    "sigma_met_dex",
    "asym_met_dex",
  ],

  "Stellar Radius": [
    "rstar_rs",
    "sigma_rstar_rs",
    "asym_rstar_rs",
  ],

  "Stellar Mass": [
    "mstar_ms",
    "sigma_mstar_ms",
    "asym_mstar_ms",
  ],

  "Stellar Density": [
    "rho_cgs",
  ],

  "Detection & Multiplicity": [
    "snr",
    "multi_ct",
    "star_ct",
  ],
};

export const fieldsNameDictionary: Record<keyof InputProps, string> = {
  period_d: "Orbital period (days)",
  sigma_period_d: "σ(Orbital period)",
  asym_period_d: "Asymmetry (Orbital period)",

  dur_hr: "Transit duration (hours)",
  sigma_dur_hr: "σ(Transit duration)",
  asym_dur_hr: "Asymmetry (Transit duration)",

  depth_ppm: "Transit depth (ppm)",
  sigma_depth_ppm: "σ(Transit depth)",
  asym_depth_ppm: "Asymmetry (Transit depth)",

  ror: "Planet–star radius ratio (Rp/R*)",
  sigma_ror: "σ(Rp/R*)",
  asym_ror: "Asymmetry (Rp/R*)",

  incl_deg: "Orbital inclination (deg)",
  a_over_r: "Scaled semi-major axis (a/R*)",
  num_trans: "Number of observed transits",
  sma_au: "Semi-major axis (au)",
  tranmid_bjd: "Transit midpoint (BJD)",

  prad_re: "Planet radius (Earth radii)",
  sigma_prad_re: "σ(Planet radius)",
  asym_prad_re: "Asymmetry (Planet radius)",

  insol_ef: "Insolation flux (Earth flux)",
  teq_k: "Equilibrium temperature (K)",
  sigma_teq_k: "σ(Equilibrium temperature)",
  asym_teq_k: "Asymmetry (Equilibrium temperature)",

  teff_k: "Stellar effective temperature (K)",
  sigma_teff_k: "σ(Teff)",
  asym_teff_k: "Asymmetry (Teff)",

  logg_cgs: "Stellar surface gravity (log10 cm/s²)",
  sigma_logg_cgs: "σ(log g)",
  asym_logg_cgs: "Asymmetry (log g)",

  met_dex: "Stellar metallicity [dex]",
  sigma_met_dex: "σ([M/H])",
  asym_met_dex: "Asymmetry ([M/H])",

  rstar_rs: "Stellar radius (solar radii)",
  sigma_rstar_rs: "σ(Stellar radius)",
  asym_rstar_rs: "Asymmetry (Stellar radius)",

  mstar_ms: "Stellar mass (solar masses)",
  sigma_mstar_ms: "σ(Stellar mass)",
  asym_mstar_ms: "Asymmetry (Stellar mass)",

  rho_cgs: "Stellar density (g/cm³)",

  snr: "Transit signal-to-noise ratio",
  multi_ct: "Number of planets in system",
  star_ct: "Number of stars in system",
};

export const getDefaultInputProps = () => {
  return Object.keys(fieldsNameDictionary).reduce((acc, key) => {
    acc[key as keyof InputProps] = undefined;
    return acc;
  }, {} as InputProps);
}

const toNum = (v: unknown): number | undefined => {
  if (v == null) return undefined;
  const s = String(v).trim();
  if (s === "") return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
};

export const toInputProps = (rec: Record<string, unknown>): InputProps => {
  const obj = getDefaultInputProps();
  (Object.keys(obj) as (keyof InputProps)[]).forEach((k) => {
    obj[k] = toNum(rec[k]);
  });
  return obj;
};
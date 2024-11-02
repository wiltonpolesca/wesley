// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F3F4F6",
  neutral300: "#E5E7EB",
  neutral400: "#D2D6DB",
  neutral500: "#9DA4AE",
  neutral600: "#6C737F",
  neutral700: "#4D5761",
  neutral800: "#1F2A37",
  neutral900: "#000000",

  primary100: "#EDF9F3",
  primary200: "#A1DEC5",
  primary300: "#76D0AF",
  primary400: "#40C299",
  primary500: "#00BB8E",
  primary600: "#00A27B",

  secondary100: "#EFF8FF",
  secondary200: "#B2DDFF",
  secondary300: "#84CAFF",
  secondary400: "#53B1FD",
  secondary500: "#2E90FA",
  secondary600: "#1570EF",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default primary color.
   */
  primary: palette.primary500,
  /**
   * The default secondary color.
   */
  secondary: palette.secondary500,
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the header background.
   */
  header: palette.neutral100,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral100,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The light border color.
   */
  borderLight: palette.neutral200,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Cor para objetos em seu estado neutro.
   */
  neutralState: palette.neutral600,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
  /**
   * Light background color.
   */
  lightBackground: palette.neutral200,
}

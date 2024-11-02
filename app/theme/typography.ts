// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  SourceSans3_300Light as sourceSans3Light,
  SourceSans3_400Regular as sourceSans3Regular,
  SourceSans3_500Medium as sourceSans3Medium,
  SourceSans3_600SemiBold as sourceSans3SemiBold,
  SourceSans3_700Bold as sourceSans3Bold,
} from "@expo-google-fonts/source-sans-3"

export const customFontsToLoad = {
  sourceSans3Light,
  sourceSans3Regular,
  sourceSans3Medium,
  sourceSans3SemiBold,
  sourceSans3Bold,
}

const fonts = {
  sourceSans3: {
    // Cross-platform Google font.
    light: "sourceSans3Light",
    normal: "sourceSans3Regular",
    medium: "sourceSans3Medium",
    semiBold: "sourceSans3SemiBold",
    bold: "sourceSans3Bold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.sourceSans3,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}

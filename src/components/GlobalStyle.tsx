import { createGlobalStyle } from 'styled-components';

export const COLORS = {
    primaryColor: '#1a1a1a',
    primaryColorLight: '#7f7f7f',
    secondaryColor: '#c3c180',
    secondaryColorLight: '#818c22',
    linkColor: '#c3c180',
    linkColorLight: '#ffffff',
    backgroundColor: 'white',
    resume: {
        primaryColor: '#000',
        primaryColorLight: '#999',
    },
};
export const SIZES = {
    maxWidth: '960px',
    gridHeight: '18px',
    gridWidth: '18px',
};
export const ANIMATIONS = {
    transitionTime: '0.2s',
    transitionEasing: 'ease',
};
export const FONTS = {
    headerFontFamily: 'Arvo, serif',
    bodyFontFamily: 'Source Sans Pro, sans-serif',
};
export const FONT_SIZES = {
    xlarge: '38px',
    large: '23px',
};

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  height: -webkit-fill-available;
}

body {
  margin: 0;
  padding: 0;
  font-family: ${FONTS.bodyFontFamily};
  opacity: 1;
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
}

p {
  margin: 0;
  padding: 0;
}

a,
a:link,
a:hover,
a:visited,
a:focus,
a:active {
  color: ${COLORS.secondaryColorLight};
  background: linear-gradient(currentColor 0 0) 
    bottom center/
    var(--underline-width, 0%) 0.1em
    no-repeat;
  text-decoration: none;
  transition: background-size 0s;
}
a:hover {
  --underline-width: 100%;
  transition: background-size 0.1s;
}
a.sk-link-dark {
  &,
  &:link,
  &:hover,
  &:visited,
  &:focus,
  &:active {
    color: ${COLORS.linkColorLight};
  }
}

ul,
ol {
  margin: 0;
  padding: 0;
}`;

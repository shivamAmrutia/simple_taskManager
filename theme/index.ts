// Light mode color palette
export const lightTheme = {
    background: '#ffffff',
    text: '#000000',
    inputBackground: '#f2f2f2',
    borderColor: '#cccccc',
};

// Dark mode color palette
export const darkTheme = {
    background: '#121212',
    text: '#ffffff',
    inputBackground: '#1e1e1e',
    borderColor: '#333333',
};
  
// Type used to enforce theme structure
export type Theme = typeof lightTheme;
  
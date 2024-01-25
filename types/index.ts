export interface IFooterDataProps {
  head: string;
  subHeaders: string[];
}

export interface NavigationProps {
  nav: boolean;
  handleNav: () => void;
}

export interface ButtonCatalogProps {
  stylesButton?: string;
}

export interface CatalogModalState {
  showCatalog: boolean;
  setShowCatalog: () => void;
}

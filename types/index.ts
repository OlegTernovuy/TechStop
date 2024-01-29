// export interface IFooterDataProps {
//   head: string;
//   subHeaders: string[];
// }

export interface NavigationProps {
  nav: boolean;
  handleNav: () => void;
}

export interface ButtonCatalogProps {
  stylesButton?: string;
  title?: string;
  onClick?: () => void;
  icon?: boolean;
}

export interface CatalogModalState {
  showCatalog: boolean;
  setShowCatalog: () => void;
}

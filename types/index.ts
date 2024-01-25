export interface IFooterData {
  head: string;
  subHeaders: string[];
}

export interface IModal {
  children: React.ReactNode;
  title: string;
  search: string;
}

export interface Navigation {
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

export interface ShoppingCardModalState {
  showShoppingCard: boolean;
  setShowShoppingCard: () => void;
}
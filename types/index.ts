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
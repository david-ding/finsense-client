export interface MenuItem {
  label: string;
  path?: string;
  subItems?: Array<MenuItem>;
}

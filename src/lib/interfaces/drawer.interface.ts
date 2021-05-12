export interface DrawerInterface<T> {
  action: 'SAVE' | 'DELETE';
  data?: T;
}

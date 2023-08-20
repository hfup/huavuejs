type OwnerProperty<T> = {
    [P in keyof T]?: T[P];
};
type M<T> = {
    [key: string]: T;
};
type Dict = {
    [key: string]: any;
};
export type { OwnerProperty, M, Dict };

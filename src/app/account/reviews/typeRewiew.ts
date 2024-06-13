export interface IRewiewData {
    _id:           string;
    advantages:    string;
    disadvantages: string;
    comment:       string;
    user:          User;
    product:       Product;
    createdAt:     Date;
    updatedAt:     Date;
}

export interface Product {
    title:      string;
    price:      number;
    poster:     string | null;
    inStock:    boolean;
    rating:     { [key: string]: number };
    categories: string[];
    _id:        string;
    createdAt:  Date;
    updatedAt:  Date;
}

export interface User {
    email:     string;
    password:  string;
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
}
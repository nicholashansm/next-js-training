import { atom } from "jotai";

/**
 * Define the product data type.
 */
export interface ProductData {
    id: string;
    name: string;
    price: number;
}

/**
 * Define the product list atom.
 */
const productListAtom = atom<ProductData[]>([   
    { id: 'c67299a7-ae5d-4524-aa2f-4eee99217add', name: "Nintendo Switch", price: 3_500_000 },
    { id: 'cf8543cf-befd-4168-95e8-f9d244b08114', name: "PS5", price: 8_000_000 },
    { id: '23d4218d-2005-4cd4-8e25-3bff58e145da', name: "nVidia RTX 4070", price: 11_000_000 },
    { id: 'a19d13d9-ac65-41ad-9934-7616fcef02c3', name: "Legion Go", price: 10_000_000 },
    { id: 'cdd94ccc-c1c5-472f-a418-0a1cfd7f06c2', name: "HD800", price: 20_000_000 },
]);

export default productListAtom;
import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import Link from "next/link";

interface Product {
    id: number;
    name: string;
}

const ProductIndexPage : Page = () => {
    function generateProducts() : Product[] {
        return [
            { id: 1, name: "Nintendo Switch" },
            { id: 2, name: "PS5" },
            { id: 3, name: "nVidia RTX 4070" },
            { id: 4, name: "Legion Go" },
            { id: 5, name: "HD800" },
        ];
    }

    return <>
        <h1>Products</h1>

        <p>Welcome to the product page!</p>
        <Link href="/products/create">Click here to create a product</Link>

        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                </tr>
            </thead>

            <tbody>
                {generateProducts().map((product, index) => 
                    <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>
                            <Link href={`/products/edit/${product.id}`}>
                                {product.name}
                            </Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
}

ProductIndexPage.layout = WithDefaultLayout;
export default ProductIndexPage;
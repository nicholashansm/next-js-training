import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useState } from "react";

interface ProductData {
    id: string;
    name: string;
    price: number;
}

const ProductIndexPage: Page = () => {
    /**
     * Define the current page number.
     */
    const [page] = useState(1);

    /**
     * Define how many data rows to show per page.
     */
    const pageRows = 10;

    /**
     * Generate a list of static product data.
     * @returns 
     */
    function generateProducts(): ProductData[] {
        return [
            { id: 'c67299a7-ae5d-4524-aa2f-4eee99217add', name: "Nintendo Switch", price: 3_500_000 },
            { id: 'cf8543cf-befd-4168-95e8-f9d244b08114', name: "PS5", price: 8_000_000 },
            { id: '23d4218d-2005-4cd4-8e25-3bff58e145da', name: "nVidia RTX 4070", price: 11_000_000 },
            { id: 'a19d13d9-ac65-41ad-9934-7616fcef02c3', name: "Legion Go", price: 10_000_000 },
            { id: 'cdd94ccc-c1c5-472f-a418-0a1cfd7f06c2', name: "HD800", price: 20_000_000 },
        ];
    }

    /**
     * Define the columns for the product table using antd Table component.
     */
    const productColumns: ColumnsType<ProductData> = [
        {
            title: 'No.', dataIndex: 'rowNumber',
            render: (__value, __item, index) => (page - 1) * pageRows + index + 1
        },
        {
            title: 'Name', dataIndex: 'name',
            render: (value: string, product) => <Link href={`/products/edit/${product.id}`}>{value}</Link>
        },
        { title: 'Price', dataIndex: 'price' },
    ]

    return <>
        <h1>Products</h1>

        <p>Welcome to the product page!</p>
        <Link href="/products/create">Click here to create a product</Link>

        <Table rowKey="id"
        dataSource={generateProducts()} 
        columns={productColumns}></Table>

        {/* <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Price</th>
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
                        <td>{product.price}</td>
                    </tr>
                )}
            </tbody>
        </table> */}
    </>
}

ProductIndexPage.layout = WithDefaultLayout;
export default ProductIndexPage;
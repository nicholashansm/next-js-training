import { WithDefaultLayout } from "@/components/DefautLayout";
import productListAtom, { ProductData } from "@/data/Products";
import { Page } from "@/types/Page";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";

const ProductIndexPage: Page = () => {
    /**
     * Define the current page number.
     */
    const [page] = useState(1);

    /**
     * Define how many data rows to show per page.
     */
    const pageRows = 10;

    const [products] = useAtom(productListAtom);
    
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
        dataSource={products} 
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
                {products.map((product, index) =>
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
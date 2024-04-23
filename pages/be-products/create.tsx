import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page"
import { Alert, Button, Col, Input, InputNumber, Row, Space } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import CreateOrEditProductForm from "@/types/CreateOrEditProductForm";
import { CreateOrEditProductFormSchema, CreateOrEditProductFormType } from "@/schemas/CreateOrEditProductSchema";
import { DefaultApiRequestHeader } from "@/functions/DefaultApiRequestHeader";
import { Authorize } from "@/components/Authorize";
import { useAuthorizationContext } from "@/functions/AuthorizationContext";

/**
 * Create new product page component.
 * @returns 
 */
const CreateProduct: React.FC = () => {
    return <>
        {CreateProductForm({})}
    </>
}

/**
 * Create product form component using React Hook Form & Zod validation.
 * @returns 
 */
const CreateProductForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateOrEditProductFormType>({
        resolver: zodResolver(CreateOrEditProductFormSchema),
        mode: 'onChange'
    });

    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const {accessToken} = useAuthorizationContext();

    /**
     * Handle the form submission event.
     * @param e 
     * @returns 
     */
    async function onFormSubmit(formData: CreateOrEditProductForm) {
        // Using basic Fetch API to do POST request.
        const reqInit: RequestInit = {
            headers: {...DefaultApiRequestHeader,
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: JSON.stringify(formData)
        }

        try {
            await fetch('/api/be-custom/api/v1/product', reqInit);
        } catch (error) {
            console.error(error);
        }
    
        setIsAlertVisible(true);
        reset({price: 0});
    }

    return <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
        <Row>
            <Col span={24}>
                <h1>Create Product</h1>
                <p>Fill in the form below to create a new product.</p>
                <p><Link href={'/be-products'}>Or click here to go back to Products page.</Link></p>
            </Col>
        </Row>

        {isAlertVisible &&
            <Row>
                <Col span={24}>
                    <Alert
                        message="Product created successfully!"
                        type="success"
                        closable
                        onClose={() => setIsAlertVisible(false)}
                    />
                </Col>
            </Row>
        }

        <Row>
            <Col span={24}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Space direction="vertical" size={"small"} style={{ display: 'flex' }}>
                        <Row>
                            <Col span={24}>
                                <Controller name="name"
                                    control={control}
                                    render={({ field }) => <Input id="name" placeholder="Product Name"
                                        addonBefore="Product Name" {...field} />} />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <Controller name="price"
                                    control={control}
                                    render={({ field }) => <InputNumber id="price" defaultValue={0}
                                        addonBefore="Product Price" {...field} />} />

                                {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                            </Col>
                        </Row>

                        <Button type="primary" htmlType="submit" className="bg-blue-500">Submit</Button>
                    </Space>
                </form>
            </Col>
        </Row>
    </Space>
}

const CreateProductPage: Page = () => {
    return <Authorize>
        <CreateProduct />
    </Authorize>;
}

CreateProductPage.layout = WithDefaultLayout;
export default CreateProductPage;
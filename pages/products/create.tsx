import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page"
import { Button, Col, Input, InputNumber, Row, Space } from "antd";
import React, { FormEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Define the create form data structure.
 */
interface CreateProductFormData {
    name: string;
    price: number;
}

/**
 * Create new product page component.
 * @returns 
 */
const CreateProductPage: Page = () => {
    return <>
        {CreateProductForm({})}
    </>
}

/**
 * Create the create product form Zod schema.
 */
const CreateProductFormSchema = z.object({
    name: z.string().nonempty({message: 'Product name is required.'})
    .max(50, {message: 'Product name must be less than 50 characters.'}),
    price: z.number().min(10_000, {message: 'Product price must be at least 10,000.'})
});

/**
 * Obtain the typing from the schema.
 */
type CreateProductFormType = z.infer<typeof CreateProductFormSchema>;

/**
 * Create product form component using React Hook Form & Zod validation.
 * @returns 
 */
const CreateProductForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<CreateProductFormType>({
        resolver: zodResolver(CreateProductFormSchema),
    });

    /**
     * Handle the form submission event.
     * @param e 
     * @returns 
     */
    function onFormSubmit(formData: CreateProductFormData) {
        alert(`Product Name: ${formData.name}\nProduct Price: ${formData.price}`);
    }

    return <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
        <Row>
            <Col span={24}>
                <h1>Create Product</h1>
                <p>Fill in the form below to create a new product.</p>
            </Col>
        </Row>

        <Row>
            <Col span={24}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Space direction="vertical" size={"small"} style={{ display: 'flex' }}>
                        <Row>
                            <Col span={24}>
                                {/* When using controlled inputs such as antd's Input component, 
                                we must use the Controller component */}
                                <Controller name="name"
                                    control={control}
                                    render={({ field }) => <Input placeholder="Product Name"
                                        addonBefore="Product Name" {...field} />} />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <Controller name="price"
                                    control={control}
                                    render={({ field }) => <InputNumber defaultValue={0}
                                        addonBefore="Product Price" {...field} />} />

                                {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                            </Col>
                        </Row>

                        <Button type="primary" htmlType="submit" className="bg-blue-500">Submit</Button>
                    </Space>
                </form>
            </Col>
        </Row>

        <Row>
            {/* <Col span={24}>
                <h2>Input Summary</h2>
                <p>Product Name: {formData.name}</p>
                <p>Product Price: {formData.price}</p>
            </Col> */}
        </Row>
    </Space>
}


/**
 * Create product form component using React Hook Form validation.
 * @returns 
 */
export const CreateForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<CreateProductFormData>();

    /**
     * Handle the form submission event.
     * @param e 
     * @returns 
     */
    function onFormSubmit(formData: CreateProductFormData) {
        alert(`Product Name: ${formData.name}\nProduct Price: ${formData.price}`);
    }

    return <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
        <Row>
            <Col span={24}>
                <h1>Create Product</h1>
                <p>Fill in the form below to create a new product.</p>
            </Col>
        </Row>

        <Row>
            <Col span={24}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Space direction="vertical" size={"small"} style={{ display: 'flex' }}>
                        <Row>
                            <Col span={24}>
                                {/* When using controlled inputs such as antd's Input component, 
                                we must use the Controller component */}
                                <Controller name="name"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Product name is required.'
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Product name must be less than 50 characters.'
                                        }
                                    }}
                                    render={({ field }) => <Input placeholder="Product Name"
                                        addonBefore="Product Name" {...field} />} />

                                {/* HTML native input element tag example. */}
                                {/* <input type="text" {...register('name', 
                                { 
                                    required: {
                                        value: true,
                                        message: 'Product name is required.'
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: 'Product name must be less than 50 characters.'
                                    }})}></input>
                                     */}
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <Controller name="price"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Product price is required.'
                                        },
                                        min: {
                                            value: 10_000,
                                            message: 'Product price must be at least 10,000.'
                                        }
                                    }}
                                    render={({ field }) => <InputNumber defaultValue={0}
                                        addonBefore="Product Price" {...field} />} />

                                {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                            </Col>
                        </Row>

                        <Button type="primary" htmlType="submit" className="bg-blue-500">Submit</Button>
                    </Space>
                </form>
            </Col>
        </Row>

        <Row>
            {/* <Col span={24}>
                <h2>Input Summary</h2>
                <p>Product Name: {formData.name}</p>
                <p>Product Price: {formData.price}</p>
            </Col> */}
        </Row>
    </Space>
}

/**
 * Create product form component with manually written validation.
 * @returns 
 */
export const ManualValidationCreateForm: React.FC = () => {
    /**
     * Define the create form data state.
     */
    const [formData, setFormData] = useState<CreateProductFormData>({
        name: '',
        price: 0,
    })

    /**
     * Define the form name input error messages.
     */
    const [nameErrorMessage, setNameErrorMessage] = useState<string | null>(null);

    /**
     * Define the form price input error messages.
     */
    const [priceErrorMessage, setPriceErrorMessage] = useState<string | null>(null);

    /**
     * Handle the product name input change event.
     * @param e 
     */
    function onChangeProductName(e: React.ChangeEvent<HTMLInputElement>) {
        // Validate the acceptable name length.
        if (e.target.value.length > 50) {
            setNameErrorMessage("Product name must be less than 50 characters.");
        } else {
            setNameErrorMessage(null);
        }

        setFormData({ ...formData, name: e.target.value });
    }

    /**
     * Handle the product price input change event.
     * @param e 
     */
    function onChangeProductPrice(e: number | null) {
        let priceValue = 0;
        if (e !== null) {
            priceValue = e;
        }

        // Validate the acceptable price range.
        if (priceValue < 10_000) {
            setPriceErrorMessage("Product price must be at least 10,000.");
        } else {
            setPriceErrorMessage(null);
        }

        setFormData({ ...formData, price: priceValue });
    }

    /**
     * Display the name input error message.
     * @returns 
     */
    function renderNameInputErrorMessage() {
        if (nameErrorMessage !== null) {
            return <span className="text-red-500">{nameErrorMessage}</span>;
        }

        return;
    }

    /**
     * Display the price input error message.
     * @returns 
     */
    function renderPriceInputErrorMessage() {
        if (priceErrorMessage !== null) {
            return <span className="text-red-500">{priceErrorMessage}</span>;
        }

        return;
    }

    /**
     * Handle the form submission event.
     * @param e 
     * @returns 
     */
    function onFormSubmit(e: FormEvent<HTMLFormElement>) {
        // Prevent the default form submission behavior, which might causing a page reload.
        e.preventDefault();

        // Validate the form data using the error message state objects.
        if (nameErrorMessage !== null || priceErrorMessage !== null) {
            alert("Please fix the input errors.");

            return;
        }

        alert(`Product Name: ${formData.name}\nProduct Price: ${formData.price}`);
    }

    return <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
        <Row>
            <Col span={24}>
                <h1>Create Product</h1>
                <p>Fill in the form below to create a new product.</p>
            </Col>
        </Row>

        <Row>
            <Col span={24}>
                <form onSubmit={onFormSubmit}>
                    <Space direction="vertical" size={"small"} style={{ display: 'flex' }}>
                        <Row>
                            <Col span={24}>
                                <Input placeholder="Product Name"
                                    addonBefore="Product Name"
                                    value={formData.name} onChange={onChangeProductName} />
                                {renderNameInputErrorMessage()}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <InputNumber
                                    addonBefore="Product Price"
                                    value={formData.price}
                                    onChange={onChangeProductPrice} />
                                {renderPriceInputErrorMessage()}
                            </Col>
                        </Row>

                        <Button type="primary" htmlType="submit" className="bg-blue-500">Submit</Button>
                    </Space>
                </form>
            </Col>
        </Row>

        <Row>
            <Col span={24}>
                <h2>Input Summary</h2>
                <p>Product Name: {formData.name}</p>
                <p>Product Price: {formData.price}</p>
            </Col>
        </Row>
    </Space>
}

CreateProductPage.layout = WithDefaultLayout;
export default CreateProductPage;
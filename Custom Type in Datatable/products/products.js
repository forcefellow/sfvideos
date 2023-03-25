import { LightningElement } from 'lwc';

const COLUMNS = [
    { label: 'Title', fieldName: 'title' },
    { label: 'Description', fieldName: 'description' },
    { label: 'Price', fieldName: 'price', type: 'currency' },
    { label: 'Image', fieldName: 'image', type: 'customImage' },
];
export default class Products extends LightningElement {
    columns = COLUMNS;
    products = [];

    connectedCallback() {
        this.getProducts();
    }

    async getProducts() {
        const response = await fetch('https://fakestoreapi.com/products');
        if (response.ok) {
            this.products = await response.json();
        }
    }
}
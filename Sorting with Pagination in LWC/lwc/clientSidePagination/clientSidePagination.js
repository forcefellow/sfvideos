import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/PaginationDemoController.getContacts';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', sortable: "true" },
    { label: 'Email', fieldName: 'Email', sortable: "true" },
    { label: 'Phone', fieldName: 'Phone', sortable: "true" },
    { label: 'Gender', fieldName: 'GenderIdentity', sortable: "true" },
    { label: 'Created Date', fieldName: 'CreatedDate', sortable: "true", type: 'date' },

]

export default class ClientSidePagination extends LightningElement {
    columns = COLUMNS;
    isLoading = true;
    records = [];

    // PAGINATION PROPERTIES
    pageSize = 10;
    pageNumber = 1;
    totalRecords = 0;
    enablePagination = true;

    // SORTING PROPERTIES
    sortedBy;
    sortDirection;

    get hasRecords() {
        return this.records.length > 0;
    }

    // PAGINATION PROPERTY - CALCULATE AND RETURN RECORDS TO DISPLAY
    get recordsToDisplay() {
        let from = (this.pageNumber - 1) * this.pageSize,
            to = this.pageSize * this.pageNumber;
        return this.records?.slice(from, to);
    }

    // PAGINATION PROPERTY - CHECK WEATHER PAGINATION NEEDS TO SHOW OR NOT
    get showPaginator() {
        return this.enablePagination && this.hasRecords;
    }

    @wire(getContacts)
    wiredGetContacts(result) {
        if (result?.data) {
            this.isLoading = false;
            this.records = result.data;
            this.totalRecords = this.records.length;
        }
        if (result?.error) {
            this.isLoading = false;
            console.log('Error which fetching data- ', result.error);
        }
    }

    // WILL AUTOMATICALLY CALLED FROM PAGINATOR ON PAGE NUMBER OR SIZE CHANGE
    paginationChangeHandler(event) {
        if (event.detail) {
            this.pageNumber = event.detail.pageNumber;
            this.pageSize = event.detail.pageSize;
        }
    }

    // WILL GET CALLED ON SORTING CHANGE
    sortingChangeHandler(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortedBy, this.sortDirection);
        this.pageNumber = 1;
    }

    // FOR CLIENT SIDE SORTING
    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.records));
        // Determine sorting order
        const sortOrder = direction === 'asc' ? 1 : -1;

        // Perform sorting
        parseData.sort((a, b) => {
            const valueA = a[fieldname] ?? '';
            const valueB = b[fieldname] ?? '';

            // Compare values based on sortOrder
            if (valueA < valueB) return -1 * sortOrder;
            if (valueA > valueB) return 1 * sortOrder;
            return 0;
        });
        this.records = parseData;
    }
}
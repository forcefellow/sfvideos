import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/PaginationDemoController.getAccounts';
import getTotalAccountsCount from '@salesforce/apex/PaginationDemoController.getTotalAccountsCount';
const COLUMNS = [
    { label: 'Name', fieldName: 'Name', sortable: "true" },
    { label: 'Type', fieldName: 'Type', sortable: "true" },
    { label: 'Rating', fieldName: 'Rating', sortable: "true" },
    { label: 'Employees', fieldName: 'NumberOfEmployees', sortable: "true" },
    { label: 'Created Date', fieldName: 'CreatedDate', sortable: "true", type: 'date' }
]

export default class ServerSidePaginationWithDatatable extends LightningElement {
    columns = COLUMNS;
    isLoading = true;
    records = [];

    // PAGINATION PROPERTIES
    recordsToDisplay = [];
    pageSize = 10;
    pageNumber = 1;
    totalRecords = 0;
    enablePagination = true;
    lastRecordId = '';

    // SORTING PROPERTIES
    sortedBy;
    sortDirection = 'asc';
    sortedLastFieldValue = '';

    get hasRecords() {
        return this.records.length > 0;
    }

    // PAGINATION PROPERTY - CHECK WEATHER PAGINATION NEEDS TO SHOW OR NOT
    get showPaginator() {
        return this.enablePagination && this.hasRecords;
    }

    // GET TOTAL RECORDS COUNT
    @wire(getTotalAccountsCount)
    wiredGetTotalAccountsCount(result) {
        if (result.data) {
            this.totalRecords = parseInt(result.data);
        }
        else if (result.error) {
            console.log('Error while fetching total count- ', result.error);
        }
    }

    connectedCallback() {
        this.fetchRecordsFromServer();
    }

    async fetchRecordsFromServer() {
        try {
            let lastRecord = this.records[this.records.length - 1];
            this.lastRecordId = lastRecord?.Id
            this.sortedLastFieldValue = (this.sortedBy && lastRecord) ? lastRecord[this.sortedBy] : '';
            this.isLoading = true;
            let response = await getAccounts({ pageSize: this.pageSize, lastRecordId: this.lastRecordId, sortColumnName: this.sortedBy, sortOrder: this.sortDirection, sortedLastFieldValue: this.sortedLastFieldValue });
            this.isLoading = false;
            this.recordsToDisplay = response;
            this.records = [...this.records, ...this.recordsToDisplay];
        }
        catch (err) {
            this.isLoading = false;
            console.log('Error while fetching data- ', JSON.stringify(err));
        }
    }

    // WILL AUTOMATICALLY CALLED FROM PAGINATOR ON PAGE NUMBER OR SIZE CHANGE
    paginationChangeHandler(event) {
        if (event.detail) {
            if (this.pageSize != event.detail.pageSize) {
                this.records = []; // RESET RECORDS ARRAY ON PAGE SIZE CHANGE...
                this.pageSize = event.detail.pageSize;
            }
            this.pageNumber = event.detail.pageNumber;
            //if (event.detail.operationType == 'NEXT') {
            if (this.records.length > this.pageSize * (this.pageNumber - 1)) { // GET AND SHOW DATA FROM RECORDS LIST...
                let from = (this.pageNumber - 1) * this.pageSize,
                    to = this.pageSize * this.pageNumber;
                this.recordsToDisplay = this.records?.slice(from, to);
            }
            else {  // GET MORE DATA FROM SERVER...
                this.lastRecordId = this.records[this.records.length - 1]?.Id;
                this.isLoading = true;
                this.fetchRecordsFromServer();
            }
        }
    }

    sortingChangeHandler(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.pageNumber = 1;
        this.records = [];
        this.fetchRecordsFromServer();
    }
}


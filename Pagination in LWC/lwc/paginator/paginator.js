
import { LightningElement, api } from 'lwc';

export default class Paginator extends LightningElement {
    @api pageSize = 20;
    @api pageNumber = 1;
    @api totalRecords = 0;
    @api isClientSidePagination = false;
    @api itemsPerPageOptions = [5, 10, 20, 50, 100];

    get getItemsPerPage() {
        let options = this.itemsPerPageOptions?.map(a => { return { label: a, value: a } });
        return options;
    }

    get totalPages() {
        return Math.ceil(this.totalRecords / this.pageSize);;
    }

    get enablePreviousPageButton() {
        return this.pageNumber <= 1;
    }

    get enableNextPageButton() {
        return this.pageNumber >= this.totalPages;
    }

    get previousButtonsStyle() {
        return `slds-m-left_x-small custom-button ${this.enablePreviousPageButton ? 'custom-button-disabled' : ''}`;
    }

    get nextButtonsStyle() {
        return `slds-m-left_x-small custom-button ${this.enableNextPageButton ? 'custom-button-disabled' : ''}`;
    }

    get pageNumbersForPicklist() {
        let options = [];
        for (let number = 1; number <= this.totalPages; number++) {
            options.push({ label: number, value: number, selected: this.pageNumber == number });
        }
        return options;
    }

    get recordsFrom() {
        return (this.pageNumber - 1) * this.pageSize + 1;
    }

    get recordsTo() {
        let total = this.pageNumber * this.pageSize;
        return total > this.totalRecords ? this.totalRecords : total;
    }

    // CALLED ON PREVIOUS BUTTON CLICK
    previousPageHandler() {
        let number = this.pageNumber > 1 ? this.pageNumber - 1 : this.pageNumber;
        this.reloadData(number);
    }

    // CALLED ON NEXT BUTTON CLICK
    nextPageHandler() {
        let number = this.pageNumber < this.totalPages ? this.pageNumber + 1 : this.pageNumber;
        this.reloadData(number);
    }

    // CALLED ON GO TO FIRST PAGE BUTTON CLICK
    goToFirstPageHandler() {
        this.reloadData(1);
    }

    // CALLED ON GO TO LAST PAGE BUTTON CLICK
    goToLastPageHandler() {
        this.reloadData(this.totalPages);
    }

    // CALLED WHEN PAGE NUMBER CHANGED FROM DROPDOWN
    goToPageHandler(event) {
        this.reloadData(parseInt(event.target?.value));
    }

    // CALLED WHEN PAGE SIZE CHANGED
    handlePageSizeChange(event) {
        this.pageSize = parseInt(event.target?.value) ?? this.pageSize;
        this.reloadData(1); // RESET PAGE NUMBER ON PAGE SIZE CHANGE
    }

    // NOTIFY PARENT COMPONENT ABOUT CHANGE
    reloadData(newPageNumber) {
        let operationType = this.getOprationType(newPageNumber);
        this.pageNumber = newPageNumber;
        const customEvent = new CustomEvent('paginationchange', {
            detail: { pageSize: this.pageSize, pageNumber: this.pageNumber, operationType }
        });
        this.dispatchEvent(customEvent);
    }

    getOprationType(newPageNumber) {
        return (newPageNumber == 1 || newPageNumber > this.pageNumber) ? 'NEXT' : 'PREV';
    }

}
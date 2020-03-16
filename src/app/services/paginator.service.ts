import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

export class PaginationModel {
    selectItemsPerPage: number[] = [10, 20, 50];
    pageSize = this.selectItemsPerPage[0];
    pageIndex = 0;
    allItemsLength = 0;
}

@Injectable()
export class PaginatorService {
    private paginationModel: PaginationModel;

    get page(): number {
        return this.paginationModel.pageIndex;
    }

    get dbPage(): number {
        return this.paginationModel.pageIndex + 1;
    }

    get selectedItemsPerPage(): number[] {
        return this.paginationModel.selectItemsPerPage;
    }

    get pageSize(): number {
        return this.paginationModel.pageSize;
    }

    setItemRangesPerPage(pageRanges: number[]) {
        this.paginationModel.selectItemsPerPage = pageRanges;
        this.paginationModel.pageSize = pageRanges[0];
    }

    constructor() {
        this.paginationModel = new PaginationModel();
    }

    change(pageEvent: PageEvent) {
        this.paginationModel.pageIndex = pageEvent.pageIndex;
        this.paginationModel.pageSize = pageEvent.pageSize;
        this.paginationModel.allItemsLength = pageEvent.length;

    }

    reset() {
        this.paginationModel.pageIndex = 0;
    }
}
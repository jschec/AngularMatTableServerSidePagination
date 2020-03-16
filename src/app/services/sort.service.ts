import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';

export interface SortEvent {
    active: string;
    direction: SortDirection;
}

export class SortModel {
    activeColumn: string;
    activeDirection: SortDirection;
    defaultColumn: string;
    defaultDirection: SortDirection;
}

@Injectable()
export class SortService {
    private sortModel: SortModel;

    get activeColumn(): string {
        return this.sortModel.activeColumn;
    }

    get activeDirection(): SortDirection {
        return this.sortModel.activeDirection;
    }
    
    get defaultColumn(): string {
        return this.sortModel.defaultColumn;
    }

    get defaultDirection(): SortDirection {
        return this.sortModel.defaultDirection;
    }
    
    set defaultColumn(defaultSortCol: string) {
        this.sortModel.defaultColumn = defaultSortCol;
    }

    set defaultDirection(defaultSortDir: SortDirection) {
        this.sortModel.defaultDirection = defaultSortDir;
    }

    constructor() {
        this.sortModel = new SortModel();
    }

    change(sortEvent: SortEvent) {
        this.sortModel.activeColumn = sortEvent.active.length > 0 ? sortEvent.active : this.sortModel.defaultColumn;
        this.sortModel.activeDirection = sortEvent.direction.length > 0 ? sortEvent.direction : this.sortModel.defaultDirection;
    }
}
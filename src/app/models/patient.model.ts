export interface IPatient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  dateAdded?: Date;
}

export interface patientRecord {
  totalCount: number;
  pageIndex: number;
  totalPages: number;
  items: IPatient[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
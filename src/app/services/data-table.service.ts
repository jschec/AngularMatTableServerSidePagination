import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPatient, patientRecord } from '../models/patient.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

/**
 * Service that uses HTTP Client to call methods from .NET core middleware, 
 * which to query subsequently queries SQL Server database and returns the
 * resulting data
 */
export class DataTableDataService {
  
  baseUrl = environment.apiUrl; // maybe import url from config variable

  constructor(private http: HttpClient) { }
  
  /**
   * Uses page index and page size to calculate how many pages are needed to
   * bin the data from the database. This allows use to dynamically paginate
   * the data from the database rather than pulling down all of the data and
   * having the front end paginate the data.
   * 
   * @param page page in the database
   * @param pageSize number of rows from database to allow for
   * @param sortColumn selected column from database to sort
   * @param sortDirection direction (ASC or DESC) for how to sort the cosen column
   */
  getRecords(page: number, pageSize: number, sortColumn: string, sortDirection: string): Observable<patientRecord> {
    return this.http.get<patientRecord>(`${this.baseUrl}/patient?pageSize=${pageSize}&pageNumber=${page}&sortField=${sortColumn}&sortOrder=${sortDirection}`, httpOptions).pipe(
      catchError(this.handleError));
  }

  addRecord(payload: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>(`${this.baseUrl}/patient`, payload, httpOptions).pipe(
        catchError(this.handleError));
  }

  updateRecord(id: number, payload: IPatient): Observable<IPatient> {
    return this.http.put<IPatient>(`${this.baseUrl}/patient/${id}`, payload, httpOptions).pipe(
        catchError(this.handleError));
  }

  deleteRecord(id: number): Observable<IPatient> {
    return this.http.delete<IPatient>(`${this.baseUrl}/patient/${id}`, httpOptions).pipe(
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
      console.log(error);
      // return an observable with a user friendly message
      return throwError('Error! something went wrong.');
  }
}
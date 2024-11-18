import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, map, switchMap, tap } from 'rxjs';
import { ApiResponse } from '../../../shared';

@Injectable({
  providedIn: 'root',
})
export abstract class ResourcesBaseService {
  protected http = inject(HttpClient);
  protected availalbeUids$ = new ReplaySubject<string[]>(1);
  protected resourceApiUrl: string;

  protected getResources(params: HttpParams): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.resourceApiUrl, { params });
  }

  protected getTotalRecordsNumber(): Observable<number> {
    const params = new HttpParams().append('page', 1).append('limit', 1);
    return this.getResources(params).pipe(map((resp) => resp.total_records));
  }

  protected getAvailalbleUids(
    totalRecordsNumber: number
  ): Observable<string[]> {
    const params = new HttpParams()
      .append('page', 1)
      .append('limit', totalRecordsNumber);
    return this.getResources(params).pipe(
      map((resp) => resp.results.map((resource) => resource.uid))
    );
  }

  protected initializeAvailableUids(): void {
    this.getTotalRecordsNumber()
      .pipe(
        switchMap((totalRecordsNumber) =>
          this.getAvailalbleUids(totalRecordsNumber)
        ),
        tap((availableUids) => {
          this.availalbeUids$.next(availableUids);
        })
      )
      .subscribe();
  }

  constructor(resourceApiUrl: string) {
    this.resourceApiUrl = resourceApiUrl;
    this.initializeAvailableUids();
  }
}

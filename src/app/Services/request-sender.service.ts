import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RequestSenderService {

  constructor(private _http: HttpClient) { }

  sendPost<T>(body: any, path: any): Observable<T> {
    return this._http.post<T>(environment.apiUrl + path, body).pipe(
      map((response: any) => {
        return response
      }),
      catchError(this.handleError)
    )
  }

  sendGet<T>(path: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this._http.get<T>(environment.apiUrl + path, { params, observe: 'response' })
      .pipe(
        map ((response: HttpResponse<T>) => {
        return new HttpResponse<T>({
          body: response.body,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        
        })
      }),
      catchError(this.handleError)
      )
  }

  deleteItem<T>(url: string, id: any): Observable<T> {
    const deleteUrl = environment.apiUrl+`${url}/${id}`;
    return this._http.delete<T>(deleteUrl);
  }


  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {

      errorMessage = `${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

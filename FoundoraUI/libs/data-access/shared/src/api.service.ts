import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_CONFIG } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly client = inject(HttpClient);
  private readonly config = inject(API_CONFIG);

  /**
   * Generic GET method
   */
  get(path: string, params?: HttpParams, headers?: HttpHeaders): Observable<any>{
    return this.client.get<any>(`${this.config.rootUrl}/${path}`, { params, headers });
  }
  
  /**
   * Generic POST method
   */
  post(path: string, body: any, headers?: HttpHeaders): Observable<any>{
    return this.client.post<any>(`${this.config.rootUrl}/${path}`, body, { headers });
  }

  /**
   * Generic PUT method
   */
  put(path: string, body: any, headers?: HttpHeaders): Observable<any>{
    return this.client.put<any>(`${this.config.rootUrl}/${path}`, body, { headers });
  }

  /**
   * Generic PATCH method
   */
  patch(path: string, body: any, headers?: HttpHeaders): Observable<any>{
    return this.client.patch<any>(`${this.config.rootUrl}/${path}`, body, { headers });
  }

  /**
   * Generic DELETE method
   */
  delete(path: string, params?: HttpParams, headers?: HttpHeaders): Observable<any>{
    return this.client.delete<any>(`${this.config.rootUrl}/${path}`, { params, headers });
  }
}
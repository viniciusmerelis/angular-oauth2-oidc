import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/clientes';
  }

  listar(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

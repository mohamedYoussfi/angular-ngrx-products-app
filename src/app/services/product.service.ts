/**
 * @author : Mohamed YOUSSFI, med@youssfi.net,
 * ENSET Mohammedia, Université Hassan II de Casablanca
 *
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Product} from '../model/product.model';

@Injectable({providedIn:"root"})
export class ProductService {

  constructor(private http:HttpClient) {
  }

  public getProducts():Observable<Product[]>{
    let host=Math.random()>0.2?environment.host:environment.unreachableHost;
    //let host=environment.host;
    return this.http.get<Product[]>(host+"/products");
    //return throwError("Not Implemented yet");
  }
  public getSelectedProducts():Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?selected=true");
  }
  public getAvailableProducts():Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?available=true");
  }

  public searchProducts(name:string):Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?name_like="+name);
  }
  public setSelected(product:Product):Observable<Product>{
    return this.http.put<Product>(environment.host+"/products/"+product.id,{...product,selected:!product.selected});
  }
  public delete(id:number):Observable<void>{
     return this.http.delete<void>(environment.host+"/products/"+id);
  }
  public save(product:Product):Observable<Product>{
    return this.http.post<Product>(environment.host+"/products/",product);
  }
  public update(product:Product):Observable<Product>{
    return this.http.put<Product>(environment.host+"/products/"+product.id,product);
  }
  public getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(environment.host+"/products/"+id);
  }

}

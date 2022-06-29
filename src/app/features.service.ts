import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Players } from './players.modal';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FeaturesService {


  url = "http://localhost:3000/posts"
  constructor(private http: HttpClient) {


  }

  getPlayer() {
    return this.http.get<Players[]>(this.url).pipe(map((res: any) => {
      return res;
    }));
  }
 postPlayer(data:any){
   return this.http.post<Players[]>(this.url,data).pipe(map((res:any)=>{
     
  return res;
   }))
 }

 deletePlayer(id:any){
  return this.http.delete("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
    
 return res;
  }))
}


updatePlayer(data:any,id:any){
  return this.http.put("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
    
 return res;
  }))
}

}



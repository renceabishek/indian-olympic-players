import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, concat, forkJoin, merge, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  item$: any[];
  
  last: any
  fixed: any

  constructor(private firestore: AngularFirestore) {
    this.getInitialPlayers();
   }

  ngOnInit(): void {
    
    
  }

  async getInitialPlayers() {
     const first=this.firestore.collection("players", ref=> ref.orderBy("name").limit(6));
     const snapshot = await first.get()

     first.valueChanges().subscribe(f=> {
     //  console.log("last value "+this.last)
     this.last = this.fixed 
     this.item$ = f;

    })

    snapshot.subscribe(f=> {
      this.last = f.docs[f.docs.length-1]
      this.fixed = this.last
    } )
  }

 async getPlayers() {

    const latest  =  this.firestore.collection("players", ref=> 
        ref.orderBy('name')
        .startAfter(this.last.data().name).limit(6)
      )
      
      const snapshot = await latest.get()
      snapshot.subscribe(f=> {
        this.last = f.docs[f.docs.length-1]
      } )
      

      latest.valueChanges().subscribe(f=>{
        f.forEach(d=>{
          this.item$.push(d)
        })
        
      })
      //this.item$.push("onemore")
      //this.item$ =latest$

      // this.item$ = combineLatest(this.item$,latest$)
      // .pipe(map(([first,second])=>{
      //   return of( first, second)
      // }))

    
  }

}

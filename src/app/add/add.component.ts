import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  addform!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private api:ApiService){


    this.addform=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      gender:['',Validators.required]
    })
  }


  adddetails(){
    if(this.addform.valid){
      this.api.addUsers(this.addform.value).subscribe(()=>{
        this.router.navigate(['/'])
      })
    }
  }
  

}

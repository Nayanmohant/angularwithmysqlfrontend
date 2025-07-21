import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  editform!:FormGroup
  userid!:any

  constructor(private fb:FormBuilder,private router:Router,private api:ApiService,private route:ActivatedRoute){

    this.editform=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      gender:['',Validators.required]
    })
  }

  ngOnInit(){
    this.userid=this.route.snapshot.paramMap.get('id');

    this.api.getUsers().subscribe((users)=>{
       const user=users.find((u:any)=>u.id==this.userid)
        if(user){
          this.editform.patchValue(user)
        }
      
    })


   
  }

  edituser(){
     if(this.editform.valid){
    this.api.edituser(this.userid,this.editform.value).subscribe(()=>{
      alert('updated sucessfully')
      this.router.navigateByUrl("")
    
    })
  }
  }

  

}

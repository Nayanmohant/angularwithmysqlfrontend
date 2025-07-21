import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService, User } from '../api.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  users:any[]=[]

  constructor(private router:Router,private api:ApiService){}

  ngOnInit(){
    this.loadusers()
  }
  gotoadd(){
   this.router.navigateByUrl("add")
  }

  loadusers(){
    this.api.getUsers().subscribe(data=>{
      this.users=data
    })
  }

  deleteuser(id:number){
    if(confirm('Are you sure you want to delete this user')){
   this.api.deleteusers(id).subscribe(()=>{
    this.loadusers()
   })
  }
}

downloadcv(user: any) {
  const element = document.getElementById('cv-' + user.id);
  if (!element) return;

  html2canvas(element).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
    pdf.save(`${user.name}_cv.pdf`);
  });
}



}

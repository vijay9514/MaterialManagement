import { Component, OnInit } from '@angular/core';
import { ElementRef ,ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { InfoService } from '../info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.css']
})
export class ProductReportComponent implements OnInit {
  AllOProductData: any;

  constructor(private InfoService:InfoService,private router:Router) { 
    this.InfoService.currentMessage.subscribe(message => {
      if(message!='default message'){
        this.AllOProductData = JSON.parse(message);
        console.log("this is the inward report",this.AllOProductData)
      }else{
        this.router.navigateByUrl('layout/Reports');
      }
    })
  }

  ngOnInit(): void {
  }
 

  public download() {
    var data = document.getElementById('product-table') as HTMLElement;
  
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      const contentDataURL = canvas.toDataURL('image/png');
  
      // Create a new jsPDF instance
      const pdf = new jspdf.jsPDF(); // Use 'jsPDF()' if 'jsPDF' is the default export
  
      // Add an image to the PDF
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
  
      // Save or display the PDF
      const pdfOutput = pdf.output('blob'); // Get the PDF as a Blob
      const blobURL = URL.createObjectURL(pdfOutput);
  
      // Create a download link
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = 'new-file.pdf';
  
      // Append the link to the document and trigger a click to start the download
      document.body.appendChild(link);
      link.click();
  
      // Remove the link from the document
      document.body.removeChild(link);
    });
  }
  
}
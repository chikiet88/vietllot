import { Component, ViewChild } from '@angular/core';
import { GetlistService } from './getlist.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  title = 'vietlot';
  tutorials: any=[];
  tutorials1: any=[];
  form: any=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
  displayedColumns: string[] = [
    '1','2','3','4','5','6','7','8','9','10',
    '11','12','13','14','15','16','17','18','19','10',
    '21','22','23','24','25','26','27','28','29','30',
    '31','32','33','34','35','36','37','38','39','40',
    '41','42','43','44','45','46','47','48','49','50',
    '51','52','53','54','55','56','57','58','59','60',
    '61','62','63','64','65','66','67','68','69','70',
    '71','72','73','74','75','76','77','78','79','80',
  ];
 dataSource: MatTableDataSource<any> | null | undefined;

  constructor(private GetlistService: GetlistService) {
   }

  ngOnInit(): void {
    this.retrieveTutorials();
  }
  ngAfterViewInit() {
  }
  retrieveTutorials(): void {
    this.GetlistService.getAll()
      .subscribe({
        next: (data): void => {
          let item :any = [];
          let item1 :any = [];
          data.forEach((v: any) => {
            let a =JSON.parse(v.Ketqua);
            let ketqua1: string[]=[];  
            let i: number = 0;
          while (i<81) {
              let b = a.find((x: number)=>x==i)
             console.log(b);
              if(b!=undefined)
              {
                ketqua1.push(i.toString())
              }
              else {
                ketqua1.push("")
              }
             // console.log(b);
          // (a[i] == (i+1))?ketqua.push(a[i]):ketqua.push(0)
             i++;
           }
              console.log(ketqua1)
            item.push({'Kyso':v.Kyso,'Ketqua':ketqua1})
          });
          console.log(item);
          this.tutorials = item;
          this.dataSource = new MatTableDataSource(this.tutorials);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (e) => console.error(e)
      });

      this.GetlistService.getAll()
      .subscribe({
        next: (data): void => {
          let item1 :any = [];
          data.data.forEach((v: any) => {
            let a =JSON.parse(v.Ketqua);
            item1.push({'Kyso':v.Kyso,'Ketqua':a})
          });
          console.log(item1);
          this.tutorials1 = item1;

        },
        error: (e) => console.error(e)
      });




  }
}

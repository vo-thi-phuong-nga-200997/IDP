import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private router: Router,
  ) {}
  brand: Array<any>=[];
  orderQuantity: number = 0;
  item: any;
  itemOrder: Array<any> = [];
  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('orderQuantity'))){
      this.orderQuantity = JSON.parse(localStorage.getItem('orderQuantity'))
    }
    if(JSON.parse(localStorage.getItem('brand'))){
      this.brand = JSON.parse(localStorage.getItem('brand'))
    }else{
      this.brand = [
        {
          id: 0,
          nameBrand: 'LIF',
          item: [
            {
              img: "../../assets/image/Picture1.png",
              name: "LiF 100% Fresh Milk From Goulburn Australia",
              price: 10000,
              quantity: 0
            },
            {
              img: "../../assets/image/Picture13.png",
              name: "LIF Yogurt - Sweetened",
              price: 10000,
              quantity: 0
  
            },
            {
              img: "../../assets/image/Picture7.png",
              name: "LIF KUN UHT Drinking Yogurt",
              price: 10000,
              quantity: 0
  
            },
          ]
        },
        {
          id: 1,
          nameBrand: 'KUN',
          item: [
            {
              img: "../../assets/image/Picture2.png",
              name: "LIF KUN Malt Drink",
              price: 10000,
              quantity: 0
      
            },  
            {
              img: "../../assets/image/Picture8.png",
              name: "Nutrition from Milk, Energey from Math",
              sale: "Tặng bánh quy nhân kem Cream-0 gói 85gr khi mua 1 lốc Sữa Kun 180ml",
              price: 10000,
              quantity: 0
  
            },
            {
              img: "../../assets/image/Picture12.png",
              name: "LIF KUN UHT Drinking Yogurt",
              price: 10000,
              quantity: 0
      
            },
            {
              img: "../../assets/image/Picture4.png",
              name: "LIF KUN UHT Milt Less Sugar",
              quantity: 0,
              price: 10000,
      
            },
       
            {
              img: "../../assets/image/Picture3.png",
              name: "LIF KUN UHT Milt Less Sugar",
              quantity: 0,
              price: 10000,

  
            }
          ]
        },
        {
          id: 2,
          nameBrand: 'BaVi',
          item: [
            {
              img: "../../assets/image/Picture5.png",
              name: "Ba Vi 100% Fresh Milk",
              price: 10000,
              quantity: 0
  
            },
            {
              img: "../../assets/image/Picture11.png",
              name: "Ba Vi Yogurt - Passion Fruil",
              price: 10000,
              quantity: 0
  
            },
            {
              img: "../../assets/image/Picture10.png",
              name: "Ba Vi Yogurt - Sweetened",
              price: 10000,
              quantity: 0
  
            },
          ]
        },
        {
          id: 3,
          nameBrand: 'MenSong',
          item: [
            {
              img: "../../assets/image/Picture6.png",
              name: "Love'in Farm Live Culture Yogurt With Cocount Jelly",
              price: 10000,
              quantity: 0
  
            },
          ]
        }
      ]
    }
    this.item =  {
        id: this.brand[0].id,
        item: this.brand[0].item,
    }
  }
  quantity(event, i: number){
    this.brand[this.item.id].item[i].quantity = event;
  }
  order(event){
    if(event){
      this.orderQuantity += 1;
    }else{
      this.orderQuantity -= 1;
    }
    if(this.orderQuantity == 0){
      localStorage.setItem('brand', JSON.stringify(this.brand));
      localStorage.setItem('orderQuantity', JSON.stringify(this.orderQuantity));
    }
  }
  setItem(id: number){
    this.item =  {
      id: this.brand[id].id,
      item: this.brand[id].item,
  }
  }
  placeOrder(){
    localStorage.setItem('brand', JSON.stringify(this.brand));
    localStorage.setItem('orderQuantity', JSON.stringify(this.orderQuantity));
    this.router.navigate([`/order-page`]);
  }
}

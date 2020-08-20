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
    if(JSON.parse(localStorage.getItem('orderItem'))){
      this.itemOrder = JSON.parse(localStorage.getItem('orderItem'));
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
              id: '01',
              img: "../../assets/image/Picture1.png",
              name: "LiF 100% Fresh Milk From Goulburn Australia",
              price: 10000,
              quantity: 0
            },
            {
              id: '02',
              img: "../../assets/image/Picture13.png",
              name: "LIF Yogurt - Sweetened",
              price: 10000,
              quantity: 0
  
            },
            {
              id: '03',
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
              id: '10',
              img: "../../assets/image/Picture2.png",
              name: "LIF KUN Malt Drink",
              price: 10000,
              quantity: 0
      
            },  
            {
              id: '11',
              img: "../../assets/image/Picture8.png",
              name: "Nutrition from Milk, Energey from Math",
              sale: "Tặng bánh quy nhân kem Cream-0 gói 85gr khi mua 1 lốc Sữa Kun 180ml",
              price: 10000,
              quantity: 0
  
            },
            {
              id: '12',
              img: "../../assets/image/Picture12.png",
              name: "LIF KUN UHT Drinking Yogurt",
              price: 10000,
              quantity: 0
      
            },
            {
              id: '13',
              img: "../../assets/image/Picture4.png",
              name: "LIF KUN UHT Milt Less Sugar",
              quantity: 0,
              price: 10000,
      
            },
            {
              id: '14',
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
              id: '20',
              img: "../../assets/image/Picture5.png",
              name: "Ba Vi 100% Fresh Milk",
              price: 10000,
              quantity: 0
  
            },
            {
              id: '21',
              img: "../../assets/image/Picture11.png",
              name: "Ba Vi Yogurt - Passion Fruil",
              price: 10000,
              quantity: 0
  
            },
            {
              id: '22',
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
              id: '30',
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
  async quantity(event, i: number){
    this.brand[this.item.id].item[i].quantity = event;
    if(this.itemOrder.length > 0){
      const index = await this.itemOrder.findIndex(data => data.id === this.brand[this.item.id].item[i].id);
      if(index >= 0){
          if(event > 0){
            this.itemOrder[index].quantity = event;
          }else{
            this.itemOrder.splice(index, 1)
          }
      }else{
        this.itemOrder.push({
          id: this.brand[this.item.id].item[i].id,
          img: this.brand[this.item.id].item[i].img,
          name: this.brand[this.item.id].item[i].name,
          price: this.brand[this.item.id].item[i].price,
          quantity: this.brand[this.item.id].item[i].quantity
        });
      }
    }else{
      this.itemOrder.push({
        id: this.brand[this.item.id].item[i].id,
        img: this.brand[this.item.id].item[i].img,
        name: this.brand[this.item.id].item[i].name,
        price: this.brand[this.item.id].item[i].price,
        quantity: this.brand[this.item.id].item[i].quantity
      });
    }
  }
  order(event){
    if(event){
      this.orderQuantity += 1;
    }else{
      this.orderQuantity -= 1;
    }
    if(this.orderQuantity == 0){
      localStorage.removeItem('brand');
      localStorage.removeItem('orderQuantity');
      localStorage.removeItem('orderItem')
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
    localStorage.setItem('orderItem', JSON.stringify(this.itemOrder))
    this.router.navigate([`/order-page`]);
  }
}

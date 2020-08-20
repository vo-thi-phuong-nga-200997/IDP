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
  item:  any = [];
  itemOrder: Array<any> = [];
  ngOnInit(): void {
    if(localStorage.getItem('orderQuantity')){
      this.orderQuantity = JSON.parse(localStorage.getItem('orderQuantity'))
    }
    if(localStorage.getItem('orderItem')){
      this.itemOrder = JSON.parse(localStorage.getItem('orderItem'));
    }
    if(localStorage.getItem('brand')){
      this.brand = JSON.parse(localStorage.getItem('brand'))
    }else{
      this.brand = [
        {
          id: 0,
          nameBrand: 'LIF',
          item: [
            {
              id: 0,
              img: "../../assets/image/Picture1.png",
              name: "LiF 100% Fresh Milk From Goulburn Australia",
              price: 10000,
              quantity: 0
            },
            {
              id: 1,
              img: "../../assets/image/Picture13.png",
              name: "LIF Yogurt - Sweetened",
              price: 10000,
              quantity: 0
  
            },
            {
              id: 2,
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
              id: 0,
              img: "../../assets/image/Picture2.png",
              name: "LIF KUN Malt Drink",
              price: 10000,
              quantity: 0
      
            },  
            {
              id: 1,
              img: "../../assets/image/Picture8.png",
              name: "Nutrition from Milk, Energey from Math",
              sale: "Tặng bánh quy nhân kem Cream-0 gói 85gr khi mua 1 lốc Sữa Kun 180ml",
              price: 10000,
              quantity: 0
  
            },
            {
              id: 2,
              img: "../../assets/image/Picture12.png",
              name: "LIF KUN UHT Drinking Yogurt",
              price: 10000,
              quantity: 0
      
            },
            {
              id: 3,
              img: "../../assets/image/Picture4.png",
              name: "LIF KUN UHT Milt Less Sugar",
              quantity: 0,
              price: 10000,
      
            },
            {
              id: 4,
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
              id: 0,
              img: "../../assets/image/Picture5.png",
              name: "Ba Vi 100% Fresh Milk",
              price: 10000,
              quantity: 0
  
            },
            {
              id: 1,
              img: "../../assets/image/Picture11.png",
              name: "Ba Vi Yogurt - Passion Fruil",
              price: 10000,
              quantity: 0
  
            },
            {
              id: 2,
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
              id: 0,
              img: "../../assets/image/Picture6.png",
              name: "Love'in Farm Live Culture Yogurt With Cocount Jelly",
              price: 10000,
              quantity: 0
  
            },
          ]
        }
      ]
    }
    this.setDefaulItem()
  }
  async quantity(event, i: number){
    this.brand[this.item[i].idBrand].item[this.item[i].id].quantity = event;
    if(this.itemOrder.length > 0){
      const index = await this.itemOrder.findIndex(data => (data.id === this.brand[this.item[i].idBrand].item[i].id) && (data.idBrand === this.brand[this.item[i].idBrand].id));
      if(index >= 0){
          if(event > 0){
            this.itemOrder[index].quantity = event;
          }else{
            this.itemOrder.splice(index, 1)
          }
      }else{
        this.itemOrder.push({
          ...this.brand[this.item[i].idBrand].item[i],
          idBrand: this.item[i].idBrand
        });
      }
    }else{
      this.itemOrder.push({
        ...this.brand[this.item[i].idBrand].item[i],
        idBrand: this.item[i].idBrand
      });
    }
    console.log(this.itemOrder)
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
  setItem(index: number){
    this.item = [];
    this.brand[index].item.map(data=>{
      this.item.push({
        ...data,
        idBrand: this.brand[index].id
      }) 
    })
  }
  searchItem(){
    localStorage.setItem('brand', JSON.stringify(this.brand));
    localStorage.setItem('orderQuantity', JSON.stringify(this.orderQuantity));
    localStorage.setItem('orderItem', JSON.stringify(this.itemOrder))
    this.router.navigate([`/search-page`]);
  }
  placeOrder(){
    localStorage.setItem('brand', JSON.stringify(this.brand));
    localStorage.setItem('orderQuantity', JSON.stringify(this.orderQuantity));
    localStorage.setItem('orderItem', JSON.stringify(this.itemOrder))
    this.router.navigate([`/order-page`]);
  }
  stringToSlug(str) {
    // remove accents
    var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i=0, l=from.length ; i < l ; i++) {
      str = str.replace(RegExp(from[i], "gi"), to[i]);
    }
  
    str = str.toLowerCase()
          .trim()
          .replace(/[^a-z0-9\-]/g, '-')
          .replace(/-+/g, '-');
  
    return str;
  }
  setDefaulItem(){
    this.brand[0].item.map(data=>{
      this.item.push({
        ...data,
        idBrand: this.brand[0].id
      }) 
    })
  }
}

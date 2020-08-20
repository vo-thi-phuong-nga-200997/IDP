import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  brand: Array<any>=[];
  orderQuantity: number = 0;
  item:  any = [];
  itemOrder: Array<any> = [];
   constructor( private router: Router,private _location: Location ) { }
  async ngOnInit(){
    if(localStorage.getItem('orderQuantity')){
      this.orderQuantity = JSON.parse(localStorage.getItem('orderQuantity'))
    }
    if(localStorage.getItem('orderItem')){
      this.itemOrder = JSON.parse(localStorage.getItem('orderItem'));
    }
    if(localStorage.getItem('brand')){
      this.brand = await JSON.parse(localStorage.getItem('brand'));
      this.setDefaulItem()
    }else{
      this.router.navigate([`/home-page`]);
    }
  }
  searchItem(name: string){
    let dataSearch = [];
    this.item = [];
    if(name){
      this.brand.map(data=>{
        dataSearch = data.item.filter(item => (this.stringToSlug(item.name).indexOf(this.stringToSlug(name)) !== -1));
        if(dataSearch.length > 0){
            dataSearch.map(item => {
            this.item.push({
              ...item,
              idBrand: data.id
            })
          })
        }
      })
    }else{
      this.setDefaulItem()
    }
  }
  setDefaulItem(){
    this.item = [];
    for(let data of this.brand){
        for(let item of data.item){
          this.item.push({
            ...item,
            idBrand: data.id
          }) 
        }
    }
  }
  async quantity(event, i: number){
    this.brand[this.item[i].idBrand].item[this.item[i].id].quantity = event;
    if(this.itemOrder.length > 0){
      const index = await this.itemOrder.findIndex(data => (data.id === this.brand[this.item[i].idBrand].item[this.item[i].id].id) && (data.idBrand === this.brand[this.item[i].idBrand].id));
      if(index >= 0){
          if(event > 0){
            this.itemOrder[index].quantity = event;
          }else{
            this.itemOrder.splice(index, 1)
          }
      }else{
        this.itemOrder.push({
          ...this.brand[this.item[i].idBrand].item[this.item[i].id],
          idBrand: this.item[i].idBrand
        });
      }
    }else{
      this.itemOrder.push({
        ...this.brand[this.item[i].idBrand].item[this.item[i].id],
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

  placeOrder(){
    localStorage.setItem('brand', JSON.stringify(this.brand));
    localStorage.setItem('orderQuantity', JSON.stringify(this.orderQuantity));
    localStorage.setItem('orderItem', JSON.stringify(this.itemOrder))
    this.router.navigate([`/order-page`]);
  }

  backClicked() {
    this._location.back();
    localStorage.setItem('brand', JSON.stringify(this.brand));
    localStorage.setItem('orderQuantity', JSON.stringify(this.orderQuantity));
    localStorage.setItem('orderItem', JSON.stringify(this.itemOrder))
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
}

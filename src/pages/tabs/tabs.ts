import { Component, ViewChild } from '@angular/core';
import { NavParams, Tabs } from "ionic-angular";

import { OrderPage } from '../order/order';
import { MinePage } from '../mine/mine';
import { CategoryPage } from "../category/category";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  tab1Root = CategoryPage;
  tab2Root = OrderPage;
  tab3Root = MinePage;
  selectedIndex = 0;
  constructor(public np:NavParams) {
    if (this.np.get("index") != '' || this.np.get("index") != null){
      this.selectedIndex = this.np.get("index");
    }
  }
}

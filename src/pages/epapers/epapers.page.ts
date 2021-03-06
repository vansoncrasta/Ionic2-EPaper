import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { EPaperService } from '../../providers/index';
import { EPaper } from '../../models/index';

@IonicPage({
  name: 'EPapersPage'
})
@Component({
  selector: 'page-epapers',
  templateUrl: 'epapers.page.html'
})
export class EPapersPage {

  private epapers = [];
  private allEPapers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public epaperService: EPaperService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EPapersPage');
    this.allEPapers = this.epaperService.getAllEPapers();
    for (let entry of this.allEPapers) {
      entry.showDetails = false;
    }
    this.epapers = this.allEPapers;
  }

  toggleDetails(data) {
    data.showDetails = !data.showDetails;
  }

  getCollapseIcon(data) {
    return data.showDetails ? 'arrow-dropup' : 'arrow-dropdown';
  }

  getEPapers(epaper: any) {
    //re initialize
    this.epapers = this.allEPapers;

    // set val to the value of the searchbar
    let val = epaper.target.value;
    if (val && val.trim() != '') {
      this.epapers = this.allEPapers.filter((item) => {
        console.log(item.name);
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  epaperSelected($event, epaper, edition) {
    let selectedEPaper: EPaper = new EPaper()
    selectedEPaper.id = epaper.id;
    selectedEPaper.name = epaper.name;
    selectedEPaper.editionID = edition.id;
    selectedEPaper.editionName = edition.name;
    this.navCtrl.push('EPaperDetailsPage', selectedEPaper);
  }

  goToHomePage() {
    this.navCtrl.popToRoot();
  }
}

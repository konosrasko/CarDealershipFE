import {Component, OnInit} from '@angular/core';
import {CarService} from './car.service';
import {Car} from './car.model';
import {ToasterService} from '../shared/toaster/toaster.service';

@Component({
  selector: 'app-car',
  standalone: false,
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit{
  models: string[] = ['All', 'Focus', 'Passat', 'Uno', 'Lancer'];
  brands: string[] = ['All', 'Ford', 'VolksWagen', 'Fiat', 'Mitsubisi'];
  priceRanges: string[] = ['All', '0-100', '100-200', '200-300'];
  selectedModels: string = 'All';
  selectedBrands: string = 'All';
  selectedPriceRanges: string = 'All';
  searchText: string = '';
  rents: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(data => {
      this.rents = data;
    });
  }
  
  get filteredRents() {
    return this.rents.filter(rent => {
      const matchesBrand = this.selectedBrands === 'All' || rent.brand === this.selectedBrands;
      const matchesModel = this.selectedModels === 'All' || rent.model === this.selectedModels;
      const matchesPriceRange = this.selectedPriceRanges === 'All' || rent.price === this.selectedPriceRanges;
      const matchesSearch = rent.additionalInfo?.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesBrand && matchesModel && matchesPriceRange && matchesSearch;
    });
  }

  clearFilters() {
    this.selectedBrands = 'All';
    this.selectedModels = 'All';
    this.searchText = '';
  }

}

import {Component, OnInit} from '@angular/core';
import {CarService} from './car.service';
import {Car} from './car.model';
import {ToasterService} from '../shared/toaster/toaster.service';
import {HttpHeaders} from '@angular/common/http';
import {switchMap} from 'rxjs';


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
  userRole: string | null = '';
  userId!: number;
  isModalOpen: boolean = false;
  isCalendarOpen: boolean = false;
  selectedCarId: number | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private carService: CarService) {}


  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    const afm = <string>localStorage.getItem('afm');

    this.carService.getIdByAfm(afm).pipe(
      switchMap(id => {
        this.userId = id;
        localStorage.setItem('userID',String(id));
        if (this.userRole == 'ROLE_CITIZEN') {
          return this.carService.getCars(); //
        } else {
          return this.carService.getCarsForDealers(<string><unknown>this.userId); //
        }
      })
    ).subscribe(data => {
      this.rents = data;
    });
  }

  openCalendar(carId: number | null): void {
    this.selectedCarId = carId;
    this.isCalendarOpen = true; // Open the modal
  }

  closeCalendar(): void {
    this.isCalendarOpen = false; // Close the modal
  }

  openModalForEdit(carId: number | null) {
    this.isModalOpen = true;
    this.selectedCarId = carId;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  deleteCar(carId: number | null): void {
    this.carService.deleteCar(<string><unknown>carId).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = null;
        alert(this.successMessage);
      },
      error: (err) => {
        this.successMessage = null;
        this.errorMessage = err.message;
        alert(this.errorMessage);
      }
    });
  }

  // Method to trigger the purchase process
  purchaseCar(carId: number | null): void {
    // Call the purchaseCar method from the service with headers
    this.carService.purchaseCar(<string><unknown>carId).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = null;
        alert(this.successMessage);

      },
      error: (err) => {
        this.successMessage = null;
        this.errorMessage = err.message;
        alert(this.errorMessage);
      }
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

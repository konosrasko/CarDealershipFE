import {Component, OnInit} from '@angular/core';
import {CarService} from './car.service';
import {Car} from './car.model';
import {ToasterService} from '../shared/toaster/toaster.service';
import {HttpHeaders} from '@angular/common/http';


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
  isModalOpen: boolean = false;



  constructor(private carService: CarService) {}


  ngOnInit(): void {
    this.carService.getCars().subscribe(data => {
      this.rents = data;
    });

  this.userRole = localStorage.getItem('userRole');
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }



  deleteCar(carId: number | null): void {
    this.carService.deleteCar(carId).subscribe({

      next: (response) => {
        alert('Deleted successful');
        console.log('Delete Response:', response);

      },
      error: (err) => {
        alert('Error: ' + (err.error || err.message));
        console.error('Error:', err);
      }
    });

  }

  // Method to trigger the purchase process
  purchaseCar(carId: number | null): void {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      alert('Error: No authentication token found');
      return;
    }

    // Create HTTP headers with the Bearer token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // Call the purchaseCar method from the service with headers
    this.carService.purchaseCar(carId, { headers }).subscribe({
      next: (response) => {
        alert('Purchase successful');
        console.log('Purchase Response:', response);

      },
      error: (err) => {
        alert('Error: ' + (err.error || err.message));
        console.error('Error:', err);
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

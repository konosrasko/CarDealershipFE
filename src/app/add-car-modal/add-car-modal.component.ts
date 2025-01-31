import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CarService} from '../car/car.service';
import {AddCarModalService, CarDTO} from './add-car-modal.service';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.css'],
  imports: [
    FormsModule
  ]
})
export class AddCarModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() carId: number | null = null;

  private readonly apiUrl = 'http://localhost:8080/api';

  carData: CarDTO = {
    brand: '',
    model: '',
    fuelType: '',
    engineCapacity: '',
    seats: null,
    price: null,
    quantity: null,
    additionalInfo: '',
    dealership: 0,  // Set default value for dealership
  };

  constructor(private http: HttpClient,private carService: AddCarModalService, private cService: CarService) {}

  ngOnInit() {
    if (this.carId !== null) {
      this.loadCarDetails();
    }
  }

  loadCarDetails() {
    this.http.get<any>(`${this.apiUrl}/carData?carID=${(this.carId)}`).subscribe({
      next: (car) => {
        this.carData = { ...car};
      },
      error: (err) => {
        console.error('Error fetching car details:', err);
        alert('Failed to load car details');
      },
    });
  }

  onSubmit() {
    if (this.carId === null) {
      this.addCar();
    } else {
      this.updateCar();
    }
  }

  addCar() {
    this.carData.dealership = <number><unknown>localStorage.getItem('userID')
    this.carService.addCar(this.carData).subscribe(
      (response: any) => {
        alert('Car added successfully');
        this.closeModal();
        window.location.reload();
      },
      (error: any) => {
        alert('Error adding car');
      }
    );
  }

  updateCar() {
    this.http
      .put(`${this.apiUrl}/car/update?carId=${this.carId}`, this.carData)
      .subscribe({
        next: (response) => {
          console.log('Car updated successfully:', response);
          alert('Car updated successfully!');
          this.closeModal();
          window.location.reload();
        },
        error: (err) => {
          console.error('Error updating car:', err);
          alert(`Failed to update car: ${err.error.message || err.message}`);
        },
      });
  }

  closeModal() {
    this.close.emit(); // Emit an event to close the modal
  }
}

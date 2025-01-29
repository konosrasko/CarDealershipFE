import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

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

  carData = {
    brand: '',
    model: '',
    fuelType: '',
    engineCapacity: '',
    seats: null,
    price: null,
    quantity: null,
    additionalInfo: '',
    dealership: localStorage.getItem('userID'),
  };

  constructor(private http: HttpClient) {}

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
    this.http.post(`${this.apiUrl}/car/add`, this.carData).subscribe({
      next: (response) => {
        console.log('Car added successfully:', response);
        alert('Car added successfully!');
        this.closeModal();
      },
      error: (err) => {
        console.error('Error adding car:', err);
        alert(`Failed to add car: ${err.error.message || err.message}`);
      },
    });
  }

  updateCar() {
    this.http
      .put(`${this.apiUrl}/car/update?carId=${this.carId}`, this.carData)
      .subscribe({
        next: (response) => {
          console.log('Car updated successfully:', response);
          alert('Car updated successfully!');
          this.closeModal();
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

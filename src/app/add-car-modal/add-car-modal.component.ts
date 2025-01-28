import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.css'],
  imports: [
    FormsModule
  ]
})
export class AddCarModalComponent {
  @Output() close = new EventEmitter<void>();

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
    dealershipId:localStorage.getItem('userID')
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log('Submitting form data:', this.carData);

    // Call the backend endpoint
    this.http.post(`${this.apiUrl}/car/add`, this.carData).subscribe({
      next: (response) => {
        console.log('Car added successfully:', response);
        alert('Car added successfully!');
        this.closeModal(); // Close the modal after success
      },
      error: (err) => {
        console.error('Error adding car:', err);
        alert(`Failed to add car: ${err.error.message || err.message}`);
      },
    });
  }

  closeModal() {
    this.close.emit(); // Emit an event to close the modal
  }
}

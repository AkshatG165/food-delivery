export class Address {
  id: string;
  title: string;
  name: string;
  mobile: number;
  pincode: number;
  address: string;
  city: string;
  state: string;
  location: { lat: string; long: string };

  constructor(
    title: string,
    name: string,
    mobile: number,
    pincode: number,
    address: string,
    city: string,
    state: string,
    location: { lat: string; long: string } = { lat: '', long: '' }
  ) {
    this.id = Math.floor(Math.random() * Date.now() * 100).toString();
    this.title = title;
    this.name = name;
    this.mobile = mobile;
    this.pincode = pincode;
    this.address = address;
    this.city = city;
    this.state = state;
    this.location = location;
  }
}

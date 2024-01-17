import classes from './AddressForm.module.css';

export default function AddressForm() {
  return (
    <form>
      <div>
        <div>
          <label>Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter title"
          />
        </div>
        <div>
          <label>Name</label>
          <input id="name" type="text" name="name" placeholder="Enter name" />
        </div>
      </div>
      <div>
        <div>
          <label>Mobile Number</label>
          <input
            id="mobile"
            type="number"
            name="mobile"
            placeholder="Enter 10-digit number"
          />
        </div>
        <div>
          <label>Pincode</label>
          <input
            id="pincode"
            type="number"
            name="pincode"
            placeholder="Enter 10-digit number"
          />
        </div>
      </div>
      <div>
        <label>Address</label>
        <input
          id="address"
          type="text"
          name="address"
          placeholder="Enter full address"
        />
      </div>
      <div>
        <div>
          <label>City</label>
          <input id="city" type="text" name="city" placeholder="Enter city" />
        </div>
        <div>
          <label>State</label>
          <input
            id="state"
            type="text"
            name="state"
            placeholder="Enter state"
          />
        </div>
      </div>
      <div>
        <button>Save</button>
        <button>Cancel</button>
      </div>
    </form>
  );
}

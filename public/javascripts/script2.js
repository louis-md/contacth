var phoneNumbers = document.getElementById("phone-numbers");
var btnAddNumber = document.getElementById("btn-add-number");
var btnDeleteNumber = document.querySelectorAll("#btn-delete-number");

var emails = document.getElementById("emails");
var btnAddEmail = document.getElementById("btn-add-email");
var btnDeleteEmail = document.querySelectorAll("#btn-delete-email");

var ethAddresses = document.getElementById("ethAddresses");
var btnAddEthAddress = document.getElementById("btn-add-ethAddress");
var btnDeleteEthAddress = document.querySelectorAll("#btn-delete-ethAddress");

var postalAddresses = document.getElementById("postalAddresses");
var btnAddPostalAddress = document.getElementById("btn-add-postalAddress");
var btnDeletePostalAddress = document.querySelectorAll("#btn-delete-postalAddress");

btnAddNumber.onclick = function () {
  let div = document.createElement("div");
  div.innerHTML = `
    <div id="fieldPhoneNumber" class="form-group">
    <input id="contact-phone" type="text" name="phoneNumbers" class="form-control">
    <span id="btn-delete-number" class="btn btn-secondary btn-sm">Delete</span>
    </div>`;
  phoneNumbers.appendChild(div);
  btnDeleteNumber = document.querySelectorAll("#btn-delete-number");
  btnDeleteNumber.forEach(element => {
    element.onclick = function () {
      this.parentNode.remove();
    }
  })
}

btnDeleteNumber.forEach(element => {
  element.onclick = function () {
    this.parentNode.remove();
  }
})

btnAddEmail.onclick = function () {
  let div = document.createElement("div");
  div.innerHTML = `
  <div id="fieldEmail" class="form-group">
  <input id="contact-email" type="text" name="secondaryEmails" class="form-control" placeholder="steve.wozniak@apple.com">
  <span id="btn-delete-email" class="btn btn-secondary btn-sm">Delete</span>
  </div>`;
  emails.appendChild(div);
  btnDeleteEmail = document.querySelectorAll("#btn-delete-email");
  btnDeleteEmail.forEach(element => {
    element.onclick = function () {
      this.parentNode.remove();
    }
  })

}


btnDeleteEmail.forEach(element => {
  element.onclick = function () {
    this.parentNode.remove();
  }
})


btnAddEthAddress.onclick = function () {
  let div = document.createElement("div");
  div.innerHTML = `
  <div id="ethAddresses" class="form-group">
  <label for="contact-ethereumAddresses">ethereum address</label>
  <input id="contact-ethereumAddresses" type="text" name="ethAddresses" class="form-control">
  <span id="btn-delete-ethAddress" class="btn btn-secondary btn-sm">Delete</span>
  </div>`;
  ethAddresses.appendChild(div);
  btnDeleteEthAddress = document.querySelectorAll("#btn-delete-ethAddress");
  btnDeleteEthAddress.forEach(element => {
    element.onclick = function () {
      this.parentNode.remove();
    }
  })
}

btnDeleteEthAddress.forEach(element => {
  element.onclick = function () {
    this.parentNode.remove();
  }
})

btnAddPostalAddress.onclick = function () {
  let div = document.createElement("div");
  div.innerHTML = `<div class="form-group">
  <label for="address-streetName">Street name</label>
  <input id="address-streetName" type="text" name="streetName" class="form-control">
</div>
<div class="form-group">
  <label for="address-streetNumber">Street number</label>
  <input id="address-streetNumber" type="number" min="1" name="streetNumber" class="form-control">
</div>
<div class="form-group">
  <label for="address-special">Special (bis, ter...)</label>
  <input id="address-special" type="text" name="special" class="form-control">
</div>
<div class="form-group">
  <label for="address-postCode">Post code</label>
  <input id="address-postCode" type="number" name="postCode" class="form-control">
</div>
<div class="form-group">
  <label for="address-city">City</label>
  <input id="address-city" type="text" name="city" class="form-control">
</div>
<div class="form-group">
  <label for="address-country">Country</label>
  <input id="address-country" type="text" name="country" class="form-control">
</div>
<div class="form-group">
  <label class="label">Is it the principal residency ?</label>
      <label for="is-principalResidency">Yes</label>
      <input id="is-principalResidency" type="radio" name="principalResidency" value="Yes">
      <label for="is-not-principalResidency">No</label>
      <input id="is-not-principalResidency" type="radio" name="principalResidency" value="No" checked>
</div>
<span id="btn-delete-postalAddress" class="btn btn-secondary btn-sm">Delete</span>
<hr>`;
  postalAddresses.appendChild(div);
  btnDeletePostalAddress = document.querySelectorAll("#btn-delete-postalAddress");
  btnDeletePostalAddress.forEach(element => {
    element.onclick = function () {
      this.parentNode.remove();
    }
  })
}

btnDeletePostalAddress.forEach(element => {
  element.onclick = function () {
    this.parentNode.remove();
  }
})
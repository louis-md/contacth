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
  console.log("herreee")
  let div = document.createElement("div");
  div.innerHTML = `<label for="contact-phone" class="label-descr label">phone number</label>
    <input id="contact-phone" type="text" name="phoneNumbers" class="input-text input">
    <span id="btn-delete-number" class="fa fa-trash table-icon" ></span>`;
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
  div.innerHTML = `<label for="contact-email" class="label-ref label">email</label>
  <input id="contact-email" type="text" name="secondaryEmails" class="input-text input"
      placeholder="test@gmail.com">
      <span id="btn-delete-email" class="fa fa-trash table-icon" ></span>`;
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
  div.innerHTML = `<label for="contact-ethereumAddresses" class="label-price label">ethereum address</label>
  <input id="contact-ethereumAddresses" type="text" name="ethAddresses" class="input-text input">
  <span id="btn-delete-ethAddress" class="fa fa-trash table-icon" ></span>`;
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
  div.innerHTML = `<div class="form-item-wrapper flexed-item">
  <label for="address-streetName" class="label-name label">street name</label>
  <input id="address-streetName" type="text" name="streetName" class="input-text input">
</div>
<div class="form-item-wrapper flexed-item">
  <label for="address-streetNumber" class="label-name label">street number</label>
  <input id="address-streetNumber" type="number" min="1" name="streetNumber" class="input-text input">
</div>
<div class="form-item-wrapper flexed-item">
  <label for="address-special" class="label-name label">special</label>
  <input id="address-special" type="text" name="special" class="input-text input">
</div>
<div class="form-item-wrapper flexed-item">
  <label for="address-postCode" class="label-name label">post code</label>
  <input id="address-postCode" type="number" name="postCode" class="input-text input">
</div>
<div class="form-item-wrapper flexed-item">
  <label for="address-city" class="label-name label">city</label>
  <input id="address-city" type="text" name="city" class="input-text input">
</div>
<div class="form-item-wrapper flexed-item">
  <label for="address-country" class="label-name label">country</label>
  <input id="address-country" type="text" name="country" class="input-text input">
</div>
<div class="form-item-wrapper flexed-item">
  <label class="label">is principal residency ?</label>
  <div class="row">
      <label for="is-principalResidency">yes</label>
      <input id="is-principalResidency" type="radio" name="principalResidency" value="yes">
      <label for="is-not-principalResidency">no</label>
      <input id="is-not-principalResidency" type="radio" name="principalResidency" value="no" checked>
  </div>
</div>
<span id="btn-delete-postalAddress" class="fa fa-trash table-icon" ></span>
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
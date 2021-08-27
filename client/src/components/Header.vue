<template>
  <div>
    <nav class="app-header navbar-expand-lg navbar fixed-top">
      <div class="container-fluid">
        <router-link
          :to="{ name: 'home' }"
          href=""
          class="navbar-brand text-white"
        >
          Dashboard
        </router-link>
      </div>
      <div class="collapse navbar-collapse">
        <div class="mr-4">
          <button
            class="rounded-button btn-invoice"
            type="button"
            @click="openCustomerModal"
          ></button>
        </div>
      </div>
    </nav>
    <!--Customer Modal -->
    <div
      class="modal fade"
      id="customerModal"
      tabindex="-1"
      aria-labelledby="customerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="border-bottom">
            <div class="modal-header border-bottom-0">
              <div class="d-flex">
                <h6 class="text-uppercase modal-title me-3">
                  Create New Invoice
                </h6>
                <p class="text-uppercase text-color modal-title font-size mt">
                  Order No: {{ orderNumber }}
                </p>
              </div>
              <button
                type="button"
                class="btn-close-modal"
                aria-label="Close"
                @click="closeCustomerModal"
              ></button>
            </div>
            <div class="modal-header border-bottom-0 pt-2">
              <h6 class="text-uppercase modal-title me-3">
                Customer Details
              </h6>
              <button
                class="btn btn-grey text-uppercase"
                @click="openInvoiceModal"
              >
                Skip
              </button>
            </div>
          </div>

          <form @submit.prevent="submitCustomerDetails">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for=""
                      >Full Name <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Customer Name"
                      v-model="form.full_name"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for=""
                      >Phone Number <span class="text-danger">*</span></label
                    >
                    <div class="input-group mb-3">
                      <span class="input-group-text">+91</span>
                      <input
                        type="text"
                        class="form-control"
                        v-model="form.phone_number"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="">Address </label>
                    <textarea
                      class="form-control"
                      placeholder="Complete Address"
                      rows="4"
                      v-model="form.address"
                    ></textarea>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for=""
                      >Email ID <span class="text-danger">*</span></label
                    >
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Customer Email Address"
                      v-model="form.email_id"
                      required
                    />
                  </div>
                  <div class="form-group w-25 mt-2">
                    <label for="">Pincode</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="560067"
                      v-model="form.pincode"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer bg-footer">
              <button
                class="btn px-5 btn-footer text-uppercase"
                type="submit"
                :disabled="isSubmittingCustomer"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!--Invoice Modal -->
    <div
      class="modal fade"
      id="invoiceModal"
      tabindex="-1"
      aria-labelledby="invoiceModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header border-bottom-0 pb-0">
            <div class="d-flex">
              <h6 class="text-uppercase modal-title me-3">
                Create New Invoice
              </h6>
              <p class="text-uppercase text-color modal-title font-size mt">
                Order No: {{ orderNumber }}
              </p>
            </div>
            <button
              type="button"
              class="btn-close-modal"
              @click="closeInvoiceModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-header border-bottom-0 py-0">
            <h6 class="text-uppercase modal-title me-3">
              product Details
            </h6>
            <div class="me-5">
              <p class="mb-0">Customer Details</p>
              <div class="d-flex justify-content-between">
                <div>
                  <p class="mb-0">
                    {{ customer ? customer.full_name : "" }}
                  </p>
                  <p class="mb-0">
                    {{ customer ? customer.email_id : "" }}
                  </p>
                </div>
                <button
                  class="btn btn-edit mb-0 ms-2"
                  @click="openCustomerModalAgain"
                ></button>
              </div>
            </div>
          </div>
          <form @submit.prevent="submitInvoiceDetails">
            <div class="modal-body pb-0">
              <div class="table-responsive">
                <table class="table">
                  <thead class="border-t">
                    <tr>
                      <th class="table-header" style="width:400px">Title</th>
                      <th class="table-header" style="width:400px">Quantity</th>
                      <th class="table-header" style="width:100px">
                        Price - ₹
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(invoice, i) in invoiceForm.product_details"
                      :key="i"
                    >
                      <td>
                        {{ invoice.item }}
                      </td>
                      <td>
                        {{
                          invoice.quantity.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })
                        }}
                      </td>
                      <td>
                        {{
                          invoice.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="row row-border mx-0 pb-3 px-0"
                v-for="(invoice, i) in invoiceForm.product_details"
                :key="i"
              >
                <div class="col-md-5 ps-0">
                  <input
                    type="text"
                    name="item"
                    class="form-control"
                    placeholder="Please enter item name"
                    v-model.trim="invoice.item"
                  />
                </div>
                <div class="col-md-3">
                  <input
                    type="number"
                    name="quantity"
                    placeholder="0.00"
                    class="form-control"
                    v-model.number="invoice.quantity"
                  />
                </div>
                <div class="col-md-3">
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    class="form-control"
                    v-model.number="invoice.price"
                  />
                </div>
                <div class="col-md-1">
                  <button
                    class="btn btn-add"
                    @click="addItem"
                    type="button"
                    v-if="i === 0"
                  ></button>
                  <button
                    class="btn btn-remove"
                    @click="removeItem(i)"
                    type="button"
                    v-else
                  ></button>
                </div>
              </div>
              <div class="row-border row py-2">
                <div class="col-md-3">
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Tax"
                      aria-label="Tax"
                      aria-describedby="basic-addon2"
                      v-model="invoiceForm.tax"
                    />
                    <span class="input-group-text" id="basic-addon2">%</span>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Discount"
                      aria-label="Discount"
                      aria-describedby="basic-addon1"
                      v-model="invoiceForm.discount"
                    />
                    <span class="input-group-text" id="basic-addon1">%</span>
                  </div>
                </div>
                <div class="col-md-6 text-end">
                  <p class="me-5">
                    Sub Total
                    <small class="ms-5 fw-bold"
                      >₹
                      {{
                        subTotal.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })
                      }}</small
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="px-3 py-1 bg-footer">
              <div class="row align-items-center">
                <div class="col-md-3">
                  <h6 class="inv-text">Tax</h6>
                  <p class="inv-text">
                    ₹
                    {{
                      amountTaxed.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })
                    }}
                  </p>
                </div>
                <div class="col-md-3">
                  <h6 class="inv-text">Discount</h6>
                  <p class="inv-text">
                    ₹
                    {{
                      amountDiscount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })
                    }}
                  </p>
                </div>
                <div class="col-md-3">
                  <h6 class="inv-text">Grand Total</h6>
                  <p class="fw-bold">
                    ₹
                    {{
                      grandTotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })
                    }}
                  </p>
                </div>
                <div class="col-md-3">
                  <button
                    class="btn px-5 btn-footer text-uppercase text-center"
                    type="submit"
                    :disabled="isSubmittingInvoice"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div
              class="alert alert-success pb-1 mb-1 text-black d-flex align-items-center"
              role="alert"
              v-if="isCreateInvoice"
            >
              <p>Successfully Created Invoice</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
      form: {
        full_name: "",
        phone_number: "",
        address: "",
        email_id: "",
        pincode: "",
      },
      invoiceForm: {
        product_details: [
          {
            item: "",
            quantity: 0.0,
            price: 0.0,
          },
        ],
        tax: 0,
        discount: 0,
      },
      customer: null,
      isSubmittingCustomer: false,
      isSubmittingInvoice: false,
      isCreateInvoice: false,
    };
  },
  computed: {
    orderNumber() {
      return Math.floor(Math.random() * 10000);
    },
    //compute subtotal
    subTotal() {
      return this.invoiceForm.product_details.reduce((acc, val) => {
        return acc + val.price * val.quantity;
      }, 0);
    },

    amountTaxed() {
      if (this.invoiceForm.tax) {
        return +this.subTotal * (+this.invoiceForm.tax / 100);
      }
      return 0;
    },

    amountDiscount() {
      if (this.invoiceForm.discount) {
        return +this.subTotal * (+this.invoiceForm.discount / 100);
      }
      return 0;
    },

    //compute subtotal
    grandTotal() {
      return (
        Number(this.subTotal) -
        (Number(this.amountTaxed) + Number(this.amountDiscount))
      );
    },
  },

  methods: {
    openCustomerModal() {
      const myModal = new Modal(document.getElementById("customerModal"));
      myModal.show();
    },
    openCustomerModalAgain() {
      const myModal = new Modal(document.getElementById("customerModal"));
      myModal.show();
      this.closeInvoiceModal();
    },

    openInvoiceModal() {
      const myModal = new Modal(document.getElementById("invoiceModal"));
      myModal.show();
      this.closeCustomerModal();
    },

    closeCustomerModal() {
      const myModal = document.getElementById("customerModal");
      const modal = Modal.getInstance(myModal);
      modal.hide();
      this.form.full_name = "";
      this.form.phone_number = "";
      this.form.address = "";
      this.form.email_id = "";
      this.form.pincode = "";
    },

    closeInvoiceModal() {
      const myModal = document.getElementById("invoiceModal");
      const modal = Modal.getInstance(myModal);
      modal.hide();
      this.invoiceForm.product_details = [
        {
          item: "",
          quantity: 0.0,
          price: 0.0,
        },
      ];
      this.invoiceForm.tax = 0.0;
      this.invoiceForm.address = 0.0;
      this.customer = null;
    },

    //add item
    addItem() {
      this.invoiceForm.product_details.push({
        item: "",
        quantity: 0.0,
        price: 0.0,
      });
    },

    //remove item
    removeItem(i) {
      this.invoiceForm.product_details.splice(i, 1);
    },

    // submit customer data
    async submitCustomerDetails() {
      try {
        this.isSubmittingCustomer = true;
        const payload = {
          full_name: this.form.full_name,
          phone_number: this.form.phone_number,
          address: this.form.address,
          email_id: this.form.email_id,
          pincode: this.form.pincode,
        };
        const { data: res } = await axios.post(
          "http://localhost:3000/api/customers",
          payload
        );
        this.customer = res.data;
        this.openInvoiceModal();
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubmittingCustomer = false;
      }
    },

    // submit invoice data
    async submitInvoiceDetails() {
      try {
        this.isSubmittingInvoice = true;
        const payload = {
          product_details: this.invoiceForm.product_details,
          customer_id: this.customer?.id ?? null,
          tax: this.invoiceForm.tax,
          discount: this.invoiceForm.discount,
        };
        const { data: res } = await axios.post(
          "http://localhost:3000/api/invoices",
          payload
        );
        this.$store.commit("SET_INVOICE", res.data);
        this.isCreateInvoice = true;
        setTimeout(() => {
          this.closeInvoiceModal();
          this.isCreateInvoice = false;
        }, 1500);
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubmittingInvoice = false;
      }
    },
  },
};
</script>

<style scoped></style>

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
          <button class="rounded-button" type="button" @click="openModal">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </nav>
    <!-- Modal -->
    <div
      class="modal fade"
      id="invoiceModal"
      tabindex="-1"
      aria-labelledby="invoiceModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="border-bottom">
            <div class="modal-header border-bottom-0">
              <h6 class="text-uppercase modal-title me-3">
                Create New Invoice
              </h6>
              <p class="text-uppercase text-color modal-title font-size">
                Order No: {{ orderNumber }}
              </p>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-header border-bottom-0 pt-2">
              <h6 class="text-uppercase modal-title me-3">
                Customer Details
              </h6>
              <button class="btn btn-grey text-uppercase">Skip</button>
            </div>
          </div>

          <div class="modal-body">
            <form>
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
                      <input type="text" class="form-control" />
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
                    ></textarea>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for=""
                      >Email ID <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Customer Email Address"
                    />
                  </div>
                  <div class="form-group w-25 mt-2">
                    <label for="">Pincode</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="560067"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer bg-footer">
            <button class="btn px-5 btn-footer text-uppercase">
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  name: "Header",
  methods: {
    openModal() {
      const myModal = new Modal(document.getElementById("invoiceModal"));
      myModal.show();
    },
  },
  computed: {
    orderNumber() {
      return Math.floor(Math.random() * 10000);
    },
  },
};
</script>

<style scoped></style>
